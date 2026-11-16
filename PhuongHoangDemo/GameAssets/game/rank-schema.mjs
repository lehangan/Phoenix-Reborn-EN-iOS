import {EMPRESS_RANK,RANK_SCHEMA_VERSION} from './life-data.mjs';

// Version 1 used index 8 for the empress. Migrate once without drawing RNG,
// changing titles/looks, or replaying any reward or ceremony.
export function migrateRankSchema(s){
 if(s.rankSchemaVersion===RANK_SCHEMA_VERSION)return s;
 if(s.rankSchemaVersion!=null&&s.rankSchemaVersion!==1)throw Error('Phiên bản phẩm vị không hợp lệ.');
 const remap=n=>n===8?EMPRESS_RANK:n;
 s.p.rank=remap(s.p.rank);s.p.highestRank=remap(s.p.highestRank);
 for(const n of s.npcs||[])if(Number.isInteger(n.courtRank))n.courtRank=remap(n.courtRank);
 const posthumous=q=>{if(!q)return;if(q.rank===8){q.rank=EMPRESS_RANK;q.legacyRankSchema=1;}q.fromRank=remap(q.fromRank);};
 posthumous(s.p.death?.posthumous);
 for(const h of s.legacy?.histories||[])posthumous(h.posthumous);
 for(const n of s.notices||[])if(n.posthumous)posthumous(n);
 // Old ordinary promotion requests to the empress were never valid.
 if(s.pendingTitle?.rank===8)s.pendingTitle=null;
 if(s.story?.kind==='favor'&&s.story.target===8)s.story=null;
 s.rankSchemaVersion=RANK_SCHEMA_VERSION;
 return s;
}

export function normalizeRankingRank(r){
 if(!r||r.rankSchemaVersion===RANK_SCHEMA_VERSION)return r;
 if(r.rankSchemaVersion!=null&&r.rankSchemaVersion!==1)throw Error('Phiên bản phẩm vị không hợp lệ.');
 return {...r,rankIndex:r.rankIndex===8?EMPRESS_RANK:r.rankIndex,rankSchemaVersion:RANK_SCHEMA_VERSION};
}
