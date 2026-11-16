import {sisterAid,consoleAfterFire} from './female-relationships.mjs';
import * as B from './life-engine.mjs';
import {itemById,serviceRobeRank} from './inventory.mjs';
import {disfigure,isDisfigured} from './disfigurement.mjs';

export const INCIDENT_CHANCES=Object.freeze({disfigurement:.015,fire:.02});
export const lynxAttackers=s=>s.npcs.filter(n=>n.alive&&n.gender==='female'&&n.roleClass==='consort');
// Keep the plain replacement uniforms available; all other owned wearables can burn.
export const burnableItems=s=>s.p.inventory.filter(id=>{const i=itemById(id);return i&&['robe','hair'].includes(i.type)&&!['robe-0','robe-1','robe-2','robe-3'].includes(id);});
export function queuePalaceIncidents(s){
 const women=lynxAttackers(s);
 if(['candidate','consort'].includes(s.p.role)&&!isDisfigured(s)&&women.length&&B.rand(s)<INCIDENT_CHANCES.disfigurement)s.sideEvents.push({kind:'disfigurement',npc:B.pick(s,women).id,month:s.p.months});
 // A separate roll allows both incidents in the same month.
 if(B.rand(s)<INCIDENT_CHANCES.fire){
  const pool=burnableItems(s),items=[];
  if(pool.length){const count=B.range(s,1,Math.min(3,pool.length));for(let i=0;i<count;i++)items.push(pool.splice(B.range(s,0,pool.length-1),1)[0]);}
  s.sideEvents.push({kind:'fire',month:s.p.months,items});
 }
}
export function resolvePalaceIncident(s,q){
 if(q.kind==='disfigurement'){
  const n=s.npcs.find(n=>n.id===q.npc);if(!n||isDisfigured(s))return {ok:true,unavailable:true};
  n.met=n.talked=true;const before=s.p.stats.beauty,friendly=n.bond>50,bondBefore=n.bond,loss=friendly?B.range(s,1,10):20;n.bond=B.clamp(n.bond-loss,-100,100);disfigure(s,n.id);
  const text=(friendly?`Có người thả linh miêu hại bạn. Tin đồn đó là ${n.role} ${n.name}, nhưng bạn không có căn cứ. Thiện cảm vì thế giảm ${bondBefore-n.bond} điểm. `:`Vì ghen tị, ${n.role} ${n.name} sai người thả linh miêu tấn công nàng. Thiện cảm −${bondBefore-n.bond}. `)+` Ba vết móng vuốt cào dài trên gương mặt, hủy hoại dung mạo. Dung mạo về 0 và không thể tăng. Nghe đồn Dịch Dung đan có thể chỉnh lại gương mặt.`;
  s.result={title:'Dung mạo bị hủy hoại',text,success:false,effects:{beauty:-before},disfigurement:true,bondBefore,bondAfter:n.bond,bondGain:n.bond-bondBefore,rumor:friendly};B.addLog(s,text,'setback');sisterAid(s,'disfigurement');return {ok:true};
 }
 const lost=q.items.filter(id=>s.p.inventory.includes(id)),gone=new Set(lost);
 s.p.inventory=s.p.inventory.filter(id=>!gone.has(id));s.legacy.collection=s.legacy.collection.filter(id=>!gone.has(id));
 if(lost.length){s.p.confiscatedItems=[...new Set([...s.p.confiscatedItems,...lost])];s.p.collectionRevision++;}
 let replacement=null;
 if(gone.has(s.p.appearance.robe)){
  const owned=s.p.inventory.find(id=>{const i=itemById(id);return i?.type==='robe'&&(s.p.role!=='maid'||serviceRobeRank(i)===s.p.serviceRank);});
  const fallback=owned||`robe-${s.p.role==='maid'?s.p.serviceRank:0}`;
  if(!owned){B.grant(s,fallback,'Cấp lại áo sau hỏa hoạn',false);replacement=itemById(fallback).name;}
  s.p.appearance.robe=fallback;
 }
 if(gone.has(s.p.appearance.ornament))s.p.appearance.ornament=null;
 const text='Nửa đêm, lửa bùng lên trong hậu cung và lan đến nơi cất y phục của nàng. '+(lost.length?`Đã cháy mất: ${lost.map(id=>itemById(id).name).join(', ')}.`:'May thay, y phục và trang sức của nàng đều được cứu kịp.')+(replacement?` Nàng được cấp lại ${replacement}.`:'');
 s.result={title:'Hỏa hoạn trong cung',text,success:false,effects:{},burnedItems:lost};B.addLog(s,text,'setback');const visitors=lost.length?consoleAfterFire(s):[];return {ok:true,lost,visitors};
}
