import * as B from './life-engine.mjs';
import {femaleLine,femaleSpeech} from './female-speech.mjs';

export const FEMALE_RELATION_RULES=Object.freeze({friend:50,sworn:80,maxSisters:2,inviteChance:.12,betrayChance:.01,mercyChance:.20});
export const activeSisters=s=>(s.p.sisterhoods||[]).filter(r=>r.status==='active').map(r=>s.npcs.find(n=>n.id===r.npc&&n.alive&&n.gender==='female')).filter(Boolean);
export const isSister=(s,n)=>activeSisters(s).some(x=>x.id===n?.id);
export const femaleRelation=(s,n)=>isSister(s,n)?'Kết nghĩa':n.bond<0?'Thù địch':n.bond>=50?'Bạn hữu':'Quen biết';
export const femaleAddress=(s,n)=>femaleSpeech(s,n).you;
export function migrateSisterhood(s){
 s.p.sisterhoods??=[];s.p.lastSisterEventMonth??=-1;s.p.sisterInviteCooldowns??={};s.sisterEvent??=null;
 for(const r of s.p.sisterhoods)if(r.status==='active'&&!s.npcs.some(n=>n.id===r.npc&&n.alive)){r.status='departed';r.ended=s.p.months;}
}
const free=s=>s.p.alive&&!s.intro&&!s.p.outside&&!s.p.prison&&!s.p.coldPalace;
export function queueSisterEvent(s){
 migrateSisterhood(s);if(s.p.lastSisterEventMonth===s.p.months)return false;s.p.lastSisterEventMonth=s.p.months;
 if(!free(s)||s.sisterEvent)return false;
 const sisters=activeSisters(s),betrayers=sisters.filter(n=>s.p.sisterhoods.some(r=>r.npc===n.id&&r.status==='active'&&r.since<s.p.months));
 if(betrayers.length&&B.rand(s)<FEMALE_RELATION_RULES.betrayChance){s.sisterEvent={kind:'betrayal',phase:'offer',npc:B.pick(s,betrayers).id,month:s.p.months};return true;}
 if(sisters.length>=2)return false;
 const eligible=s.npcs.filter(n=>n.alive&&n.gender==='female'&&n.met&&n.talked&&n.bond>=80&&!isSister(s,n)&&s.p.months-(s.p.sisterInviteCooldowns[n.id]??-12)>=12);
 if(eligible.length&&B.rand(s)<FEMALE_RELATION_RULES.inviteChance){s.sisterEvent={kind:'invite',phase:'offer',npc:B.pick(s,eligible).id,month:s.p.months};return true;}
 return false;
}
export function normalizeSisterEvent(s){if(s.sisterEvent&&(!free(s)||!s.npcs.some(n=>n.id===s.sisterEvent.npc&&n.alive)))s.sisterEvent=null;}
export function sisterEventReady(s){normalizeSisterEvent(s);return free(s)&&!!s.sisterEvent&&!s.event&&!s.story&&!s.result&&!s.exam&&!s.mini&&!s.decree&&!s.coronation&&!s.fashion&&!s.festival&&!s.lake&&!s.guqin&&!s.caro&&!s.tea&&!s.dateScene&&!s.adoptionChoice&&!s.sideEvents?.length&&!s.notices.length;}
export function resolveSisterEvent(s,choice){
 const q=s.sisterEvent;if(!sisterEventReady(s)||!q)return {error:'Hãy khép lại biến cố trong tháng trước.'};
 const n=s.npcs.find(n=>n.id===q.npc&&n.alive&&n.gender==='female');
 if(!n){s.sisterEvent=null;return {ok:true,unavailable:true};}
 if(q.kind==='invite'){
  if(q.phase==='offer'){
   if(!['accept','decline'].includes(choice))return {error:'Lựa chọn không hợp lệ.'};
   if(choice==='decline'){s.p.sisterInviteCooldowns[n.id]=s.p.months;s.sisterEvent=null;B.addLog(s,`Nàng xin khất lời kết nghĩa của ${n.name}. Tình bằng hữu vẫn được trân trọng.`,'encounter');return {ok:true};}
   if(isSister(s,n)||activeSisters(s).length>=2){s.sisterEvent=null;return {ok:true,unavailable:true};}
   if(n.bond<80){s.sisterEvent=null;s.result={title:'Lời hẹn kim lan tạm khép',text:'Tình nghĩa chưa đủ sâu để lập lời thề kim lan.',effects:{}};return {ok:true,unavailable:true};}
   q.phase='temple';return {ok:true};
  }
  if(q.phase==='temple'&&choice==='vow'){
   if(activeSisters(s).length>=2||isSister(s,n)){s.sisterEvent=null;return {ok:true,unavailable:true};}
   if(n.bond<80)return {error:'Tình nghĩa chưa đủ sâu để lập lời thề kim lan.'};
   s.p.sisterhoods.push({npc:n.id,since:s.p.months,status:'active'});q.phase='portrait';
   B.addLog(s,`${s.p.name} và ${n.name} trước Thần Phật kết nghĩa kim lan, nguyện phúc họa cùng chia.`,'sisterhood');return {ok:true};
  }
  if(q.phase==='portrait'&&choice==='finish'){s.sisterEvent=null;return {ok:true};}
 }else if(q.kind==='betrayal'){
  if(!isSister(s,n)){s.sisterEvent=null;return {ok:true,unavailable:true};}
  if(q.phase==='offer'&&choice==='confront'){q.phase='courtyard';return {ok:true};}
  if(q.phase==='courtyard'&&choice==='break'){
   const before=n.bond;n.bond=Math.max(-100,before-100);n.rivalry=100;
   const losses={beauty:-20,intelligence:-20,art:-20,speech:-20,health:-20,merit:-20,reputation:-20,favor:-20,envy:20};
   const oldStats=Object.fromEntries(Object.keys(losses).map(k=>[k,s.p.stats[k]??s.p[k]]));
   B.apply(s,losses);
   const effects=Object.fromEntries(Object.keys(losses).map(k=>[k,(s.p.stats[k]??s.p[k])-oldStats[k]]));
   for(const r of s.p.sisterhoods)if(r.npc===n.id&&r.status==='active'){r.status='broken';r.ended=s.p.months;}
   s.p.sisterInviteCooldowns[n.id]=s.p.months;
   const leaving=s.p.children.filter(c=>c.adoption?.mother?.id===n.id);
   if(leaving.length){const ids=new Set(leaving.map(c=>c.id));s.p.children=s.p.children.filter(c=>!ids.has(c.id));s.notices=s.notices.filter(x=>!ids.has(x.child));}
   s.sisterEvent=null;
   const text=`Nàng phát hiện ${n.name} âm thầm tính kế hãm hại mình. Lời thề kim lan tan vỡ, hai người trở mặt thành thù. Thiện cảm giảm ${before-n.bond} điểm, còn ${n.bond}. Âm mưu khiến dung mạo, trí tuệ, tài nghệ, hoạt ngôn, sức khỏe, công trạng, uy danh và ân điển đều giảm 20; đố kỵ tăng 20.`+(leaving.length?` ${leaving.map(c=>c.name).join(', ')} rời nàng, trở về bên mẹ ruột.`:'');
   s.result={title:'Trở mặt thành thù',text,npc:n.id,success:false,effects,bondBefore:before,bondAfter:n.bond,bondGain:n.bond-before};B.addLog(s,text,'setback');
   if(s.p.health<=0)B.die(s,'exhaustion',text+' Nàng suy kiệt, không qua khỏi biến cố bị tỷ muội hãm hại.');
   return {ok:true,leaving:leaving.map(c=>c.id)};
  }
 }
 return {error:'Bước kết nghĩa không hợp lệ.'};
}
function sisterNotice(s,title,text,n,silver=0,details={}){s.p.silver+=silver;s.notices.push({kind:'sisterhood',title,text,npc:n.id,silver,...details});B.addLog(s,text,'sisterhood');}
export function sisterAid(s,kind){
 const sisters=activeSisters(s);if(!sisters.length||!s.p.alive)return [];
 const amount=kind==='cold'?100:50;
 for(const n of sisters){
  const line=femaleLine(s,n,kind==='cold'?'Phía trước còn gian nan, {you} sẽ có lúc dùng đến.':'Dung mạo có đổi, tình tỷ muội giữa {self} và {you} vẫn còn. Xin {you} giữ lấy 50 bạc này để dưỡng thương.');
  sisterNotice(s,kind==='cold'?'Tỷ muội ghé lãnh cung':'Tỷ muội đến an ủi',kind==='cold'?`${n.role} ${n.name} đến thăm, đặt vào tay nàng 100 bạc: “${line}”`:`${n.role} ${n.name} nắm tay nàng: “${line}”`,n,amount);
 }
 return sisters.map(n=>n.id);
}
export function sisterPlea(s,reason){
 const sisters=activeSisters(s).filter(n=>n.roleClass==='consort'&&n.courtRank>=0&&!n.deposed),e=s.npcs.find(n=>n.id==='emperor'&&n.alive);
 if(!s.p.alive||!sisters.length||!e||s.p.outside)return false;
 const names=sisters.map(n=>`${n.role} ${n.name}`).join(' và '),rescued=B.rand(s)<FEMALE_RELATION_RULES.mercyChance;
 if(!rescued){const text=`${names} quỳ trước điện xin hoàng đế thu hồi án phạt cho nàng, nhưng thánh ý không đổi.`;sisterNotice(s,'Tỷ muội cầu tình · Thánh ý không đổi',text,sisters[0],0,{beforeEnding:true,npcs:sisters.map(n=>n.id)});return false;}
 const months=B.range(s,3,6),text=`${reason} ${names} quỳ trước điện cầu tình. Hoàng đế thu hồi lệnh, chỉ phạt nàng cấm túc ${months} tháng.`;
 s.p.prison=months;s.p.coldPalace=null;s.p.coldPalaceUntil=null;
 s.event=s.exam=s.story=s.mini=s.decree=s.pendingTitle=s.visit=s.coronation=s.fashion=s.festival=s.lake=s.imperialNight=s.dateScene=s.tea=s.sisterEvent=null;s.sideEvents=[];
 s.result={title:'Tỷ muội cầu tình · Thu hồi án',text,success:true,effects:{},sisterRescue:true,months,npc:sisters[0].id};B.addLog(s,text,'sisterhood');return true;
}
const CONSOLATIONS=[
 'Của cải mất rồi còn có thể làm lại. Chỉ cần {you} bình an, {together} sẽ qua được chuyện này.',
 'Đêm nay {you} cứ sang chỗ {self} nghỉ. Một mình chịu đựng mãi cũng mệt, có {self} ở đây rồi.',
 'Đừng tự trách nữa. Vật ngoài thân rồi sẽ có, xin {you} chăm sóc mình trước.',
 '{Self} nghe tin liền đến. Có điều gì cần giúp, {you} cứ nói với {self}.'
];
export function consoleAfterFire(s){
 const pool=s.npcs.filter(n=>n.alive&&n.gender==='female'&&n.met&&n.talked&&n.bond>50),visitors=[];
 if(!pool.length)return visitors;
 const count=B.range(s,1,Math.min(3,pool.length));
 for(let i=0;i<count;i++){const n=pool.splice(B.range(s,0,pool.length-1),1)[0],silver=B.rand(s)<.5?B.range(s,10,50):0;
  const text=`${n.role} ${n.name} đến an ủi: “${femaleLine(s,n,B.pick(s,CONSOLATIONS))}”`+(silver?` Người ấy gửi nàng ${silver} bạc để sắm lại đồ dùng.`:' Người ấy ngồi bên nàng, lặng lẽ lắng nghe.');
  sisterNotice(s,'Bạn hữu đến thăm',text,n,silver);visitors.push({npc:n.id,silver});
 }
 return visitors;
}
export function validateSisterhood(s){
 migrateSisterhood(s);const int=(v,min,max)=>Number.isInteger(v)&&v>=min&&v<=max;
 if(!Array.isArray(s.p.sisterhoods)||s.p.sisterhoods.length>500||!int(s.p.lastSisterEventMonth,-1,s.p.months)||!s.p.sisterInviteCooldowns||typeof s.p.sisterInviteCooldowns!=='object')throw Error('Quan hệ tỷ muội không hợp lệ.');
 const active=new Set;
 for(const r of s.p.sisterhoods){if(!s.npcs.some(n=>n.id===r.npc&&n.gender==='female')||!['active','broken','departed'].includes(r.status)||!int(r.since,0,s.p.months)||r.status!=='active'&&!int(r.ended,r.since,s.p.months))throw Error('Lời thề kim lan không hợp lệ.');if(r.status==='active'){if(active.has(r.npc))throw Error('Tỷ muội bị lặp.');active.add(r.npc);}}
 if(active.size>2)throw Error('Chỉ có thể kết nghĩa với hai tỷ muội cùng lúc.');
 for(const [id,month]of Object.entries(s.p.sisterInviteCooldowns))if(!s.npcs.some(n=>n.id===id)||!int(month,0,s.p.months))throw Error('Thời điểm kết nghĩa không hợp lệ.');
 const q=s.sisterEvent;if(q&&(!s.p.alive||!s.npcs.some(n=>n.id===q.npc&&n.gender==='female')||q.month!==s.p.months||!({invite:['offer','temple','portrait'],betrayal:['offer','courtyard']}[q.kind]||[]).includes(q.phase)))throw Error('Sự kiện kim lan không hợp lệ.');
}
