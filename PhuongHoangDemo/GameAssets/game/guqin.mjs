// A reproducible, local 30-second score. No network or timer is needed by the rules.
export const GUQIN_DURATION = 30000;
export const HIT_WINDOW = 340;
const cache = new Map();
const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
export function composition(seed) {
  if(cache.has(seed)) return cache.get(seed);
  let x=seed>>>0;
  const random=()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;};
  const integer=(a,b)=>a+Math.floor(random()*(b-a+1));
  const names=['Nguyệt ảnh','Trúc phong','Hoa bên thềm','Mây qua điện','Sen đầu hạ','Sương ngọc','Gió hồ thu','Đêm trường an'];
  const title=names[integer(0,names.length-1)], root=[48,50,53,55][integer(0,3)], scale=[0,2,4,7,9];
  const notes=[];let at=1700,degree=integer(2,5);
  while(at<27800){
    const hold=random()<.3?integer(700,1150):0, travel=integer(800,1450);
    const free=Array.from({length:9},(_,i)=>i).filter(cell=>!notes.some(n=>n.cell===cell&&n.at+n.hold+HIT_WINDOW>at-travel-150));
    const cell=free[integer(0,free.length-1)];degree=notes.length%5===0?Math.floor(notes.length/5)%5:clamp(degree+integer(-2,2),0,9);
    notes.push({id:notes.length,at,travel,hold,cell,pitch:root+12*Math.floor(degree/5)+scale[degree%5]});
    at+=hold+integer(760,1150);
  }
  const song=Object.freeze({title,notes:Object.freeze(notes.map(Object.freeze))});
  if(cache.size>100)cache.clear();cache.set(seed,song);return song;
}
export function newPerformance(seed,emperor,month){return {version:1,seed:seed>>>0,emperor,month,status:'ready',elapsed:0,marks:composition(seed>>>0).notes.map(()=>null),holding:null,outcome:null};}
export function performanceScore(g){return Math.round(g.marks.reduce((a,v)=>a+(v??0),0)/g.marks.length);}
export function performanceStars(score){return score>=90?5:score>=70?4:score>=50?3:score>=25?2:1;}
export function advancePerformance(g,time){
  if(g.status!=='playing'||!Number.isFinite(time)||time<g.elapsed)return false;
  g.elapsed=clamp(Math.round(time),0,GUQIN_DURATION);const notes=composition(g.seed).notes;
  if(g.holding&&g.elapsed-g.holding.at>=notes[g.holding.id].hold){g.marks[g.holding.id]=g.holding.accuracy;g.holding=null;}
  for(const n of notes)if(g.marks[n.id]===null&&g.holding?.id!==n.id&&g.elapsed>n.at+HIT_WINDOW)g.marks[n.id]=0;
  if(g.elapsed===GUQIN_DURATION){if(g.holding)releaseNote(g,g.holding.id,g.elapsed);g.marks=g.marks.map(v=>v??0);g.status='ended';}
  return true;
}
function trace(g,kind,time,id=-1){
 if(!g.audit||!Number.isFinite(time))return;
 const events=g.audit.events;if(!Array.isArray(events)||events.length>=2000){delete g.audit;return;}
 const at=Math.min(GUQIN_DURATION,Math.max(g.elapsed,Math.round(time)));
 events.push([kind,at,id]);
}
export function pressNote(g,id,time){
 trace(g,'press',time,id);
  if(!Number.isInteger(id)||id<0||id>=g.marks.length||!advancePerformance(g,time)||g.status!=='playing')return false;
  const n=composition(g.seed).notes[id];if(!n||g.marks[id]!==null||g.holding?.id===id||n.hold&&g.holding)return false;
  const offset=Math.abs(g.elapsed-n.at);if(g.elapsed<n.at-n.travel)return false;
  const accuracy=offset<=110?100:offset<=220?85:offset<=HIT_WINDOW?55:0;
  if(n.hold&&accuracy)g.holding={id,at:g.elapsed,accuracy};else g.marks[id]=accuracy;
  return true;
}
export function releaseNote(g,id,time){
 trace(g,'release',time,id);
  if(g.status!=='playing'||g.holding?.id!==id||!Number.isFinite(time)||time<g.elapsed)return false;
  const h=g.holding,n=composition(g.seed).notes[id],fraction=clamp((time-h.at)/n.hold,0,1);
  g.elapsed=clamp(Math.round(time),0,GUQIN_DURATION);
  // A tap on a hold note is worth nothing; incomplete holds cannot be excellent.
  g.marks[id]=fraction<.2?0:Math.round(h.accuracy*fraction*(fraction<.85?.5:1));g.holding=null;return true;
}
export function pausePerformance(g,time=g.elapsed){if(g.status!=='playing')return;trace(g,'pause',time);advancePerformance(g,time);if(g.holding)releaseNote(g,g.holding.id,g.elapsed);if(g.status==='playing')g.status='paused';}
export function resumePerformance(g){if(!['ready','paused'].includes(g.status))return false;trace(g,'start',g.elapsed);g.status='playing';return true;}
export function validatePerformance(g){
  if(g==null)return;
  const integer=(v,a,b)=>Number.isInteger(v)&&v>=a&&v<=b;
  if(g.version!==1||!integer(g.seed,0,4294967295)||!integer(g.month,0,100000)||g.emperor!=='emperor'||!['ready','playing','paused','ended'].includes(g.status)||!integer(g.elapsed,0,GUQIN_DURATION))throw Error('Bài đàn không hợp lệ.');
  const notes=composition(g.seed).notes;
  if(!Array.isArray(g.marks)||g.marks.length!==notes.length||g.marks.some(v=>v!==null&&!integer(v,0,100)))throw Error('Điểm nốt đàn không hợp lệ.');
  if(g.holding){const h=g.holding;if(g.status!=='playing'||!integer(h.id,0,notes.length-1)||!notes[h.id].hold||!integer(h.at,0,g.elapsed)||Math.abs(h.at-notes[h.id].at)>HIT_WINDOW||![55,85,100].includes(h.accuracy)||g.marks[h.id]!==null||g.elapsed>h.at+notes[h.id].hold)throw Error('Nốt giữ không hợp lệ.');}
  if(g.status==='ready'&&(g.elapsed!==0||g.marks.some(v=>v!==null))||g.status==='ended'&&(g.elapsed!==GUQIN_DURATION||g.marks.includes(null)||g.holding)||g.status!=='ended'&&g.elapsed===GUQIN_DURATION)throw Error('Tiến trình bài đàn không hợp lệ.');
  if(notes.some(n=>g.marks[n.id]!==null&&g.elapsed<n.at-n.travel||g.marks[n.id]===null&&g.holding?.id!==n.id&&g.elapsed>n.at+HIT_WINDOW))throw Error('Thời điểm nốt đàn không hợp lệ.');
  if(g.outcome){const o=g.outcome,stars=performanceStars(performanceScore(g));if(g.status!=='ended'||o.stars!==stars||o.score!==performanceScore(g)||typeof o.text!=='string'||!integer(o.loss,0,10)||(stars===1?o.loss<1:o.loss!==0)||(stars>=4?typeof o.chest!=='string':o.chest!==null))throw Error('Kết quả bài đàn không hợp lệ.');}
}
