import {FACIAL_VARIANTS,MOUTH_VARIANTS,EYE_VARIANTS,CUTE_EYES,EYE_NAMES,MOUTH_NAMES,NOSE_NAMES,HUADIAN_NAMES} from './facial-features.mjs';
import {VIP_FACES,VIP_FACE_COST,vipFaceById,validVipFace,randomVipFace} from './vip-faces.mjs';
import {HAIRSTYLES} from './hairstyles.mjs';
export const APPEARANCE_COST=3;
const numbered=(count,label)=>Array.from({length:count},(_,id)=>({id,name:`${label} ${id+1}`}));
export const APPEARANCE_PARTS=[
 {key:'face',name:'Gương mặt',options:numbered(3,'Dáng mặt')},
 {key:'eyes',name:'Mắt',options:numbered(EYE_VARIANTS,'Mắt').map(o=>({...o,name:EYE_NAMES[o.id]||CUTE_EYES.find(e=>e.id===o.id)?.name||o.name}))},
 {key:'nose',name:'Mũi',options:numbered(FACIAL_VARIANTS,'Mũi').map(o=>({...o,name:NOSE_NAMES[o.id]||o.name}))},
 {key:'mouth',name:'Môi',options:numbered(MOUTH_VARIANTS,'Môi').map(o=>({...o,name:MOUTH_NAMES[o.id]||o.name}))},
 {key:'huadian',name:'Hoa điền',options:[{id:null,name:'Không dùng'},...HUADIAN_NAMES.map((name,id)=>({id,name}))]},
 {key:'front',name:'Kiểu tóc',options:HAIRSTYLES}
];
const identity=s=>JSON.stringify([s.legacy.lives,s.rng,s.p.name,s.p.appearance]);
export function createAppearanceDraft(s){
 if(!s.intro||!s.p.alive)return null;
 return {identity:identity(s),look:{...s.p.appearance}};
}
export const VIP_APPEARANCE_PART={key:'vipFace',name:'Mặt VIP',options:VIP_FACES};
export const appearanceCost=draft=>vipFaceById(draft?.look?.vipFace)?VIP_FACE_COST:APPEARANCE_COST;
export function appearanceChanged(s,draft){return !!draft&&[...APPEARANCE_PARTS,VIP_APPEARANCE_PART].some(({key})=>(draft.look[key]??null)!==(s.p.appearance[key]??null));}
export function chooseAppearance(draft,key,value){
 if(!draft||![...APPEARANCE_PARTS,VIP_APPEARANCE_PART].find(p=>p.key===key)?.options.some(o=>o.id===value))return false;
 if(key!=='vipFace'&&key!=='front')delete draft.look.vipFace;
 draft.look[key]=value;return true;
}
// Cosmetic previews use their own random source, never the life's event RNG.
export function randomizeAppearance(draft,random=Math.random){
 if(!draft?.look)return false;
 const previous={...draft.look};
 for(const {key,options} of APPEARANCE_PARTS){
  const roll=Math.max(0,Math.min(.999999999,Number(random())||0));
  draft.look[key]=options[Math.floor(roll*options.length)].id;
 }
 const vipFace=randomVipFace(random);
 if(vipFace!==null)draft.look.vipFace=vipFace;else delete draft.look.vipFace;
 if([...APPEARANCE_PARTS,VIP_APPEARANCE_PART].every(({key})=>draft.look[key]===previous[key])){
  if(vipFace!==null){draft.look.vipFace=(vipFace+1)%VIP_FACES.length;return true;}
  const eyes=APPEARANCE_PARTS.find(p=>p.key==='eyes').options;
  draft.look.eyes=eyes[(eyes.findIndex(o=>o.id===previous.eyes)+1)%eyes.length].id;
 }
 return true;
}
export function applyAppearanceCustomization(s,draft){
 if(!s.intro||!s.p.alive)return {error:'Chỉ được tự phối diện mạo khi tạo nhân vật mới.'};
 if(!draft?.look||draft.identity!==identity(s))return {error:'Thân phận đã thay đổi. Hãy mở lại bảng phối diện mạo.'};
 if(!validVipFace(draft.look.vipFace)||APPEARANCE_PARTS.some(p=>!p.options.some(o=>o.id===(draft.look[p.key]??null))))return {error:'Mẫu diện mạo không hợp lệ.'};
 if(!appearanceChanged(s,draft))return {error:'Nàng chưa thay đổi diện mạo.'};
 const cost=appearanceCost(draft);
 if(!Number.isSafeInteger(s.legacy.points)||s.legacy.points<cost)return {error:`Cần ${cost} điểm luân hồi để xác nhận diện mạo.`};
 // Commit the cosmetic fields and charge together. A submitted draft becomes
 // stale immediately, so a repeated click cannot charge a second time.
 const look={...s.p.appearance};
 for(const {key} of APPEARANCE_PARTS)look[key]=draft.look[key]??null;
 if(draft.look.vipFace!=null)look.vipFace=draft.look.vipFace;else delete look.vipFace;
 s.legacy.points-=cost;s.p.appearance=look;
 return {ok:true,cost};
}
