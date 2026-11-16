export const RANKING_RESET_NOTICE='Leaderboards reset daily at 00:00 UTC.';
export const RANKING_EPOCH='ios-preview-v1';
const day=86400000;
export function rankingPeriod(now=Date.now()){
 return RANKING_EPOCH+':'+new Date(Number(now)).toISOString().slice(0,10);
}
export function nextRankingReset(now=Date.now()){
 return (Math.floor(Number(now)/day)+1)*day;
}
