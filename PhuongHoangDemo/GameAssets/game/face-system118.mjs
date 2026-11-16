import {randomVipFace,VIP_FACES} from './vip-faces.mjs';
export const FACE_SYSTEM_VERSION=118;
const parts=['face','eyes','nose','mouth','huadian','vipFace'];
const signature=a=>JSON.stringify(parts.map(k=>a[k]??null));
const isLook=a=>a&&typeof a==='object'&&['face','eyes','nose','mouth','front','back'].every(k=>Number.isInteger(a[k]));
// Independent, reproducible cosmetic RNG: loading the same life on another device
// produces the same face without consuming event/reward randomness.
function cosmeticRandom(key){
 let h=2166136261;for(const c of key){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}
 return ()=>{h+=0x6d2b79f5;let t=h;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};
}
function legacyLook(a){
 if(a.faceSystemVersion===FACE_SYSTEM_VERSION)return;
 const random=cosmeticRandom('legacy:'+signature(a));
 for(const [part,start] of [['eyes',21],['nose',11],['mouth',14]]){
  a[part]=a[part]>=start&&a[part]<start+10?a[part]-start:Math.floor(random()*VIP_FACES.length);
 }
 a.faceSystemVersion=FACE_SYSTEM_VERSION;
}
function copyFace(from,to){for(const k of parts){if(from[k]==null)delete to[k];else to[k]=from[k];}to.faceSystemVersion=FACE_SYSTEM_VERSION;}
export function migrateFaceSystem(s){
 if(s.faceSystemVersion===FACE_SYSTEM_VERSION)return false;
 const player=s.p.appearance,old=signature(player),reroll=s.p.alive&&player.faceSystemVersion!==FACE_SYSTEM_VERSION;
 if(reroll){
  const random=cosmeticRandom(JSON.stringify(['faces-118',s.p.name,s.p.family,s.legacy.lives,old]));
  player.face=Math.floor(random()*3);
  for(const key of ['eyes','nose','mouth'])player[key]=Math.floor(random()*VIP_FACES.length);
  player.huadian=Math.floor(random()*10);
  const vip=randomVipFace(random);
  if(vip===null)delete player.vipFace;else player.vipFace=vip;
  if(signature(player)===old){if(vip===null)player.eyes=(player.eyes+1)%VIP_FACES.length;else player.vipFace=(vip+1)%VIP_FACES.length;}
  player.faceSystemVersion=FACE_SYSTEM_VERSION;
 }
 // Active scene portraits follow the current player. Historical lives and NPCs
 // retain complete VIP faces and map extracted old VIP feature IDs correctly.
 const visit=(value,active=true)=>{
  if(!value||typeof value!=='object')return;
  if(isLook(value)){
   if(value!==player&&active&&reroll&&value.faceSystemVersion!==FACE_SYSTEM_VERSION&&signature(value)===old)copyFace(player,value);
   else legacyLook(value);
   return;
  }
  for(const [key,item] of Object.entries(value))visit(item,active&&!['legacy','npcs'].includes(key));
 };
 visit(s);
 s.faceSystemVersion=FACE_SYSTEM_VERSION;
 if(reroll)s.notices.push({title:'Cập nhật hệ thống gương mặt',text:'Nàng đã nhận một dung mạo ngẫu nhiên mới. Tiến trình và trang phục được giữ nguyên.'});
 return true;
}
