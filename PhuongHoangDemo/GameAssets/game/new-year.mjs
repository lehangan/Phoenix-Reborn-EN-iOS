import {maidJewelryAllowed} from './maid-rules.mjs';
import {validVipFace,vipFaceForSeed} from './vip-faces.mjs';
import {ITEMS,itemById} from './inventory.mjs';
import {chooseName,worldNames} from './names.mjs';
import {FACIAL_VARIANTS,MOUTH_VARIANTS,EYE_VARIANTS,HUADIAN_NAMES} from './facial-features.mjs';
import {HAIRSTYLES} from './hairstyles.mjs';
import {grant,addLog,checkAchievements} from './life-engine.mjs';
import {inColdPalace} from './cold-palace.mjs';

export const NEW_YEAR_WISHES=[
 'Chúc nàng năm mới an khang, mọi điều mong ước đều thành sự thật.',
 'Mong một năm mới bình an, lòng luôn nhẹ nhõm như gió xuân.',
 'Chúc nàng tài hoa thêm rạng rỡ, phúc lành luôn ghé cửa.',
 'Mong những chuyện buồn ở lại năm cũ, từ nay chỉ đón tin vui.',
 'Chúc nàng và người thương luôn mạnh khỏe, gặp nhau trong tiếng cười.',
 'Pháo hoa đã nở trên hồ! Chúc năm mới của nàng cũng rực rỡ như vậy.',
 'Chúc nàng gặp nhiều may mắn, rút được một món quà thật vừa ý.',
 'Một chén trà xuân, một lời chúc tốt lành. Mong nàng luôn được bình yên.'
];
export const FESTIVAL_LOTTERY=[['silver',35],['robe',25],['hair',25],['pet',5],['none',10]];
const copy=o=>JSON.parse(JSON.stringify(o));
function randomSource(seed){let x=seed>>>0;const random=()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;};return {random,integer:(a,b)=>a+Math.floor(random()*(b-a+1)),pick:a=>a[Math.floor(random()*a.length)],shuffle:a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}};}
function seedFor(s,year){let h=(s.rng^Math.imul(year,2654435761)^s.legacy.lives)>>>0;for(const ch of s.p.name)h=Math.imul(h^ch.charCodeAt(0),16777619)>>>0;return h;}
const giftPool=type=>ITEMS.filter(i=>i.type===type&&(type==='pet'||i.unlock==='chest'));
function chooseGift(r,s){
 let roll=r.random()*100,type='none';for(const [kind,weight] of FESTIVAL_LOTTERY){if(roll<weight){type=kind;break;}roll-=weight;}
 if(type==='none')return {type};if(type==='silver')return {type,amount:r.integer(35,120)};
 const available=giftPool(type),fresh=available.filter(i=>!s.p.inventory.includes(i.id)),pool=fresh.length?fresh:available,weights=[50,30,15,5];
 let ticket=r.random()*pool.reduce((sum,i)=>sum+weights[i.rarity],0),item=pool.at(-1);for(const i of pool){ticket-=weights[i.rarity];if(ticket<0){item=i;break;}}
 return {type,item:item.id,duplicateSilver:60};
}
function festivalLoans(s,seed){
 const r=randomSource(seed^0x4e59524c),sample=type=>r.shuffle(ITEMS.filter(i=>i.type===type&&maidJewelryAllowed(s.p,i))).slice(0,5).map(i=>i.id);
 return s.p.role==='maid'?{loans:sample('robe'),loanJewelry:sample('hair')}:{loans:[],loanJewelry:[]};
}
export function migrateNewYear(s){
 s.festival??=null;s.p.lastFestivalYear??=0;const g=s.festival;
 if(g?.version===1){
  // Retire the old first-year invitation without touching the normal monthly queue or earned rewards.
  if(g.year===1&&g.month===0&&s.p.months===0){s.festival=null;return s;}
  Object.assign(g,festivalLoans(s,g.seed));g.version=2;g.wardrobeType='robe';g.ornament=s.p.appearance.ornament||null;
  if(!festivalOutfits(s).some(i=>i.id===g.robe))g.robe=s.p.appearance.robe;
  g.playerLook={...(g.playerLook||s.p.appearance),robe:g.robe,ornament:g.ornament};
 }
 // Replace only formerly permitted expensive loan jewelry, without rerolling rewards or RNG.
 if(s.p.role==='maid'&&Array.isArray(g?.loanJewelry)){
  const allowed=ITEMS.filter(i=>i.type==='hair'&&maidJewelryAllowed(s.p,i));
  g.loanJewelry=g.loanJewelry.map((id,index)=>{
   const old=itemById(id);if(old?.type!=='hair'||maidJewelryAllowed(s.p,old))return id;
   const available=allowed.filter(i=>!g.loanJewelry.includes(i.id));
   const replacement=available[((g.seed>>>0)+index)%available.length]?.id;
   if(replacement)g.loanJewelry[index]=replacement;
   return replacement||id;
  });
 }
 return s;
}
export function festivalEligible(s){return s.p.months>=12&&!!s.p.alive&&!s.intro&&!s.p.outside&&!s.p.prison&&!inColdPalace(s);}
export function queueNewYear(s){
 migrateNewYear(s);const p=s.p,year=Math.floor(p.months/12)+1;
 if(!festivalEligible(s)||p.months%12!==0||s.festival||p.lastFestivalYear>=year)return false;
 const seed=seedFor(s,year),r=randomSource(seed),robes=giftPool('robe'),jewels=giftPool('hair'),used=new Set(worldNames(s));
 // The inner-palace gathering combines existing full-body court women with visiting guests.
 // Seeing the crowd is not a conversation and does not unlock relationship farming.
 const known=s.npcs.filter(n=>n.alive&&n.gender==='female').map(n=>({id:n.id,sourceId:n.id,name:n.name,role:n.role,appearance:copy(n.appearance)}));
 const visitors=Array.from({length:12},(_,i)=>{const name=chooseName(r.pick,{used});return {id:`guest-${year}-${i}`,sourceId:null,name,role:r.pick(['Cung nhân dự yến','Khách mừng xuân','Nữ quan dự yến']),appearance:{vipFace:vipFaceForSeed(seed^Math.imul(i+1,2654435761)),face:r.integer(0,2),eyes:r.integer(0,EYE_VARIANTS-1),nose:r.integer(0,FACIAL_VARIANTS-1),mouth:r.integer(0,MOUTH_VARIANTS-1),front:r.integer(0,HAIRSTYLES.length-1),back:r.integer(0,2),huadian:r.integer(0,HUADIAN_NAMES.length-1),robe:r.pick(robes).id,ornament:r.pick(jewels).id}};});
 const guests=r.shuffle([...known,...visitors]).slice(0,9),speakers=r.shuffle(guests.map((_,i)=>i)).slice(0,3),wishes=r.shuffle(NEW_YEAR_WISHES).slice(0,3).map((text,i)=>({guest:speakers[i],text}));
 s.festival={version:2,year,month:p.months,seed,phase:'invite',robe:p.appearance.robe,ornament:p.appearance.ornament||null,wardrobeType:'robe',...festivalLoans(s,seed),guests,wishes,wishIndex:0,playerLook:copy(p.appearance),gift:chooseGift(r,s),receipt:null};
 p.lastFestivalYear=year;addLog(s,`Mùng một tháng Giêng · Năm ${year}: Hoàng cung mở tiệc mừng xuân, mời nàng tới quảng trường ven hồ xem pháo hoa.`,'festival');return true;
}
export function festivalOutfits(s,type='robe'){const g=s.festival;if(!g||!['robe','hair'].includes(type))return [];const loans=s.p.role==='maid'?(type==='robe'?g.loans:g.loanJewelry):[];return [...new Set([...s.p.inventory.filter(id=>itemById(id)?.type===type),...(loans||[])])].map(itemById).filter(i=>maidJewelryAllowed(s.p,i));}
function ready(s,phase){return festivalEligible(s)&&s.festival?.phase===phase;}
export function acceptFestival(s){if(!ready(s,'invite'))return {error:'Không có lời mời tiệc đầu năm.'};s.festival.phase='dress';return {ok:true};}
export function chooseFestivalRobe(s,id){if(!ready(s,'dress')||!festivalOutfits(s).some(i=>i.id===id))return {error:'Y phục này không có trong phòng thay đồ dự tiệc.'};s.festival.robe=id;return {ok:true};}
export function festivalWardrobeTab(s,type){if(!ready(s,'dress')||!['robe','hair'].includes(type))return {error:'Không có ngăn đồ này.'};s.festival.wardrobeType=type;return {ok:true};}
export function chooseFestivalJewelry(s,id){if(!ready(s,'dress')||id!==null&&!festivalOutfits(s,'hair').some(i=>i.id===id))return {error:'Trang sức này không có trong phòng thay đồ dự tiệc.'};s.festival.ornament=id;return {ok:true};}
export function enterFestival(s){
 if(!ready(s,'dress')||!festivalOutfits(s).some(i=>i.id===s.festival.robe))return {error:'Hãy chọn y phục dự tiệc trước.'};
 const g=s.festival;if(g.ornament!==null&&!festivalOutfits(s,'hair').some(i=>i.id===g.ornament))return {error:'Hãy chọn trang sức trong phòng thay đồ dự tiệc.'};g.playerLook={...copy(s.p.appearance),robe:g.robe,ornament:g.ornament};g.phase='fireworks';addLog(s,`Nàng mặc ${itemById(g.robe).name}${g.ornament?', cài '+itemById(g.ornament).name:''}, tới quảng trường xem pháo hoa cùng chín khách dự tiệc.`,'festival');return {ok:true};
}
export function nextFestivalWish(s){if(!ready(s,'fireworks'))return {error:'Tiết mục chúc xuân đã khép.'};const g=s.festival;if(g.wishIndex<2)g.wishIndex++;else g.phase='lottery';return {ok:true};}
export function drawFestivalGift(s){
 const g=s.festival;if(g?.phase==='result'&&g.receipt)return {ok:true,receipt:g.receipt};if(!ready(s,'lottery'))return {error:'Hãy xem pháo hoa và nghe những lời chúc trước khi rút thăm.'};
 const gift=g.gift;let receipt;
 if(gift.type==='none')receipt={type:'none',text:'Lá thăm ghi: Bình an là phúc. Năm nay nàng chưa nhận được vật phẩm; chúc nàng may mắn trong năm tới!'};
 else if(gift.type==='silver'){const amount=Math.min(gift.amount,999999-s.p.silver);s.p.silver+=amount;receipt={type:'silver',amount,text:`Lộc đầu xuân: ${amount} bạc đã vào túi.`};}
 else if(grant(s,gift.item,'Rút thăm tiệc đầu năm',false))receipt={type:gift.type,item:gift.item,text:`Nàng rút được ${itemById(gift.item).name}. Quà đã được cất vào túi đồ.`};
 else {const amount=Math.min(gift.duplicateSilver,999999-s.p.silver);s.p.silver+=amount;receipt={type:'silver',amount,text:`Món quà đã có trong túi, người giữ lễ đổi thành ${amount} bạc mừng xuân.`};}
 g.receipt=receipt;g.phase='result';addLog(s,`Rút thăm năm ${g.year}: ${receipt.text}`,'festival');checkAchievements(s);return {ok:true,receipt};
}
export function leaveFestival(s){const g=s.festival;if(!g||!['invite','dress','result'].includes(g.phase))return {error:'Buổi tiệc vẫn đang diễn ra. Có thể đóng bảng để tiếp tục sau.'};addLog(s,g.phase==='result'?'Tiệc đầu năm khép lại. Nàng trở về viện, tiếp tục những việc còn lại trong tháng.':'Nàng xin vắng mặt trong tiệc đầu năm.','festival');s.festival=null;return {ok:true};}
export function validateNewYear(s){
 migrateNewYear(s);const g=s.festival,p=s.p,int=(v,a,b)=>Number.isInteger(v)&&v>=a&&v<=b;
 if(!int(p.lastFestivalYear,0,Math.floor(p.months/12)+1))throw Error('Năm dự tiệc không hợp lệ.');if(!g)return;
 const robe=id=>itemById(id)?.type==='robe';
 const appearance=a=>a&&validVipFace(a.vipFace)&&['face','back'].every(k=>int(a[k],0,2))&&int(a.eyes,0,EYE_VARIANTS-1)&&int(a.nose,0,FACIAL_VARIANTS-1)&&int(a.mouth,0,MOUTH_VARIANTS-1)&&int(a.front,0,HAIRSTYLES.length-1)&&(a.huadian==null||int(a.huadian,0,HUADIAN_NAMES.length-1))&&robe(a.robe)&&(!a.ornament||itemById(a.ornament)?.type==='hair');
 if(g.version!==2||!festivalEligible(s)||g.month!==p.months||g.month%12!==0||g.year!==Math.floor(g.month/12)+1||p.lastFestivalYear!==g.year||!int(g.seed,0,4294967295)||!['invite','dress','fireworks','lottery','result'].includes(g.phase))throw Error('Tiệc đầu năm không hợp lệ.');
 const count=p.role==='maid'?5:0,validLoans=(ids,type)=>Array.isArray(ids)&&ids.length===count&&new Set(ids).size===count&&ids.every(id=>itemById(id)?.type===type);
 if(!validLoans(g.loans,'robe')||!validLoans(g.loanJewelry,'hair')||!['robe','hair'].includes(g.wardrobeType)||!festivalOutfits(s).some(i=>i.id===g.robe)||g.ornament!==null&&!festivalOutfits(s,'hair').some(i=>i.id===g.ornament)||!appearance(g.playerLook))throw Error('Y phục dự tiệc không hợp lệ.');
 if(['fireworks','lottery','result'].includes(g.phase)&&(g.playerLook.robe!==g.robe||g.playerLook.ornament!==g.ornament))throw Error('Ngoại hình dự tiệc không khớp đồ đã chọn.');
 if(!Array.isArray(g.guests)||g.guests.length!==9||new Set(g.guests.map(n=>n.id)).size!==9||g.guests.some(n=>typeof n.id!=='string'||typeof n.name!=='string'||n.name.length>60||typeof n.role!=='string'||n.role.length>60||!appearance(n.appearance)||n.sourceId!==null&&!s.npcs.some(x=>x.id===n.sourceId&&x.gender==='female')))throw Error('Khách dự tiệc không hợp lệ.');
 if(!Array.isArray(g.wishes)||g.wishes.length!==3||g.wishes.some(w=>!int(w.guest,0,8)||!NEW_YEAR_WISHES.includes(w.text))||!int(g.wishIndex,0,2)||['lottery','result'].includes(g.phase)&&g.wishIndex!==2)throw Error('Lời chúc năm mới không hợp lệ.');
 const gift=g.gift;if(!gift||!FESTIVAL_LOTTERY.some(([kind])=>kind===gift.type)||(gift.type==='silver'?!int(gift.amount,35,120):!['none','silver'].includes(gift.type)&&(itemById(gift.item)?.type!==gift.type||gift.duplicateSilver!==60)))throw Error('Lá thăm không hợp lệ.');
 if(g.phase==='result'){const r=g.receipt;if(!r||typeof r.text!=='string'||!['none','silver','robe','hair','pet'].includes(r.type)||(r.type==='silver'?!int(r.amount,0,120):r.type!=='none'&&(itemById(r.item)?.type!==r.type||!p.inventory.includes(r.item))))throw Error('Quà đầu năm không hợp lệ.');}else if(g.receipt!==null)throw Error('Quà chưa được rút.');
}
