import {FACE_SYSTEM_VERSION} from './face-system118.mjs';
import {RANKING_MIN_AGE_MONTHS,rankingAgePriority} from './ranking-eligibility.mjs';
import {validVipFace} from './vip-faces.mjs';
import {normalizeRankingRank} from './rank-schema.mjs';
import {EMPRESS_RANK,RANK_SCHEMA_VERSION,DOWAGER_TITLES} from './life-data.mjs';
import {rankLabel} from './life-engine.mjs';
import {ITEMS,itemById} from './inventory.mjs';
import {HAIRSTYLES} from './hairstyles.mjs';
import {EYE_VARIANTS,FACIAL_VARIANTS,MOUTH_VARIANTS,HUADIAN_NAMES} from './facial-features.mjs';

export const COLLECTION_IDS=ITEMS.filter(i=>['robe','hair','pet'].includes(i.type)).map(i=>i.id);
const collectible=new Set(COLLECTION_IDS);
export const collectionItems=s=>[...new Set([...(s.legacy.collection||[]),...s.p.inventory,...(s.p.petSacrifices||[]).map(p=>p.id)].filter(id=>collectible.has(id)&&!s.p.confiscatedItems?.includes(id)))].sort();

export function captureRanking(s){
 if(s.intro)return null;
 const p=s.p;
 // Earlier wins remain owned, but cannot enter the board until eligibility begins.
 const fashionAgeMonths=Math.max(p.fashionHonors?.ageMonths||p.ageMonths,Math.min(p.ageMonths,RANKING_MIN_AGE_MONTHS));
 return JSON.parse(JSON.stringify({rankSchemaVersion:RANK_SCHEMA_VERSION,life:s.legacy.lives,completed:!p.alive,name:p.name,role:p.role,rankIndex:p.rank,serviceRank:p.serviceRank,rankTitle:p.rankTitle||'',outside:!!p.outside,ageMonths:p.ageMonths,appearance:p.appearance,fashionWins:p.fashionHonors?.wins??0,fashionAgeMonths,fashionAppearance:p.fashionHonors?.appearance??p.appearance,collectionItems:collectionItems(s),collectionRevision:p.collectionRevision??0,collectionExclusions:p.confiscatedItems??[]}));
}
export function rankingRecord(r){
 r=normalizeRankingRank(r);
 const integer=(n,a,b)=>Number.isSafeInteger(n)&&n>=a&&n<=b;
 const text=(v,max)=>typeof v==='string'&&v.length<=max&&!/[<>\u0000-\u001f]/.test(v);
 if(!r||typeof r.completed!=='boolean'||!integer(r.life,1,1000000)||!text(r.name,60)||!r.name.trim()||!['maid','candidate','consort'].includes(r.role)||!integer(r.rankIndex,-1,EMPRESS_RANK)||!integer(r.serviceRank,0,3)||!integer(r.ageMonths,156,1500)||!text(r.rankTitle,100))throw Error('Thành tích không hợp lệ.');
 if(r.role==='consort'&&r.rankIndex<0)throw Error('Phẩm vị không hợp lệ.');
 const validateAppearance=a=>{
 if(!a||typeof a!=='object'||!validVipFace(a.vipFace))throw Error('Thiếu ngoại hình.');
 const appearance={};
 if(a.faceSystemVersion===FACE_SYSTEM_VERSION)appearance.faceSystemVersion=FACE_SYSTEM_VERSION;
 for(const [k,max] of Object.entries({face:2,eyes:EYE_VARIANTS-1,nose:FACIAL_VARIANTS-1,mouth:MOUTH_VARIANTS-1,front:HAIRSTYLES.length-1,back:2})){
  if(!integer(a[k],0,max))throw Error('Ngoại hình không hợp lệ.');appearance[k]=a[k];
 }
 if(a.huadian!=null&&!integer(a.huadian,0,HUADIAN_NAMES.length-1))throw Error('Hoa điền không hợp lệ.');
 if(itemById(a.robe)?.type!=='robe'||a.ornament!=null&&itemById(a.ornament)?.type!=='hair')throw Error('Trang phục không hợp lệ.');
 Object.assign(appearance,{huadian:a.huadian??null,robe:a.robe,ornament:a.ornament??null});
 if(a.vipFace!=null)appearance.vipFace=a.vipFace;
 return appearance;
 };
 const appearance=validateAppearance(r.appearance);
 const items=r.collectionItems??[];
 if(!Array.isArray(items)||items.length>1000||items.some(id=>!collectible.has(id)))throw Error('Bộ sưu tập không hợp lệ.');
 const revision=r.collectionRevision??0,exclusions=r.collectionExclusions??[];
 if(!integer(revision,0,1e9)||!Array.isArray(exclusions)||exclusions.length>1000||exclusions.some(id=>!collectible.has(id)))throw Error('Dữ liệu mất vật phẩm không hợp lệ.');
 const collected=[...new Set(items)].filter(id=>!exclusions.includes(id)).sort(),collectionAge=r.collectionAgeMonths??r.ageMonths;
 if(!integer(collectionAge,156,1500))throw Error('Tuổi sưu tầm không hợp lệ.');
 const collectionAppearance=validateAppearance(r.collectionAppearance??r.appearance);
 const fashionWins=r.fashionWins??0,fashionAge=r.fashionAgeMonths??r.ageMonths;
 if(!integer(fashionWins,0,125)||!integer(fashionAge,156,1500)||fashionWins>Math.floor((fashionAge-156)/12)+1)throw Error('Thành tích hoa khôi không hợp lệ.');
 const fashionAppearance=validateAppearance(r.fashionAppearance??r.appearance);
 const p={role:r.role,rank:r.rankIndex,serviceRank:r.serviceRank,rankTitle:r.rankTitle,outside:!!r.outside};
 const empressDowager=r.role==='consort'&&DOWAGER_TITLES.includes(r.rankTitle);
 // The server derives power; never accept a caller-supplied score or rank label.
 return {life:r.life,completed:r.completed?1:0,name:r.name,power:empressDowager?100:r.role==='consort'?20+r.rankIndex:r.role==='candidate'?10:r.serviceRank+1,rank:empressDowager?r.rankTitle:rankLabel(p),age:r.ageMonths,appearance,collectionItems:collected,collectionRevision:revision,collectionExclusions:[...new Set(exclusions)].sort(),collectionAge,collectionAppearance,fashionWins,fashionAge,fashionAppearance};
}
export function betterRanking(a,b){
 if(!b)return true;
 const x=rankingRecord(a),y=rankingRecord(b);
 const eligibility=rankingAgePriority(x.age,y.age);if(eligibility)return eligibility>0;
 return x.power>y.power||x.power===y.power&&x.age<y.age;
}
