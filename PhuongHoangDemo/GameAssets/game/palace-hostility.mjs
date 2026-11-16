import {pick} from './life-engine.mjs';
import {socialStanding} from './monthly-side-events.mjs';

// Tiệp dư is the first rank that receives covert curses instead of public abuse.
export const CURSE_MIN_RANK=5;
export function hostilityKind(s){
 const p=s.p;
 if(!p.alive||p.outside||!['maid','candidate','consort'].includes(p.role))return null;
 return p.role==='consort'&&p.rank>=CURSE_MIN_RANK?'curse':'water';
}
export function hostilityCandidates(s){
 const kind=hostilityKind(s);if(!kind)return [];
 return s.npcs.filter(n=>n.alive&&n.gender==='female'&&n.bond<50&&(kind==='curse'||socialStanding(n)>socialStanding(s.p)));
}
export function drawPalaceHostility(s){
 const kind=hostilityKind(s),candidates=hostilityCandidates(s);
 if(!kind)return null;
 const npc=candidates.length?pick(s,candidates):null,name=npc?`${npc.role} ${npc.name}`:kind==='water'?'Một phi tần cấp cao':'Một nữ nhân trong hậu cung';
 return kind==='water'?{
  kind,npc,title:'Nước lạnh giữa sân',
  text:`${name} cố tình hắt nước lên nàng rồi lớn tiếng trách mắng. Sức khỏe −4, uy danh −3. Lần đầu gặp để lại thiện cảm xấu.`
 }:{
  kind,npc,title:'Hình nhân yểm bùa',
  text:`${name} lén dùng hình nhân yểm bùa hãm hại nàng. Hình nhân bị phát hiện khiến nàng bất an, lời đồn lan khắp nội đình. Sức khỏe −4, uy danh −3.`
 };
}
