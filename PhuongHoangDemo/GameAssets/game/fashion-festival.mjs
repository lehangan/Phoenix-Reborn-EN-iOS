import {amnesiaNightBlocked} from './imperial-secret.mjs';
import {ensureFashionCourt} from './court.mjs';
import {ITEMS,itemById} from './inventory.mjs';
import {COLOR_GROUPS,WEARABLE_COLORS} from './wearable-colors.mjs';
import {age,addLog} from './life-engine.mjs';
import {inColdPalace} from './cold-palace.mjs';
import {validVipFace} from './vip-faces.mjs';
import {FACIAL_VARIANTS,MOUTH_VARIANTS,EYE_VARIANTS,HUADIAN_NAMES} from './facial-features.mjs';
import {HAIRSTYLES} from './hairstyles.mjs';
import {initializeFashionCeremony,fashionAwardStep,grantFashionPrize,FASHION_CEREMONY_STEPS,validateFashionAwards} from './fashion-awards.mjs';

const copy=x=>JSON.parse(JSON.stringify(x));
export const FASHION_PRAISE=[
 'Sân son hôm nay rực rỡ như một bức gấm. Tiếng nhạc hòa cùng hương hoa, thật xứng một ngày hội chốn cung đình.',
 'Mỗi nàng một vẻ, mỗi bộ xiêm y một nét tài hoa. Sắc màu hài hòa khiến cả sân cung như bừng sáng.',
 'Trẫm rất hài lòng. Giờ là lúc xướng danh và ban thưởng những giai nhân của lễ hội năm nay.'
];
const THEME_NAMES={white:['Bạch Ngọc Thanh Hoa','Mây Trắng Qua Thềm'],black:['Huyền Dạ Ngọc Châu','Mực Trầm Ánh Ngọc'],gray:['Ngân Sương Cẩm Tú','Khói Ngọc Sân Rồng'],red:['Hồng Liên Thịnh Yến','Đan Phượng Vũ Khúc'],orange:['Hoàng Hôn Cẩm Điện','Ánh Cam Ngày Hội'],yellow:['Kim Quang Ngự Yến','Nắng Vàng Cung Gấm'],green:['Bích Diệp Thanh Xuân','Lục Liễu Sân Son'],teal:['Ngọc Bích Hồ Thu','Thanh Ngọc Vân Thường'],blue:['Lam Thiên Cẩm Hội','Sóng Biếc Ngự Viên'],purple:['Tử Vân Thiên Hương','Tím Ngọc Đêm Yến'],pink:['Đào Hoa Cẩm Mộng','Phấn Hồng Ngự Yến'],brown:['Trầm Hương Cổ Vận','Nâu Gấm Chiều Thu']};
const LUXURY_THEME_NAMES=['Cẩm Tú Ngự Yến','Thanh Nhã Cung Đình','Xiêm Y Hoa Hội','Ngọc Điện Giai Nhân'];
function rng(seed){let x=seed>>>0;const next=()=>((x=(Math.imul(x,1664525)+1013904223)>>>0)/4294967296);return {pick:a=>a[Math.floor(next()*a.length)],integer:(a,b)=>a+Math.floor(next()*(b-a+1)),shuffle:a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(next()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}};}
export function pickFashionWinnerIndex(r){
 // 35 equal tickets: player gets 7 (20%); each of seven NPCs gets 4 (80% / 7).
 const ticket=r.integer(0,34);
 return ticket<7?0:1+Math.floor((ticket-7)/4);
}
const catalog=type=>ITEMS.filter(i=>i.type===type);
const validFashionLook=a=>{
 const int=(v,a,b)=>Number.isInteger(v)&&v>=a&&v<=b;
 return a&&validVipFace(a.vipFace)&&['face','back'].every(k=>int(a[k],0,2))&&int(a.eyes,0,EYE_VARIANTS-1)&&int(a.nose,0,FACIAL_VARIANTS-1)&&int(a.mouth,0,MOUTH_VARIANTS-1)&&int(a.front,0,HAIRSTYLES.length-1)&&(a.huadian==null||int(a.huadian,0,HUADIAN_NAMES.length-1))&&itemById(a.robe)?.type==='robe'&&(a.ornament==null||itemById(a.ornament)?.type==='hair');
};
function recordFashionHonor(s){
 const g=s.fashion,h=s.p.fashionHonors;
 if(g?.winnerIndex!==0||!['winner','night'].includes(g.phase)||g.year<=h.lastYear)return;
 Object.assign(h,{wins:h.wins+1,lastYear:g.year,ageMonths:s.p.ageMonths,appearance:copy(g.playerLook)});
}
function migrateFashionHonors(s){
 const p=s.p;
 if(p.fashionHonors!==undefined)return;
 // Recover only victories still evidenced by the old save's journal, once per year.
 const wins=new Map();
 for(const l of s.log||[]){const m=/^Hoa khôi lễ hội năm (\d+): (.+)\.$/u.exec(l.text||'');if(l.kind==='festival'&&m&&m[2]===p.name&&Number(m[1])<=p.lastFashionYear&&Number.isInteger(l.age)&&l.age>=156&&l.age<=1500)wins.set(Number(m[1]),l);}
 const years=[...wins.keys()].sort((a,b)=>a-b),lastYear=years.at(-1)||0;
 p.fashionHonors={wins:years.length,lastYear,ageMonths:lastYear?wins.get(lastYear).age:0,appearance:lastYear?copy(s.fashion?.year===lastYear?s.fashion.playerLook||p.appearance:p.appearance):null};
 recordFashionHonor(s);
}
export const fashionEligible=s=>!!s.p.alive&&!s.intro&&!s.p.outside&&!s.p.prison&&!inColdPalace(s)&&['maid','candidate','consort'].includes(s.p.role)&&s.npcs.some(n=>n.id==='emperor'&&n.alive);
export function migrateFashion(s){
 s.fashion??=null;s.p.lastFashionYear??=0;s.p.fashionAwards??=[];migrateFashionHonors(s);
 // Keep an existing v79 festival, outfits and winner; drop its extra luxury rule.
 const g=s.fashion;
 if(g?.version===1){
  if(g.phase!=='invite'){
   const t=g.theme;
   if(!t||!THEME_NAMES[t.color]?.includes(t.name)||!['below','above','between'].includes(t.kind)||!Number.isInteger(t.low)||!Number.isInteger(t.high)||t.low<0||t.high<t.low||t.high>200)throw Error('Chủ đề thời trang cũ không hợp lệ.');
   g.theme={requirement:'color',color:t.color,name:t.name};
  }
  g.version=2;
 }
 // Upgrade the dressing room before entry; keep loans, selections and the draw.
 // Festivals already inside finish under the requirements accepted on entry.
 if(g?.version===2&&g.phase==='dress'){
  const t=g.theme,int=v=>Number.isInteger(v),validColor=t?.requirement==='color'&&THEME_NAMES[t.color]?.includes(t.name)&&t.kind==null&&t.low==null&&t.high==null,validLuxury=t?.requirement==='luxury'&&t.color==null&&LUXURY_THEME_NAMES.includes(t.name)&&['below','above','between'].includes(t.kind)&&int(t.low)&&int(t.high)&&t.low>=0&&t.low<=150&&t.high>=t.low&&t.high<=(t.kind==='above'?200:150)&&(t.kind!=='above'||t.high===200)&&(t.kind!=='below'||t.low===0);
  if(!validColor&&!validLuxury)throw Error('Chủ đề thời trang cũ không hợp lệ.');
  const r=rng(g.seed),theme=makeTheme(r),pairs=r.shuffle(themedPairs(theme));
  if(!Array.isArray(g.guests)||g.guests.length!==7)throw Error('Khách dự hội không hợp lệ.');
  g.theme=theme;g.guests=g.guests.map((n,i)=>({...n,appearance:{...n.appearance,robe:pairs[i].robe,ornament:pairs[i].ornament}}));g.version=3;
 }
 // An interrupted old draw keeps the previously selected winner.
 if(g&&['draw','spinning'].includes(g.phase)){initializeFashionCeremony(g);g.phase='awards';}
 // A June event may change the player's status before the invitation is opened.
 if(s.fashion?.phase==='invite'&&!fashionEligible(s))s.fashion=null;
 return s;
}
export function queueFashionFestival(s){
 migrateFashion(s);const p=s.p,year=Math.floor(p.months/12)+1;
 if(!fashionEligible(s)||p.months%12!==5||s.fashion||p.lastFashionYear>=year)return false;
 ensureFashionCourt(s);
 let seed=(s.rng^Math.imul(year,0x9e3779b1)^s.legacy.lives^0x46415348)>>>0;for(const ch of p.name)seed=Math.imul(seed^ch.charCodeAt(0),16777619)>>>0;
 s.fashion={version:3,month:p.months,year,seed,phase:'invite'};p.lastFashionYear=year;
 addLog(s,`Tháng 6 · Năm ${year}: Lễ hội thời trang cung đình mở hội sau chuyện trong tháng.`,'festival');return true;
}
export const fashionReady=s=>!!s.fashion&&fashionEligible(s)&&!s.event&&!s.story&&!s.result&&!s.exam&&!s.mini&&!s.decree&&!s.coronation&&!s.festival&&!s.lake&&!s.imperialNight&&!s.guqin&&!s.caro&&!s.notices.length;
export function outfitDetails(robe,ornament){const pieces=[itemById(robe),itemById(ornament)].filter(Boolean);return {luxury:pieces.reduce((sum,i)=>sum+i.luxury,0),colors:[...new Set(pieces.flatMap(i=>WEARABLE_COLORS[i.id]||[]))]};}
export function luxuryMatches(rule,value){return rule.kind==='below'?value<rule.high:rule.kind==='above'?value>rule.low:rule.kind==='between'&&value>=rule.low&&value<=rule.high;}
export const luxuryLabel=rule=>rule.kind==='below'?`Dưới ${rule.high}`:rule.kind==='above'?`Trên ${rule.low}`:`Từ ${rule.low} đến ${rule.high}`;
export const outfitMatches=(theme,robe,ornament)=>{const d=outfitDetails(robe,ornament);return (theme.requirement==='luxury'||d.colors.includes(theme.color))&&(theme.requirement==='color'||luxuryMatches(theme,d.luxury));};
function themedPairs(theme){const robes=catalog('robe'),jewels=catalog('hair');return robes.flatMap(r=>jewels.filter(j=>(theme.requirement==='luxury'||r.colors.includes(theme.color)||j.colors.includes(theme.color))&&(theme.requirement==='color'||luxuryMatches(theme,r.luxury+j.luxury))).map(j=>({robe:r.id,ornament:j.id,luxury:r.luxury+j.luxury})));}
function makeTheme(r){
 const color=r.pick(COLOR_GROUPS).id,kind=r.pick(['below','above','between']),pairs=themedPairs({requirement:'color',color}),rules=[];
 for(let threshold=30;threshold<=150;threshold+=10){
  const rule=kind==='below'?{kind,low:0,high:threshold}:kind==='above'?{kind,low:threshold,high:200}:{kind,low:Math.max(0,threshold-30),high:threshold};
  if(pairs.filter(p=>luxuryMatches(rule,p.luxury)).length>=7)rules.push(rule);
 }
 if(!rules.length)rules.push({kind:'between',low:0,high:150});
 return {requirement:'both',color,...r.pick(rules),name:r.pick(THEME_NAMES[color])};
}
export function fashionOutfits(s,type='robe'){
 const g=s.fashion;if(!g||!['robe','hair'].includes(type))return [];
 const ids=g.mode==='loan'?(type==='robe'?g.loans:g.loanJewelry):s.p.inventory;
 return [...new Set(ids||[])].map(itemById).filter(i=>i?.type===type);
}
export function acceptFashionFestival(s){
 const g=s.fashion;if(g?.phase!=='invite'||!fashionReady(s))return {error:'Hãy giải quyết chuyện tháng 6 trước khi dự hội.'};
 const guests=s.npcs.filter(n=>n.alive&&n.gender==='female');if(guests.length<7)return {error:'Triều đình chưa đủ bảy khách dự hội.'};
 const r=rng(g.seed),theme=makeTheme(r),mode=s.p.role==='maid'?'loan':'owned';
 const loans=mode==='loan'?r.shuffle(catalog('robe')).slice(0,5).map(i=>i.id):[],loanJewelry=mode==='loan'?r.shuffle(catalog('hair')).slice(0,5).map(i=>i.id):[];
 const pairs=r.shuffle(themedPairs(theme));
 if(pairs.length<7)return {error:'Chưa đủ y phục phù hợp với chủ đề.'};
 Object.assign(g,{version:3,mode,theme,loans,loanJewelry,wardrobeType:'robe',guests:r.shuffle(guests).slice(0,7).map((n,i)=>({id:n.id,name:n.name,age:n.age,appearance:{...copy(n.appearance),robe:pairs[i].robe,ornament:pairs[i].ornament}})),winnerIndex:pickFashionWinnerIndex(r),praiseIndex:0,playerLook:null,phase:'dress'});
 const robes=fashionOutfits(s),jewels=fashionOutfits(s,'hair');
 g.robe=robes.find(i=>i.id===s.p.appearance.robe)?.id??robes[0]?.id??null;
 g.ornament=jewels.find(i=>i.id===s.p.appearance.ornament)?.id??(mode==='loan'?jewels[0]?.id:null)??null;
 return {ok:true};
}
export function fashionWardrobeTab(s,type){if(s.fashion?.phase!=='dress'||!fashionReady(s)||!['robe','hair'].includes(type))return {error:'Chưa mở tủ đồ dự hội.'};s.fashion.wardrobeType=type;return {ok:true};}
export function chooseFashionOutfit(s,type,id){
 const g=s.fashion;if(g?.phase!=='dress'||!fashionReady(s)||!['robe','hair'].includes(type)||!(type==='hair'&&id===null)&&!fashionOutfits(s,type).some(i=>i.id===id))return {error:'Hãy chọn đồ trong tủ dự hội.'};
 g[type==='robe'?'robe':'ornament']=id;return {ok:true};
}
export function fashionEntryCheck(s){
 const g=s.fashion;if(!g?.theme)return {valid:false,color:false,luxury:false,owned:false,total:0};
 const d=outfitDetails(g.robe,g.ornament),owned=fashionOutfits(s).some(i=>i.id===g.robe)&&(g.ornament===null||fashionOutfits(s,'hair').some(i=>i.id===g.ornament)),color=g.theme.requirement==='luxury'||d.colors.includes(g.theme.color),luxury=g.theme.requirement==='color'||luxuryMatches(g.theme,d.luxury);
 return {valid:owned&&color&&luxury,owned,color,luxury,total:d.luxury};
}
export function enterFashionFestival(s){
 const g=s.fashion;if(g?.phase!=='dress'||!fashionReady(s)||!fashionEntryCheck(s).valid)return {error:'Bộ phối chưa đạt yêu cầu của chủ đề.'};
 g.playerLook={...copy(s.p.appearance),robe:g.robe,ornament:g.ornament};g.phase='scene';
 addLog(s,`Nàng dự Lễ hội thời trang cung đình · ${g.theme.name}, mặc ${itemById(g.robe).name}${g.ornament?', cài '+itemById(g.ornament).name:''}.`,'festival');return {ok:true};
}
export function nextFashionPraise(s){
 const g=s.fashion;if(g?.phase!=='scene'||!fashionReady(s))return {error:'Chưa đến buổi lễ.'};
 if(g.praiseIndex<FASHION_PRAISE.length-1)g.praiseIndex++;
 else{initializeFashionCeremony(g);g.phase='awards';}
 return {ok:true};
}
export function advanceFashionCeremony(s,expectedStep){
 const g=s.fashion;
 if(g?.phase!=='awards'||!fashionReady(s)||expectedStep!==undefined&&expectedStep!==g.ceremony.step)return {error:'Lễ xướng danh chưa sẵn sàng.'};
 if(g.ceremony.step===FASHION_CEREMONY_STEPS.length-1){
  g.phase='winner';recordFashionHonor(s);addLog(s,`Hoa khôi lễ hội năm ${g.year}: ${fashionWinner(s).name}.`,'festival');
 }else{
  g.ceremony.step++;
  const step=fashionAwardStep(g);if(step.kind==='award')grantFashionPrize(s,step.rank);
 }
 return {ok:true};
}
export const FASHION_SKIP_COST=50;
export function skipFashionCg(s){
 const g=s.fashion;
 if(!g||!['scene','awards'].includes(g.phase)||g.skipPaid||!fashionReady(s))return {error:'Không có CG Hoa khôi đang chờ để bỏ qua.'};
 if(s.p.silver<FASHION_SKIP_COST)return {error:`Cần đủ ${FASHION_SKIP_COST} bạc để bỏ qua CG.`};
 if(g.phase==='scene'){
  // A saved ranking is authoritative, including a ceremony resumed before speeches end.
  if(!g.ceremony)initializeFashionCeremony(g);
  g.praiseIndex=FASHION_PRAISE.length-1;g.phase='awards';
 }
 s.p.silver-=FASHION_SKIP_COST;
 // Use the same settlement path as watching. Already granted awards are not repeated.
 while(g.phase==='awards')advanceFashionCeremony(s);
 g.skipPaid=true;
 addLog(s,`Nàng dùng ${FASHION_SKIP_COST} bạc bỏ qua CG Hoa khôi; kết quả và phần thưởng được giữ nguyên.`,'festival');
 return {ok:true};
}
// Legacy callers can resume a saved old draw, but cannot bypass the ceremony.
export function drawFashionWinner(s){migrateFashion(s);return advanceFashionCeremony(s);}
export function revealFashionWinner(s){return {error:'Hãy hoàn tất lễ xướng danh.'};}
export function fashionWinner(s){const g=s.fashion;if(!g?.guests)return null;return g.winnerIndex===0?{id:'player',name:s.p.name,age:age(s.p),appearance:g.playerLook}:g.guests[g.winnerIndex-1];}
export const fashionRewardReady=s=>s.fashion?.phase==='winner'&&fashionWinner(s)?.id==='player'&&fashionReady(s);
// A festival is an extra summons, including if a normal summons happened in June.
export const fashionJadeReason=s=>age(s.p)<18?'underage':s.p.pregnancy?'pregnant':null;
export const fashionNightEligible=s=>!amnesiaNightBlocked(s)&&fashionEligible(s)&&age(s.p)>=18&&!s.p.pregnancy;
export function leaveFashionFestival(s){const g=s.fashion;if(!g||!['invite','dress','winner'].includes(g.phase))return {error:'Hãy chờ lễ hội kết thúc.'};addLog(s,g.phase==='winner'?'Lễ hội thời trang khép lại. Nàng trở về viện.':'Nàng xin rút lui khỏi Lễ hội thời trang cung đình.','festival');s.fashion=null;return {ok:true};}
export function validateFashion(s){
 migrateFashion(s);const g=s.fashion,p=s.p,int=(v,a,b)=>Number.isInteger(v)&&v>=a&&v<=b;
 if(!int(p.lastFashionYear,0,Math.floor(p.months/12)+1))throw Error('Năm dự hội không hợp lệ.');
 const h=p.fashionHonors;
 if(!h||!int(h.wins,0,p.lastFashionYear)||!int(h.lastYear,h.wins,p.lastFashionYear)||(h.wins===0?h.lastYear!==0||h.ageMonths!==0||h.appearance!==null:!int(h.ageMonths,156,1500)||!validFashionLook(h.appearance)))throw Error('Thành tích hoa khôi không hợp lệ.');
 validateFashionAwards(s);
 if(!g)return;
 if(g.skipPaid!==undefined&&(g.skipPaid!==true||!['winner','night'].includes(g.phase)||!g.ceremony))throw Error('Phí bỏ qua CG không hợp lệ.');
 if(![2,3].includes(g.version)||!fashionEligible(s)||g.month!==p.months||g.month%12!==5||g.year!==Math.floor(p.months/12)+1||p.lastFashionYear!==g.year||!int(g.seed,0,4294967295)||!['invite','dress','scene','awards','winner','night'].includes(g.phase))throw Error('Lễ hội thời trang không hợp lệ.');
 if(g.phase==='invite')return;
 if(s.event||s.story||s.result||s.exam||s.mini||s.decree||s.coronation||s.festival||s.lake||s.guqin||s.caro||s.notices.length)throw Error('Lễ hội chưa đến lượt.');
 const t=g.theme;
 const validColor=t?.requirement==='color'&&THEME_NAMES[t.color]?.includes(t.name)&&t.kind==null&&t.low==null&&t.high==null;
 const validLuxury=t?.requirement==='luxury'&&t.color==null&&LUXURY_THEME_NAMES.includes(t.name)&&['below','above','between'].includes(t.kind)&&int(t.low,0,150)&&int(t.high,t.low,t.kind==='above'?200:150)&&(t.kind!=='above'||t.high===200)&&(t.kind!=='below'||t.low===0);
 const validBoth=t?.requirement==='both'&&THEME_NAMES[t.color]?.includes(t.name)&&['below','above','between'].includes(t.kind)&&int(t.low,0,150)&&int(t.high,t.low,t.kind==='above'?200:150)&&(t.kind!=='above'||t.high===200)&&(t.kind!=='below'||t.low===0);
 if(g.version===3?!validBoth:!validColor&&!validLuxury)throw Error('Chủ đề thời trang không hợp lệ.');
 const count=g.mode==='loan'?5:0,loans=(a,type)=>Array.isArray(a)&&a.length===count&&new Set(a).size===count&&a.every(id=>itemById(id)?.type===type);
 if(!['loan','owned'].includes(g.mode)||(g.mode==='loan')!==(p.role==='maid')||!loans(g.loans,'robe')||!loans(g.loanJewelry,'hair')||!['robe','hair'].includes(g.wardrobeType)||!int(g.winnerIndex,0,7)||!int(g.praiseIndex,0,2)||g.robe!==null&&!fashionOutfits(s).some(i=>i.id===g.robe)||g.ornament!==null&&!fashionOutfits(s,'hair').some(i=>i.id===g.ornament))throw Error('Tủ đồ dự hội không hợp lệ.');
 const look=a=>a&&validVipFace(a.vipFace)&&['face','back'].every(k=>int(a[k],0,2))&&int(a.eyes,0,EYE_VARIANTS-1)&&int(a.nose,0,FACIAL_VARIANTS-1)&&int(a.mouth,0,MOUTH_VARIANTS-1)&&int(a.front,0,HAIRSTYLES.length-1)&&(a.huadian==null||int(a.huadian,0,HUADIAN_NAMES.length-1))&&itemById(a.robe)?.type==='robe'&&(a.ornament===null||itemById(a.ornament)?.type==='hair');
 if(!Array.isArray(g.guests)||g.guests.length!==7||new Set(g.guests.map(n=>n.id)).size!==7||new Set(g.guests.map(n=>n.appearance?.robe+':'+n.appearance?.ornament)).size!==7||g.guests.some(n=>!s.npcs.some(x=>x.id===n.id&&x.alive&&x.gender==='female'&&x.name===n.name)||!int(n.age,16,150)||!look(n.appearance)||!outfitMatches(t,n.appearance.robe,n.appearance.ornament)))throw Error('Khách dự hội không hợp lệ.');
 if(g.phase==='dress'){if(g.playerLook!==null)throw Error('Chưa chốt y phục dự hội.');}
 else if(!look(g.playerLook)||g.playerLook.robe!==g.robe||g.playerLook.ornament!==g.ornament||!fashionEntryCheck(s).valid||['awards','winner','night'].includes(g.phase)&&g.praiseIndex!==2)throw Error('Bộ phối dự hội không hợp lệ.');
 if((g.phase==='night')!==(s.imperialNight?.source==='fashion')||g.phase==='night'&&g.winnerIndex!==0)throw Error('Lời mời hoa khôi không hợp lệ.');
}
