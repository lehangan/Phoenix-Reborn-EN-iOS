export const TEA_DURATION=30000;
export const TEA_STUN=3000;
export const TEA_FALL_SPEED=1.2;
export const TEA_BAD_FALL_SPEED=1.2;
// Increase the previous 26.8% good-drop rate by 10% relative, to 29.48%.
const GOOD_DROP_WEIGHT=26.8*1.1;
const BAD_DROP_WEIGHT=100-GOOD_DROP_WEIGHT;
export const BOWL_HALF=10;
export const CATCH_LINE=84;
export const TEA_DROPS=Object.freeze({
 // Preserve the mix within each group; all weights still total 100.
 leaf:{name:'Lá trà non',points:4,weight:44*GOOD_DROP_WEIGHT/76},
 flower:{name:'Hoa cúc',points:6,weight:20*GOOD_DROP_WEIGHT/76},
 berry:{name:'Kỷ tử',points:5,weight:12*GOOD_DROP_WEIGHT/76},
 spoiled:{name:'Lá trà hỏng',points:-8,weight:BAD_DROP_WEIGHT*2/3},
 thorn:{name:'Quả gai',points:0,weight:BAD_DROP_WEIGHT/3,stun:true}
});
export const isBadTeaDrop=type=>type==='spoiled'||type==='thorn';
const fallPace=(version,type)=>(version===1?1:TEA_FALL_SPEED)*(version>=3&&isBadTeaDrop(type)?TEA_BAD_FALL_SPEED:1);
export const teaQuality=score=>score>=88?3:score>=65?2:score>=35?1:0;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function random(t){t.rng=(Math.imul(t.rng,1664525)+1013904223)>>>0;return t.rng/4294967296;}
export function createTeaCatch(month,seed){return {mode:'catch',version:5,month,phase:'ready',rng:seed>>>0,elapsed:0,nextSpawn:250,serial:0,bowl:50,target:50,stunUntil:0,score:0,goodPointProgress:0,goodDropsStopped:false,goodDropWeight:GOOD_DROP_WEIGHT,totalGoodPoints:goodPointBudget(seed),good:0,bad:0,shocks:0,missed:0,items:[],feedback:null};}
export function aimTeaBowl(t,x){if(t.phase==='playing'&&Number.isFinite(x)&&t.elapsed>=t.stunUntil)t.target=clamp(x,BOWL_HALF,100-BOWL_HALF);}
function nextDrop(t,at){
 let roll=random(t)*100,type='leaf';for(const [key,v]of Object.entries(TEA_DROPS)){
  // A saved normalized round keeps its original mix if later releases rebalance it.
  const weight=t.version>=4?(isBadTeaDrop(key)?(100-t.goodDropWeight)*(key==='spoiled'?2/3:1/3):t.goodDropWeight*({leaf:44,flower:20,berry:12}[key])/76):v.weight;
  roll-=weight;if(roll<0){type=key;break;}
 }
 const item={id:++t.serial,type,x:6+random(t)*88,y:-5,speed:(24+random(t)*15+at/TEA_DURATION*13)*fallPace(t.version,type),tilt:Math.round(random(t)*70-35)};
 t.nextSpawn+=620+random(t)*220-at/TEA_DURATION*260;return item;
}
function goodPointBudget(seed){
 // Preview the same deterministic wave without advancing the live random stream.
 // Very late drops that cannot reach the bowl before the bell are not scoreable.
 const wave={rng:seed>>>0,version:4,goodDropWeight:GOOD_DROP_WEIGHT,nextSpawn:250,serial:0};let total=0;
 while(wave.nextSpawn<TEA_DURATION-1800){const at=wave.nextSpawn,item=nextDrop(wave,at),points=TEA_DROPS[item.type].points;if(points>0&&at+(CATCH_LINE+5)/item.speed*1000<=TEA_DURATION)total+=points;}
 return total;
}
export function teaDropPoints(t,type){
 const points=TEA_DROPS[type].points;
 if(t.version<4||points<=0)return points;
 if(!t.totalGoodPoints)return 0;
 // Apportion rounding across catches, so all awards are integers and a full
 // wave still adds up to exactly 100 rather than accumulating rounding error.
 if(t.version>=5)return Math.round(100*(t.goodPointProgress+points)/t.totalGoodPoints)-Math.round(100*t.goodPointProgress/t.totalGoodPoints);
 return 100*points/t.totalGoodPoints;
}
export const teaPointLabel=points=>Math.round(points).toLocaleString('en-US');
export function teaNextAward(t,type){
 const points=teaDropPoints(t,type);
 return t.version===4?Math.round(clamp(t.scoreRaw+points,0,100))-t.score:clamp(t.score+points,0,100)-t.score;
}
function stopGoodDrops(t){if(t.score>=100)t.goodDropsStopped=true;if(t.goodDropsStopped)t.items=t.items.filter(i=>isBadTeaDrop(i.type));}
function spawn(t,stepStart){
 const at=t.version>=4?t.nextSpawn:t.elapsed,item=nextDrop(t,at);
 // Consume the normal slot and RNG even when skipping a good drop. Never
 // replace it with a hazard or alter the hazard schedule after reaching 100.
 if(t.goodDropsStopped&&!isBadTeaDrop(item.type))return;
 // Account for the fraction of this frame before the drop was born. This keeps
 // its arrival time, and the 100-point budget, independent of frame rate.
 if(t.version>=4)item.y-=item.speed*(at-stepStart)/1000;
 t.items.push(item);
}
function catchItem(t,item){
 const kind=TEA_DROPS[item.type];
 if(kind.stun){t.shocks++;t.stunUntil=t.elapsed+TEA_STUN;t.target=t.bowl;}
 else if(kind.points<0)t.bad++;else t.good++;
 const points=teaDropPoints(t,item.type),before=t.score;
 if(t.version===4){t.scoreRaw=clamp(t.scoreRaw+points,0,100);t.score=Math.round(t.scoreRaw);}else t.score=clamp(t.score+points,0,100);
 if(t.version>=5&&kind.points>0)t.goodPointProgress+=kind.points;
 if(t.score>=100)t.goodDropsStopped=true;
 const awarded=t.score-before;
 t.feedback={kind:item.type,text:kind.stun?'Choáng 3 giây':`${awarded>0?'+':''}${teaPointLabel(awarded)} điểm`,until:t.elapsed+850};
}
// Fixed steps prevent fast ingredients from crossing the bowl between frames.
// The caller supplies visible play time only; closing/hiding the game pauses it.
export function advanceTeaCatch(t,delta){
 if(t.phase!=='playing'||!Number.isFinite(delta)||delta<=0)return;
 stopGoodDrops(t);
 let remaining=Math.min(delta,TEA_DURATION-t.elapsed);
 while(remaining>0){
  const dt=Math.min(20,remaining),stepStart=t.elapsed;remaining-=dt;t.elapsed=Math.min(TEA_DURATION,t.elapsed+dt);
  if(t.elapsed>=t.stunUntil){const diff=t.target-t.bowl;t.bowl+=Math.sign(diff)*Math.min(Math.abs(diff),dt*.105);}
  while(t.elapsed>=t.nextSpawn&&t.nextSpawn<TEA_DURATION-1800)spawn(t,stepStart);
  t.items=t.items.filter(item=>{
   if(t.goodDropsStopped&&!isBadTeaDrop(item.type))return false;
   const before=item.y;item.y+=item.speed*dt/1000;
   if(before<CATCH_LINE&&item.y>=CATCH_LINE&&Math.abs(item.x-t.bowl)<=BOWL_HALF+1.4){catchItem(t,item);return false;}
   if(item.y>108){if(TEA_DROPS[item.type].points>0)t.missed++;return false;}return true;
  });
  // Also remove good items visited earlier in this frame's filter pass.
  stopGoodDrops(t);
 }
 if(t.elapsed>=TEA_DURATION){t.elapsed=TEA_DURATION;t.phase='review';t.items=[];t.feedback=null;}
}
export function validTeaCatch(t){
 const num=(v,a,b)=>Number.isFinite(v)&&v>=a&&v<=b,int=(v,a,b)=>Number.isInteger(v)&&num(v,a,b);
 if(!t||t.mode!=='catch'||![1,2,3,4,5].includes(t.version)||!['ready','playing','review'].includes(t.phase)||!int(t.rng,0,4294967295)||!num(t.elapsed,0,TEA_DURATION)||!num(t.nextSpawn,0,TEA_DURATION+1000)||!int(t.serial,0,100)||!num(t.bowl,10,90)||!num(t.target,10,90)||!num(t.stunUntil,0,TEA_DURATION+TEA_STUN)||!int(t.score,0,100)||!['good','bad','shocks','missed'].every(k=>int(t[k],0,100))||!Array.isArray(t.items)||t.items.length>20)return false;
 if(t.version>=4&&(!num(t.goodDropWeight,0,100)||!int(t.totalGoodPoints,0,600)))return false;
 if(t.version===4&&(!num(t.scoreRaw,0,100)||t.score!==Math.round(t.scoreRaw)||t.phase==='ready'&&t.scoreRaw!==0))return false;
 if(t.goodDropsStopped!==undefined&&typeof t.goodDropsStopped!=='boolean')return false;
 if(t.version>=5&&(!int(t.goodPointProgress,0,t.totalGoodPoints)||typeof t.goodDropsStopped!=='boolean'||t.score===100&&!t.goodDropsStopped||t.phase==='ready'&&(t.goodPointProgress||t.goodDropsStopped)))return false;
 if(t.good+t.bad+t.shocks+t.missed>t.serial||t.phase==='review'&&t.elapsed!==TEA_DURATION||t.phase==='playing'&&t.elapsed>=TEA_DURATION||t.phase==='ready'&&(t.elapsed||t.serial||t.score))return false;
 const ids=new Set;for(const i of t.items){const pace=fallPace(t.version,i?.type);if(!i||!int(i.id,1,t.serial)||ids.has(i.id)||!Object.hasOwn(TEA_DROPS,i.type)||!num(i.x,6,94)||!num(i.y,-5,108)||!num(i.speed,24*pace-1e-9,52*pace+1e-9)||!int(i.tilt,-35,35))return false;ids.add(i.id);}
 if(t.feedback&&(!Object.hasOwn(TEA_DROPS,t.feedback.kind)||typeof t.feedback.text!=='string'||t.feedback.text.length>30||!num(t.feedback.until,0,TEA_DURATION+850)))return false;
 return true;
}
