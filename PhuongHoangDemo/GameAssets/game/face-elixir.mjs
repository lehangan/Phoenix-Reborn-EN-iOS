import {FACIAL_VARIANTS,MOUTH_VARIANTS,EYE_VARIANTS} from './facial-features.mjs';
import {VIP_FACES,randomVipFace} from './vip-faces.mjs';

// Only facial features change; the current hair, clothes and accessories remain.
export function randomizeFace(previous,random){
 const draw=count=>Math.floor(Math.max(0,Math.min(.999999999,Number(random())||0))*count);
 const next={...previous,face:draw(3),eyes:draw(EYE_VARIANTS),nose:draw(FACIAL_VARIANTS),mouth:draw(MOUTH_VARIANTS)};
 const vipFace=randomVipFace(random);
 if(vipFace!==null){
  next.vipFace=vipFace===previous.vipFace?(vipFace+1+draw(VIP_FACES.length-1))%VIP_FACES.length:vipFace;
 }else{
  delete next.vipFace;
  if(previous.vipFace==null&&['face','eyes','nose','mouth'].every(key=>next[key]===previous[key]))next.eyes=(next.eyes+1)%EYE_VARIANTS;
 }
 return next;
}
