import {newPerformance,resumePerformance,pausePerformance,pressNote,releaseNote,advancePerformance,performanceScore,performanceStars,GUQIN_DURATION} from './guqin.mjs';
// The server replays input events; submitted scores, inventory and source labels are not evidence.
export function replayGuqin(seed,events){
 if(!Array.isArray(events)||events.length>2000)throw Error('Invalid performance');
 const g=newPerformance(seed,'emperor',0);let previous=0;
 for(const e of events){
  if(!Array.isArray(e)||e.length!==3||!['start','pause','press','release'].includes(e[0])||!Number.isInteger(e[1])||e[1]<previous||e[1]>GUQIN_DURATION||!Number.isInteger(e[2]))throw Error('Invalid input');
  const [kind,time,id]=e;previous=time;
  if(kind==='start'){if(time!==g.elapsed)throw Error('Invalid resume');resumePerformance(g);}
  else if(kind==='pause')pausePerformance(g,time);
  else if(kind==='press')pressNote(g,id,time);
  else releaseNote(g,id,time);
 }
 if(g.status==='paused')resumePerformance(g);
 advancePerformance(g,GUQIN_DURATION);
 if(g.status!=='ended')throw Error('Incomplete performance');
 const score=performanceScore(g);return {score,stars:performanceStars(score),marks:g.marks};
}
