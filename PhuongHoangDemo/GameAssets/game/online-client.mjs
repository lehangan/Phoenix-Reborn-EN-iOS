import {createRanking} from './ranking-client.mjs';
export function operationId(){const b=crypto.getRandomValues(new Uint8Array(16));b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;const h=Array.from(b,x=>x.toString(16).padStart(2,'0')).join('');return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;}
export async function api(path,options={}){
 if(location.protocol==='phoenix:'||location.protocol==='file:'){const e=new Error('Online accounts, cloud saves and rankings are not connected in this offline test build. Your progress is saved on this device.');e.status=503;throw e;}
 const response=await fetch('/api'+path,{credentials:'same-origin',cache:'no-store',...options,headers:{...(options.body?{'content-type':'application/json','x-game-request':'1'}:{}),...options.headers},signal:AbortSignal.timeout(20000)});
 const data=await response.json().catch(()=>({error:'Không kết nối được máy chủ.'}));if(!response.ok){const e=new Error(data.error||'Chưa hoàn tất thao tác.');e.status=response.status;throw e;}return data;
}
export function createCloud({guestKey,getState,setState,onStatus,toast}){
 let user=null,revision=0,pending=null,flight=null,running=null,timer,ready=false,blocked=false,status='Đang kết nối…';
 let rejected=null,failures=0,retryAfter=0;
 const key=()=>user?'phoenix-account:'+user.id:guestKey;
 function announce(value){status=value;onStatus?.();}
 const ranking=createRanking({api,onStatus:announce});
 function cache(){try{localStorage.setItem(key(),user?JSON.stringify({state:getState(),revision,pending:!!pending,flight}):JSON.stringify(getState()));if(user)localStorage.setItem('phoenix-active-account',JSON.stringify(user));}catch{announce('Bộ nhớ thiết bị đầy · Hãy giữ kết nối mạng');}}
 const snapshot=()=>JSON.parse(JSON.stringify(getState()));
 const rejectedPending=()=>pending&&rejected===JSON.stringify(pending);
 function schedule(){
  if(timer!==undefined||!user||blocked||!pending||rejectedPending()||!navigator.onLine||document.hidden)return;
  // Coalesce rapid actions, but keep writing the latest state locally immediately.
  timer=setTimeout(()=>{timer=undefined;flush({automatic:true}).catch(()=>{});},Math.max(2500,retryAfter-Date.now()));
 }
 function resetRetry(){clearTimeout(timer);timer=undefined;rejected=null;failures=0;retryAfter=0;}
 function queue(){if(!ready)return;ranking.observe(getState());if(user){pending=snapshot();cache();announce(blocked?'Cần giải quyết bản lưu khác':rejectedPending()?'Chưa lưu online · Bản trên máy vẫn còn':'Chờ đồng bộ…');schedule();}else cache();}
 async function flush({automatic=false}={}){
  if(running){await running;return automatic?undefined:flush();}if(!user||blocked||!pending)return;
  if(rejectedPending())throw Error('Bản lưu này chưa được máy chủ chấp nhận. Tiến trình trên thiết bị vẫn được giữ.');
  if(automatic&&Date.now()<retryAfter){schedule();return;}
  clearTimeout(timer);timer=undefined;
  if(!navigator.onLine){announce('Ngoại tuyến · Đã lưu trên máy');throw Error('Chưa có mạng. Tiến trình vẫn ở thiết bị này.');}
  running=(async()=>{
   while(pending&&!blocked){
    if(!flight)flight={state:pending,revision,operationId:operationId()};
    const active=flight;cache();announce('Đang lưu online…');
    try{
     const r=await api('/progress',{method:'PUT',headers:{'x-game-account':user.id},body:JSON.stringify(active)});
     revision=r.revision;if(pending===active.state)pending=null;flight=null;rejected=null;failures=0;retryAfter=0;
     cache();announce(pending?'Chờ đồng bộ…':'Đã lưu online');
     // Automatic saves send once per interval; explicit saves still drain pending work.
     if(automatic)break;
    }catch(e){
     if(e.status===409){blocked=true;announce('Có bản mới ở thiết bị khác');}
     else if(e.status===401){blocked=true;announce('Hết phiên · Đăng nhập lại để lưu');}
     else{
      if(e.status===400||e.status===413){
       // Definitive rejection: don't keep retrying this obsolete snapshot forever.
       // Retain the current local state; a changed state can be submitted next.
       rejected=JSON.stringify(active.state);flight=null;retryAfter=0;
      }else{
       // A lost response may already be committed. Preserve its id for safe retry.
       failures++;retryAfter=Date.now()+Math.min(60000,5000*2**Math.min(failures-1,4));
      }
      cache();announce('Chưa lưu online · Bản trên máy vẫn còn');
     }
     throw e;
    }
   }
  })().finally(()=>{running=null;schedule();});return running;
 }
 async function loadForUser(next,initialProgress=null,{allowGuestImport=false}={}){
  // Fetch before changing the active account: a failed load must not cache the
  // unrelated guest game under the account that was just authenticated.
  const r=initialProgress??await api('/progress',{headers:{'x-game-account':next.id}});
  let cached;try{cached=JSON.parse(localStorage.getItem('phoenix-account:'+next.id));}catch{}
  if(!r.state&&!cached?.state&&!allowGuestImport)throw Error('Tài khoản chưa có bản lưu online. Hãy mở game trên máy cũ, đăng nhập và bấm Lưu ngay trước khi đổi máy.');
  resetRetry();user=next;blocked=false;flight=null;pending=null;revision=r.revision;
  if(cached?.pending){setState(cached.state);pending=snapshot();if(cached.revision===r.revision){flight=cached.flight||null;announce('Đang nối lại bản lưu…');}else{blocked=true;announce('Có hai bản lưu · Cần chọn tải bản online');}cache();return;}
  if(r.state){const version=r.state.faceSystemVersion;setState(r.state);if(version!==getState().faceSystemVersion)pending=snapshot();}else{if(cached?.state)setState(cached.state);pending=snapshot();}cache();announce(r.state?'Đã tải tiến trình online':'Đang lưu kiếp hiện tại…');
 }
 async function bootstrap(){try{const {user:next}=await api('/account/session');if(next)await loadForUser(next);else{localStorage.removeItem('phoenix-active-account');announce('Chơi trên thiết bị · Chưa đăng nhập');}}catch{let cachedUser;try{cachedUser=JSON.parse(localStorage.getItem('phoenix-active-account'));const cached=cachedUser&&JSON.parse(localStorage.getItem('phoenix-account:'+cachedUser.id));if(cached?.state){user=cachedUser;setState(cached.state);revision=cached.revision||0;pending=snapshot();flight=cached.flight||null;}}catch{}announce('Chưa kết nối máy chủ · Tiến trình ở thiết bị');}ranking.activate(user);ready=true;cache();ranking.observe(getState());ranking.flush().catch(()=>{});if(pending&&!blocked)flush().catch(()=>{});}
 async function authenticate(username,password,register){if(register&&user)throw Error('Hãy đăng xuất trước khi tạo tài khoản mới.');if(user&&pending)await flush();if(register)await ranking.flush();else await ranking.flush().catch(()=>{});const previous=user;const guestToken=!user&&register?ranking.key():null;const data=await api(register?'/account/register':'/account/login',{method:'POST',body:JSON.stringify({username,password,...(register?{state:snapshot()}:{}),...(guestToken?{guestKey:guestToken}:{})})});
  if(guestToken&&!data.progress){
   localStorage.setItem('phoenix-account:'+data.user.id,JSON.stringify({state:getState(),revision:0,pending:true,flight:null}));
   localStorage.setItem('phoenix-active-account',JSON.stringify(data.user));
  }

  // Keep unsynced saves under the old account; never transfer them to another user.
  if(previous?.id!==data.user.id&&previous){const guest=localStorage.getItem(guestKey);if(guest)setState(JSON.parse(guest));}
  await loadForUser(data.user,data.progress,{allowGuestImport:register});
  if(guestToken){ranking.claimed();localStorage.removeItem(guestKey);}
  ranking.activate(user);ranking.observe(getState());ready=true;cache();if(pending&&!blocked)await flush();
  // Leaderboard uploads are independent of loading the playable account save.
  await ranking.flush().catch(()=>{});return data.user;
 }
 async function logout(){await ranking.flush();await flush();if(pending||blocked)throw Error('Hãy xử lý bản lưu chưa đồng bộ trước khi đăng xuất.');await api('/account/logout',{method:'POST',body:'{}'});user=null;revision=0;flight=pending=null;localStorage.removeItem('phoenix-active-account');const guest=localStorage.getItem(guestKey);setState(guest?JSON.parse(guest):null);ranking.activate(null);ranking.observe(getState());cache();announce('Đã đăng xuất · Trở về kiếp chơi vô danh');}
 async function useCloud(){if(!user)return;await running?.catch(()=>{});const r=await api('/progress',{headers:{'x-game-account':user.id}});if(!r.state)throw Error('Chưa có bản lưu online.');localStorage.setItem('phoenix-recovery:'+user.id,JSON.stringify({state:getState(),savedAt:Date.now()}));setState(r.state);revision=r.revision;pending=flight=null;blocked=false;resetRetry();cache();announce('Đã tải bản online mới nhất');}
 window.addEventListener('online',()=>{flush().catch(()=>{});ranking.flush().catch(()=>{});});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){flush().catch(()=>{});ranking.flush().catch(()=>{});}});
 window.addEventListener('beforeunload',e=>{if(pending){cache();e.preventDefault();e.returnValue='';}});
 async function guqin(action,data){
  if(!ready||blocked)throw Error('Chưa kết nối được máy chủ. Hãy thử lại.');
  return api('/guqin/'+action,{method:'POST',headers:user?{'x-game-account':user.id}:{},body:JSON.stringify({...data,...(!user?{guestKey:ranking.key()}:{})})});
 }
 return {guqin,bootstrap,queue,flush,flushRanking:()=>{if(ready)ranking.observe(getState());return ranking.flush();},record:()=>ready?ranking.observe(getState()):null,completeLife:r=>{if(ready)ranking.complete(r);},authenticate,logout,useCloud,info:()=>({user,status,pending:!!pending,blocked,revision})};
}
