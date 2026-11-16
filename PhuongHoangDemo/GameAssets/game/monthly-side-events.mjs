import {princeDateProtected} from './imperial-secret.mjs';
import {queuePalaceIncidents,resolvePalaceIncident} from './palace-incidents.mjs';
import * as B from './life-engine.mjs';
import {itemById} from './inventory.mjs';
import {inColdPalace,enterColdPalace} from './cold-palace.mjs';
import {IMPERIAL_NOBLE_CONSORT_RANK} from './life-data.mjs';
export const SIDE_CHANCES={walk:.10,gift:.0175,bully:.07};
const maleIds=['prince','chancellor','general','physician'];
const free=s=>s.p.alive&&!s.intro&&!s.p.outside&&!s.p.prison&&!inColdPalace(s);
export const robberyProtected=s=>s.p.role==='consort'&&s.p.rank>=IMPERIAL_NOBLE_CONSORT_RANK;
export function migrateSideEvents(s){
 s.sideEvents??=[];s.dateScene??=null;s.p.lastSideEventMonth??=-1;s.p.collectionRevision??=0;s.p.confiscatedItems??=[];
 if(robberyProtected(s))s.sideEvents=s.sideEvents.filter(q=>q.kind!=='bully');
}
export const socialStanding=p=>p.roleClass==='consort'?200+p.courtRank:p.roleClass==='candidate'||p.role==='candidate'?100:p.role==='consort'?200+p.rank:p.serviceRank||0;
export const bullyCandidates=s=>robberyProtected(s)?[]:s.npcs.filter(n=>n.gender==='female'&&n.alive&&n.bond<50&&socialStanding(n)>socialStanding(s.p));
export const unequippedItems=s=>s.p.inventory.filter(id=>id!=='robe-0'&&![s.p.appearance.robe,s.p.appearance.ornament,s.p.pet].includes(id)&&itemById(id));
const sentence=s=>B.rand(s)<.2?{kind:'life'}:{kind:'temporary',months:B.range(s,3,36)};
export function queueMonthlySideEvents(s){
 migrateSideEvents(s);if(s.p.lastSideEventMonth===s.p.months)return false;s.p.lastSideEventMonth=s.p.months;
 if(!free(s)||s.sideEvents.length)return false;
 const men=s.npcs.filter(n=>maleIds.includes(n.id)&&n.alive&&n.met),before=s.sideEvents.length;
 if(men.length&&B.rand(s)<SIDE_CHANCES.walk){const n=B.pick(s,men);s.sideEvents.push({kind:'walk',npc:n.id,month:s.p.months,exposed:B.rand(s)<.30&&!princeDateProtected(s,n.id),sentence:sentence(s)});}
 if(men.length&&B.rand(s)<SIDE_CHANCES.gift){const n=B.pick(s,men);s.sideEvents.push({kind:'gift',npc:n.id,month:s.p.months,gift:B.pick(s,['silk','silk','jade','cage']),bondGain:B.range(s,1,4)});}
 const bullies=bullyCandidates(s);if(B.rand(s)<SIDE_CHANCES.bully&&!robberyProtected(s)){const n=bullies.length?B.pick(s,bullies):null,items=unequippedItems(s),item=items.length&&B.rand(s)<.5?B.pick(s,items):null;s.sideEvents.push({kind:'bully',npc:n?.id??null,month:s.p.months,item,silver:B.range(s,15,45),envy:B.range(s,5,10)});}
 queuePalaceIncidents(s);
 return s.sideEvents.length>before;
}
export function pendingSideEvent(s){migrateSideEvents(s);if(!free(s)){s.sideEvents=[];return null;}const q=s.sideEvents[0];if(q?.kind==='bully'&&q.npc&&!bullyCandidates(s).some(n=>n.id===q.npc)){const pool=bullyCandidates(s);q.npc=pool.length?B.pick(s,pool).id:null;}return q||null;}
export function sideEventReady(s,allowNotices=false){return free(s)&&!s.tea&&!s.adoptionChoice&&!s.dateScene&&!s.event&&!s.story&&!s.result&&!s.exam&&!s.mini&&!s.decree&&!s.coronation&&!s.fashion&&!s.festival&&!s.lake&&!s.guqin&&!s.caro&&(allowNotices||!s.notices.length);}
export function canYieldDemand(s,q){return !robberyProtected(s)&&q?.kind==='bully'&&(q.item?unequippedItems(s).includes(q.item):s.p.silver>=q.silver);}
export function resolveSideEvent(s,choice){
 return resolveSideChoice(s,choice,false);
}
export function finishDateScene(s){
 const g=s.dateScene,q=s.sideEvents?.[0];
 if(!g||q?.kind!=='walk'||q.npc!==g.npc||q.month!==g.month)return {error:'Không có buổi hẹn đang chờ.'};
 s.dateScene=null;
 const r=resolveSideChoice(s,'accept',true);
 if(r?.error)s.dateScene=g;
 return r;
}
function resolveSideChoice(s,choice,afterScene){
 migrateSideEvents(s);const q=pendingSideEvent(s);if(!q||!sideEventReady(s,afterScene))return {error:'Hãy hoàn thành việc trong tháng trước.'};
 if(!({walk:['accept','decline'],gift:['receive'],bully:['give','refuse'],disfigurement:['continue'],fire:['continue']}[q.kind]||[]).includes(choice))return {error:'Không có lựa chọn này.'};
 if(['disfigurement','fire'].includes(q.kind)){s.sideEvents.shift();return resolvePalaceIncident(s,q);}
 const n=s.npcs.find(n=>n.id===q.npc&&n.alive);if(!n&&q.kind!=='bully'){s.sideEvents.shift();return {ok:true,unavailable:true};}
 if(q.kind==='walk'&&choice==='accept'&&!afterScene){s.dateScene={npc:q.npc,month:q.month};return {ok:true,scene:true};}
 if(q.kind==='bully'&&choice==='give'&&!canYieldDemand(s,q))return {error:'Món đồ đang được sử dụng, đã không còn trong túi hoặc nàng không đủ bạc.'};
 s.sideEvents.shift();if(n)n.met=n.talked=true;const before=n?.bond??0,bullyName=n?`${n.role} ${n.name}`:'một vị phi tần phẩm cấp cao';let text,title,success=true,effects={};
 if(q.kind==='walk'){
  title=choice==='accept'?'Một cuộc dạo chơi':'Khước từ lời hẹn';n.bond=B.clamp(n.bond+(choice==='accept'?10:-5),-100,100);
  if(choice==='decline')text=`Nàng từ chối lời mời của ${n.name}. Người ấy lặng lẽ cáo lui.`;
  else{
   s.p.supplies.cage=Math.min(9999,s.p.supplies.cage+1);text=`Nàng cùng ${n.name} dạo qua vườn vắng, trò chuyện bên hàng liễu. Người ấy tặng nàng một lồng thú kỳ duyên. Thiện cảm +${n.bond-before}.`;
   if(q.exposed&&!princeDateProtected(s,n.id)){
    const reason=text+' Chuyện bị người trong cung tố giác tới hoàng đế.';
    if(s.p.role==='maid'){
     const silver=s.p.silver;s.p.silver=0;effects.silver=silver?-silver:0;
     title='Lời nhắc nhở trong cung';success=false;
     text=reason+` Nữ quan nhắc nhở nàng giữ phép tắc và phạt toàn bộ ${silver} bạc đang có. Nàng được trở về tiếp tục công việc trong cung.`;
    }else{
     B.addLog(s,reason,'encounter');const emperor=s.npcs.find(n=>n.id==='emperor'&&n.alive);
     if(emperor&&emperor.bond<50){B.die(s,'punishment',reason+' Hoàng đế nổi giận, ban chiếu xử tử.');if(s.p.death)s.p.death.npc=n.id;else if(s.result)s.result.npc=n.id;}
     else{enterColdPalace(s,reason,q.sentence);if(s.p.death)s.p.death.npc=n.id;else if(s.result)s.result.npc=n.id;}
     s.sideEvents=[];return {ok:true,exposed:true,death:!s.p.alive};
    }
   }
  }
 }else if(q.kind==='gift'){
  title='Món quà gửi tới viện';n.bond=B.clamp(n.bond+(q.bondGain??B.range(s,1,4)),-100,100);if(q.gift==='cage'){s.p.supplies.cage=Math.min(9999,s.p.supplies.cage+1);text=`${n.name} sai người mang tới một lồng thú kỳ duyên, gửi lời chúc nàng bình an.`;}
  else{B.giveChest(s,q.gift,`Quà của ${n.name}`);text=`${n.name} gửi tặng nàng một ${q.gift==='jade'?'rương ngọc':'rương gấm'}, kèm đôi lời hỏi thăm.`;}
  text+=` Thiện cảm +${n.bond-before}.`;
 }else{
  title=choice==='give'?'Nhẫn nhịn cho qua':'Không chịu khuất phục';
  if(choice==='give'){
   if(q.item){s.p.inventory=s.p.inventory.filter(id=>id!==q.item);s.legacy.collection=s.legacy.collection.filter(id=>id!==q.item);s.p.confiscatedItems=[...new Set([...s.p.confiscatedItems,q.item])];s.p.collectionRevision++;text=`${bullyName} lấy đi ${itemById(q.item).name}. Món đồ đã rời túi và không còn được tính trong bộ sưu tầm của kiếp này.`;}
   else{s.p.silver-=q.silver;effects.silver=-q.silver;text=`Nàng đưa ${q.silver} bạc cho ${bullyName}, tạm tránh một trận gây khó dễ.`;}
  }else{effects={envy:q.envy,health:-5,reputation:-4,speech:-2};B.apply(s,effects);if(n)n.rivalry=B.clamp(n.rivalry+10);success=false;text=`Nàng không chịu giao nộp. ${bullyName} làm nhục nàng trước mặt cung nhân rồi buông lời đe dọa. Đố kỵ +${q.envy}.`;}
 }
 s.result={title,text,dialogue:text,npc:n?.id??null,success,effects,bondBefore:before,bondAfter:n?.bond??0,bondGain:(n?.bond??0)-before,sideEvent:true};B.addLog(s,text,success?'encounter':'setback');if(s.p.health<=0)B.die(s,'illness','Sức khỏe nàng suy kiệt sau những ngày bị chèn ép.');return {ok:true};
}
export function validateSideEvents(s){
 migrateSideEvents(s);const int=(x,a,b)=>Number.isInteger(x)&&x>=a&&x<=b;
 if(!Array.isArray(s.sideEvents)||s.sideEvents.length>5||!int(s.p.lastSideEventMonth,-1,s.p.months)||!int(s.p.collectionRevision,0,1e9)||!Array.isArray(s.p.confiscatedItems)||new Set(s.p.confiscatedItems).size!==s.p.confiscatedItems.length||s.p.confiscatedItems.some(id=>!itemById(id)))throw Error('Biến cố bên lề không hợp lệ.');
 if(s.dateScene){const g=s.dateScene,q=s.sideEvents[0];if(!free(s)||q?.kind!=='walk'||!maleIds.includes(g.npc)||g.npc!==q.npc||g.month!==q.month||g.month!==s.p.months||s.result||s.exam||s.event||s.story)throw Error('Buổi hẹn không hợp lệ.');}
 for(const q of s.sideEvents){if(!['walk','gift','bully','disfigurement','fire'].includes(q.kind)||!['fire','bully'].includes(q.kind)&&!s.npcs.some(n=>n.id===q.npc)||q.month!==s.p.months)throw Error('Người hẹn gặp không hợp lệ.');
  if(q.kind==='fire'&&(!Array.isArray(q.items)||q.items.length>3||new Set(q.items).size!==q.items.length||q.items.some(id=>!['robe','hair'].includes(itemById(id)?.type)||['robe-0','robe-1','robe-2','robe-3'].includes(id))))throw Error('Vật phẩm trong hỏa hoạn không hợp lệ.');
  if(q.kind==='disfigurement'&&!s.npcs.some(n=>n.id===q.npc&&n.gender==='female'&&n.roleClass==='consort'))throw Error('Người hãm hại không hợp lệ.');
  if(['walk','gift'].includes(q.kind)&&!s.npcs.some(n=>n.id===q.npc&&n.gender==='male'&&n.met))throw Error('Chưa từng gặp người hẹn.');
  if(q.kind==='bully'&&q.npc!==null&&!s.npcs.some(n=>n.id===q.npc&&n.gender==='female'))throw Error('Người gây khó dễ không hợp lệ.');
  if(q.kind==='walk'&&(!maleIds.includes(q.npc)||typeof q.exposed!=='boolean'||!q.sentence||!['temporary','life'].includes(q.sentence.kind)||q.sentence.kind==='temporary'&&!int(q.sentence.months,3,36)))throw Error('Lời hẹn dạo chơi không hợp lệ.');
  if(q.kind==='gift'&&(!maleIds.includes(q.npc)||!['silk','jade','cage'].includes(q.gift)||q.bondGain!==undefined&&!int(q.bondGain,1,4)))throw Error('Quà tặng không hợp lệ.');
  if(q.kind==='bully'&&(!int(q.silver,15,45)||!int(q.envy,5,10)||q.item!==null&&!itemById(q.item)))throw Error('Yêu sách không hợp lệ.');
 }
}
