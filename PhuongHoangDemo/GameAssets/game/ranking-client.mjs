import {rankingPeriod} from './ranking-period.mjs';
import {captureRanking,betterRanking} from './ranking-record.mjs';
import {rankingAgePriority} from './ranking-eligibility.mjs';

export const GUEST_ID_KEY='phoenix-guest-ranking-key';
export function createRanking({api,storage=localStorage,onStatus=()=>{},now=()=>Date.now()}){
 let user=null,guestKey=null,pending={},best={},running=null,timer=null,period=rankingPeriod(now());
 const cacheKey=()=>user?'phoenix-ranking:'+user.id:'phoenix-ranking:guest';
 function persist(){try{storage.setItem(cacheKey(),JSON.stringify({period,best,pending}));}catch{onStatus('Bộ nhớ thiết bị đầy · Cần kết nối để lưu thành tích');}}
 function rollPeriod(){const next=rankingPeriod(now());if(next!==period){period=next;best={};pending={};clearTimeout(timer);persist();}}
 function activate(next){
  clearTimeout(timer);user=next;pending={};best={};guestKey=null;period=rankingPeriod(now());
  if(!user){
   guestKey=storage.getItem(GUEST_ID_KEY);
   if(!/^[a-f0-9]{64}$/.test(guestKey||'')){
    guestKey=Array.from(crypto.getRandomValues(new Uint8Array(32)),n=>n.toString(16).padStart(2,'0')).join('');storage.setItem(GUEST_ID_KEY,guestKey);
   }
  }
  try{const saved=JSON.parse(storage.getItem(cacheKey()));if(saved?.period===period){pending=saved.pending||{};best=saved.best||{};}}catch{}
 }
 function observe(state){rollPeriod();const captured=captureRanking(state),r=captured?{...captured,rankingPeriod:period}:null;observeRecord(r);return r;}
 function observeRecord(r){
  rollPeriod();if(!r||r.rankingPeriod!==period)return;
  const old=best[r.life];
  const rev=r.collectionRevision??0,oldRev=old?.collectionRevision??0,sorted=a=>[...new Set(a)].sort();
  const exclusions=rev>oldRev?sorted(r.collectionExclusions||[]):rev<oldRev?sorted(old?.collectionExclusions||[]):sorted([...(old?.collectionExclusions||[]),...(r.collectionExclusions||[])]);
  const blocked=new Set(exclusions),items=sorted([...(old?.collectionItems||[]),...(r.collectionItems||[])]).filter(id=>!blocked.has(id));
  const changed=JSON.stringify(items)!==JSON.stringify(old?.collectionItems||[]);
  const collectionEligibility=rankingAgePriority(r.collectionAgeMonths??r.ageMonths,old?.collectionAgeMonths??old?.ageMonths);
  const fashionEligibility=rankingAgePriority(r.fashionAgeMonths??r.ageMonths,old?.fashionAgeMonths??old?.ageMonths);
  const collectionLook=!old||collectionEligibility>0||collectionEligibility===0&&changed&&rev>=oldRev?r:old;
  const fashionLook=!old||fashionEligibility>0||fashionEligibility===0&&((r.fashionWins??0)>(old.fashionWins??0)||(r.fashionWins??0)===(old.fashionWins??0)&&(r.fashionAgeMonths??r.ageMonths)<(old.fashionAgeMonths??old.ageMonths))?r:old;
  const merged={...(betterRanking(r,old)?r:old),completed:!!(r.completed||old?.completed),fashionWins:fashionLook.fashionWins??0,fashionAgeMonths:fashionLook.fashionAgeMonths??fashionLook.ageMonths,fashionAppearance:fashionLook.fashionAppearance??fashionLook.appearance,collectionItems:items,collectionRevision:Math.max(rev,oldRev),collectionExclusions:exclusions,collectionAppearance:collectionLook.collectionAppearance??collectionLook.appearance,collectionAgeMonths:collectionLook.collectionAgeMonths??collectionLook.ageMonths};
  if(!old||JSON.stringify(merged)!==JSON.stringify(old)){best[r.life]=merged;pending[r.life]=merged;persist();clearTimeout(timer);timer=setTimeout(()=>flush().catch(()=>{}),800);}
 }
 async function flush(){
  rollPeriod();
  if(running)return running;
  if(!Object.keys(pending).length)return;
  running=(async()=>{
   while(Object.keys(pending).length){
    rollPeriod();if(!Object.keys(pending).length)break;
    const records=Object.values(pending).slice(0,100);
    await api('/ranking/records',{method:'POST',headers:user?{'x-game-account':user.id}:{},body:JSON.stringify({period,records,...(!user?{guestKey}:{})})});
    for(const r of records)if(pending[r.life]===r)delete pending[r.life];
    persist();
   }
   if(!user)onStatus('Chơi vô danh · Thành tích đã lưu online');
  })().catch(e=>{if(!user)onStatus('Thành tích chờ kết nối · Tiến trình vẫn trên máy');throw e;}).finally(()=>{running=null;});
  return running;
 }
 function claimed(){storage.removeItem('phoenix-ranking:guest');storage.removeItem(GUEST_ID_KEY);}
 return {activate,observe,flush,claimed,complete:r=>{if(r)observeRecord({...r,completed:true});},key:()=>guestKey};
}
