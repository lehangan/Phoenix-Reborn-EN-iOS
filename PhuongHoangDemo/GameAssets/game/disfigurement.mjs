// The saved injury owns the beauty lock; the appearance flag only draws the scars.
export const isDisfigured=s=>!!s.p.disfigurement;
export const DISFIGURED_REJECTION='hoàng đế chợt nhớ ra ngươi đã bị hủy dung, gương mặt gớm ghiếc, liền đuổi về';
export function disfigure(s,npc){
 if(isDisfigured(s))return false;
 s.p.disfigurement={beauty:s.p.stats.beauty,month:s.p.months,npc};
 s.p.stats.beauty=0;s.p.appearance.disfigured=true;return true;
}
export function cureDisfigurement(s){
 if(!isDisfigured(s))return false;
 s.p.stats.beauty=s.p.disfigurement.beauty;s.p.disfigurement=null;
 delete s.p.appearance.disfigured;return true;
}
export function validateDisfigurement(s){
 const d=s.p.disfigurement;
 if(d!=null&&(typeof d!=='object'||!Number.isFinite(d.beauty)||d.beauty<0||d.beauty>100||!Number.isInteger(d.month)||d.month<0||d.month>s.p.months||typeof d.npc!=='string'||!s.npcs.some(n=>n.id===d.npc)))throw Error('Tình trạng dung mạo không hợp lệ.');
 if(d){s.p.stats.beauty=0;s.p.appearance.disfigured=true;}
 else delete s.p.appearance.disfigured;
}
export function rejectDisfiguredNight(s){
 if(!isDisfigured(s))return false;
 s.p.lastImperialVisit=s.p.months;s.p.cooldowns.imperial=s.p.months;
 if(s.imperialNight?.source==='fashion'||s.fashion?.phase==='winner')s.fashion=null;
 s.story=s.event=s.imperialNight=s.lake=null;
 s.result={title:'Bị đuổi khỏi tẩm điện',text:DISFIGURED_REJECTION,dialogue:DISFIGURED_REJECTION,npc:'emperor',success:false,effects:{},theme:'imperial'};
 return {ok:true,rejected:true,pregnant:false};
}
