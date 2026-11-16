import {MALE_PORTRAIT_VARIANTS,newMalePortrait} from './male-portraits-v78.mjs';
import {capImperialNpcAges} from './npc-age-rules.mjs';
import {itemById,serviceRobePool} from './inventory.mjs';
import {maidJewelryAllowed} from './maid-rules.mjs';
import {pick,range,rand,appearance,titleFor} from './life-engine.mjs';
import {chooseName,ROYAL_SURNAMES} from './names.mjs';
import {EMPRESS_RANK,IMPERIAL_NOBLE_CONSORT_RANK,rankRobeIndex,RANKS,SERVICE_RANKS} from './life-data.mjs';
const shuffle=(s,a)=>{for(let i=a.length-1;i>0;i--){const j=range(s,0,i);[a[i],a[j]]=[a[j],a[i]];}return a;};
const maleOrder={emperor:500,prince:400,chancellor:300,general:200,physician:100};
export function npcPrecedence(n){return n.gender==='male'?maleOrder[n.id]||0:n.roleClass==='consort'?100+n.courtRank:10+(n.serviceRank||0);}
export function rankedNpcs(s,gender){return s.npcs.filter(n=>n.alive&&n.met&&n.talked&&n.gender===gender).sort((a,b)=>npcPrecedence(b)-npcPrecedence(a)||a.name.localeCompare(b.name,'vi'));}
const youngPortraits={'emperor:3':'emperor-young3-v18.webp','physician:3':'physician-young3-v18.webp','physician:4':'physician-young4-v18.webp'};
export function npcPortrait(n){const added=newMalePortrait(n);if(added)return added;const replacement=youngPortraits[n.id+':'+(n.portraitVariant||0)];if(replacement)return 'assets/npcs/'+replacement;if(n.id==='general'&&[3,4].includes(n.portraitVariant))return `assets/npcs/general-young${n.portraitVariant}-v12.webp`;if(['general','chancellor'].includes(n.id)&&n.portraitVariant===1)return `assets/npcs/${n.id}-young-v12.webp`;return `assets/npcs/${n.id}${n.portraitVariant?'-v'+n.portraitVariant:''}.webp`;}
export function migrateCourt(s){
 for(const n of s.npcs){
  if(n.gender==='male'){n.portraitVariant??=0;if((s.courtVersion||0)<12&&(n.age<20||n.age>32))n.age=20+(n.age+n.id.length)%13;continue;}
  if(n.roleClass){if(n.roleClass==='service'&&!maidJewelryAllowed({role:'maid'},itemById(n.appearance.ornament)))n.appearance.ornament='hair-5';continue;}
  const r=RANKS.findIndex(r=>r.name===n.role||r.titles?.includes(n.role));
  n.roleClass=r>=0?'consort':'service';n.courtRank=r;n.serviceRank=r<0?Math.max(0,({Thượngcung:3,Chưởngsự:1}[n.role.replaceAll(' ','')]??SERVICE_RANKS.indexOf(n.role))):0;
  if(n.roleClass==='service'&&!maidJewelryAllowed({role:'maid'},itemById(n.appearance.ornament)))n.appearance.ornament='hair-5';
 }
 capImperialNpcAges(s);s.courtVersion=12;
}
export function ensureFashionCourt(s){
 const used=new Set([s.p.name,...s.npcs.map(n=>n.name)]);
 while(s.npcs.filter(n=>n.gender==='female'&&n.alive).length<7){
  let index=0;while(s.npcs.some(n=>n.id==='npc-'+index))index++;
  const name=chooseName(a=>pick(s,a),{used}),n={id:'npc-'+index,name,gender:'female',age:range(s,18,32),role:SERVICE_RANKS[0],roleClass:'service',courtRank:-1,serviceRank:0,bond:0,rivalry:range(s,0,15),kindness:range(s,20,90),alive:true,met:false,talked:false,appearance:{...appearance(s),robe:pick(s,serviceRobePool(0)).id,ornament:'hair-5'}};
  s.npcs.push(n);if(s.world?.positions)s.world.positions[n.id]='garden';
 }
}
export function initializeCourt(s){
 const count=range(s,7,12),consortCount=range(s,2,Math.min(6,count-2)),hasEmpress=rand(s)<.45;
 const ranks=shuffle(s,[0,1,2,3,4,5,6,7,IMPERIAL_NOBLE_CONSORT_RANK]).slice(0,consortCount-(hasEmpress?1:0));if(hasEmpress)ranks.push(EMPRESS_RANK);
 const roles=shuffle(s,[...ranks.map(rank=>({roleClass:'consort',courtRank:rank,serviceRank:0,role:titleFor(s,rank,'new-court')})),...Array.from({length:count-consortCount},()=>{const rank=range(s,0,3);return {roleClass:'service',courtRank:-1,serviceRank:rank,role:SERVICE_RANKS[rank]};})]);
 const used=new Set([s.p.name,s.p.family.father,s.p.family.mother]),avoid=s.legacy.lastWorldNames||[],name=(gender='female',surname=null)=>chooseName(a=>pick(s,a),{gender,surname,used,avoid});
 const females=roles.map((role,i)=>{const fullName=name();return {id:'npc-'+i,name:fullName,...role,gender:'female',age:range(s,role.courtRank>=6||role.serviceRank>=2?23:16,role.serviceRank===3?55:42),bond:range(s,-10,15),rivalry:range(s,0,25),kindness:range(s,20,90),alive:true,met:false,talked:false,appearance:{...appearance(s),robe:role.roleClass==='consort'?'robe-'+rankRobeIndex(role.courtRank):pick(s,serviceRobePool(role.serviceRank)).id,ornament:'hair-'+pick(s,role.roleClass==='consort'?[9,12,13,15,18,20,23,38]:role.serviceRank>=2?[5,17,23].filter(id=>maidJewelryAllowed({role:'maid'},itemById('hair-'+id))):[0,3,5])}};});
 for(const n of females)if(n.roleClass==='service'&&!maidJewelryAllowed({role:'maid'},itemById(n.appearance.ornament)))n.appearance.ornament='hair-5';
 s.npcs=[...females,...s.npcs.filter(n=>n.gender==='male')];
 const royalSurname=pick(s,ROYAL_SURNAMES);
 const previous=s.legacy.lastPortraits||{};s.legacy.lastPortraits={};
 for(const n of shuffle(s,s.npcs.filter(n=>n.gender==='male'))){
  n.name=name('male',['emperor','prince'].includes(n.id)?royalSurname:null);
  n.age=range(s,20,32);
  n.portraitVariant=pick(s,MALE_PORTRAIT_VARIANTS.filter(v=>v!==previous[n.id]));s.legacy.lastPortraits[n.id]=n.portraitVariant;
 }
 capImperialNpcAges(s);
 const consorts=females.filter(n=>n.roleClass==='consort').sort((a,b)=>b.courtRank-a.courtRank);
 s.world.residents={lotus:consorts[0].id,moon:consorts[1].id};s.courtVersion=12;
 s.legacy.lastWorldNames=[s.p.name,s.p.family.father,s.p.family.mother,...s.npcs.map(n=>n.name)];
}
