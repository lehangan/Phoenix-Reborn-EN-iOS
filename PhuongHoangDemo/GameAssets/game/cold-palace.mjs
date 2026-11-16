import {sisterAid,sisterPlea} from './female-relationships.mjs';
import {equippedPet} from './pets.mjs';
import * as B from './life-engine.mjs';
import {itemById} from './inventory.mjs';
import {COLD_EVENTS} from './cold-palace-data.mjs';
export const coldPalaceMonths=s=>Math.max(0,(s.p.coldPalaceUntil??s.p.months)-s.p.months);
export const inColdPalace=s=>s.p.coldPalace?.kind==='life'||s.p.coldPalaceUntil!=null&&s.p.coldPalaceUntil>=s.p.months;
export function enforceColdOutfit(s){
 if(!inColdPalace(s))return;
 B.grant(s,'robe-0','Áo vải trong lãnh cung',false);
 s.p.appearance.robe='robe-0';s.p.appearance.ornament=null;
}
export function enterColdPalace(s,reason,{kind,months,cause='coldpalace',ignoreProtection=false,allowSisterPlea=true}={}){
 if(!s.p.alive||inColdPalace(s))return {error:'Án lãnh cung đã được ghi nhận.'};
 if(kind!==undefined&&!['temporary','life'].includes(kind)||months!==undefined&&(!Number.isInteger(months)||months<3||months>36))return {error:'Thời hạn lãnh cung không hợp lệ.'};
 const guardian=equippedPet(s);if(!ignoreProtection&&guardian?.perks.coldImmunity){const text=`${guardian.name} là linh thú ngự ban hộ chủ. Hoàng đế đặc miễn án lãnh cung lần này.`;s.result={title:'Linh thú hộ chủ',text,success:true,effects:{}};B.addLog(s,text,'pet');return {kind:'protected',months:0,confinedUntil:null,ended:false,protected:true,text};}
 const p=s.p,drawnType=kind??(B.rand(s)<.2?'life':'temporary'),awaitingBirth=drawnType==='life'&&!!p.pregnancy,type=awaitingBirth?'temporary':drawnType,duration=awaitingBirth?Math.max(3,Math.min(36,p.pregnancy.due-p.months)):(type==='temporary'?(months??B.range(s,3,36)):null);
 if(drawnType==='life'&&allowSisterPlea&&sisterPlea(s,reason))return {kind:'reprieved',months:p.prison,confinedUntil:null,ended:false,rescued:true,text:s.result.text};
 p.coldPalace={kind:type,since:p.months,months:duration,reason,restore:{robe:p.appearance.robe,ornament:p.appearance.ornament},decree:s.decree};
 p.coldPalaceUntil=duration===null?null:p.months+duration;p.prison=duration??999;
 s.fashion=null;s.story=s.event=s.exam=s.mini=s.decree=s.result=s.visit=null;
 s.tea=s.sisterEvent=null;sisterAid(s,'cold');
 enforceColdOutfit(s);
 const text=reason+(awaitingBirth?' Vì đang mang hoàng tự, nàng được hoãn án đến khi sinh. Sinh con bình an sẽ được đặc xá rời lãnh cung.':type==='life'?' Án lãnh cung cả đời được ban xuống. Cánh cửa khép lại, kết thúc kiếp này.':` Nàng bị đưa vào lãnh cung ${duration} tháng. Chỉ được mặc áo vải, tự sinh hoạt trong viện và mời y quan.`);
 if(type==='life'){B.die(s,cause,text);s.pendingTitle=null;}
 else{s.result={title:'Chiếu phạt · Lãnh cung',text,success:false,effects:{}};B.addLog(s,text,'cold');}
 return {kind:type,months:duration,confinedUntil:p.coldPalaceUntil,ended:!p.alive,text};
}
export function releaseColdPalace(s,reason='Hết thời hạn cấm túc',notify=true){
 const p=s.p,c=p.coldPalace;if(!p.alive||c?.kind==='life'||!c&&p.coldPalaceUntil==null)return false;
 if(c?.secretRefusal&&p.months<p.coldPalaceUntil)return false;
 const restore=c?.restore;
 p.coldPalace=null;p.coldPalaceUntil=null;p.prison=0;s.visit=null;
 if(restore){
  p.appearance.robe=p.inventory.includes(restore.robe)?restore.robe:'robe-0';
  p.appearance.ornament=p.inventory.includes(restore.ornament)?restore.ornament:null;
 }
 if(c?.coronation)s.coronation=c.coronation;B.enforceMaidJewelry(s);
 if(c?.decree)s.decree={...c.decree,title:B.rankLabel(p)};
 if(notify){const text=`${reason}. Nàng được phục chức ${B.rankLabel(p)}, trở lại cung viện và dùng lại trang phục đã cất giữ.`;s.result={title:'Lệnh cấm túc được gỡ bỏ',text,success:true,effects:{}};B.addLog(s,text,'cold');}
 return true;
}
export function validateColdPalace(s){
 const p=s.p,c=p.coldPalace,u=p.coldPalaceUntil;
 if(u!=null&&(!Number.isInteger(u)||u<p.months||u>p.months+36))throw Error('Thời hạn lãnh cung không hợp lệ.');
 if(c){
  if(!['temporary','life'].includes(c.kind)||!Number.isInteger(c.since)||c.since<0||c.since>p.months||typeof c.reason!=='string'||!c.restore||itemById(c.restore.robe)?.type!=='robe'||c.restore.ornament!=null&&itemById(c.restore.ornament)?.type!=='hair')throw Error('Dữ liệu lãnh cung không hợp lệ.');
  if(c.kind==='temporary'&&(!Number.isInteger(c.months)||c.months<1||c.months>36||u!==c.since+c.months)||c.kind==='life'&&(p.alive||u!==null||c.months!==null))throw Error('Án lãnh cung không hợp lệ.');
  if(c.decree&&(typeof c.decree.title!=='string'||typeof c.decree.reason!=='string'||!Number.isInteger(c.decree.month)||c.decree.month>p.months))throw Error('Chiếu chỉ lưu giữ không hợp lệ.');
 }
 if(s.event?.id.startsWith('cold-')&&(!p.alive||!inColdPalace(s)))throw Error('Biến cố lãnh cung không hợp lệ.');
}
export function migrateColdPalace(s){
 const p=s.p;
 if(p.coldPalaceUntil!=null&&p.alive){
  p.coldPalace??={kind:'temporary',since:p.months,months:coldPalaceMonths(s),reason:'Án cấm túc đang thi hành',restore:{robe:p.appearance.robe,ornament:p.appearance.ornament},decree:null};
  if(s.result?.title==='Tháng ngày trong lãnh cung')s.result=null;
  if(p.coldPalaceUntil<=p.months){releaseColdPalace(s,'Hết hạn cấm túc',false);return;}
  // Old saves can contain a queued childbirth decree; it must not unlock the map.
  if(s.decree){p.coldPalace.decree=s.decree;s.decree=null;}
  enforceColdOutfit(s);
 }
}
export function selectColdEvent(s){
 const emperor=s.npcs.find(n=>n.id==='emperor');
 const recall=!s.p.coldPalace?.secretRefusal&&emperor?.alive&&emperor.met&&emperor.talked&&s.p.role==='consort'? .01+Math.max(0,emperor.bond)*.0003:0;
 const draw=B.rand(s),tone=draw<recall?'recall':draw<recall+.06?'good':draw<recall+.14?'neutral':'bad';
 let pool=COLD_EVENTS.filter(e=>e.tone===tone&&!s.p.recent.slice(0,4).includes(e.id));
 if(!pool.length)pool=COLD_EVENTS.filter(e=>e.tone===tone);
 const e=B.pick(s,pool);s.p.recent.unshift(e.id);s.p.recent=s.p.recent.slice(0,7);
 s.event={id:e.id,month:s.p.months,roll:B.rand(s),outcomeRoll:B.rand(s),context:{}};
 B.addLog(s,`Lãnh cung · Tháng ${s.p.months}: ${e.title}.`,'month');return e;
}
