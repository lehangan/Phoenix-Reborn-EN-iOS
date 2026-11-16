import {childAptitude} from './child-aptitudes.mjs';

export const CHILD_TITLE_AGE_MONTHS=72;
// One investiture draw at six years. A regular prince remains the most likely result.
export const PRINCE_TITLE_ODDS=Object.freeze({
 ordinary:{prince:.89,royal:.09,crown:.02},
 promising:{prince:.84,royal:.13,crown:.03},
 outstanding:{prince:.78,royal:.18,crown:.04},
 exceptional:{prince:.70,royal:.24,crown:.06},
 genius:{prince:.60,royal:.32,crown:.08}
});
export const PRINCE_HONORIFICS=Object.freeze('An Bình Cảnh Chiêu Dự Duệ Duy Định Đức Hàm Hằng Hiền Hiển Hoài Hòa Hoằng Hưng Khang Khánh Khiêm Kiến Lâm Lễ Liêm Lương Minh Mục Nghi Ninh Phúc Quảng Quang Sùng Thái Thành Thiệu Thịnh Thuận Tĩnh Trạch Triệu Túc Tuyên Uy Vinh Vĩnh Vũ Ý'.split(' '));
export const PRINCESS_HONORIFICS=Object.freeze(['An','Trường','Chiêu','Hoài','Vĩnh','Đoan','Phúc','Nhạc','Thanh','Thuận','Gia','Ngọc'].flatMap(a=>['Ninh','An','Hòa','Lạc','Nghi','Khang','Bình','Hoa','Dung'].filter(b=>a!==b).map(b=>a+' '+b)));

export function princeTitleFromRoll(child,roll,heirOccupied=false){
 const odds=PRINCE_TITLE_ODDS[childAptitude(child).id];
 if(!heirOccupied&&roll<odds.crown)return 'Thái tử';
 if(roll>=odds.crown&&roll<odds.crown+odds.royal)return 'Thân vương';
 return 'Vương gia';
}
export function childTitleLabel(child){
 if(child.royal===false)return child.gender==='Hoàng tử'?'Công tử':'Tiểu thư';
 const name=child.titleHonorific;
 if(child.title==='Vương gia')return name?`${name} Vương`:'Vương gia';
 if(child.title==='Thân vương')return name?`${name} Thân Vương`:'Thân Vương';
 if(child.gender==='Công chúa'&&name)return `${name} Công chúa`;
 return child.title||child.gender;
}
export function availableChildHonorifics(children,child){
 const pool=child.gender==='Hoàng tử'?PRINCE_HONORIFICS:PRINCESS_HONORIFICS;
 const used=new Set(children.filter(c=>c!==child&&c.gender===child.gender&&c.alive!==false).map(c=>c.titleHonorific));
 const free=pool.filter(n=>!used.has(n));return free.length?free:pool;
}
export function validChildHonorific(child){
 if(child.titleHonorific==null)return true;
 const pool=child.gender==='Hoàng tử'?PRINCE_HONORIFICS:PRINCESS_HONORIFICS;
 return pool.includes(child.titleHonorific)&&(child.gender==='Công chúa'||['Vương gia','Thân vương','Thái tử','Hoàng đế'].includes(child.title));
}
