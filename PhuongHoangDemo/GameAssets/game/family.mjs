import {emperorInfertile} from './imperial-secret.mjs';
import {activeSisters,isSister} from './female-relationships.mjs';
import {capImperialNpcAges} from './npc-age-rules.mjs';
import {MALE_PORTRAIT_VARIANTS} from './male-portraits-v78.mjs';
import {resolvePosthumousPromotion} from './posthumous.mjs';
import {EMPRESS_RANK,IMPERIAL_NOBLE_CONSORT_RANK,NON_BIRTH_DOWAGER_TITLES} from './life-data.mjs';
import {rand,range,pick,clamp,apply,addLog,die,checkFamilyAchievements,grantServiceRobe,enforceMaidJewelry} from './life-engine.mjs';
import {chooseName,worldNames,familyName} from './names.mjs';
import {equippedPet} from './pets.mjs';
import {CHILD_APTITUDES,aptitudeFromRoll,childAptitude,legacyChildAptitude} from './child-aptitudes.mjs';
import {CHILD_TITLE_AGE_MONTHS,princeTitleFromRoll,childTitleLabel,availableChildHonorifics,validChildHonorific} from './child-titles.mjs';
export {CHILD_APTITUDES,childAptitude} from './child-aptitudes.mjs';
export {childTitleLabel} from './child-titles.mjs';

export const CHILD_STAGES=[['infant','Sơ sinh'],['child','Thiếu nhi'],['teen','Thiếu niên'],['adult','Trưởng thành']];
const hash=text=>[...text].reduce((a,c)=>(Math.imul(a,31)+c.charCodeAt(0))>>>0,7);
export const childAgeMonths=(s,c)=>Math.max(0,s.p.months-c.month);
export const childAge=(s,c)=>Math.floor(childAgeMonths(s,c)/12);
export const childStage=(s,c)=>childAge(s,c)<3?0:childAge(s,c)<10?1:childAge(s,c)<18?2:3;
export function childAgeLabel(s,c){const months=childAgeMonths(s,c);return months<12?months===0?'Mới chào đời':months+' tháng tuổi':Math.floor(months/12)+' tuổi'+(months%12?' '+months%12+' tháng':'');}
export function childPortrait(s,c){const stage=childStage(s,c);return `assets/children/${c.gender==='Hoàng tử'?'male':'female'}-${CHILD_STAGES[stage][0]}-${c.portraits[stage]}.webp`;}
export function childNextMilestone(s,c){if(c.royal===false)return 'Con đỡ đầu · Được yêu thương, chăm sóc qua từng tháng';const a=childAge(s,c);if(c.title==='Hoàng đế')return 'Đã kế vị ngai vàng';if(c.title==='Thái tử')return 'Đông cung · Người kế vị';if(c.secretProxy?.promised&&c.gender==='Hoàng tử')return 'Đủ 1 tuổi sẽ được lập làm Thái tử theo mật chỉ';if(a<6)return 'Đủ 6 tuổi sẽ được xét phong tước';if(c.title==='Hoàng tử'||c.gender==='Công chúa'&&!c.titleHonorific)return 'Đã đủ 6 tuổi · Chờ chiếu sắc phong';if(c.married)return 'Đã xuất giá · '+c.spouse;if(c.gender==='Công chúa')return 'Đủ 18 tuổi sẽ được ban hôn';return 'Đã thụ phong '+childTitleLabel(c);}
export function migrateFamily(s){
 s.p.infertile??=false;s.p.infertilityGrantHandled??=s.p.children?.some(c=>c.adoption?.reason==='infertility')||false;s.adoptionChoice??=null;
 s.dynasty??={death:null};s.dynasty.predecessors??=[];s.dynasty.lastSuccessionMonth??=null;
 if(!Array.isArray(s.p.children))throw Error('Danh sách con cái không hợp lệ.');
 for(const [i,c] of s.p.children.entries()){
  if(!c||typeof c!=='object')throw Error('Hoàng tự không hợp lệ.');
  c.id??=`child-${s.legacy.lives}-${i}`;c.title??=c.gender;c.father??=s.npcs.find(n=>n.id==='emperor')?.name||'Tiên đế';
  c.portraits??=CHILD_STAGES.map((_,stage)=>hash(c.id+':'+c.name+':'+stage)%5);
  c.married??=false;c.spouse??=null;c.milestones??=[];
  c.aptitude??=legacyChildAptitude(s,c);
  // Retain awarded ranks in older saves and add a stable display name without rerolling RNG.
  if(c.titleHonorific==null&&c.gender==='Hoàng tử'&&['Vương gia','Thân vương'].includes(c.title)){
   const names=availableChildHonorifics(s.p.children,c);c.titleHonorific=names[hash(c.id+':'+c.name+':title')%names.length];
  }
 }
}
function notice(s,title,text,child=null,negative=false,kind='family'){s.notices.push({kind,title,text,child:child?.id||null,negative});addLog(s,text,negative?'setback':'family');}
function createRoyalChild(s,month,father){
 const p=s.p;
 const gender=pick(s,['Hoàng tử','Công chúa']);
 const name=chooseName(a=>pick(s,a),{gender:gender==='Hoàng tử'?'male':'female',used:new Set(worldNames(s)),givenOnly:true});
 let serial=p.children.length;while(p.children.some(c=>c.id===`child-${s.legacy.lives}-${serial}`))serial++;
 const child={id:`child-${s.legacy.lives}-${serial}`,name,gender,title:gender,month,father,portraits:CHILD_STAGES.map(()=>range(s,0,4)),married:false,spouse:null,milestones:[]};
 child.aptitude=aptitudeFromRoll(rand(s),equippedPet(s)?.perks.offspringQuality||0);
 return child;
}
export function birthChild(s){
 const p=s.p;if(!p.alive||!p.pregnancy||p.months<p.pregnancy.due||p.ageMonths<216)return null;
 const confined=p.coldPalace?.kind==='life'||p.coldPalaceUntil!=null&&p.coldPalaceUntil>=p.months;
 const protectedBirth=p.pregnancy.anThaiProtected===true,child=createRoyalChild(s,p.months,p.pregnancy.father),gender=child.gender;
 if(p.pregnancy.secretProxy)child.secretProxy={...p.pregnancy.secretProxy,promised:true};
 p.children.push(child);p.pregnancy=null;apply(s,{health:-8,favor:confined?0:12});
 if(protectedBirth)p.health=Math.max(1,p.health);
 notice(s,'Hoàng tự chào đời',`Sau chín tháng thai nghén, ${gender} ${child.name} chào đời. Tư chất: ${childAptitude(child).name}.${confined?'':' Ân điển +12.'}${protectedBirth?' Nhờ An Thai Hoàn, mẹ tròn con vuông.':''}`,child);
 checkFamilyAchievements(s);
 return child;
}
export function grantInfertilityWard(s){
 const p=s.p,emperor=s.npcs.find(n=>n.id==='emperor'&&n.alive);
 if(emperorInfertile(s))return null;
 if(!p.alive||p.health<=0||!p.infertile||!emperor||p.infertilityGrantHandled||s.adoptionChoice||p.children.some(c=>c.adoption?.reason==='infertility'))return null;
 const mothers=activeSisters(s).filter(n=>n.age>=18),mother=mothers.length?pick(s,mothers):null;
 let child=null;
 if(mother){
  mother.children??=[];
  child=mother.children.find(c=>p.months-c.month<=72&&!p.children.some(x=>x.adoption?.sourceChild===c.id));
  if(!child){
   const years=range(s,0,Math.min(6,mother.age-18));child=createRoyalChild(s,p.months-years*12,mother.roleClass==='consort'?emperor.name:'Phụ thân ngoài cung');
   child.id=`npc-child-${s.legacy.lives}-${mother.id}-${mother.children.length}`;child.royal=mother.roleClass==='consort';mother.children.push(child);
  }
 }
 s.adoptionChoice={month:p.months,npc:mother?.id??null,sourceChild:child?.id??null};return {pending:true};
}
export function resolveAdoptionChoice(s,choice){
 const p=s.p,q=s.adoptionChoice,emperor=s.npcs.find(n=>n.id==='emperor'&&n.alive);
 if(!q||!p.alive||!p.infertile||p.infertilityGrantHandled||!emperor||!['royal','godchild'].includes(choice))return {error:'Không có ân chỉ nhận con đang chờ.'};
 let mother,child;
 if(choice==='godchild'){
  mother=s.npcs.find(n=>n.id===q.npc&&n.alive);const source=mother?.children?.find(c=>c.id===q.sourceChild);
  if(!mother||!isSister(s,mother)||!source)return {error:'Tỷ muội này không còn phù hợp. Nàng có thể nhận hoàng nhi được ban.'};
  child=createRoyalChild(s,source.month,source.father);const id=child.id;Object.assign(child,JSON.parse(JSON.stringify(source)),{id});
 }else{
  const years=range(s,0,6),mothers=s.npcs.filter(n=>n.gender==='female'&&n.roleClass==='consort'&&n.courtRank<EMPRESS_RANK&&n.alive&&n.age>=18+years);
  mother=mothers.length?pick(s,mothers):{id:null,name:chooseName(a=>pick(s,a),{gender:'female',used:new Set(worldNames(s))}),role:'Mỹ nhân'};
  child=createRoyalChild(s,p.months-years*12,emperor.name);
 }
 child.adoption={reason:'infertility',kind:choice==='godchild'?'godchild':'adopted',month:p.months,mother:{id:mother.id,name:mother.name,title:mother.role},...(choice==='godchild'?{sourceChild:q.sourceChild}:{})};
 child.milestones.push({month:p.months,title:choice==='godchild'?p.name+' trở thành mẫu thân đỡ đầu':'Hoàng đế ban cho '+p.name+' nuôi dưỡng'});
 p.children.push(child);p.infertilityGrantHandled=true;s.adoptionChoice=null;
 const text=choice==='godchild'?`Hoàng đế ${emperor.name} ban chiếu, cho ${p.name} làm mẫu thân đỡ đầu của ${child.name}, con của tỷ muội ${mother.name}. Từ nay cùng chăm sóc, dạy dỗ đứa trẻ nên người.`:`Hoàng đế ${emperor.name} thương xót nàng không còn khả năng sinh nở, ban ${child.gender.toLowerCase()} ${child.name}, con của ${mother.role} ${mother.name}, cho ${p.name} nuôi dưỡng.`;
 s.notices.push({kind:'adoption-decree',title:choice==='godchild'?'Chiếu chỉ nhận con đỡ đầu':'Chiếu chỉ ban hoàng nhi',child:child.id,month:p.months,text});addLog(s,text,'family');checkFamilyAchievements(s);return {ok:true,child};
}
export function dismissAdoptionDecree(s){
 const i=s.notices.findIndex(n=>n.kind==='adoption-decree');
 if(i<0)return {error:'Không có chiếu chỉ nhận nuôi đang chờ.'};
 s.notices.splice(i,1);return {ok:true};
}
export const DELIVERY_RISKS=Object.freeze({childLoss:.20,maternalDeath:.20,infertilityAfterLoss:.30});
export function resolveDelivery(s){
 const p=s.p;if(!p.alive||!p.pregnancy||p.months<p.pregnancy.due||p.ageMonths<216)return null;
 const confined=p.coldPalace?.kind==='life'||p.coldPalaceUntil!=null&&p.coldPalaceUntil>=p.months;
 // Independent draws: both losses can occur. Draw infertility only within child loss.
 const protectedBirth=p.pregnancy.anThaiProtected===true,childRoll=rand(s),maternalRoll=rand(s);
 const childLost=!protectedBirth&&childRoll<DELIVERY_RISKS.childLoss,maternalRisk=!protectedBirth&&maternalRoll<DELIVERY_RISKS.maternalDeath;
 const infertile=childLost&&rand(s)<DELIVERY_RISKS.infertilityAfterLoss;
 let child=null;
 if(childLost){
  p.pregnancy=null;p.infertile=!!(p.infertile||infertile);apply(s,{health:-30});
  notice(s,'Khó sinh · Không giữ được con','Sau chín tháng mang thai, nàng gặp cơn khó sinh. Thái y không giữ được hoàng tự. Sức khỏe −30.'+(infertile?' Thái y xác nhận nàng không còn khả năng mang thai trong kiếp này.':''),null,true);
 }else child=birthChild(s);
 let death=false,rescued=false;
 if(maternalRisk){
  death=die(s,'childbirth','Cơn khó sinh lấy đi sinh mạng của nàng.'+(childLost?' Hoàng tự cũng không qua khỏi.':child?' Hoàng tự được cứu sống và được lưu trong hồ sơ con cái.':''));rescued=!death;
  if(death){s.story=s.mini=s.decree=s.pendingTitle=s.visit=null;resolvePosthumousPromotion(s);}
 }
 const ward=infertile?grantInfertilityWard(s):null;
 return {delivery:true,child,ward,childLost,infertile,maternalRisk,death,rescued,confined};
}
const BASE_MISCARRIAGE_CHANCE=.004;
// Eight prenatal checks retain the overall envy risk; month nine resolves delivery separately.
const HIGH_ENVY_MISCARRIAGE_CHANCE=1-Math.pow(.8,1/8);
export function miscarriageChance(s){
 const p=s.p,g=p.pregnancy;
 if(!p.alive||p.ageMonths<216||!g||g.anThaiProtected===true||p.months<=g.since||p.months>=g.due)return 0;
 return p.envy>40?HIGH_ENVY_MISCARRIAGE_CHANCE:BASE_MISCARRIAGE_CHANCE;
}
export function advancePregnancy(s){
 const p=s.p;if(!p.alive||!p.pregnancy||p.ageMonths<216||p.months<=p.pregnancy.since||p.cooldowns.pregnancyCheck===p.months)return null;
 p.cooldowns.pregnancyCheck=p.months;
 if(p.months>=p.pregnancy.due)return resolveDelivery(s);
 const roll=rand(s),chance=miscarriageChance(s);
 if(roll<chance){
  const harmed=p.envy>40&&roll>=BASE_MISCARRIAGE_CHANCE,loss=range(s,10,18);p.pregnancy=null;apply(s,{health:-loss});
  notice(s,harmed?'Thai kỳ bị hãm hại':'Tin buồn trong cung',harmed?`Giữa những lời đố kỵ, có người âm thầm hãm hại nàng. Thái y đã hết sức nhưng không giữ được thai. Sức khỏe −${loss}; nàng cần nghỉ dưỡng.`:`Thái y báo thai kỳ không thể tiếp tục. Nàng mất ${loss} sức khỏe và cần thời gian hồi phục.`,null,true);
  return {miscarriage:true,harmed};
 }
 return null;
}
export function advanceChildren(s,onCrown){
 if(!s.p.alive||s.p.cooldowns.childrenCheck===s.p.months)return false;
 s.p.cooldowns.childrenCheck=s.p.months;let changed=false;
 for(const c of s.p.children){
  if(c.alive===false||c.royal===false)continue;
  const a=childAge(s,c),male=c.gender==='Hoàng tử';
  if(male&&c.secretProxy?.promised&&childAgeMonths(s,c)>=12&&!c.secretProxy.appointed&&s.npcs.some(n=>n.id==='emperor'&&n.alive&&n.name===c.secretProxy.emperor)){
   // One imperial heir: the earliest surviving son to reach one year receives the promise.
   const prior=s.p.children.some(x=>x!==c&&x.alive!==false&&['Thái tử','Hoàng đế'].includes(x.title));
   if(!prior){c.title='Thái tử';c.secretProxy.appointed=s.p.months;c.milestones.push({month:s.p.months,title:'Mật chỉ · Lập làm Thái tử khi tròn một tuổi'});if(s.p.rank<IMPERIAL_NOBLE_CONSORT_RANK)onCrown(s,c);notice(s,'Chiếu lập Thái tử',`${c.name} vừa tròn một tuổi. Hoàng đế giữ lời, lập hoàng tử làm Thái tử, nhận ngôi Đông cung.`,c);changed=true;}
  }
  if(childAgeMonths(s,c)>=CHILD_TITLE_AGE_MONTHS&&(male?c.title==='Hoàng tử':!c.titleHonorific)){
   if(male)c.title=princeTitleFromRoll(c,rand(s),s.p.children.some(x=>x.alive!==false&&['Thái tử','Hoàng đế'].includes(x.title)));
   if(c.title==='Thái tử'){
    c.milestones.push({month:s.p.months,title:'Lập làm Thái tử'});
    // Invest the child without repeating a lower title or ceremony for his mother.
    if(s.p.rank<IMPERIAL_NOBLE_CONSORT_RANK)onCrown(s,c);
    notice(s,'Chiếu lập Thái tử',`${c.name} được lập làm Thái tử khi ${a} tuổi, nhận ngôi Đông cung. ${s.p.rank>=EMPRESS_RANK?'Mẫu thân giữ ngôi Hoàng hậu.':s.p.rank===IMPERIAL_NOBLE_CONSORT_RANK?`Mẫu thân giữ ngôi ${s.p.rankTitle}.`:'Mẫu thân được tôn làm Quý Phi.'}`,c);
   }else{
    c.titleHonorific=pick(s,availableChildHonorifics(s.p.children,c));
    const title=childTitleLabel(c);c.milestones.push({month:s.p.months,title:'Sắc phong '+title});
    notice(s,'Chiếu sắc phong hoàng tự',`${c.name} được ban tước ${title} khi ${a} tuổi.`,c);
   }
   changed=true;
  }
  if(!male&&a>=18&&!c.married){
   const husband=pick(s,['một công tử văn võ song toàn','một thiếu tướng thanh liêm','một thế tử ôn hòa','một tân khoa tài giỏi']);
   c.married=true;c.spouse=husband;c.milestones.push({month:s.p.months,title:'Ban hôn · Xuất giá'});
   notice(s,'Công chúa xuất giá',`Công chúa ${c.name} đã trưởng thành, được ban hôn cùng ${husband}. Nàng rời cung về phủ phò mã.`,c);changed=true;
  }
 }
 if(changed)checkFamilyAchievements(s);
 return changed;
}
// One monthly draw: old-age risk begins at 2% at 40; the other causes stay rare.
export function emperorMortality(s){const e=s.npcs.find(n=>n.id==='emperor');if(!e||s.dynasty?.death||s.dynasty?.lastSuccessionMonth===s.p.months)return null;const oldAge=e.age>=40?Math.min(.12,.02+(e.age-40)*.003):0;return {oldAge,poison:.00025,assassination:.00035,suddenIllness:.00045};}
export function emperorDeathCause(s){
 const e=s.npcs.find(n=>n.id==='emperor'),rates=emperorMortality(s);if(!rates)return null;if(!e.alive)return 'suddenIllness';
 const roll=rand(s);let cumulative=0;for(const [cause,chance]of Object.entries(rates)){cumulative+=chance;if(roll<cumulative)return cause;}return null;
}
function installSuccessor(s,e){
 const name=chooseName(a=>pick(s,a),{gender:'male',surname:familyName(e.name),used:new Set(worldNames(s))});
 const portraitVariant=pick(s,MALE_PORTRAIT_VARIANTS.filter(v=>v!==e.portraitVariant));
 Object.assign(e,{name,age:range(s,20,32),portraitVariant,alive:true,bond:0,rivalry:0,met:false,talked:false});
 capImperialNpcAges(s);
 s.legacy.lastPortraits??={};s.legacy.lastPortraits.emperor=portraitVariant;
 s.p.visited=s.p.visited.filter(key=>!key.startsWith('emperor:'));
 s.p.lastImperialVisit=null;delete s.p.cooldowns.imperial;
}
const crownHeir=s=>s.p.children.find(c=>c.royal!==false&&c.gender==='Hoàng tử'&&c.title==='Thái tử'&&c.alive!==false);
const ownPrinces=s=>s.p.children.filter(c=>c.royal!==false&&c.gender==='Hoàng tử'&&c.alive!==false);
const isEmpress=s=>s.p.role==='consort'&&s.p.rank===EMPRESS_RANK;
function deathIntro(s){
 const d=s.dynasty.death,reason={oldAge:'băng hà vì tuổi cao',poison:'băng hà vì trúng độc',assassination:'băng hà sau một vụ ám sát',suddenIllness:'đột ngột băng hà vì bạo bệnh'}[d.cause];
 return `Hoàng đế ${d.name} ${reason}. `;
}
function enthrone(s,heir){
 heir.title='Hoàng đế';heir.milestones.push({month:s.p.months,title:'Đăng cơ'});
 s.p.role='consort';s.p.rank=Math.max(0,s.p.rank);s.p.rankTitle=heir.adoption?pick(s,NON_BIRTH_DOWAGER_TITLES):'Thánh Mẫu Hoàng Thái Hậu';
 s.dynasty.successor={name:heir.name,child:heir.id,month:s.p.months};
}
function finishDynasty(s,ending,text,cause){
 s.notices=[];s.p.prison=0;s.p.coldPalaceUntil=null;s.p.coldPalace=null;
 die(s,ending,text);
 if(s.p.alive){
  const e=s.npcs.find(n=>n.id==='emperor');s.dynasty.predecessors.push(s.dynasty.death);s.dynasty.death=null;s.dynasty.lastSuccessionMonth=s.p.months;installSuccessor(s,e);
  s.p.role='maid';s.p.rank=-1;s.p.rankTitle=null;s.p.serviceRank=0;grantServiceRobe(s,'Tân triều · Nhận việc cung nữ');enforceMaidJewelry(s);s.p.palace=null;s.result.text+=' Tân triều xá tội, cho nàng trở lại làm cung nữ với thân phận mới.';return {continued:true,rescued:true,cause};
 }
 s.story=s.mini=s.decree=s.pendingTitle=s.visit=null;return {ending,cause};
}
export function successionChoices(s){
 if(s.story?.kind!=='succession'||!s.p.alive||!isEmpress(s)||!s.dynasty?.death||crownHeir(s))return [];
 return [...ownPrinces(s).map(c=>['child:'+c.id,`Đưa hoàng tử ${c.name} lên ngôi${c.adoption?.kind==='godchild'?' · Con đỡ đầu':c.adoption?' · Con nuôi':' · Con ruột'}`]),['other',`Phò tá ${s.story.otherPrince.source==='royalClan'?'hoàng thân':'hoàng tử'} ${s.story.otherPrince.name} · ${s.story.otherPrince.source==='royalClan'?'Tôn thất hoàng gia':'Con của phi tần khác'}`]];
}
export function chooseSuccession(s,choice){
 if(!successionChoices(s).some(([id])=>id===choice))return {error:'Không có lựa chọn kế vị này.'};
 const q=s.story,intro=deathIntro(s),cause=s.dynasty.death.cause;let text;
 if(choice==='other'){
  s.p.rankTitle=pick(s,NON_BIRTH_DOWAGER_TITLES);s.dynasty.successor={name:q.otherPrince.name,child:null,month:s.p.months};
  text=intro+`Nàng phò tá ${q.otherPrince.source==='royalClan'?'hoàng thân':'hoàng tử'} ${q.otherPrince.name}, ${q.otherPrince.source==='royalClan'?'một người trong tôn thất hoàng gia':'con của một phi tần khác'}, lên ngôi. Tân đế kính tôn nàng làm ${s.p.rankTitle}, giữ trọn ngôi vị đích mẫu của hoàng triều.`;
 }else{
  const heir=ownPrinces(s).find(c=>'child:'+c.id===choice);enthrone(s,heir);
  text=intro+`Nàng đưa hoàng tử ${heir.name}${heir.adoption?.kind==='godchild'?', người con đỡ đầu của nàng,':heir.adoption?', người con nuôi của nàng,':''} lên ngôi. Tân đế kính tôn nàng làm ${s.p.rankTitle}. Một đời trong cung khép lại trong vinh hiển.`;
 }
 return finishDynasty(s,'empressDowager',text,cause);
}
export function resolveEmperorDeath(s,cause,{forceEnd=false}={}){
 if(!s.p.alive||s.dynasty?.death||s.dynasty?.lastSuccessionMonth===s.p.months||!['oldAge','poison','assassination','suddenIllness'].includes(cause))return false;
 const e=s.npcs.find(n=>n.id==='emperor');if(!e)return false;s.fashion=null;e.alive=false;s.dynasty.death={cause,month:s.p.months,name:e.name,age:e.age};
 const intro=deathIntro(s),heir=crownHeir(s);let ending,text;
 if(heir){
  enthrone(s,heir);return finishDynasty(s,'empressDowager',intro+`Thái tử ${heir.name} kế vị ngai vàng, tôn nàng làm ${s.p.rankTitle}. Một đời trong cung khép lại ở ngôi mẫu nghi của tân triều.`,cause);
 }
 if(isEmpress(s)){
  const proxyHeir=emperorInfertile(s)?s.npcs.flatMap(n=>n.children||[]).find(c=>c.secretHeir&&c.gender==='Hoàng tử'&&c.alive!==false):null;
  const otherPrince=proxyHeir?{name:proxyHeir.name,age:Math.floor((s.p.months-proxyHeir.month)/12),source:'otherConsort'}:{name:chooseName(a=>pick(s,a),{gender:'male',surname:familyName(e.name),used:new Set(worldNames(s))}),age:range(s,10,24),...(emperorInfertile(s)?{source:'royalClan'}:{})};
  s.event=s.result=s.exam=s.mini=s.decree=s.pendingTitle=s.visit=s.coronation=s.festival=s.guqin=s.caro=null;s.courtCeremonies=[];s.notices=[];
  s.story={kind:'succession',title:'Hoàng triều chờ người kế vị',text:intro+'Tiên đế chưa lập Thái tử. Với ngôi Hoàng hậu, nàng có quyền định người nối ngôi. '+(ownPrinces(s).length?'Hãy chọn một hoàng tử trong các con của nàng, hoặc phò tá hoàng tử của phi tần khác.':'Nàng chưa có hoàng tử đủ điều kiện kế vị; có thể phò tá hoàng tử của phi tần khác.'),otherPrince};
  if(otherPrince.source==='royalClan')s.story.text=intro+'Tiên đế không có hậu duệ. Với ngôi Hoàng hậu, nàng có quyền phò tá một người trong tôn thất hoàng gia nối ngôi.';
  addLog(s,s.story.text,'dynasty');return {pending:true,cause};
 }
 if(s.p.role==='maid'){
  s.dynasty.predecessors.push(s.dynasty.death);s.dynasty.death=null;s.dynasty.lastSuccessionMonth=s.p.months;
  installSuccessor(s,e);s.event=s.result=s.story=s.visit=null;
  notice(s,'Tân đế đăng cơ',intro+`Hoàng đế ${e.name}, ${e.age} tuổi, kế vị. Nàng tiếp tục công việc trong cung, giữ chức vụ và tiến độ khảo hạch. Phải gặp và trò chuyện với tân đế để mở nhân duyên mới.`,null,false,'dynasty');
  return {continued:true,cause,emperor:e.name};
 }
 if(s.p.role!=='consort'){ending='dynastyRelease';text=intro+'Tân triều cho cung nhân hồi hương. Nàng rời cửa son, bắt đầu những ngày bình yên ngoài cung.';}
 else if(s.p.children.length||s.p.pregnancy){ending='palaceRetirement';text=intro+(s.p.children.some(c=>c.gender==='Hoàng tử')?'Con nàng không phải người kế vị. Mẹ con được lui về đất phong, sống xa vòng tranh quyền.':s.p.pregnancy?'Nàng được đưa đến biệt cung dưỡng thai, rời xa cuộc tranh ngôi của tân triều.':'Nàng lui về biệt cung, được các công chúa phụng dưỡng, khép lại những năm tháng tranh sủng.');}
 else if(forceEnd||rand(s)<.65){ending='imperialTemple';text=intro+'Không có con nối dõi, nàng được đưa vào chùa hoàng gia, xuống tóc và sống quãng đời còn lại bên tiếng chuông.';}
 else{ending='funeralSacrifice';text=intro+'Lệnh tuẫn táng được ban xuống. Không có hoàng tự che chở, số phận nàng khép lại cùng tang lễ tiên đế.';}
 return finishDynasty(s,ending,text,cause);
}
export function imperialJourneyEligible(s){
 return s.p.alive&&!s.intro&&s.p.role==='consort'&&s.p.ageMonths>=216&&!s.p.prison&&!s.p.coldPalace&&!s.p.coldPalaceUntil&&!s.dynasty?.death&&!!crownHeir(s)&&!!s.npcs.find(n=>n.id==='emperor'&&n.alive);
}
export function maybeImperialJourney(s){
 if(!imperialJourneyEligible(s)||s.story||s.result||s.coronation||s.festival||s.exam||s.mini||s.p.months-(s.p.cooldowns.imperialJourney??-99)<12||rand(s)>=.015)return false;
 const e=s.npcs.find(n=>n.id==='emperor');s.event=null;s.p.cooldowns.imperialJourney=s.p.months;
 s.story={kind:'imperialJourney',title:'Cùng người du ngoạn thiên hạ',text:`Hoàng đế ${e.name} ngỏ lời: “Thái tử đã được định. Trẫm muốn nhường ngôi, cùng nàng rời chốn cung thành, ngắm non sông bốn bể.” Nhận lời sẽ mở một kết thúc mới; nàng cũng có thể từ chối để tiếp tục cuộc sống trong cung.`};
 addLog(s,'Hoàng đế ngỏ lời nhường ngôi để cùng nàng du ngoạn thiên hạ.','dynasty');return true;
}
export function chooseImperialJourney(s,choice){
 if(s.story?.kind!=='imperialJourney'||!imperialJourneyEligible(s)||!['accept','stay'].includes(choice))return {error:'Lời hẹn du ngoạn không còn hợp lệ.'};
 s.story=null;s.p.cooldowns.imperialJourney=s.p.months;
 if(choice==='stay'){
  s.result={title:'Ở lại cùng giang sơn',text:'Nàng dịu dàng khước từ lời hẹn. Hoàng đế tôn trọng ý nàng, tiếp tục trị vì; câu chuyện trong cung vẫn còn tiếp diễn.',success:true,effects:{}};addLog(s,s.result.text,'dynasty');return {ok:true};
 }
 const e=s.npcs.find(n=>n.id==='emperor'),heir=crownHeir(s);enthrone(s,heir);e.retired=true;e.role='Thái thượng hoàng';
 s.dynasty.abdication={name:e.name,successor:heir.name,month:s.p.months};
 return finishDynasty(s,'imperialJourney',`Hoàng đế ${e.name} nhường ngôi cho Thái tử ${heir.name}, lui làm Thái thượng hoàng. Tân đế đăng cơ, kính tôn nàng làm ${s.p.rankTitle}. Hai người rời cung, cùng ngắm núi sông, nghe mưa bên quán trọ và đón những mùa hoa nở. Một kiếp khép lại nơi trời rộng, có người thương sánh bước.`,'abdication');
}
export function appointRescuedEmpressHeir(s){
 const p=s.p,d=p.death;
 if(p.alive||d?.cause!=='rescueEmperor'||d.posthumous?.fromRank!==EMPRESS_RANK||d.rescueHeirChecked)return null;
 d.rescueHeirChecked=true;
 const royalChildren=[...p.children,...s.npcs.flatMap(n=>n.children||[])];
 if(royalChildren.some(c=>c.alive!==false&&c.royal!==false&&['Thái tử','Hoàng đế'].includes(c.title)))return null;
 const heir=p.children.filter(c=>c.alive!==false&&c.gender==='Hoàng tử'&&c.royal!==false)
  .sort((a,b)=>childAptitude(b).crownBonus-childAptitude(a).crownBonus||a.month-b.month||a.id.localeCompare(b.id))[0];
 if(!heir)return null;
 heir.title='Thái tử';delete heir.titleHonorific;
 heir.rescueAppointment={month:p.months};heir.milestones.push({month:p.months,title:'Lập làm Thái tử · Tưởng niệm Hoàng hậu cứu giá'});
 d.rescueHeir=heir.id;
 const text=`Hoàng đế lập hoàng tử ${heir.name} làm Thái tử, tưởng niệm Hoàng hậu đã hy sinh cứu giá.`;
 d.text+=' '+text;addLog(s,text,'family');
 const history=s.legacy.histories.find(h=>h.life===s.legacy.lives);
 if(history)history.children=JSON.parse(JSON.stringify(p.children));
 s.notices.push({title:'Chiếu lập Thái tử',text,kind:'family'});
 return heir;
}
export function validateFamily(s){
 const integer=(n,a,b)=>Number.isInteger(n)&&n>=a&&n<=b,ids=new Set;
 if(typeof s.p.infertile!=='boolean'||s.p.infertile&&s.p.pregnancy)throw Error('Tình trạng sinh sản không hợp lệ.');
 if(s.p.children.length>200)throw Error('Quá nhiều hoàng tự.');
 for(const c of s.p.children){
  if(!CHILD_APTITUDES.some(t=>t.id===c.aptitude))throw Error('Tư chất hoàng tự không hợp lệ.');
  if(typeof c.id!=='string'||ids.has(c.id)||typeof c.name!=='string'||!c.name||c.name.length>60||!['Hoàng tử','Công chúa'].includes(c.gender)||!integer(c.month,c.adoption?-72:0,s.p.months)||!Array.isArray(c.portraits)||c.portraits.length!==4||c.portraits.some(v=>!integer(v,0,4))||!['Hoàng tử','Công chúa','Thân vương','Vương gia','Thái tử','Hoàng đế'].includes(c.title)||typeof c.married!=='boolean'||!Array.isArray(c.milestones))throw Error('Hồ sơ hoàng tự không hợp lệ.');
  if(c.adoption){
   const a=c.adoption,m=a.mother;
   if(a.kind!==undefined&&!['adopted','godchild'].includes(a.kind)||a.kind==='godchild'&&(typeof a.sourceChild!=='string'||!s.npcs.some(n=>n.id===m?.id&&n.children?.some(x=>x.id===a.sourceChild)))||a.reason!=='infertility'||!s.p.infertile||!integer(a.month,0,s.p.months)||!integer(a.month-c.month,0,72)||!m||m.id!==null&&typeof m.id!=='string'||typeof m.name!=='string'||!m.name||m.name.length>60||typeof m.title!=='string'||!m.title||m.title.length>60)throw Error('Hồ sơ nhận nuôi không hợp lệ.');
  }
  ids.add(c.id);
  const rescueHeir=c.rescueAppointment!==undefined;
  if(rescueHeir&&(s.p.alive||s.p.death?.cause!=='rescueEmperor'||s.p.death.posthumous?.fromRank!==EMPRESS_RANK||s.p.death.rescueHeir!==c.id||c.title!=='Thái tử'||c.rescueAppointment.month!==s.p.months))throw Error('Đặc chỉ lập Thái tử không hợp lệ.');
  if(c.gender==='Công chúa'&&c.title!=='Công chúa'||c.gender==='Hoàng tử'&&c.title==='Công chúa'||c.married&&(c.gender!=='Công chúa'||childAge(s,c)<18||typeof c.spouse!=='string')||['Thân vương','Thái tử','Vương gia'].includes(c.title)&&childAgeMonths(s,c)<CHILD_TITLE_AGE_MONTHS&&!rescueHeir&&!(c.title==='Thái tử'&&c.secretProxy?.promised&&Number.isInteger(c.secretProxy.appointed)&&childAgeMonths(s,c)>=12)||c.titleHonorific!=null&&childAgeMonths(s,c)<CHILD_TITLE_AGE_MONTHS)throw Error('Mốc trưởng thành không hợp lệ.');
  if(!validChildHonorific(c))throw Error('Phong hiệu hoàng tự không hợp lệ.');
  for(const m of c.milestones)if(!integer(m.month,c.month,s.p.months)||typeof m.title!=='string')throw Error('Mốc hoàng tự không hợp lệ.');
 }
 if(s.p.children.filter(c=>c.adoption?.reason==='infertility').length>1)throw Error('Ân chỉ nhận nuôi chỉ được ban một lần.');
 if(typeof s.p.infertilityGrantHandled!=='boolean')throw Error('Ân chỉ nhận con không hợp lệ.');
 const q=s.adoptionChoice;if(q&&(!s.p.alive||!s.p.infertile||s.p.infertilityGrantHandled||q.month!==s.p.months||q.npc!==null&&!s.npcs.some(n=>n.id===q.npc&&n.gender==='female'&&n.children?.some(c=>c.id===q.sourceChild))))throw Error('Lựa chọn nhận con không hợp lệ.');
 for(const n of s.npcs)if(n.children){if(!Array.isArray(n.children)||n.children.length>200||n.children.some(c=>typeof c.id!=='string'||typeof c.name!=='string'||!integer(c.month,-72,s.p.months)||!['Hoàng tử','Công chúa'].includes(c.gender)||!Array.isArray(c.portraits)||c.portraits.length!==4||c.portraits.some(x=>!integer(x,0,4))))throw Error('Con của tỷ muội không hợp lệ.');}
 const adoptionNotices=s.notices.filter(n=>n.kind==='adoption-decree');
 if(adoptionNotices.length>1||adoptionNotices.some(n=>!s.p.children.some(c=>c.id===n.child&&c.adoption?.month===n.month)||typeof n.text!=='string'))throw Error('Chiếu chỉ nhận nuôi không hợp lệ.');
 if(s.p.children.filter(c=>c.alive!==false&&['Thái tử','Hoàng đế'].includes(c.title)).length>1)throw Error('Chỉ có một người kế vị.');
 if(s.story?.kind==='succession'){
  const o=s.story.otherPrince;
  if(!s.p.alive||!isEmpress(s)||!s.dynasty.death||crownHeir(s)||s.npcs.some(n=>n.id==='emperor'&&n.alive)||!o||typeof o.name!=='string'||!o.name||o.name.length>60||!integer(o.age,o.source==='otherConsort'?0:10,24))throw Error('Lựa chọn kế vị không hợp lệ.');
 }
 if(s.story?.kind==='imperialJourney'&&!imperialJourneyEligible(s))throw Error('Lời hẹn du ngoạn không hợp lệ.');
 if(!Array.isArray(s.dynasty.predecessors)||s.dynasty.lastSuccessionMonth!==null&&!integer(s.dynasty.lastSuccessionMonth,0,s.p.months))throw Error('Dữ liệu tân triều không hợp lệ.');
 for(const death of [...s.dynasty.predecessors,...(s.dynasty.death?[s.dynasty.death]:[])])if(!death||!['oldAge','poison','assassination','suddenIllness'].includes(death.cause)||!integer(death.month,0,s.p.months))throw Error('Dữ liệu đổi triều không hợp lệ.');
}
