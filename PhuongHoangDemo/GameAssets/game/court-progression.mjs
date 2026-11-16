import * as B from './life-engine.mjs';
import {EMPRESS_RANK,IMPERIAL_NOBLE_CONSORT_RANK,RANKS} from './life-data.mjs';

export const NPC_PROMOTION_CHANCE=.30;
export const NPC_PHI_LIMIT=3;
export const COURT_PHI_LIMIT=4;
export const npcPhiCount=s=>s.npcs.filter(n=>n.alive&&n.gender==='female'&&n.roleClass==='consort'&&!n.deposed&&n.courtRank===7).length;
export const courtPhiCount=s=>npcPhiCount(s)+(s.p.alive&&s.p.role==='consort'&&s.p.rank===7?1:0);
export const canAttendNpcCeremony=s=>s.p.alive&&!s.intro&&!s.p.outside&&s.p.role!=='maid'&&!s.p.prison&&s.p.coldPalaceUntil==null;

export function migrateCourtProgression(s){
 s.courtCeremonies??=[];
 s.nextNpcPhiMonth??=s.p.months+24+(s.rng%13);
 if(s.courtGrowthYear==null){
  s.courtGrowthYear=Math.floor(s.p.months/12);
  // Old worlds may predate the three-NPC limit. Normalize once, without changing the player.
  const extra=s.npcs.filter(n=>n.alive&&n.gender==='female'&&n.roleClass==='consort'&&n.courtRank===7&&!n.deposed).slice(NPC_PHI_LIMIT);
  for(const n of extra){n.courtRank=6;n.role=RANKS[6].titles[0];}
 }
}

export function advanceCourt(s){
 migrateCourtProgression(s);if(!s.p.alive)return [];
 const year=Math.floor(s.p.months/12),promoted=[];
 const promote=(n,target)=>{const previous=n.role;n.courtRank=target;n.role=B.titleFor(s,target,n.id);n.lastPromotionMonth=s.p.months;B.addLog(s,`Chiếu thăng phẩm: ${n.name} từ ${previous} được phong ${n.role}.`,'court');promoted.push(n.id);};
 const eligible=n=>n.alive&&n.gender==='female'&&n.roleClass==='consort'&&!n.deposed;
 // Lower ranks are considered once a year, independently of the rare Phi ceremony.
 if(year>s.courtGrowthYear){
  s.courtGrowthYear=year;
  for(const n of s.npcs.filter(n=>eligible(n)&&n.courtRank>=0&&n.courtRank<6))if(B.rand(s)<NPC_PROMOTION_CHANCE)promote(n,n.courtRank+1);
 }
 // One global 24–36 month clock for Phi and Hoang Quy Phi appointments.
 // A queued or active ceremony must finish before that NPC can advance again.
 if(s.p.months>=s.nextNpcPhiMonth){
  s.nextNpcPhiMonth=s.p.months+B.range(s,24,36);
  const candidates=s.npcs.filter(n=>eligible(n)&&(n.courtRank===7||n.courtRank===6&&npcPhiCount(s)<NPC_PHI_LIMIT&&courtPhiCount(s)<COURT_PHI_LIMIT)&&!promoted.includes(n.id)&&!s.courtCeremonies.some(c=>c.npc===n.id)&&s.coronation?.npc!==n.id);
  if(candidates.length){
   const n=B.pick(s,candidates);promote(n,n.courtRank+1);
   if(canAttendNpcCeremony(s))s.courtCeremonies.push({npc:n.id,month:s.p.months});
  }
 }
 return promoted;
}

export function validateCourtProgression(s){
 migrateCourtProgression(s);
 if(!Number.isInteger(s.nextNpcPhiMonth)||s.nextNpcPhiMonth<0||s.nextNpcPhiMonth>s.p.months+36)throw Error('Lịch phong Phi không hợp lệ.');
 if(!Number.isInteger(s.courtGrowthYear)||s.courtGrowthYear<0||s.courtGrowthYear>Math.floor(s.p.months/12)||npcPhiCount(s)>NPC_PHI_LIMIT||courtPhiCount(s)>COURT_PHI_LIMIT)throw Error('Phẩm vị hậu cung vượt giới hạn.');
 if(!Array.isArray(s.courtCeremonies)||s.courtCeremonies.length>s.npcs.length||new Set(s.courtCeremonies.map(c=>c.npc)).size!==s.courtCeremonies.length||s.courtCeremonies.some(c=>!s.npcs.some(n=>n.id===c.npc&&n.gender==='female'&&n.roleClass==='consort'&&[7,IMPERIAL_NOBLE_CONSORT_RANK].includes(n.courtRank))||!Number.isInteger(c.month)||c.month<0||c.month>s.p.months))throw Error('Danh sách lễ phong Phi không hợp lệ.');
 for(const n of s.npcs.filter(n=>n.gender==='female'&&n.roleClass==='consort'))if(!Number.isInteger(n.courtRank)||n.courtRank<0||n.courtRank>EMPRESS_RANK)throw Error('Phẩm vị NPC không hợp lệ.');
}
