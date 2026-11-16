import {RANKS} from './life-data.mjs';
const normalize=title=>String(title||'').toLocaleLowerCase('vi-VN').trim();

export function chooseCourtTitle(s,rank,pick,owner='player'){
 const titles=RANKS[rank]?.titles;if(!titles)return RANKS[rank]?.name;
 const used=new Set((s.npcs||[]).filter(n=>n.id!==owner&&n.alive&&n.gender==='female'&&!n.deposed).map(n=>normalize(n.role)));
 if(owner!=='player'&&s.p.alive&&s.p.role==='consort')used.add(normalize(s.p.rankTitle));
 // Avoid immediately repeating the previous title on a fresh appointment too.
 used.add(normalize(owner==='player'?s.p.rankTitle:s.npcs.find(n=>n.id===owner)?.role));
 const available=titles.filter(title=>!used.has(normalize(title)));
 return pick(available.length?available:titles);
}
