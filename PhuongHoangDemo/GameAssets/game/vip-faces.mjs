import {NEW_VIP_FACES} from './vip-release111.mjs';
// Complete AI face and makeup sprites. Hair, clothing and jewelry stay independent.
export const VIP_FACE_COST=5;
export const VIP_FACE_CHANCE=.24;
export const VIP_FACES=Object.freeze([...['Tuyết Phượng','Bích Liên','Đào Yêu','Hoa Thần','Thanh Ngọc','Hồ Ly','Tử Hà','Nguyệt Châu','Hồng Mai','Hoàng Kim'].map((name,id)=>Object.freeze({id,name,src:`assets/v68/vip/face-${id}.webp`,w:600,h:933})),...NEW_VIP_FACES.map(f=>Object.freeze(f))]);
export const vipFaceById=id=>Number.isInteger(id)?VIP_FACES.find(f=>f.id===id):undefined;
export const validVipFace=id=>id==null||!!vipFaceById(id);
export function randomVipFace(random){
 const roll=Number(random());
 return Number.isFinite(roll)&&roll>=0&&roll<VIP_FACE_CHANCE?Math.min(VIP_FACES.length-1,Math.floor(roll/VIP_FACE_CHANCE*VIP_FACES.length)):null;
}
// Derive a cosmetic draw without advancing the life's event or reward RNG.
export function vipFaceForSeed(seed){
 let h=(seed^0x56495046)>>>0;
 h=Math.imul(h^(h>>>16),0x21f0aaad);
 h=Math.imul(h^(h>>>15),0x735a2d97);
 return randomVipFace(()=>((h^(h>>>15))>>>0)/4294967296);
}
