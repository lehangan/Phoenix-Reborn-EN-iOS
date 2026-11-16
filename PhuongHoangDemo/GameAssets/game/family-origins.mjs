import {OFFICIALS} from './life-data.mjs';

export const OFFICIAL_ENTRY_SILVER=Object.freeze({
 'Cửu phẩm':60,'Bát phẩm':80,'Thất phẩm':100,'Lục phẩm':120,
 'Ngũ phẩm':140,'Tứ phẩm':160,'Tam phẩm':180,'Nhị phẩm':190,'Nhất phẩm':200
});
// Historical opening balances remain valid when existing lives are loaded.
const LEGACY_OFFICIAL_ENTRY_SILVER=Object.freeze({
 'Cửu phẩm':100,'Bát phẩm':150,'Thất phẩm':200,'Lục phẩm':250,
 'Ngũ phẩm':300,'Tứ phẩm':350,'Tam phẩm':400,'Nhị phẩm':450,'Nhất phẩm':500
});
export const officialEntrySilver=grade=>OFFICIAL_ENTRY_SILVER[grade]??60;
export const validOfficialEntrySilver=(grade,amount)=>amount===officialEntrySilver(grade)||amount===(LEGACY_OFFICIAL_ENTRY_SILVER[grade]??100);

// Conditional on a family with a court office: 200 equal tickets in total.
export const FATHER_JOB_WEIGHTS=Object.freeze([60,50,36,24,16,8,3,1,2]);
export function chooseFatherOffice(random){
 let ticket=Math.min(199,Math.floor(Math.max(0,random())*200));
 for(let i=0;i<OFFICIALS.length;i++){ticket-=FATHER_JOB_WEIGHTS[i];if(ticket<0)return OFFICIALS[i];}
 return OFFICIALS.at(-1);
}
export function familyBackground(p){
 if(p.origin==='common')return 'common';
 return ['Hầu gia','Vương gia'].includes(p.family.fatherJob)?'noble':'official';
}
export const FAMILY_BACKGROUNDS=Object.freeze({
 common:{label:'Gia đình bình dân',asset:'assets/v90/family-common.webp'},
 official:{label:'Gia đình quan lại',asset:'assets/v90/family-official.webp'},
 noble:{label:'Gia đình quý tộc',asset:'assets/v90/family-noble.webp'}
});

export const MOTHER_STATUSES=Object.freeze(['Chính thất','Trắc thất','Tiểu thiếp']);
export function ensureMotherStatus(p){
 const f=p.family;
 if(f.motherStatus===undefined){
  // Stable for existing saves and rerenders, without changing the gameplay RNG.
  let hash=2166136261;
  for(const c of `${f.father}|${f.mother}`)hash=Math.imul(hash^c.codePointAt(0),16777619)>>>0;
  const roll=hash%100;
  f.motherStatus=MOTHER_STATUSES.includes(f.motherJob)?f.motherJob:MOTHER_STATUSES[roll<60?0:roll<85?1:2];
 }
 if(!MOTHER_STATUSES.includes(f.motherStatus))throw Error('Thân phận của mẹ không hợp lệ.');
 return f.motherStatus;
}
