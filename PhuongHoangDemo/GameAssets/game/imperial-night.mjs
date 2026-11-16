import {princeAgreement,amnesiaNightBlocked} from './imperial-secret.mjs';
import {fashionRewardReady,fashionNightEligible,fashionWinner} from './fashion-festival.mjs';
import {rejectDisfiguredNight,DISFIGURED_REJECTION} from './disfigurement.mjs';
import {age,addLog} from './life-engine.mjs';
import {itemById} from './inventory.mjs';
import {inColdPalace} from './cold-palace.mjs';
import {lakeRewardReady,lakeNightEligible} from './imperial-lake.mjs';

export const nightOutfits=(s,type='robe')=>s.p.inventory.map(itemById).filter(i=>i?.type===type);
export function nightEligible(s,source){
 const p=s.p,e=s.npcs.find(n=>n.id==='emperor');
 if(amnesiaNightBlocked(s))return false;
 if(source==='prince-first')return princeAgreement(s)&&s.imperialSecret.nights===0&&p.alive&&p.ageMonths>=216&&!p.pregnancy&&!p.prison&&!p.outside&&e?.alive;
 if(source==='fashion')return fashionNightEligible(s)&&fashionWinner(s)?.id==='player'&&['winner','night'].includes(s.fashion?.phase)&&e?.met&&e?.talked;
 return p.alive&&!s.intro&&!p.outside&&age(p)>=18&&!p.pregnancy&&!p.prison&&!inColdPalace(s)&&e?.alive&&e.met&&e.talked&&p.lastImperialVisit!==p.months&&
  (source==='lake'?lakeRewardReady(s)&&lakeNightEligible(s):source==='summons'&&['maid','consort'].includes(p.role));
}
export function beginImperialNight(s,source='summons'){
 if(s.imperialNight||!nightEligible(s,source)||source==='summons'&&s.story?.kind!=='imperial'||s.exam||s.mini||s.guqin||s.caro||s.coronation||s.festival||s.fashion&&source!=='fashion'&&s.fashion.phase!=='invite')return {error:'Chưa có buổi thị tẩm đang chờ.'};
 if(source==='fashion'&&!fashionRewardReady(s))return {error:'Chưa có lời mời hoa khôi.'};
 const proxy=source==='prince-first'||source==='summons'&&princeAgreement(s);
 const rejected=proxy?null:rejectDisfiguredNight(s);if(rejected){addLog(s,DISFIGURED_REJECTION,'setback');return rejected;}
 const look=source==='fashion'?s.fashion.playerLook:source==='lake'?s.lake.playerLook:s.p.appearance;
 s.imperialNight={version:1,month:s.p.months,emperor:source==='prince-first'||source==='summons'&&princeAgreement(s)?'prince':'emperor',source,phase:source==='fashion'?'scene':'dress',wardrobeType:'robe',robe:look.robe,ornament:look.ornament??null};
 if(source==='fashion')s.fashion.phase='night';
 s.story=s.event=s.result=null;
 return {ok:true};
}
export function nightWardrobeTab(s,type){if(s.imperialNight?.phase!=='dress'||!['robe','hair'].includes(type))return {error:'Chưa mở phòng thay đồ.'};s.imperialNight.wardrobeType=type;return {ok:true};}
export function chooseNightOutfit(s,type,id){
 const g=s.imperialNight;
 if(g?.phase!=='dress'||!['robe','hair'].includes(type)||!(type==='hair'&&id===null)&&!nightOutfits(s,type).some(i=>i.id===id))return {error:'Hãy chọn đồ trong tủ của nàng.'};
 g[type==='robe'?'robe':'ornament']=id;return {ok:true};
}
export function enterImperialNight(s){
 const g=s.imperialNight;
 if(g?.phase!=='dress'||!nightEligible(s,g.source)||!nightOutfits(s).some(i=>i.id===g.robe)||g.ornament!==null&&!nightOutfits(s,'hair').some(i=>i.id===g.ornament))return {error:'Y phục thị tẩm chưa hợp lệ.'};
 g.phase='scene';return {ok:true};
}
export function validateImperialNight(s){
 s.imperialNight??=null;const g=s.imperialNight;if(!g)return;
 const validOutfit=g.source==='fashion'?s.fashion?.phase==='night'&&g.phase==='scene'&&g.robe===s.fashion.playerLook?.robe&&g.ornament===s.fashion.playerLook?.ornament:nightOutfits(s).some(i=>i.id===g.robe)&&(g.ornament===null||nightOutfits(s,'hair').some(i=>i.id===g.ornament));
 if(g.version!==1||!Number.isInteger(g.month)||g.month!==s.p.months||g.emperor!==(g.source==='prince-first'||g.source==='summons'&&princeAgreement(s)?'prince':'emperor')||!nightEligible(s,g.source)||!['dress','scene'].includes(g.phase)||!['robe','hair'].includes(g.wardrobeType)||
  !validOutfit||
  s.story||s.event||s.result||s.exam||s.mini||s.guqin||s.caro||s.festival||s.coronation||g.source==='summons'&&s.lake)throw Error('Buổi thị tẩm không hợp lệ.');
}
