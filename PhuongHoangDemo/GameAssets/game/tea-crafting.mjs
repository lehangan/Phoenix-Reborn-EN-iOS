import {range,addLog} from './life-engine.mjs';
import {QUALITIES} from './palace-data.mjs';
import {createTeaCatch,validTeaCatch,teaQuality,TEA_DURATION,TEA_FALL_SPEED,TEA_BAD_FALL_SPEED,isBadTeaDrop} from './tea-catching.mjs';
export {teaQuality} from './tea-catching.mjs';
export function migrateTea(s){
 s.p.teaBoxes??=[];s.tea??=null;
 // A paid unfinished slider game becomes a catch game without charging again.
 if(s.tea&&s.tea.mode===undefined&&['ready','playing','review'].includes(s.tea.phase)&&Number.isInteger(s.tea.round)&&Array.isArray(s.tea.targets)&&Array.isArray(s.tea.scores))s.tea=createTeaCatch(s.tea.month,(s.rng^s.tea.month)>>>0);
 // Upgrade an already-paid round once, preserving elapsed time, score and RNG.
 if(s.tea?.version===1&&validTeaCatch(s.tea)){for(const item of s.tea.items)item.speed*=TEA_FALL_SPEED;s.tea.version=2;}
 if(s.tea?.version===2&&validTeaCatch(s.tea)){for(const item of s.tea.items)if(isBadTeaDrop(item.type))item.speed*=TEA_BAD_FALL_SPEED;s.tea.version=3;}
 // Unstarted paid rounds can adopt the new scoring; finish active old rounds
 // with their original score so an update never resets an ongoing attempt.
 if([3,4].includes(s.tea?.version)&&s.tea.phase==='ready'&&validTeaCatch(s.tea))s.tea=createTeaCatch(s.tea.month,s.tea.rng);
}
export function beginTea(s){migrateTea(s);s.tea=createTeaCatch(s.p.months,range(s,0,4294967295));return {ok:true};}
export function startTeaCatch(s){const t=s.tea;if(!s.p.alive||!t||t.phase!=='ready')return {error:'Chưa thể bắt đầu hứng nguyên liệu.'};t.phase='playing';return {ok:true};}
export function finishTeaCatch(s){
 const t=s.tea;if(!s.p.alive||!t||t.phase!=='review'||t.elapsed!==TEA_DURATION||!validTeaCatch(t))return {error:'Hãy hoàn thành 30 giây hứng nguyên liệu.'};
 const score=t.score,quality=teaQuality(score),item={id:`tea-${s.legacy.lives}-${s.p.months}-${range(s,0,1e9)}`,name:'Hộp trà tự ủ',quality,score};
 s.p.teaBoxes.push(item);s.tea=null;
 const text=`Hộp trà tự ủ đạt ${score}/100 · ${QUALITIES[quality]}. Đã cất vào Túi đồ → Thủ công để tặng NPC nữ.`;
 s.result={title:'Hương trà gửi ý',text,success:true,effects:{},tea:item};addLog(s,text,'craft');return {ok:true,item};
}
export function validateTea(s){
 migrateTea(s);const int=(v,a,b)=>Number.isInteger(v)&&v>=a&&v<=b,ids=new Set;
 if(!Array.isArray(s.p.teaBoxes)||s.p.teaBoxes.length>2000)throw Error('Hộp trà không hợp lệ.');
 for(const g of s.p.teaBoxes){if(!g||typeof g.id!=='string'||ids.has(g.id)||g.name!=='Hộp trà tự ủ'||!int(g.quality,0,3)||!int(g.score,0,100)||g.quality!==teaQuality(g.score))throw Error('Phẩm cấp hộp trà không hợp lệ.');ids.add(g.id);}
 const t=s.tea;if(t&&(!s.p.alive||t.month!==s.p.months||!validTeaCatch(t)||s.exam||s.mini||s.event||s.story))throw Error('Minigame hứng trà không hợp lệ.');
}
