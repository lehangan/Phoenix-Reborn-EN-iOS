export const CHILD_APTITUDES=Object.freeze([
 {id:'ordinary',name:'Bình thường',weight:50,crownBonus:0},
 {id:'promising',name:'Ưu tú',weight:27,crownBonus:5},
 {id:'outstanding',name:'Tinh anh',weight:14,crownBonus:10},
 {id:'exceptional',name:'Kiệt xuất',weight:7,crownBonus:15},
 {id:'genius',name:'Thiên tài',weight:2,crownBonus:25}
].map(Object.freeze));

export function aptitudeWeights(boost=0){
 const extra=Math.max(0,Math.min(30,Number(boost)||0));
 return CHILD_APTITUDES.map((tier,i)=>tier.weight+extra*[-1,.4,.3,.2,.1][i]);
}
export function aptitudeFromRoll(roll,boost=0){
 const weights=aptitudeWeights(boost);
 let cumulative=0;
 for(const [i,tier] of CHILD_APTITUDES.entries()){cumulative+=weights[i];if(roll*100<cumulative)return tier.id;}
 return CHILD_APTITUDES.at(-1).id;
}
export const childAptitude=child=>CHILD_APTITUDES.find(t=>t.id===child.aptitude)||CHILD_APTITUDES[0];

// Give legacy children a stable aptitude without advancing the world's RNG.
export function legacyChildAptitude(s,c){
 const identity=JSON.stringify([s.legacy.lives,s.p.name,c.id,c.name,c.father,c.month]);
 let hash=2166136261;
 for(const char of identity)hash=Math.imul(hash^char.charCodeAt(0),16777619);
 hash=Math.imul(hash^(hash>>>16),0x85ebca6b);
 hash=Math.imul(hash^(hash>>>13),0xc2b2ae35);
 return aptitudeFromRoll(((hash^(hash>>>16))>>>0)/4294967296);
}
