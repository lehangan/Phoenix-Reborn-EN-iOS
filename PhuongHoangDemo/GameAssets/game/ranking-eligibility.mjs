// Age is measured in complete game months: exactly 18 is still ineligible.
export const RANKING_MIN_AGE_MONTHS=18*12+1;
export const RANKING_AGE_NOTICE='Chỉ nhân vật trên 18 tuổi (từ 18 tuổi 1 tháng) được vào BXH.';
export const rankingAgeEligible=age=>Number.isSafeInteger(age)&&age>=RANKING_MIN_AGE_MONTHS;
export const rankingAgePriority=(next,previous)=>Number(rankingAgeEligible(next))-Number(rankingAgeEligible(previous));
