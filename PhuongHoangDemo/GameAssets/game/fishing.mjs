export const FISHING_DURATION=30000;
export const FISHING_BITE_WINDOW=2400;
export const FISHING_TARGET={min:45,max:55};
// Start at the right edge, roll all the way left, then return right exactly once.
export const fishingPosition=(elapsed,bite)=>Math.abs(1-2*Math.max(0,Math.min(1,(elapsed-bite.at)/bite.window)))*100;
const cache=new Map();
// Consume the legacy draws. Space slower sweeps apart so only one roller is active.
export function fishingPattern(seed){if(cache.has(seed))return cache.get(seed);let x=seed>>>0;const random=()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;};let previous=-FISHING_BITE_WINDOW;const bites=Array.from({length:10},(_,i)=>{const at=Math.max(1500+i*2800+Math.floor(random()*650),previous+FISHING_BITE_WINDOW+60);previous=at;random();random();return {at,window:FISHING_BITE_WINDOW,x:50};});if(cache.size>100)cache.clear();cache.set(seed,bites);return bites;}
export const fishingScore=g=>Math.round(g.marks.reduce((n,v)=>n+(v||0),0)/g.marks.length);
export const fishingStars=g=>{const score=fishingScore(g);return score>=90?5:score>=70?4:score>=45?3:score>=20?2:1;};
export const newFishing=seed=>({version:2,seed:seed>>>0,status:'ready',elapsed:0,marks:Array(10).fill(null),attempted:Array(10).fill(false)});
export function advanceFishing(g,time){if(g.status!=='playing'||!Number.isFinite(time)||time<g.elapsed)return false;g.elapsed=Math.min(FISHING_DURATION,Math.round(time));fishingPattern(g.seed).forEach((b,i)=>{if(g.marks[i]===null&&g.elapsed>b.at+b.window)g.marks[i]=0;});if(g.elapsed===FISHING_DURATION){g.marks=g.marks.map(v=>v??0);g.status='ended';}return true;}
export function activeFishingBite(g){return fishingPattern(g.seed).findIndex((b,i)=>g.marks[i]===null&&!g.attempted[i]&&g.elapsed>=b.at&&g.elapsed<=b.at+b.window);}
export function reelFish(g,time){
 if(!advanceFishing(g,time)||g.status!=='playing')return false;
 const bites=fishingPattern(g.seed),i=activeFishingBite(g);if(i<0)return false;
 const position=fishingPosition(g.elapsed,bites[i]),caught=position>=FISHING_TARGET.min-1e-9&&position<=FISHING_TARGET.max+1e-9;
 g.attempted[i]=true;g.marks[i]=caught?100:0;return {caught,score:g.marks[i],position};
}
export function resumeFishing(g){if(!['ready','paused'].includes(g.status))return false;g.status='playing';return true;}
export function pauseFishing(g,time=g.elapsed){if(g.status==='playing'){advanceFishing(g,time);if(g.status==='playing')g.status='paused';}}
export function validateFishing(g){if(g==null)return;const int=(x,a,b)=>Number.isInteger(x)&&x>=a&&x<=b;if(![1,2].includes(g.version)||!int(g.seed,0,4294967295)||!['ready','playing','paused','ended'].includes(g.status)||!int(g.elapsed,0,FISHING_DURATION)||!Array.isArray(g.marks)||g.marks.length!==10||!Array.isArray(g.attempted)||g.attempted.length!==10||g.attempted.some(v=>typeof v!=='boolean')||g.marks.some(v=>v!==null&&![0,75,100].includes(v)))throw Error('Buổi câu cá không hợp lệ.');if(g.status==='ready'&&(g.elapsed||g.attempted.some(Boolean)||g.marks.some(v=>v!==null))||g.status==='ended'&&(g.elapsed!==FISHING_DURATION||g.marks.includes(null))||g.status!=='ended'&&g.elapsed===FISHING_DURATION)throw Error('Thời gian câu cá không hợp lệ.');fishingPattern(g.seed).forEach((b,i)=>{if(g.marks[i]>0&&(!g.attempted[i]||g.elapsed<b.at-b.window)||g.attempted[i]&&g.elapsed<b.at-1100||g.marks[i]===null&&g.elapsed>b.at+b.window)throw Error('Lượt câu cá không hợp lệ.');});g.version=2;}
