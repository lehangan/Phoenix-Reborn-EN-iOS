import {initImperialSecret,validateImperialSecret,imperialSecretReady,beginImperialSecret,nextImperialSecret,chooseImperialSecret,emperorInfertile,princeAgreement,amnesiaNightBlocked} from './imperial-secret.mjs';
import {clearBlockedWhiteMoon} from './white-moon-events.mjs';
export {imperialSecretReady,beginImperialSecret,nextImperialSecret,emperorInfertile,princeAgreement};
import {openWishingPool,validateWishingPool} from './wishing-pool.mjs';
export {browseWishOfferings,selectWishOffering,confirmWishOffering,leaveWishingPool,wishWaitMonths} from './wishing-pool.mjs';
import {migrateRankSchema} from './rank-schema.mjs';
import {normalizeSisterEvent,migrateSisterhood,validateSisterhood,queueSisterEvent} from './female-relationships.mjs';
import {femaleLine,femaleSpeech} from './female-speech.mjs';
export {femaleRelation,activeSisters,isSister,sisterEventReady,resolveSisterEvent} from './female-relationships.mjs';
import {migrateTea,validateTea,beginTea} from './tea-crafting.mjs';
export {startTeaCatch,finishTeaCatch} from './tea-crafting.mjs';
export {resolveAdoptionChoice} from './family.mjs';
import {advanceEntryStory,validateEntryStory} from './entry-story.mjs';
export {acceptIdentity} from './entry-story.mjs';
import {migrateFashion,queueFashionFestival,validateFashion,fashionRewardReady,fashionNightEligible,fashionJadeReason,fashionWinner,leaveFashionFestival} from './fashion-festival.mjs';
import {validatePosthumous} from './posthumous.mjs';
export {queueFashionFestival,migrateFashion,fashionReady,fashionOutfits,acceptFashionFestival,fashionWardrobeTab,chooseFashionOutfit,fashionEntryCheck,enterFashionFestival,nextFashionPraise,advanceFashionCeremony,skipFashionCg,drawFashionWinner,revealFashionWinner,leaveFashionFestival} from './fashion-festival.mjs';
import {rejectDisfiguredNight,DISFIGURED_REJECTION} from './disfigurement.mjs';
import {beginImperialNight,validateImperialNight} from './imperial-night.mjs';
export {nightWardrobeTab,chooseNightOutfit,enterImperialNight} from './imperial-night.mjs';
import {migrateSideEvents,validateSideEvents,queueMonthlySideEvents,pendingSideEvent} from './monthly-side-events.mjs';
import {drawPalaceHostility} from './palace-hostility.mjs';
export {pendingSideEvent,sideEventReady,resolveSideEvent,finishDateScene,canYieldDemand,queueMonthlySideEvents} from './monthly-side-events.mjs';
import {lakeEligible,lakeRewardReady,lakeNightEligible,startLake,validateLake} from './imperial-lake.mjs';
export {chooseLakeAmbush} from './lake-ambush.mjs';
export {startLake,lakeWardrobeTab,chooseLakeOutfit,enterLake,startLakeFishing,finishLakeFishing,leaveLake} from './imperial-lake.mjs';
import {fishingStars} from './fishing.mjs';
import {advanceCourt,migrateCourtProgression,validateCourtProgression} from './court-progression.mjs';
export {NPC_PROMOTION_CHANCE,NPC_PHI_LIMIT,COURT_PHI_LIMIT,advanceCourt,npcPhiCount,courtPhiCount} from './court-progression.mjs';
import {migrateSupplies,validateSupplies} from './palace-shop.mjs';
export {SHOP_ITEMS,CAGE_CATCH_CHANCE,CAGE_RARITY_WEIGHTS,buySupply,useSupply} from './palace-shop.mjs';
import {validateCoronation,crownEligibility,crownPlayer,maybeCrownEvent,queueNextNpcCoronation,migrateCrownStory,startCrownCouncil,revealCrownCouncil} from './coronation.mjs';
export {crownEligibility,crownContestOdds,nextCoronation,resolveCoronationEnvelopes,acceptNpcCoronation,chooseCoronationOutfit,coronationWardrobeTab,enterNpcCoronation,skipNpcCoronation} from './coronation.mjs';
import {migrateNewYear,queueNewYear,validateNewYear} from './new-year.mjs';
export {queueNewYear,festivalOutfits,acceptFestival,chooseFestivalRobe,chooseFestivalJewelry,festivalWardrobeTab,enterFestival,nextFestivalWish,drawFestivalGift,leaveFestival} from './new-year.mjs';
import {equippedPet,petPerkText,PETS} from './pets.mjs';
export {equippedPet,petPerkText,PETS};
import {CARO_SIZE,newBoard,playTurn,validateBoard} from './caro.mjs';
export {CARO_SIZE};
import {newPerformance,validatePerformance,pausePerformance,performanceScore,performanceStars} from './guqin.mjs';
import {resolveEnvy,envyOdds,envyAttackChance} from './envy-event.mjs';
export {envyOdds,envyAttackChance};
import {COLD_ACTIVITIES} from './cold-palace-data.mjs';
import {coldPalaceMonths,inColdPalace,enterColdPalace,releaseColdPalace,enforceColdOutfit,migrateColdPalace,validateColdPalace,selectColdEvent} from './cold-palace.mjs';
export {coldPalaceMonths,inColdPalace,enterColdPalace,releaseColdPalace};
import * as B from './life-engine.mjs';
import {PHI_RANK,IMPERIAL_NOBLE_CONSORT_RANK,EMPRESS_RANK,RANKS,STATS} from './life-data.mjs';
import {MEN,LOCATIONS,QUALITIES,REQUIREMENTS,ACTIVITIES} from './palace-data.mjs';
import {initializeCourt,migrateCourt} from './court.mjs';
import {migrateFamily,validateFamily,advancePregnancy,advanceChildren,emperorDeathCause,resolveEmperorDeath,successionChoices,chooseSuccession,maybeImperialJourney,chooseImperialJourney} from './family.mjs';
export {dismissAdoptionDecree,CHILD_STAGES,CHILD_APTITUDES,childAptitude,childAge,childAgeMonths,childAgeLabel,childStage,childPortrait,childTitleLabel,childNextMilestone,miscarriageChance,emperorMortality} from './family.mjs';
import {MALE_RUMORS,IMPERIAL_MOODS} from './relationship-events.mjs';
export {rankedNpcs,npcPortrait,npcPrecedence} from './court.mjs';
import {SUBJECTS,paintingScore} from './painting.mjs';
export * from './life-engine.mjs';
const {rand,range,pick,clamp,age,apply,addLog,award,grant,giveChest,effective}=B;
const clone=x=>JSON.parse(JSON.stringify(x));
const PRINCE_SILENT_TEXT='Thân vương có vẻ không thoải mái nhưng không nói gì';
const result=(s,title,text,success=true)=>{s.result={title,text,success,effects:{}};addLog(s,text,success?'success':'setback');};
export function migrate(s,existing=false){
 migrateRankSchema(s);
 if(s.result?.imperial?.emperor==='prince'){
  const r=s.result,i=r.imperial;
  i.details=i.details.map(text=>text.replace('Có tin thai · Thai kỳ và những nguy cơ sinh nở diễn ra như thường lệ.','Có tin thai.'));
  if(i.mood==='displeased'){r.title='Thân vương im lặng';r.success=true;i.summary=PRINCE_SILENT_TEXT;}
  r.text=i.summary+' '+i.details.join(' ');
 }
 if(s.story?.kind==='imperial'&&typeof s.story.text==='string'){
  s.story.text=s.story.text.replace(/ Xác suất có thai: \d+%\.$/u,'');
 }
 if(s.story?.kind==='guqin'&&typeof s.story.text==='string')s.story.text=s.story.text.replace(/ Mỗi khúc dài 30 giây[\s\S]*$/u,'');
 s.notices=s.notices.filter(n=>!n.text?.includes('Đạt lại thành tựu trong kiếp này'));
 migrateSupplies(s);migrateSideEvents(s);s.lake??=null;s.wishingPool??=null;s.imperialNight??=null;const p=s.p,fresh=s.expansion!==6;s.expansion=6;
 // Convert old 36-month deadlines once, preserving elapsed time and active exams.
 if(s.examCadenceMonths!==24){
  for(const key of ['nextMaidExam','nextConsortExam'])if(Number.isInteger(p[key]))p[key]=Math.max(p.months,p[key]-12);
  if(['maidExam','promotion'].includes(s.story?.kind))s.story.text=s.story.text.replaceAll('ba năm','hai năm').replaceAll('Ba năm','Hai năm');
  s.examCadenceMonths=24;
 }
 s.legacy.points??=s.legacy.deaths+Object.keys(s.legacy.achievements).length;
 Object.assign(p,{envy:p.envy??0,pouches:p.pouches??[],children:p.children??[],pregnancy:p.pregnancy??null,palace:p.palace??null,coldPalaceUntil:p.coldPalaceUntil??null,lastImperialVisit:p.lastImperialVisit??null,retirementHandled:p.retirementHandled??false,nextMaidExam:p.nextMaidExam??(Math.floor(p.months/24)+1)*24,nextConsortExam:p.nextConsortExam??(Math.floor(p.months/24)+1)*24});
 if(fresh)p.actions=5;
 for(const n of s.npcs){n.gender??='female';n.met??=false;n.talked??=false;}
 for(const m of MEN)if(!s.npcs.some(n=>n.id===m.id))s.npcs.push({...m,gender:'male',bond:0,rivalry:0,alive:true,met:false,talked:false,appearance:{face:0,eyes:0,nose:0,mouth:0,front:0,back:0,robe:'robe-0',ornament:null}});
 B.grantFamilyWardrobe(s);B.enforceMaidJewelry(s);migrateNewYear(s);migrateFashion(s);s.guqin??=null;s.caro??=null;s.story??=null;s.mini??=null;s.decree??=null;s.pendingTitle??=null;s.visit??=null;
 s.world??={month:-1,positions:{},residents:{lotus:'npc-3',moon:'npc-4'}};
 if(s.world.month!==p.months)distribute(s);
 if(existing&&fresh&&['promotion','maidexam','release'].includes(s.event?.id)){const id=s.event.id;s.event=null;if(id==='promotion'){if(p.role==='consort'&&p.rank<5){promotionOffer(s);p.nextConsortExam=p.months+24;}else result(s,'Đại khảo đã đổi quy chế','Đại khảo định kỳ chỉ thăng đến Tiệp dư; phẩm vị cao hơn cần kỳ ngộ.');}else if(id==='maidexam'){s.story={kind:'maidExam',title:'Khảo hạch cung nữ',text:'Kỳ thi mới gồm ba vòng ghi nhớ ngự vật.'};p.nextMaidExam=p.months+24;}else s.story={kind:'retirement',title:'Danh sách xuất cung',text:'Nàng có thể về quê, hoặc vượt khảo hạch Nữ quan để ở lại.'};}
 for(const l of s.log)l.text=l.text.replace(/\p{Script=Han}+\s*·?\s*/gu,'');if(s.result)s.result.title=s.result.title.replace(/\p{Script=Han}+\s*·?\s*/gu,'');
 migrateCourt(s);migrateCourtProgression(s);initImperialSecret(s);migrateFamily(s);migrateSisterhood(s);migrateTea(s);migrateCrownStory(s);validateCoronation(s);if(existing&&p.role==='maid'&&!s.npcs.find(n=>n.id==='emperor')?.met&&['caro','guqin','imperial'].includes(s.story?.kind)){s.story=null;addLog(s,'Lời triệu kiến cũ được gỡ: nàng cần gặp hoàng đế trước.','court');}validateColdPalace(s);migrateColdPalace(s);if(existing&&!s.intro)B.checkFamilyAchievements(s);
 if(s.mini&&!s.mini.scores)s.mini.scores=Array(s.mini.round-1).fill(100);
 return s;
}
export function create(seed){const s=migrate(B.create(seed));initializeCourt(s);initImperialSecret(s,true);distribute(s);return s;}
export function newLife(s){const r=B.newLife(s);if(r?.error)return r;s.sideEvents=[];s.tea=s.sisterEvent=s.adoptionChoice=null;s.fashion=s.lake=s.wishingPool=s.imperialNight=s.dateScene=null;s.expansion=0;s.festival=s.guqin=s.caro=null;s.story=s.mini=s.decree=s.pendingTitle=s.visit=null;s.coronation=null;s.courtCeremonies=[];s.courtGrowthYear=null;s.nextNpcPhiMonth=null;s.world=null;s.dynasty=null;s.imperialSecret=null;migrate(s);initializeCourt(s);initImperialSecret(s,true);distribute(s);return {ok:true};}
export function statusLabels(s){
 const p=s.p,statuses=[],confined=coldPalaceMonths(s);
 if(p.coldPalace?.kind==='life')statuses.push('Lãnh cung cả đời · Kiếp đã khép');
 else if(confined>0)statuses.push(`Cấm túc (còn ${confined} tháng)`);
 else if(p.prison>0)statuses.push(`Cấm túc (còn ${p.prison} tháng)`);
 if(p.pregnancy)statuses.push(`Mang thai (tháng ${Math.min(9,p.months-p.pregnancy.since+1)}/9)`);
 if(p.pregnancy?.anThaiProtected)statuses.push('An Thai Hoàn · Bảo hộ thai kỳ');
 if(p.disfigurement)statuses.push('Hủy dung');
 if(p.illness)statuses.push(p.illness.name);
 return statuses.length?statuses:['Bình an dưới mái son'];
}
export function examinationStatus(s){const p=s.p;if(!p.alive)return null;
 if(coldPalaceMonths(s)>0)return {text:'Tự luyện +1–2 điểm · Tạm hoãn đại khảo',action:false};
 if(s.exam?.kind==='selection')return {text:'Tuyển tú · Bài họa đang chờ',action:true};
 if(s.exam?.kind==='promotion')return {text:'Đại khảo thăng phẩm · Tiếp tục bài họa',action:true};
 if(s.mini)return {text:`Khảo hạch cung nữ · Vòng ${s.mini.round}/3`,action:true};
 if(s.story&&['maidExam','promotion','retirement','selectionFail','bribe'].includes(s.story.kind))return {text:s.story.title,action:true};
 if(p.role==='candidate')return {text:'Tú nữ · Vào tuyển tú',action:true};
 if(p.role==='maid'&&p.serviceRank<3)return {text:`Khảo hạch cung nữ · Còn ${Math.max(0,p.nextMaidExam-p.months)} tháng`,action:false};
 if(p.role==='consort'&&p.rank<5)return {text:`Đại khảo thăng phẩm · Còn ${Math.max(0,p.nextConsortExam-p.months)} tháng`,action:false};
 return {text:p.role==='consort'?'Từ Tiệp dư: thăng phẩm nhờ kỳ ngộ và sắc phong':'Đã đạt bậc Tổng quản ma ma',action:false};}
export function reopenSelection(s){if(inColdPalace(s))return {error:'Chưa được dự tuyển khi đang ở lãnh cung.'};if(s.exam?.kind==='selection')return {ok:true};const error=blocked(s);if(error)return {error};if(s.p.role!=='candidate')return {error:'Nàng không thuộc diện tú nữ chờ tuyển.'};B.startExam(s,'selection');return {ok:true};}
export function begin(s){const r=B.begin(s);if(r)queueNewYear(s);return r;}
export function nextEntryStory(s){const r=advanceEntryStory(s);if(r.finished)begin(s);return r;}
export function reroll(s){
 if(!s.intro||!s.p.alive||s.entryStory)return {error:'Chỉ được đổi thân phận khi chưa bắt đầu kiếp mới.'};
 if(s.legacy.points<1)return {error:'Cần 1 điểm luân hồi để đổi thân phận.'};
 s.legacy.points--;s.legacy.lives--;s.p.alive=false;return newLife(s);
}
const fashionEligibleForBlocking=s=>{migrateFashion(s);return !!s.fashion;};
export function blocked(s){normalizeSisterEvent(s);return (imperialSecretReady(s)?'Hãy khép lại mật sự trong ngự uyển.':null)||(s.wishingPool?'Hãy khép lại lời nguyện bên hồ.':s.tea?'Hãy hoàn thành hộp trà đang làm.':s.sisterEvent?'Hãy khép chuyện tỷ muội đang chờ.':s.adoptionChoice?'Hãy nghe ân chỉ nhận con.':null)||(s.notices.some(n=>n.kind==='dowry')?'Hãy nhận hồi môn phụ mẫu gửi tặng.':s.notices.some(n=>n.kind==='adoption-decree')?'Hãy lĩnh chiếu chỉ nhận nuôi hoàng nhi.':s.dateScene?'Hãy khép lại buổi hẹn.':s.imperialNight?'Hãy hoàn thành buổi thị tẩm.':s.lake?'Hãy khép buổi du hồ.':s.coronation?'Hãy hoàn thành lễ sắc phong.':s.fashion&&fashionEligibleForBlocking(s)?'Hãy dự Lễ hội thời trang hoặc xin rút lui.':s.festival?'Hãy dự tiệc đầu năm hoặc xin vắng mặt trước.':s.guqin?'Hãy hoàn thành khúc đàn đang chờ.':s.caro?'Hãy hoàn thành ván caro đang chờ.':null)||B.blocked(s)||(s.story?'Hãy giải quyết chuyện đang chờ.':s.mini?'Hãy hoàn thành khảo hạch.':s.decree?'Hãy nhận chiếu chỉ và chọn cung điện.':pendingSideEvent(s)?'Có người đang tìm nàng.':null);}
function busy(s){return imperialSecretReady(s)||!!s.wishingPool||!!s.tea||!!s.sisterEvent||!!s.adoptionChoice||!!s.dateScene||!!s.fashion||!!s.imperialNight||!!s.lake||!!pendingSideEvent(s)||!!s.coronation||!!s.festival||!!s.guqin||!!s.caro||!s.p.alive||s.intro||s.exam||s.story||s.mini||s.decree||s.result||s.event;}
const indoorPractice=(s,id)=>coldPalaceMonths(s)>0&&['medicine',...COLD_ACTIVITIES.map(a=>a.id)].includes(id);
export function canAct(s,id=null){return !busy(s)&&s.p.actions>0&&(!s.p.prison&&!coldPalaceMonths(s)||indoorPractice(s,id));}
function spend(s,id=null){const error=blocked(s);if(error)return {error};if((s.p.prison||coldPalaceMonths(s))&&!indoorPractice(s,id))return {error:'Đang cấm túc, nàng chỉ có thể làm việc trong lãnh cung hoặc mời y quan.'};if(s.p.actions<1)return {error:'Đã hết 5 thể lực. Sang tháng mới để hồi đầy.'};s.p.actions--;return null;}
export function dismissNotices(s){s.notices=s.notices.filter(n=>['adoption-decree','dowry'].includes(n.kind));}
export function die(s,cause,text){const ok=B.die(s,cause,text);if(ok)s.fashion=s.festival=s.guqin=s.story=s.mini=s.decree=s.pendingTitle=s.visit=null;return ok;}
export function forceRebirth(s){if(s.intro)return {error:'Hãy nhận thân phận trước; đổi thân phận ở đây dùng nút Roll lại.'};if(!s.p.alive)return {error:'Kiếp này đã khép lại.'};die(s,'forced','Nàng tự khép lại mối duyên với cung thành, để linh hồn bắt đầu một kiếp khác.');return newLife(s);}
export function ordinaryEnding(s,reason,spouse=null,cause=null){
 const p=s.p,departure=age(p),life=range(s,Math.max(45,departure+1),Math.max(88,departure+2));
 const job=pick(s,['một thầy đồ hiền hậu','một thương nhân tháo vát','một người thợ mộc ít nói','một y sĩ chu đáo','một viên quan thanh liêm','một điền chủ hào sảng','một thư sinh chăm chỉ']);
 const married=!!spouse||rand(s)<.86,marriageAge=married?Math.min(life-1,Math.max(18,departure+range(s,1,5))):null;
 const partner=spouse?`${spouse.role} ${spouse.name}, ${spouse.kindness>=65?'dịu dàng, luôn quan tâm gia đình':'kiệm lời, coi trọng lời hứa'}`:married?job:'Không kết hôn; nàng tự dựng một mái nhà cho riêng mình';
 const children=married&&!p.infertile?range(s,0,5):0,circumstance=pick(s,['Gia đình sung túc nhờ buôn bán thuận lợi.','Cuộc sống thanh đạm, bình yên qua bốn mùa.','Có những năm mất mùa, cả nhà cùng nhau vượt khó.','Nàng mở lớp dạy thêu, được dân làng quý mến.','Nàng gây dựng một tiệm nhỏ, tuổi già đủ đầy.','Một trận lụt cuốn đi của cải; nàng lại bắt đầu từ đôi bàn tay.']);
 p.outside=true;p.prison=0;if(cause!=='selectionFail')award(s,'freedom');
 const text=`${reason} Rời cung năm ${departure} tuổi. ${married?`Năm ${marriageAge} tuổi, nàng kết duyên cùng ${partner}.`:`${partner}.`} ${children?`Có ${children} người con.`:'Không có con.'} ${circumstance} Nàng hưởng thọ ${life} tuổi.`;
 die(s,cause||(spouse?'marriage':'free'),text);p.death.epilogue={npc:spouse?.id||null,departure,marriageAge,partner,children,life,circumstance};s.legacy.histories[0].epilogue=clone(p.death.epilogue);s.legacy.histories[0].age=life*12;return {ended:true};
}
export function distribute(s){
 const publicPlaces=LOCATIONS.filter(l=>l.gate==='public').map(l=>l.id);
 s.world.month=s.p.months;s.world.positions={};
 for(const n of s.npcs.filter(n=>n.alive)){
  let pool=n.gender==='male'?[n.home,n.home,...publicPlaces]:n.roleClass==='consort'?['lotus','moon','garden','pavilion']:publicPlaces;
  s.world.positions[n.id]=pick(s,pool);
 }
 s.visit=null;
}
export function access(s,id){if(inColdPalace(s)||s.p.prison)return false;const l=LOCATIONS.find(x=>x.id===id);if(!l)return false;if(l.gate==='public')return true;if(l.gate==='emperor')return s.p.role==='consort'&&s.p.rank>=6;return s.p.role==='consort'||s.p.role==='maid'&&s.p.serviceRank>=2;}
export function meet(s,id,bond=0){const n=s.npcs.find(x=>x.id===id&&x.alive);if(!n)return null;if(!n.met){n.met=true;n.bond=clamp(bond+(n.petBondGift||0),-100,100);addLog(s,`Lần đầu gặp ${n.role} ${n.name}.`,'encounter');}return n;}
export function visit(s,id){if(!access(s,id))return {error:'Chức vị hiện tại chưa được phép vào nơi này.'};const error=spend(s);if(error)return error;
 const at=s.npcs.filter(n=>n.alive&&s.world.positions[n.id]===id);for(const n of at)meet(s,n.id);
 s.visit={id,npcs:at.map(n=>n.id)};addLog(s,`Thăm ${LOCATIONS.find(l=>l.id===id).name}${at.length?' · gặp '+at.map(n=>n.name).join(', '):' · sân viện vắng người'}.`,'visit');return {ok:true};
}
export function wander(s){const error=spend(s);if(error)return error;const roll=rand(s),accessible=s.npcs.filter(n=>n.alive&&access(s,s.world.positions[n.id]));
 if(roll<.52&&accessible.length){const n=pick(s,accessible);meet(s,n.id);s.visit={id:s.world.positions[n.id],npcs:[n.id]};result(s,'Một cuộc gặp bên hiên',`Trong lúc du ngoạn, nàng gặp ${n.role} ${n.name}. Có thể ghé trò chuyện sau khi đọc xong tin này.`);}
 else if(roll<.55){giveChest(s,'silk','Nhặt được trong chuyến du ngoạn');result(s,'Rương gấm bên gốc cây','Người quản sự xác nhận rương vô chủ và cho nàng giữ lại.');}
 else if(roll<.72){const loss=range(s,3,8);apply(s,{health:-loss,reputation:-2});s.p.envy=clamp(s.p.envy+2);result(s,'Vấp ở bậc đá',`Nàng trượt chân, mất ${loss} sức khỏe và 2 uy danh.`,false);}
 else if(roll<.87){const amount=range(s,4,14);s.p.silver+=amount;s.notices.push({title:'Nhặt được bạc',text:`${amount} bạc đã vào túi đồ.`});result(s,'Bạc lẻ trên đường',`Nàng nhặt được ${amount} bạc.`);}
 else {apply(s,{health:3,art:1});result(s,'Gió mát trong vườn','Một buổi dạo bước yên bình. Sức khỏe +3, tài nghệ +1.');}if(s.p.health<=0)die(s,'accident','Nàng không qua khỏi tai nạn trong chuyến du ngoạn.');return {ok:true};
}
export function interact(s,id,kind,pouchId){
 const n=s.npcs.find(x=>x.id===id&&x.alive&&x.met);if(!n)return {error:'Nàng chưa gặp người này.'};
 if(!n.talked&&!s.visit?.npcs?.includes(id))return {error:'Hãy gặp và trò chuyện làm quen tại Hoàng cung trước.'};
 if(!['chat','gift','help'].includes(kind))return {error:'Tương tác không hợp lệ.'};
 const key=id+':'+kind;if(s.p.visited.includes(key))return {error:'Tháng này đã thực hiện tương tác này.'};
 let gift;if(kind==='gift'){if(!n.talked)return {error:'Hãy trò chuyện làm quen trước.'};gift=(n.gender==='female'?s.p.teaBoxes:s.p.pouches).find(x=>x.id===pouchId);if(!gift)return {error:n.gender==='female'?'NPC nữ nhận hộp trà tự ủ. Hãy chọn hộp trà trong Thủ công.':'Hãy chọn một túi hương trong Thủ công.'};}
 const error=spend(s);if(error)return error;s.p.visited.push(key);
 const formalFemale=n.gender==='female'&&femaleSpeech(s,n).formal;
 if(gift&&n.gender==='female'&&rand(s)<.5){const dialogue=femaleLine(s,n,formalFemale?'Xin {you} thứ lỗi, hôm nay lòng {self} không yên, đành xin phép gửi lại hộp trà này':'Hôm nay {self} không có tâm tình, thứ này {you} mang về đi');result(s,'Khước từ hộp trà',`${n.name}: “${dialogue}”. Hộp trà được trả lại, thiện cảm không đổi.`,false);Object.assign(s.result,{npc:n.id,dialogue,bondBefore:n.bond,bondAfter:n.bond,bondGain:0,giftRefused:true});return {change:0,reaction:'refused',returned:true};}
 if(gift&&n.gender==='female'&&n.roleClass==='consort'&&n.courtRank-(s.p.role==='consort'?s.p.rank:-1)>=2&&rand(s)<.5){
  s.p.teaBoxes=s.p.teaBoxes.filter(x=>x.id!==gift.id);
  const dialogue='Hộp trà này cứ mang xuống ban cho hạ nhân dùng đi.';
  result(s,'Hộp trà được ban cho hạ nhân',`${n.role} ${n.name} nhận hộp trà nhưng không dùng, sai người ban cho hạ nhân. Thiện cảm không đổi.`,false);
  Object.assign(s.result,{npc:n.id,dialogue,bondBefore:n.bond,bondAfter:n.bond,bondGain:0,giftDelegated:true,gift:{name:gift.name,quality:gift.quality}});
  return {change:0,reaction:'delegated',returned:false};
 }
 const potential=kind==='gift'?giftGain(n,gift.quality):kind==='help'?5:3+Math.floor(effective(s,'speech')/25),before=n.bond;
 n.bond=clamp(n.bond+potential,-100,100);const change=n.bond-before;
 if(kind==='chat'){n.talked=true;apply(s,{speech:1});}
 if(kind==='help'){apply(s,{kindness:1,health:-2});s.p.counters.charity++;}
 if(gift){if(n.gender==='female')s.p.teaBoxes=s.p.teaBoxes.filter(x=>x.id!==gift.id);else s.p.pouches=s.p.pouches.filter(x=>x.id!==gift.id);}
 if(n.id==='emperor')apply(s,{favor:Math.max(1,Math.floor(change/2))});
 const reaction=gift?giftReaction(n,gift.quality):'chat';
 const dialogues={
  love:['Túi thêu này thật hợp ý ta! Từng đường kim đều có tâm. Cảm ơn nàng, ta sẽ luôn giữ bên mình.','Thật tinh xảo! Ta rất thích món quà này. Nàng còn nhớ cả sở thích của ta, thật khiến ta vui lòng.','Đây là món quà ta quý nhất hôm nay. Cảm ơn nàng, ta nhất định sẽ trân trọng.'],
  like:['Túi thêu rất vừa ý ta. Cảm ơn nàng đã dành công sức chuẩn bị.','Màu sắc và đường thêu đều đẹp. Cảm ơn nàng, ta sẽ dùng chiếc túi này.','Một món quà chu đáo. Ta thích lắm, cảm ơn nàng.'],
  polite:['Ta xin nhận tâm ý của nàng. Nhưng lần sau nàng không cần tặng nữa, đừng hao công vì ta.','Nàng có lòng rồi. Chỉ là món này chưa hợp ý ta lắm, lần sau không cần tặng đâu.','Cảm ơn tâm ý của nàng. Những món như thế này nàng cứ giữ dùng, sau không cần mang tặng ta nữa.']
 };
 const chats=n.gender==='male'?[n.quote,'Hôm nay gặp nàng ở đây cũng là một chuyện vui. Gần đây nàng sống trong cung có tốt không?','Chuyện trong cung nhiều điều khó đoán. Có thời gian, chúng ta lại cùng nói chuyện.']:['Hôm nay được trò chuyện cùng {you}, lòng {self} cũng nhẹ nhõm hơn.','Trong cung nhiều chuyện, tìm được người chịu lắng nghe thật đáng quý.','{Self} nghe hoa trong vườn vừa nở. Mong những ngày tới của {together} đều bình an.'];
 const teaReplies=formalFemale?['{Self} xin nhận hộp trà này. Đa tạ tâm ý của {you}.','Hương trà thanh nhã thật. Đa tạ {you} đã ban trà cho {self}.','Đa tạ {you} đã tự tay sao trà, ủ hương. {Self} nhất định sẽ trân trọng.']:['{Self} nhận hộp trà này. Cảm ơn tâm ý của {you}.','Hương trà thanh nhã thật. Hôm nào {together} cùng ngồi uống một chén nhé.','Tự tay sao trà, ủ hương, hẳn đã tốn nhiều công sức. {Self} sẽ trân trọng.'];
 const line=gift?n.gender==='female'?teaReplies[gift.quality===3?2:gift.quality===2?1:0]:pick(s,dialogues[reaction]):pick(s,chats.filter(Boolean)),dialogue=n.gender==='female'?femaleLine(s,n,line):line;
 result(s,gift?'Tặng quà':'Trò chuyện',`${n.name}: ${dialogue} Thiện cảm +${change}.`);
 Object.assign(s.result,{npc:n.id,dialogue,bondBefore:before,bondAfter:n.bond,bondGain:change,reaction,gift:gift?{name:gift.name,quality:gift.quality}:null});
 B.checkAchievements(s);return {change,reaction};
}
// Personality changes the response, not the affinity awarded for the same pouch.
export function giftReaction(n,quality){const q=clamp(quality,0,3),taste=n.kindness>=70?[5,9,15,23][q]:n.kindness<35?[1,2,8,18][q]:[2,6,12,20][q];return taste>=14?'love':taste>=5?'like':'polite';}
// Use the existing emperor reward for every recipient and both UI and receipts.
export function giftGain(_n,quality){return [1,2,8,18][clamp(quality,0,3)];}
const activityKeys=[...STATS.map(([k])=>k),'health','merit','reputation','favor'];
const activityLabel=k=>STATS.find(([id])=>id===k)?.[1]||({health:'Sức khỏe',merit:'Công trạng',reputation:'Uy danh',favor:'Ân điển'}[k]);
function activityRoll(s,primary,title,cold=false){
 const secondary=pick(s,activityKeys.filter(k=>k!==primary)),rolled={[primary]:range(s,1,cold?2:5),[secondary]:range(s,cold?-1:-3,cold?1:3)},before=Object.fromEntries(Object.keys(rolled).map(k=>[k,s.p.stats[k]??s.p[k]]));
 apply(s,rolled);const effects=Object.fromEntries(Object.keys(rolled).map(k=>[k,(s.p.stats[k]??s.p[k])-before[k]]));
 const text=Object.entries(effects).map(([k,v])=>`${activityLabel(k)} ${v>=0?'+':''}${v}${v!==rolled[k]?' (giới hạn)':''}`).join(' · ');
 s.p.activityFeedback={title,text,effects,rolled,primary,secondary};addLog(s,`${title}: ${text}.`,'activity');B.checkAchievements(s);
 if(s.p.health<=0)die(s,'exhaustion','Sức lực cạn kiệt sau một ngày trong cung.');
 return {ok:true,...s.p.activityFeedback};
}
export function activity(s,id){const a=(inColdPalace(s)?COLD_ACTIVITIES:ACTIVITIES).find(a=>a.id===id);if(!a)return {error:'Hoạt động không hợp lệ.'};const error=spend(s,id);if(error)return error;return activityRoll(s,a.primary,a.name,inColdPalace(s));}
export function startTea(s){const error=spend(s);if(error)return error;return beginTea(s);}
export function startEmbroidery(s){const error=spend(s);if(error)return error;B.startExam(s,'embroidery');return {ok:true};}
export function treat(s){const error=blocked(s);if(error)return {error};if(s.p.health>=100&&!s.p.illness)return {error:'Sức khỏe đang rất tốt.'};if(s.p.silver<15)return {error:'Cần 15 bạc để mời y quan.'};const spent=spend(s,'medicine');if(spent)return spent;s.p.silver-=15;if(s.p.illness){s.p.illness=null;s.p.counters.recoveries++;}return activityRoll(s,'health','Mời y quan · −15 bạc');}
export function startMaidExam(s,retirement=false){if(inColdPalace(s))return {error:'Khảo hạch tạm hoãn trong thời gian ở lãnh cung.'};if(s.mini||s.exam||!s.p.alive)return {error:'Đã có bài thi đang diễn ra.'};s.story=null;s.mini={kind:'memory',scores:[],retirement,round:1,deck:[],matched:[],flipped:[],mistakes:0,limit:4,status:'playing'};setupRound(s);return {ok:true};}
function setupRound(s){const m=s.mini,pairs=3+m.round;m.deck=Array.from({length:pairs*2},(_,i)=>i%pairs);for(let i=m.deck.length-1;i>0;i--){const j=range(s,0,i);[m.deck[i],m.deck[j]]=[m.deck[j],m.deck[i]];}m.matched=[];m.flipped=[];m.mistakes=0;m.limit=3+m.round;m.status='playing';}
export function flipCard(s,index){const m=s.mini;if(!m||m.status!=='playing'||!Number.isInteger(index)||index<0||index>=m.deck.length||m.flipped.length>=2||m.flipped.includes(index)||m.matched.includes(index))return {error:'Không thể lật thẻ này.'};m.flipped.push(index);if(m.flipped.length===2){const [a,b]=m.flipped;if(m.deck[a]===m.deck[b]){m.matched.push(a,b);m.flipped=[];if(m.matched.length===m.deck.length)m.status='won';}else{m.mistakes++;if(m.mistakes>=m.limit)m.status='lost';}}return {ok:true};}
export function memoryRoundScore(m){return Math.round(100*(m.matched.length/2)/(m.deck.length/2+m.mistakes*.5));}
export function memoryContinue(s){
 const m=s.mini;if(!m)return {error:'Không có bài khảo hạch.'};
 if(m.status==='playing'){if(m.flipped.length===2)m.flipped=[];return {ok:true};}
 m.scores.push(memoryRoundScore(m));
 if(m.round<3){m.round++;setupRound(s);return {round:m.round};}
 const score=Math.round(m.scores.reduce((a,b)=>a+b,0)/3),retirement=m.retirement,oldRank=B.rankLabel(s.p),passed=score>50;
 s.p.lastMaidExam={score,scores:[...m.scores],passed,month:s.p.months};s.mini=null;
 if(!passed){if(retirement){ordinaryEnding(s,`Khảo hạch Nữ quan đạt ${score}/100, chưa vượt 50 điểm; nàng được đưa về quê.`);return {failed:true,score};}result(s,'Khảo hạch chưa đạt',`${score}/100 điểm. Cần trên 50 điểm để đậu. Nàng giữ chức ${oldRank}, hẹn kỳ khảo hạch sau hai năm.`,false);return {failed:true,score};}
 const target=retirement?Math.max(2,s.p.serviceRank):Math.min(3,s.p.serviceRank+1);
 while(s.p.serviceRank<target)B.promote(s,true);
 s.p.retirementHandled=retirement||s.p.retirementHandled;
 result(s,'Khảo hạch đỗ đạt',`${score}/100 điểm · ${oldRank} → ${B.rankLabel(s.p)}. Đã bổ nhiệm và ban lễ phục theo chức mới.`);
 return {passed:true,score,rank:s.p.serviceRank};
}
export function requirementsMet(s,req){return req.every(r=>(s.p.stats[r.key]!==undefined?effective(s,r.key):s.p[r.key])>=r.value);}
function promotionOffer(s){const target=s.p.rank+1,keys=[...REQUIREMENTS];for(let i=keys.length-1;i>0;i--){const j=range(s,0,i);[keys[i],keys[j]]=[keys[j],keys[i]];}const req=keys.slice(0,3).map(([key,name])=>({key,name,value:clamp(40+target*8+range(s,-4,4),0,94)}));s.story={kind:'promotion',title:'Đại khảo nội đình',text:`Kỳ xét phẩm hai năm đã mở. Muốn lên ${RANKS[target].name}, nàng phải đủ ba chỉ số rồi vượt bài họa.`,req,target,threshold:52+target*6,roll:rand(s)};}
function assignRank(s,target,reason,{preserveExamSchedule=false}={}){target=Math.min(IMPERIAL_NOBLE_CONSORT_RANK,target);const previousLook=clone(s.p.appearance),p=s.p,maid=p.role==='maid';p.role='consort';p.rank=Math.max(p.rank,target);p.rankTitle=B.titleFor(s,p.rank);p.highestRank=Math.max(p.highestRank,p.rank);p.lastPromotion=p.months;if(!preserveExamSchedule)p.nextConsortExam=p.months+24;p.counters.promotions++;const grantedRobe=B.grantRankRobe(s,reason);B.issuePromotionDecree(s,reason);if(s.coronation)s.coronation.look=previousLook;B.grantRankJewelry(s,reason);if(inColdPalace(s)){migrateColdPalace(s);p.coldPalace.restore.robe=grantedRobe.id;if(s.coronation){p.coldPalace.coronation=s.coronation;s.coronation=null;}enforceColdOutfit(s);}award(s,'promotion');if(maid)award(s,'maidToConsort');B.checkAchievements(s);}
export function queueTitle(s,rank,reason){if(!Number.isInteger(rank)||rank>IMPERIAL_NOBLE_CONSORT_RANK)return false;if(rank<=Math.max(s.p.rank,s.pendingTitle?.rank??-1))return false;s.pendingTitle={rank,reason,month:s.p.months+1};return true;}
function rewardBirth(s,child){
 const p=s.p;if(!p.alive||p.health<=0||p.outside||p.role!=='consort')return;
 const before=B.rankLabel(p),reason=`Sinh ${child.gender.toLowerCase()} ${child.name}`;
 let text;
 if(p.rank>=IMPERIAL_NOBLE_CONSORT_RANK){
  text=p.rank===EMPRESS_RANK?'Nàng đã ở ngôi Hoàng hậu, tiếp tục giữ ngôi trung cung sau khi sinh con.':`Nàng đang giữ ngôi ${B.rankLabel(p)}. Hoàng đế ban một rương ngọc mừng hoàng tự; ngôi Hoàng hậu cần được xét lập hậu hoặc tranh hậu.`;
  if(p.rank<EMPRESS_RANK)giveChest(s,'jade',reason);
 }
 if(p.rank<IMPERIAL_NOBLE_CONSORT_RANK){
  assignRank(s,p.rank+1,reason,{preserveExamSchedule:true});
  if(s.pendingTitle&&s.pendingTitle.rank<=p.rank)s.pendingTitle=null;
  if(p.rank>=6){const decree={title:p.rankTitle,reason,month:p.months};if(inColdPalace(s))p.coldPalace.decree=decree;else s.decree=decree;}
  text=`Mừng ${child.gender.toLowerCase()} ${child.name} chào đời, hoàng đế ban thưởng nàng tăng một bậc: ${before} → ${B.rankLabel(p)}. Đã nhận lễ phục và trang sức theo phẩm vị mới.`;
 }
 const birthNotice=s.notices.findIndex(n=>n.kind==='family'&&n.child===child.id);
 s.notices.splice(birthNotice<0?s.notices.length:birthNotice+1,0,{kind:'family',title:'Ân thưởng sau sinh',text});
 addLog(s,text,'family');
}
export function availablePalaces(s){return LOCATIONS.filter(l=>l.residence&&(!s.world.residents[l.id]||s.world.residents[l.id]==='player'));}
export function acceptDecree(s,id){if(inColdPalace(s))return {error:'Chiếu chỉ được lưu đến khi ra khỏi lãnh cung.'};if(!s.decree)return {error:'Không có chiếu chỉ.'};if(!availablePalaces(s).some(l=>l.id===id))return {error:'Cung điện này đã có chủ.'};if(s.p.palace)delete s.world.residents[s.p.palace];s.p.palace=id;s.world.residents[id]='player';s.decree=null;result(s,'Nhập chủ cung điện',`${s.p.rankTitle} được ban ${LOCATIONS.find(l=>l.id===id).name}.`);return {ok:true};}
export function submitExam(s,similarity,metrics=null){
 const x=s.exam;if(!x||!s.p.alive)return {error:'Không có bài đang chờ.'};if(!Number.isFinite(similarity)||similarity<0||similarity>100)return {error:'Điểm không hợp lệ.'};
 const p=s.p,painting=paintingScore(similarity,effective(s,'art'),effective(s,'intelligence')),{total}=painting;if(metrics)painting.metrics=metrics;p.lastPainting={...painting,subject:x.subject,kind:x.kind};
 if(x.kind==='embroidery'){const quality=total>=88?3:total>=65?2:total>=35?1:0;const item={id:`pouch-${s.legacy.lives}-${p.months}-${range(s,0,1e9)}`,name:'Túi thêu · '+SUBJECTS[x.subject].name,subject:x.subject,quality,score:total};p.pouches.push(item);s.exam=null;s.notices.push({title:'Nhận túi thêu',text:`${item.name} · ${QUALITIES[quality]} · ${total} điểm`,pouch:item.id});result(s,'Đường kim gửi ý',`Túi thêu được chấm ${total}/100 · ${QUALITIES[quality]}. Đã cất vào túi đồ để đem tặng người quen. Thêu túi không tăng chỉ số nhân vật.`);s.result.effects={};s.result.painting=painting;return {total,quality,effects:{}};}
 if(x.kind==='promotion'){s.exam=null;p.counters.paintings++;p.counters.bestArt=Math.max(p.counters.bestArt,Math.round(similarity));if(total>=x.threshold){assignRank(s,Math.min(5,x.target),'Vượt kỳ đại khảo');result(s,'Đại khảo đạt yêu cầu',`${total}/${x.threshold} điểm yêu cầu. Nàng được phong ${B.rankLabel(p)}.`);}else{s.story={kind:'bribe',title:'Bài họa chưa đạt',text:`Đạt ${total} điểm; cần ${x.threshold}. Một quan coi thi ngỏ ý nhận bạc. Thất bại sẽ bị đày vào lãnh cung và khép lại kiếp này.`,target:x.target,cost:80+x.target*45,roll:rand(s),odds:clamp(30+effective(s,'luck')*.25+effective(s,'speech')*.15,10,80)};}if(s.result)s.result.painting=painting;if(s.story)s.story.painting=painting;B.checkAchievements(s);return {total,passed:total>=x.threshold};}
 if(x.kind==='selection'&&total<50){s.exam=null;p.counters.paintings++;p.counters.bestArt=Math.max(p.counters.bestArt,Math.round(similarity));s.story={kind:'selectionFail',title:'Tuyển tú không đạt',text:`Bài họa được ${total}/100, thấp hơn mức 50 điểm. Nàng có thể nhận việc cung nữ, hoặc rời cung và sống phần đời còn lại ở quê nhà. Kết thúc do trượt tuyển tú không nhận điểm luân hồi.`};s.story.painting=painting;B.checkAchievements(s);return {total,passed:false};}
 const r=B.submitExam(s,similarity);if(s.result)s.result.painting=painting;if(x.kind==='selection')p.nextConsortExam=p.months+24;return r;
}
export function romanceEligible(s,n,kind){return s.p.alive&&age(s.p)>=18&&!s.p.outside&&!s.p.prison&&!coldPalaceMonths(s)&&!!n&&n.gender==='male'&&n.id!=='emperor'&&n.alive&&n.met&&n.talked&&n.bond>50&&(kind==='proposal'?s.p.role==='maid':kind==='elope'&&['candidate','consort'].includes(s.p.role));}
export function relationshipSabotageChance(s){return (.22+clamp(s.p.envy)*.001)*.30;}
export function promoteCrownMother(s){
 const p=s.p;if(p.rank>=IMPERIAL_NOBLE_CONSORT_RANK)return;
 if(p.rank<7)assignRank(s,7,'Mẫu thân của Thái tử');
 p.role='consort';p.rank=7;p.rankTitle='Quý Phi';if(s.coronation)s.coronation.title='Quý Phi';p.highestRank=Math.max(7,p.highestRank);
 if(s.pendingTitle?.rank<=7)s.pendingTitle=null;
 if(s.decree&&s.decree.title!=='Hoàng hậu')s.decree.title='Quý Phi';const notice=s.notices.findLast(n=>n.kind==='rank-decree');if(notice&&notice.reason==='Mẫu thân của Thái tử'){notice.rankTitle='Quý Phi';notice.text=`Phụng chỉ, tôn ${p.name} làm Quý Phi, mẫu thân của Thái tử.`;}
}
export function pregnancyChance(s,base=.25,partner='emperor'){return !s.p.alive||s.p.infertile||age(s.p)<18||partner==='emperor'&&emperorInfertile(s)?0:clamp(base+effective(s,'luck')*.003+(equippedPet(s)?.perks.fertility||0),0,1);}
export function entertainmentEligible(s){const p=s.p,e=s.npcs.find(n=>n.id==='emperor');return p.alive&&!s.intro&&!p.outside&&age(p)>=17&&!p.prison&&!inColdPalace(s)&&['candidate','maid','consort'].includes(p.role)&&!!e?.alive&&(p.role!=='maid'||e.met);}
export function entertainmentChance(s){const p=s.p,e=s.npcs.find(n=>n.id==='emperor'),last=Math.max(p.cooldowns.caro??-99,p.cooldowns.guqin??-99,p.cooldowns.lake??-99);if(!entertainmentEligible(s)||p.months-last<4)return 0;return clamp(.10+Math.max(0,e.bond)*.001+effective(s,'intelligence')*.0004,.10,.24);}
export function caroChance(s){return entertainmentChance(s)/(lakeEligible(s)?3:2);}
export function guqinChance(s){return entertainmentChance(s)/(lakeEligible(s)?3:2);}
export const lakeChance=s=>lakeEligible(s)?entertainmentChance(s)/3:0;
export function entertainmentChoice(s,roll){const chance=entertainmentChance(s),part=chance/(lakeEligible(s)?3:2);return roll<part?'caro':roll<part*2?'guqin':roll<chance?'lake':null;}
export function startGuqin(s){if(s.story?.kind!=='guqin'||!entertainmentEligible(s)||s.fashion&&s.fashion.phase!=='invite'||s.festival||s.caro||s.guqin)return {error:'Chưa có lời mời đánh đàn hợp lệ.'};const e=meet(s,'emperor');e.talked=true;s.story=s.event=s.result=null;let seed=range(s,1,4294967295);if(seed===s.p.lastGuqinSeed)seed=(seed+1)>>>0;s.p.lastGuqinSeed=seed;s.guqin=newPerformance(seed,e.id,s.p.months);s.p.cooldowns.guqin=s.p.months;addLog(s,`Nhận lời đàn cổ cầm cho hoàng đế ${e.name}.`,'guqin');return {ok:true};}
export function settleGuqin(s,verified=null){const g=s.guqin;if(!g||g.status!=='ended'||!s.p.alive)return {error:'Khúc đàn chưa kết thúc.'};if(g.outcome)return {ok:true,...g.outcome};const e=s.npcs.find(n=>n.id===g.emperor&&n.alive);if(!e)return {error:'Hoàng đế không còn ở đây.'};if(verified){g.marks=[...verified.marks];}const score=performanceScore(g),stars=performanceStars(score),loss=stars===1?range(s,1,10):0;let text,prize=null;if(stars===1){e.bond=clamp(e.bond-loss,-100,100);text=`Tiếng đàn rối loạn khiến trẫm không vui. Nàng lui về đi. Thiện cảm hoàng đế −${loss}.`;}else if(stars===2)text='Hôm nay nàng có lẽ đã mệt. Hãy về luyện đàn thêm, hôm khác lại đến.';else if(stars===3)text='Tiếng đàn cũng tạm được, nhưng sao không hay như lần trước?';else{if(verified?.chest){prize={...verified.chest};if(!s.p.chests.some(c=>c.id===prize.id)){s.p.chests.push(prize);s.notices.push({title:'Nhận rương báu',text:prize.reason,chest:prize.tier});}}else prize=giveChest(s,stars===5?'jade':'silk',`Đàn cổ cầm đạt ${stars} sao`);text=stars===5?'Tuyệt diệu! Từng tiếng đàn như suối ngọc, khiến trẫm chẳng muốn khúc nhạc dừng. Ban nàng một rương ngọc!':'Hay lắm! Tiếng đàn thanh nhã khiến trẫm thư thái. Ban nàng một rương gấm.';}g.outcome={score,stars,loss,text,chest:prize?.id??null};addLog(s,`Đàn cổ cầm: ${score}/100 · ${stars} sao. ${text}`,'guqin');return {ok:true,...g.outcome};}
export function finishGuqin(s){if(!s.guqin?.outcome)return {error:'Hãy đàn hết khúc nhạc trước.'};s.guqin=null;return {ok:true};}
export function startCaro(s){if(s.story?.kind!=='caro'||!entertainmentEligible(s)||s.fashion&&s.fashion.phase!=='invite'||s.festival||s.caro||s.guqin)return {error:'Chưa có lời mời chơi caro hợp lệ.'};const e=meet(s,'emperor');e.talked=true;s.story=s.event=s.result=null;s.caro=newBoard(e.id,s.p.months);s.p.cooldowns.caro=s.p.months;addLog(s,`Nhận lời chơi caro với hoàng đế ${e.name}.`,'caro');return {ok:true};}
export function playCaro(s,index){if(!s.p.alive||!s.caro||age(s.p)<17||s.p.prison||inColdPalace(s))return {error:'Không có ván caro đang chơi.'};const r=playTurn(s.caro,index,()=>rand(s));if(r.error)return r;if(s.caro.status==='won'&&!s.caro.rewarded){const c=giveChest(s,'silk','Thắng hoàng đế trong ván caro');s.caro.rewarded=true;s.caro.chest=c.id;addLog(s,'Thắng ván caro với hoàng đế, nhận một rương gấm ban thưởng.','caro');}else if(['lost','draw'].includes(s.caro.status))addLog(s,s.caro.status==='draw'?'Ván caro với hoàng đế kết thúc hòa.':'Hoàng đế thắng ván caro. Hẹn nàng ở lần triệu kiến sau.','caro');return r;}
export function finishCaro(s){if(!s.caro)return {error:'Không có ván caro.'};if(s.caro.status==='playing')addLog(s,'Nàng xin khép ván caro trước khi phân thắng bại.','caro');s.caro=null;return {ok:true};}
export function dismissRankDecree(s){const i=s.notices.findIndex(n=>n.kind==='rank-decree');if(i<0)return {error:'Không có chiếu chỉ đang chờ.'};s.notices.splice(i,1);return {ok:true};}
export function unequipPet(s){if(!s.p.alive)return {error:'Kiếp này đã khép.'};s.p.pet=null;return {ok:true};}
export function imperialChance(s){
 const p=s.p,e=s.npcs.find(n=>n.id==='emperor');
 if(amnesiaNightBlocked(s)||!p.alive||p.outside||age(p)<18||p.prison||coldPalaceMonths(s)||p.pregnancy||!e?.alive||!(p.role==='consort'||p.role==='maid'&&e.met&&e.talked)||p.months-(p.cooldowns.imperial??-99)<3)return 0;
 return clamp((p.role==='consort'?.15:.035)+e.bond*.0025+effective(s,'luck')*.00055,.01,.5);
}
function imperialVisitError(s,lakeReward=false,fashionReward=false){
 const p=s.p,e=s.npcs.find(n=>n.id==='emperor');
 if(amnesiaNightBlocked(s)||!p.alive||s.intro||p.outside||age(p)<18||!e?.alive||!e.met||!e.talked||p.pregnancy||p.prison||coldPalaceMonths(s)||!['maid','consort',...(lakeReward||fashionReward?['candidate']:[])].includes(p.role))return 'Chưa đủ điều kiện cho cuộc triệu kiến riêng.';
 if(!fashionReward&&p.lastImperialVisit===p.months)return 'Kết quả lần thị tẩm này đã được ghi nhận.';
 return null;
}
export function imperialVisit(s,{lakeReward=false,fashionReward=false}={}){
 if(s.fashion&&s.fashion.phase!=='invite'&&!fashionReward)return {error:'Hãy hoàn thành Lễ hội thời trang trước.'};
 if(fashionReward&&(s.fashion?.phase!=='night'||fashionWinner(s)?.id!=='player'||s.imperialNight?.source!=='fashion'||s.imperialNight.phase!=='scene'||!fashionNightEligible(s)))return {error:'Chưa có lời mời hoa khôi.'};
 if(lakeReward&&(!lakeRewardReady(s)||!lakeNightEligible(s)))return {error:'Chưa đủ điều kiện nhận phần thưởng này.'};
 const error=imperialVisitError(s,lakeReward,fashionReward);if(error)return {error};
 const rejected=rejectDisfiguredNight(s);if(rejected){addLog(s,DISFIGURED_REJECTION,'setback');return rejected;}
 const p=s.p,e=s.npcs.find(n=>n.id==='emperor'),noticeStart=s.notices.length;
 if(fashionReward)s.fashion=s.imperialNight=null;
 p.lastImperialVisit=p.months;p.cooldowns.imperial=p.months;
 if(p.role==='maid'||(lakeReward||fashionReward)&&p.role==='candidate')assignRank(s,0,'Được hoàng đế sắc phong');
 p.envy=clamp(p.envy+10);
 const roll=rand(s),mood=lakeReward||fashionReward?'pleased':roll<IMPERIAL_MOODS.normal?'normal':roll<IMPERIAL_MOODS.normal+IMPERIAL_MOODS.pleased?'pleased':'displeased';
 const pregnant=rand(s)<pregnancyChance(s,lakeReward?.20:.25),before=e.bond;
 if(pregnant)p.pregnancy={since:p.months,due:p.months+9,father:e.name};
 const bondRoll=mood==='pleased'?range(s,1,10):mood==='displeased'?-range(s,1,20):0;
 e.bond=clamp(e.bond+bondRoll,-100,100);
 const delta=e.bond-before;
 let chest=null,promotedTo=null,confinedUntil=null,sentence=null;
 if(mood==='pleased'){
  if(rand(s)<.5)chest=giveChest(s,'silk','Hoàng đế hài lòng sau lần thị tẩm');
  if(rand(s)<.33&&p.rank<IMPERIAL_NOBLE_CONSORT_RANK&&queueTitle(s,p.rank+1,'Hoàng đế hài lòng, đặc cách thăng một phẩm'))promotedTo=p.rank+1;
 }else if(mood==='displeased'&&rand(s)<.3){
  sentence=enterColdPalace(s,'Hoàng đế không hài lòng, ban chiếu phạt.');confinedUntil=sentence.confinedUntil;
  if(sentence.ended)return {pregnant:false,mood,bondGain:delta,chest:null,promotedTo:null,confinedUntil:null,sentence:sentence.kind,ended:true};
 }
 const favorBefore=p.favor;apply(s,{favor:mood==='pleased'?8:mood==='displeased'?-5:0});
 const details=[];
 if(chest)details.push('Được ban một rương gấm · Đã cất vào túi đồ.');
 if(promotedTo!==null)details.push(`Được thăng một cấp lên ${RANKS[promotedTo].name} · Chiếu chỉ đến vào tháng sau.`);
 if(sentence?.protected||sentence?.rescued)details.push(sentence.text);
 if(confinedUntil)details.push(`Bị đưa vào lãnh cung ${sentence.months} tháng. ${pregnant?'Thai kỳ vẫn tiếp tục; sinh hoàng tử hoặc công chúa bình an sẽ được tha, không phong thưởng.':'Hết hạn hoặc được triệu hồi sẽ phục chức.'}`);
 if(pregnant){
  p.pregnancy={since:p.months,due:p.months+9,father:e.name};const envyGain=B.increaseEnvy(s,'pregnancy');details.push(`Tin thai khiến Đố kỵ tăng ${envyGain} điểm.`);
  details.push('Có tin thai · Thai kỳ kéo dài 9 tháng.');
  s.notices.push({kind:'pregnancy',title:'Tin mừng trong cung',text:'Thái y xác nhận nàng mang thai. Thai kỳ kéo dài chín tháng.',theme:'imperial'});
 }else details.push('Lần này không có tin thai.');
 const title=mood==='normal'?'Một đêm bình thường':mood==='pleased'?'Hoàng đế hài lòng':'Hoàng đế không thoải mái';
 const summary=mood==='normal'?'Lần thị tẩm trôi qua bình thường. Hoàng đế không chán ghét, nhưng cũng không quá thoải mái.':mood==='pleased'?'Hoàng đế hài lòng sau lần thị tẩm và dành thêm thiện cảm cho nàng.':'Hoàng đế không thoải mái sau lần thị tẩm, thiện cảm dành cho nàng giảm đi.';
 const receipt=`Thiện cảm ${delta>0?'+':''}${delta} (${before} → ${e.bond}).`;
 result(s,title,`${summary} ${receipt} ${details.join(' ')}`,mood!=='displeased');
 Object.assign(s.result,{theme:'imperial',imperial:{mood,summary,details,emperor:e.id,pregnant,chest:chest?.id??null,promotedTo,confinedUntil,bondRoll},bondBefore:before,bondAfter:e.bond,bondGain:delta,effects:{favor:p.favor-favorBefore}});
 for(const n of s.notices.slice(noticeStart))n.theme='imperial';
 return {pregnant,mood,bondGain:delta,chest:chest?.id??null,promotedTo,confinedUntil,sentence:sentence?.kind??null};
}
export function relationshipSabotage(s){
 const men=s.npcs.filter(n=>n.gender==='male'&&n.alive&&n.met&&n.talked);
 if(!s.p.alive||s.p.outside||s.p.prison||coldPalaceMonths(s)||!men.length||s.p.cooldowns.maleSabotage===s.p.months)return false;
 const available=MALE_RUMORS.filter(q=>s.p.months-(s.p.cooldowns['rumor-'+q.id]??-99)>=6);
 const rumor=pick(s,available.length?available:MALE_RUMORS),n=pick(s,men),loss=range(s,1,5),before=n.bond;
 n.bond=clamp(n.bond-loss,-100,100);s.p.cooldowns.maleSabotage=s.p.months;s.p.cooldowns['rumor-'+rumor.id]=s.p.months;s.event=null;
 const text=rumor.text.replaceAll('{role}',n.role).replaceAll('{name}',n.name),delta=n.bond-before;
 result(s,rumor.title,`${text} Thiện cảm ${n.name} ${delta} (${before} → ${n.bond}).`,false);
 Object.assign(s.result,{npc:n.id,dialogue:text,bondBefore:before,bondAfter:n.bond,bondGain:delta,relationshipEvent:true,rumor:rumor.id});
 return {npc:n.id,loss:Math.abs(delta),rumor:rumor.id};
}
export function storyChoices(s){const q=s.story;if(!q)return [];switch(q.kind){case'lake':return [['play','Nhận lời · Du hồ cùng người'],['skip','Xin hẹn dịp khác']];case'succession':return successionChoices(s);case'imperialJourney':return [['accept','Nhận lời · Cùng người du ngoạn'],['stay','Từ chối · Tiếp tục ở lại trong cung']];case'crownOffer':return [['accept','Chờ ý kiến đại thần'],['skip','Xin hoãn việc lập hậu']];case'crownCouncil':return q.phase==='waiting'?[['reveal','Nghe kết quả nghị bàn']]:q.support>50?[['accept','Lĩnh chỉ · Bước vào đại lễ']]:[['leave','Lui về cung · Chờ dịp khác']];case'crownContest':return [['contest',`Tranh đoạt · ${q.odds}% thành công`],['skip','Không tranh đoạt']];case'crownRevenge':return [['defend','Tự tra xét · Trí tuệ và may mắn'],['guard','Tăng cường hộ vệ · 50 bạc']];case'guqin':return [['play','Nhận lời · Đàn cổ cầm'],['skip','Xin hẹn dịp khác']];case'caro':return [['play','Nhận lời · Chơi caro'],['skip','Xin hẹn dịp khác']];case'selectionFail':return [['maid','Ở lại làm cung nữ, tìm cơ hội khác'],['leave','Xuất cung · Sống đời bình thường']];case'retirement':return [['leave','Xuất cung về quê'],['stay',s.p.serviceRank>=2?'Ở lại tiếp tục giữ chức':'Dự khảo hạch Nữ quan · 3 vòng']];case'maidExam':return [['exam','Vào khảo hạch · 3 vòng'],['skip','Bỏ kỳ thi này']];case'promotion':return [['exam',requirementsMet(s,q.req)?'Thi họa để thăng phẩm':'Chưa đủ ba chỉ số'],['skip','Hẹn kỳ sau · 2 năm nữa']];case'bribe':return [['bribe',`Hối lộ · ${q.cost} bạc · ${Math.round(q.odds)}% thành công`],['skip','Chấp nhận giữ phẩm vị cũ']];case'proposal':return [['marry','Nhận lời · Xuất cung thành hôn'],['skip','Khước từ, ở lại trong cung']];case'elope':return [['escape',`Cùng bỏ trốn · ${q.odds}% thành công`],['stay','Khước từ · Ở lại trong cung']];case'imperial':return [['accept','Nhận lời thị tẩm'],['skip','Cáo bệnh xin khất']];case'favor':return [['accept','Nhận ân điển'],['skip','Xin giữ phẩm vị cũ']];case'envy':return [['defend','Thu thập chứng cứ · Trí tuệ'],['endure','Nhẫn nhịn chờ thời']];default:return [['continue','Tiếp tục']];}}
export function chooseStory(s,choice){
 if(s.coronation)return {error:'Hãy khép lễ sắc phong trước khi tiếp tục chuyện trong tháng.'};
 if(s.festival)return {error:'Hãy khép tiệc đầu năm trước khi tiếp tục chuyện trong tháng.'};
 const q=s.story,p=s.p;if(!q||!storyChoices(s).some(([id])=>id===choice))return {error:'Không có lựa chọn này.'};
 if(q.kind==='succession')return chooseSuccession(s,choice);
 if(q.kind==='imperialJourney')return chooseImperialJourney(s,choice);
 if(['crownOffer','crownCouncil','crownContest','crownRevenge'].includes(q.kind))return resolveCrownStory(s,choice);
 if(q.kind==='lake'){if(choice==='play')return startLake(s);p.cooldowns.lake=p.months;s.story=null;return {ok:true};}
 if(q.kind==='guqin'){if(age(p)<17)return {error:'Triệu kiến đánh đàn mở từ 17 tuổi.'};if(choice==='play')return startGuqin(s);p.cooldowns.guqin=p.months;s.story=null;return {ok:true};}
 if(q.kind==='caro'){if(age(p)<17)return {error:'Triệu kiến chơi caro mở từ 17 tuổi.'};if(choice==='play')return startCaro(s);p.cooldowns.caro=p.months;s.story=null;return {ok:true};}
 if(q.kind==='promotion'&&choice==='exam'&&!requirementsMet(s,q.req))return {error:'Chưa đủ ba chỉ số cho kỳ thi.'};
 if(q.kind==='bribe'&&choice==='bribe'&&p.silver<q.cost)return {error:`Cần ${q.cost} bạc.`};
 if(['proposal','imperial','elope'].includes(q.kind)&&age(p)<18)return {error:'Nhánh này chỉ mở từ 18 tuổi.'};
 if(q.kind==='imperial'&&choice==='accept')return beginImperialNight(s);
 s.story=null;
 switch(q.kind){
  case'selectionFail':if(choice==='leave')return ordinaryEnding(s,'Không được tuyển, nàng chọn trở về quê.',null,'selectionFail');p.role='maid';p.rank=-1;p.rankTitle=null;p.serviceRank=0;B.grantServiceRobe(s,'Nhận việc cung nữ');B.enforceMaidJewelry(s);p.nextMaidExam=p.months+24;result(s,'Một lối rẽ mới',`Nàng nhận việc cung nữ tại ${B.department(p).name}.`);break;
  case'retirement':p.retirementHandled=true;if(choice==='leave')return ordinaryEnding(s,'Đủ hai mươi lăm tuổi, nàng xin xuất cung.');if(p.serviceRank<2)return startMaidExam(s,true);result(s,'Ở lại nội đình','Nàng tiếp tục đảm đương chức vụ nữ quan.');break;
  case'maidExam':if(choice==='exam')return startMaidExam(s);break;
  case'promotion':if(choice==='exam'){B.startExam(s,'promotion');Object.assign(s.exam,{threshold:q.threshold,target:q.target});}break;
  case'bribe':if(choice==='bribe'){p.silver-=q.cost;if(q.roll*100<q.odds){assignRank(s,Math.min(5,q.target),'Được xét thăng phẩm');p.envy=clamp(p.envy+15);result(s,'Được ghi tên thăng phẩm','Quan coi thi đã sửa lời tâu. Đố kỵ +15; chuyện này chưa chắc mãi được giấu kín.');}else{enterColdPalace(s,'Việc hối lộ bị phát giác.');}}break;
  case'proposal':if(choice==='marry'){const n=s.npcs.find(n=>n.id===q.npc);if(!romanceEligible(s,n,'proposal'))return {error:'Mối duyên đã thay đổi.'};return ordinaryEnding(s,`${n.name} xin hoàng đế ban hôn và được chấp thuận.`,n);}p.cooldowns.proposal=p.months;break;
  case'elope':{const n=s.npcs.find(n=>n.id===q.npc&&n.alive&&n.met&&n.talked);if(!romanceEligible(s,n,'elope'))return {error:'Mối duyên này không còn đủ điều kiện.'};p.cooldowns.elope=p.months;if(choice==='stay'){result(s,'Một lời từ biệt',`Nàng khước từ lời hẹn của ${n.name}, chọn ở lại cung thành.`);s.result.npc=n.id;break;}s.event=null;if(q.roll*100<q.odds)return ordinaryEnding(s,`Nàng cùng ${n.name} vượt khỏi cửa cung, đổi tên và sống nơi xa.`,n,'elopeSuccess');if(q.fate<.5){enterColdPalace(s,`Kế hoạch bỏ trốn cùng ${n.name} bị phát giác tại cửa thành.`,{cause:'elopeCaptured'});}else die(s,'elopeLost',`Cuộc chạy trốn cùng ${n.name} thất bại. Giữa vòng truy bắt, hai người lạc nhau; số phận nàng khép lại trên đường trốn khỏi kinh thành.`);if(p.death)p.death.npc=n.id;else if(s.result)s.result.npc=n.id;return {ended:!p.alive};}
  case'imperial':p.cooldowns.imperial=p.months;break;
  case'favor':if(choice==='accept'){queueTitle(s,q.target,'Hoàng đế đặc cách vì tài đức và duyên kỳ ngộ');result(s,'Ân điển đã định','Chiếu chỉ chính thức sẽ đến vào tháng sau.');}break;
  case'envy':return resolveEnvy(s,q,choice);
 }
 return {ok:true};
}
function revealEvent(s){const e=B.currentEvent(s);if(!e)return;const text=e.text;for(const [tag,n]of [['{friend}',B.friendly(s)],['{rival}',B.rival(s)]])if(text.includes(tag)&&n)meet(s,n.id,tag==='{rival}'?-15:0);}
export function nextMonth(s){const before=s.p.months,r=advanceMonth(s);if(!r?.error&&s.p.alive&&!s.dynasty?.death&&s.p.months===before+1){advanceCourt(s);queueNextNpcCoronation(s);queueNewYear(s);queueFashionFestival(s);queueMonthlySideEvents(s);queueSisterEvent(s);}return r;}
function advanceMonth(s){
 migrateColdPalace(s);const error=blocked(s);if(error)return {error};const wasConfined=coldPalaceMonths(s)>0;if(wasConfined){s.p.nextMaidExam++;s.p.nextConsortExam++;}const r=B.nextMonth(s,{skipEvent:wasConfined}),p=s.p;p.activityFeedback=null;if(r?.rescued)return r;if(!p.alive){s.story=s.mini=s.decree=s.pendingTitle=s.visit=null;return r;}distribute(s);p.envy=clamp(p.envy+((p.favor>=45||effective(s,'beauty')>=75)&&rand(s)<.28?range(s,2,4):-1));revealEvent(s);
 if(!wasConfined&&s.pendingTitle&&s.pendingTitle.month<=p.months){const q=s.pendingTitle;s.pendingTitle=null;assignRank(s,q.rank,q.reason);s.decree={title:p.rankTitle,reason:q.reason,month:p.months};if(p.rank<6){s.decree=null;result(s,'Chiếu chỉ sắc phong',`Phụng chỉ, phong ${p.name} làm ${p.rankTitle}. ${q.reason}.`);}}
 const pregnancyEvent=advancePregnancy(s);
 // A delivery uses this month: skip only the coinciding exam, keeping its two-year cadence.
 if(pregnancyEvent?.delivery&&p.role==='consort'&&p.nextConsortExam===p.months){
  p.nextConsortExam+=24;
  if(p.alive&&p.rank<5)addLog(s,'Tháng lâm bồn trùng kỳ đại khảo, nàng nghỉ thi để sinh con. Kỳ sau vẫn theo lịch hai năm.','family');
 }
 if(pregnancyEvent?.death)return {death:true,rescued:false};
 // Delivery health loss can be fatal even without the separate maternal-risk roll.
 // Resolve survival first so a pet rescue cannot skip the birth reward or pardon.
 let birthRescued=!!pregnancyEvent?.rescued;
 if(pregnancyEvent?.delivery&&p.health<=0){
  die(s,'exhaustion','Nàng không còn đủ sức hồi phục sau biến cố thai kỳ.');
  if(!p.alive)return {death:true,rescued:false};
  birthRescued=true;
 }
 if(pregnancyEvent?.child){
  const child=pregnancyEvent.child;
  if(pregnancyEvent.confined){
   if(p.health>0&&releaseColdPalace(s,'Sinh hoàng tự, được đặc xá',false)){
    const text=`Vì sinh được ${child.gender.toLowerCase()} ${child.name}, nàng được hoàng đế tha khỏi lãnh cung, trở về cung viện. Giữ nguyên phẩm vị, không được phong thưởng thêm.`;
    s.notices.push({kind:'family',title:'Sinh hoàng tự · Được tha khỏi lãnh cung',text,child:child.id});addLog(s,text,'family');
   }
  }else rewardBirth(s,child);
 }
 // A pet saves the mother, so settle the same birth rewards before pausing on its notice.
 if(birthRescued)return {death:false,rescued:true};
 const childrenEvent=advanceChildren(s,promoteCrownMother);
 if(p.health<=0){die(s,'exhaustion','Nàng không còn đủ sức hồi phục sau biến cố thai kỳ.');return {death:!s.p.alive,rescued:s.p.alive};}
 const emperorCause=emperorDeathCause(s);
 if(emperorCause){const succession=resolveEmperorDeath(s,emperorCause);return succession?.pending?{month:p.months,succession:true,pending:true}:succession?.continued?{month:p.months,succession:true}:{death:true};}
 if(s.coronation){s.event=null;return r;}
 if(pregnancyEvent||childrenEvent){s.event=null;if(!wasConfined||!inColdPalace(s))return r;}

 if(wasConfined){
  s.event=s.story=s.visit=null;
  const remaining=coldPalaceMonths(s);
  if(remaining){p.prison=remaining;enforceColdOutfit(s);selectColdEvent(s);}
  else releaseColdPalace(s);
  return {...r,event:s.event?.id};
 }
 if(p.role==='maid'&&age(p)>=25&&!p.retirementHandled){s.story={kind:'retirement',title:'Hai mươi lăm tuổi · Cửa cung mở',text:'Đã đến tuổi xét xuất cung. Nàng có thể về quê sống cuộc đời mới, hoặc vượt khảo hạch để ở lại với chức Nữ quan.'};return r;}
 if(p.role==='maid'&&p.serviceRank<3&&p.months>=p.nextMaidExam){p.nextMaidExam=p.months+24;s.story={kind:'maidExam',title:'Kỳ khảo hạch cung nữ',text:'Hai năm một kỳ. Vượt ba vòng ghép thẻ ghi nhớ để thăng một cấp; dùng hết lượt sai sẽ bị đánh trượt.'};return r;}
 if(p.role==='consort'&&p.rank<5&&p.months>=p.nextConsortExam){p.nextConsortExam=p.months+24;promotionOffer(s);return r;}
 if(maybeImperialJourney(s))return r;
 if(maybeCrownEvent(s))return r;
 const emperor=s.npcs.find(n=>n.id==='emperor'),adult=age(p)>=18;
 if(adult&&p.role==='maid'&&p.months-(p.cooldowns.proposal??-99)>=12){const suitors=s.npcs.filter(n=>romanceEligible(s,n,'proposal'));if(suitors.length&&rand(s)<.12+effective(s,'luck')*.001){const n=pick(s,suitors);s.story={kind:'proposal',npc:n.id,title:'Một lời cầu hôn',text:`${n.role} ${n.name} ngỏ lời xin hoàng đế cưới nàng. Nhận lời sẽ rời cung và mở kết cục thành hôn.`};return r;}}
 if(adult&&['candidate','consort'].includes(p.role)&&p.months-(p.cooldowns.elope??-99)>=12){const lovers=s.npcs.filter(n=>romanceEligible(s,n,'elope'));if(lovers.length&&rand(s)<.14+effective(s,'luck')*.0006){const n=pick(s,lovers),odds=Math.round(clamp(25+effective(s,'intelligence')*.2+effective(s,'luck')*.25+n.bond*.2-p.envy*.2,15,80));p.cooldowns.elope=p.months;s.event=null;s.story={kind:'elope',npc:n.id,title:'Mật thư ngoài cửa son',text:`${n.role} ${n.name} hẹn đưa nàng rời cung. Nếu nhận lời, nàng có thể thoát thân sống cùng nhau, bị phạt lãnh cung hoặc mất mạng trên đường. Thành công ${odds}%.`,odds,roll:rand(s),fate:rand(s)};addLog(s,`${n.name} gửi mật thư rủ nàng bỏ trốn.`,'encounter');return r;}}
 const entertainment=entertainmentChance(s)>0?entertainmentChoice(s,rand(s)):null;if(entertainment){p.cooldowns[entertainment]=p.months;s.event=null;s.story=entertainment==='lake'?{kind:'lake',npc:'emperor',title:'Triệu kiến · Du hồ cùng hoàng đế',text:`Hoàng đế ${emperor.name} mời nàng thay y phục, cùng lên thuyền thưởng cảnh hồ sen trong ngự uyển.`}:entertainment==='caro'?{kind:'caro',title:'Triệu kiến · Ván cờ cùng hoàng đế',text:`Hoàng đế ${emperor.name} mời nàng đến đình ngự uyển chơi một ván caro. Nối năm quân liên tiếp để thắng; thắng được ban một rương gấm.`}:{kind:'guqin',title:'Triệu kiến · Một khúc cổ cầm',text:`Hoàng đế ${emperor.name} truyền lời: “Trẫm nhớ nàng có tài đánh đàn, đến đàn cho trẫm nghe một câu.”`};addLog(s,s.story.title,entertainment);return r;}

 const summonsChance=imperialChance(s);
 if(summonsChance>0&&rand(s)<summonsChance){p.cooldowns.imperial=p.months;s.event=null;meet(s,emperor.id);emperor.talked=true;const proxy=princeAgreement(s),prince=s.npcs.find(n=>n.id==='prince');s.story={kind:'imperial',title:proxy?'Mật lệnh · Thân vương nhắc hẹn':p.role==='consort'?'Hoàng đế lật thẻ bài':'Kỳ ngộ · Lệnh triệu kiến',text:proxy?`Thân Vương ${prince.name} nhắc nhở bạn đêm nay đến thực hiện nghĩa vụ. Mật ước với hoàng đế vẫn được giữ kín.`:`${p.role==='consort'?'Thẻ bài mang tên nàng được chọn. ':''}Hoàng đế ${emperor.name} cho người truyền lệnh triệu nàng thị tẩm. Nàng có thể nhận lời hoặc cáo bệnh.`,theme:'imperial'};addLog(s,s.story.title+' · '+(proxy?prince.name:emperor.name),'imperial');return r;}
 if(p.role==='consort'&&p.rank>=5&&p.rank<IMPERIAL_NOBLE_CONSORT_RANK&&adult&&emperor.met&&emperor.talked&&emperor.bond>=40&&p.favor>=45&&!s.pendingTitle&&rand(s)<.008+effective(s,'luck')*.00035){s.story={kind:'favor',target:p.rank+1,title:'Kỳ ngộ bên rèm ngọc',text:'Hoàng đế nhớ đến tài đức của nàng, muốn đặc cách ban phẩm vị cao hơn. Đây là ân điển ngoài kỳ đại khảo.'};return r;}
 const envyChance=envyAttackChance(s);
 if(envyChance>0&&rand(s)<envyChance){s.story={kind:'envy',title:'Sóng ngầm sau cửa son',text:pick(s,['Một phi tần cho người tráo vật dụng rồi đổ lỗi cho nàng.','Một thái giám tung tin thất thiệt để làm mất ân điển của nàng.','Một đại thần dâng lời can gián, cho rằng nàng được ưu ái quá mức.']),roll:rand(s),outcomeRoll:rand(s)};return r;}
 if(s.npcs.some(n=>n.gender==='male'&&n.alive&&n.met&&n.talked)&&rand(s)<relationshipSabotageChance(s)){if(relationshipSabotage(s))return r;}
 const news=rand(s);
 if(news<.18){
  const incident=drawPalaceHostility(s);
  if(incident){
   const n=incident.npc;s.event=null;if(n){meet(s,n.id,-18);n.rivalry=clamp(n.rivalry+10);}
   apply(s,{health:-4,reputation:-3});p.envy=clamp(p.envy+5);
   result(s,incident.title,incident.text,false);
   s.result.npc=n?.id??null;s.result.palaceHostility=incident.kind;
  }
 }
 else if(news<.30){
  s.event=null;const loss=range(s,6,18);apply(s,{silver:-loss,art:-1});
  if(p.role==='consort'&&p.rank>=PHI_RANK)result(s,'Vòng ngọc bỗng vỡ',`Chiếc vòng ngọc bên tay bỗng nứt vỡ, những mảnh ngọc rơi xuống nền gạch. Điềm lạ khiến nàng thấp thỏm bất an. Nàng chi ${loss} bạc làm lễ cầu an, tài nghệ giảm 1 vì tâm trí xáo trộn.`,false);
  else result(s,'Lụa hỏng phải đền',`Một cuộn lụa bị ẩm, nàng bị trừ ${loss} bạc và mất 1 tài nghệ vì gián đoạn luyện tập.`,false);
 }
 else if(news<.54){s.event=null;const bad=pick(s,[
 ['Chén trà bị tráo','Sau chén trà lạ, nàng đau bụng và phải nghỉ dưỡng.',{health:-range(s,8,16),art:-range(s,2,5),intelligence:-range(s,1,3)}],
 ['Bị vu oan lấy trộm','Một món đồ bị giấu trong phòng nàng. Lời đồn khiến công trạng và uy danh tổn hại.',{merit:-range(s,5,10),reputation:-range(s,4,9),speech:-range(s,1,4)}],
 ['Phấn hương có độc','Loại phấn được gửi tặng gây dị ứng, nàng phải ngừng trang điểm và dưỡng bệnh.',{beauty:-range(s,3,7),health:-range(s,4,9),favor:-range(s,2,5)}],
 ['Bài luyện bị phá','Bản thêu bị cắt, sách bị vấy mực. Nàng mất công ôn luyện và bị trách phạt.',{art:-range(s,3,7),intelligence:-range(s,2,5),merit:-range(s,2,5)}],
 ['Lời gièm bên rèm','Có người bóp méo lời nàng nói, khiến người trên mất lòng tin.',{speech:-range(s,2,6),favor:-range(s,3,8),reputation:-range(s,3,6)}],
 ['Đêm trực trong mưa','Bị đổi ca trực giữa mưa lạnh, nàng mệt mỏi nhiều ngày.',{health:-range(s,5,10),beauty:-range(s,1,4),art:-range(s,1,3)}]
 ]);const before=Object.fromEntries(Object.keys(bad[2]).map(k=>[k,p.stats[k]??p[k]]));apply(s,bad[2]);const effects=Object.fromEntries(Object.keys(bad[2]).map(k=>[k,(p.stats[k]??p[k])-before[k]]));result(s,bad[0],bad[1],false);s.result.effects=effects;}
 else if(news<.56){s.event=null;giveChest(s,rand(s)<.2?'jade':'silk','Ban thưởng vì tận tâm trong tháng');result(s,'Ban thưởng nội đình','Công việc chu toàn được ghi nhận. Một rương trang phục được đưa đến viện.');}
 if(p.health<=0){die(s,'exhaustion','Sức khỏe cạn kiệt sau biến cố trong cung.');return {death:!s.p.alive,rescued:s.p.alive};}return r;
}
export function resolve(s,i){
 if(clearBlockedWhiteMoon(s))return {ok:true,skipped:true};
 if(s.coronation)return {error:'Hãy khép lễ sắc phong trước khi tiếp tục biến cố tháng.'};
 if(s.festival)return {error:'Hãy khép tiệc đầu năm trước khi tiếp tục sự kiện tháng.'};
 const ev=B.currentEvent(s),choice=ev?.choices[i],release=ev?.group==='cold'&&choice&&s.event&&B.eventOutcome(s,choice).outcome.release,cost=choice?.cost??choice?.success?.cost??0;
 if(choice&&s.event&&s.p.alive&&!s.exam&&s.p.silver>=cost){
  const text=B.eventOutcome(s,choice).outcome?.text||'';
  for(const [tag,n]of [['{friend}',B.friendly(s)],['{rival}',B.rival(s)]])if(text.includes(tag)&&n)meet(s,n.id,tag==='{rival}'?-15:0);
 }
 const outcome=choice&&s.event?B.eventOutcome(s,choice).outcome:null;
 const r=B.resolve(s,i);
 if(!r.error&&s.p.alive&&outcome?.coldPalace){
  const sentence=enterColdPalace(s,outcome.text,outcome.coldPalace);
  if(!s.p.alive)s.story=s.mini=s.decree=s.pendingTitle=s.visit=null;
  return {...r,success:!!sentence.protected,coldPalace:sentence.kind,death:!s.p.alive};
 }
 if(!r.error&&s.result&&outcome?.setback)s.result.success=false;
 if(!r.error&&s.p.alive&&release)releaseColdPalace(s,'Hoàng đế nhớ người cũ, đặc xá triệu hồi');
 if(!s.p.alive)s.story=s.mini=s.decree=s.pendingTitle=s.visit=null;
 else if(s.p.outside)return ordinaryEnding(s,'Nàng được phép rời cung.');
 return r;
}
export function acknowledge(s){return B.acknowledge(s);}
export function validate(input){
 const s=B.validate(input);validateColdPalace(s);migrate(s,true);const p=s.p;
 validateImperialSecret(s);validateWishingPool(s);validateEntryStory(s);validatePosthumous(s);validateSisterhood(s);validateTea(s);
 const scan=(v,depth=0)=>{if(depth>32)throw Error('Bản lưu lồng quá sâu.');if(typeof v==='string'&&(/[<>]/.test(v)||v.length>5000))throw Error('Nội dung bản lưu không hợp lệ.');if(v&&typeof v==='object')for(const x of Object.values(v))scan(x,depth+1);};scan(s);
 const integer=(n,a,b)=>Number.isInteger(n)&&n>=a&&n<=b;
 if(!integer(s.legacy.points,0,1e9)||!integer(p.actions,0,5)||!integer(p.envy,0,100)||!Array.isArray(p.pouches)||!Array.isArray(p.children))throw Error('Dữ liệu nội đình không hợp lệ.');
 for(const g of p.pouches)if(typeof g.id!=='string'||!integer(g.quality,0,3)||!integer(g.subject,0,SUBJECTS.length-1)||!Number.isFinite(g.score)||g.score<0||g.score>100)throw Error('Túi thêu không hợp lệ.');
 if(p.coldPalaceUntil!==null&&!integer(p.coldPalaceUntil,p.months,p.months+36)||p.lastImperialVisit!==null&&!integer(p.lastImperialVisit,0,p.months)||!integer(p.prison,0,999))throw Error('Thời hạn cấm túc hoặc triệu kiến không hợp lệ.');
 if(p.pregnancy?.anThaiProtected!==undefined&&typeof p.pregnancy.anThaiProtected!=='boolean')throw Error('Hiệu lực An Thai Hoàn không hợp lệ.');
 if(p.pregnancy&&(age(p)<18||!integer(p.pregnancy.since,0,p.months)||!integer(p.pregnancy.due,p.pregnancy.since+9,p.pregnancy.since+9)))throw Error('Thai kỳ không hợp lệ.');
 for(const n of s.npcs)if(typeof n.id!=='string'||typeof n.met!=='boolean'||typeof n.talked!=='boolean'||!Number.isFinite(n.bond)||n.bond< -100||n.bond>100||!Number.isFinite(n.kindness)||n.kindness<0||n.kindness>100||n.talked&&!n.met)throw Error('Nhân duyên không hợp lệ.');
 validateSupplies(s);validateSideEvents(s);validateLake(s);validateFashion(s);validateImperialNight(s);validateCourtProgression(s);validateCoronation(s);validateNewYear(s);validateFamily(s);validateBoard(s.caro);if(s.caro&&(!p.alive||age(p)<17||s.caro.month>p.months||s.caro.emperor!=='emperor'||!s.npcs.some(n=>n.id===s.caro.emperor&&n.alive)||s.story||s.exam||s.mini))throw Error('Thời điểm ván caro không hợp lệ.');if(s.story?.kind==='caro'&&age(p)<17)throw Error('Chưa đủ tuổi chơi caro cùng hoàng đế.');
 validatePerformance(s.guqin);if(s.guqin&&(!p.alive||age(p)<17||s.guqin.month>p.months||!s.npcs.some(n=>n.id===s.guqin.emperor&&n.alive)||s.caro||s.story||s.exam||s.mini||p.prison||inColdPalace(s)))throw Error('Thời điểm bài đàn không hợp lệ.');if(s.story?.kind==='guqin'&&age(p)<17)throw Error('Chưa đủ tuổi đàn cùng hoàng đế.');if(s.guqin?.status==='playing')pausePerformance(s.guqin);
 if(s.story?.kind==='lake'&&!lakeEligible(s))throw Error('Lời mời du hồ không hợp lệ.');
 const kinds=['lake','succession','imperialJourney','crownOffer','crownCouncil','crownContest','crownRevenge','guqin','caro','selectionFail','retirement','maidExam','promotion','bribe','proposal','imperial','favor','envy','elope'];
 if(s.story?.kind==='elope'&&(!Number.isFinite(s.story.roll)||s.story.roll<0||s.story.roll>=1||!Number.isFinite(s.story.fate)||s.story.fate<0||s.story.fate>=1||!integer(s.story.odds,15,80)))throw Error('Mật thư không hợp lệ.');
 if(s.story&&(!kinds.includes(s.story.kind)||typeof s.story.title!=='string'||typeof s.story.text!=='string'))throw Error('Chuyện nội đình không hợp lệ.');
 if(s.story&&['proposal','imperial','favor','elope'].includes(s.story.kind)&&age(p)<18)throw Error('Nhánh nhân duyên chưa đủ tuổi.');
 if(s.story?.kind==='promotion'&&(!Array.isArray(s.story.req)||s.story.req.length!==3||new Set(s.story.req.map(r=>r.key)).size!==3||s.story.req.some(r=>!REQUIREMENTS.some(([k])=>k===r.key)||!integer(r.value,0,100))))throw Error('Điều kiện đại khảo không hợp lệ.');
 if(s.story&&['bribe','envy','crownContest','crownRevenge'].includes(s.story.kind)&&(!Number.isFinite(s.story.roll)||s.story.roll<0||s.story.roll>=1))throw Error('Vận số của biến cố không hợp lệ.');
 if(s.story?.kind==='envy'&&s.story.outcomeRoll!==undefined&&(!Number.isFinite(s.story.outcomeRoll)||s.story.outcomeRoll<0||s.story.outcomeRoll>=1))throw Error('Vận số lời gièm không hợp lệ.');
 if(s.story?.kind==='crownContest'&&(!integer(s.story.odds,30,100)||!s.npcs.some(n=>n.id===s.story.queen)))throw Error('Tranh đoạt không hợp lệ.');
 if(s.story?.kind==='crownCouncil'&&(!['waiting','verdict'].includes(s.story.phase)||!integer(s.story.support,30,100)||!integer(s.story.month,0,p.months)||s.story.supportVersion!==1||crownEligibility(s)!=='vacant'))throw Error('Nghị bàn lập hậu không hợp lệ.');
 if(s.story?.kind==='bribe'&&(!integer(s.story.target,1,5)||!integer(s.story.cost,0,999999)||!Number.isFinite(s.story.odds)||s.story.odds<0||s.story.odds>100))throw Error('Đề nghị hối lộ không hợp lệ.');
 for(const n of s.npcs)if(n.gender==='male'&&!integer(n.portraitVariant,0,9))throw Error('Chân dung không hợp lệ.');
 if(s.mini){const m=s.mini;if(!Array.isArray(m.scores)||m.scores.length!==m.round-1||m.scores.some(v=>!integer(v,0,100)))throw Error('Điểm khảo hạch không hợp lệ.');if(m.kind!=='memory'||!integer(m.round,1,3)||!Array.isArray(m.deck)||m.deck.length!==(3+m.round)*2||m.deck.some(v=>!integer(v,0,2+m.round))||!['playing','won','lost'].includes(m.status)||!integer(m.mistakes,0,20)||!Array.isArray(m.flipped)||m.flipped.length>2||!Array.isArray(m.matched)||[...m.matched,...m.flipped].some(i=>!integer(i,0,m.deck.length-1)))throw Error('Bàn khảo hạch không hợp lệ.');}
 if(s.exam?.kind==='promotion'&&(!integer(s.exam.target,1,5)||!integer(s.exam.threshold,0,100)))throw Error('Bài đại khảo không hợp lệ.');
 if(s.pendingTitle&&(!integer(s.pendingTitle.rank,1,IMPERIAL_NOBLE_CONSORT_RANK)||!integer(s.pendingTitle.month,0,p.months+1)))throw Error('Sắc phong không hợp lệ.');
 if(!s.world.positions||!s.world.residents||Object.values(s.world.positions).some(id=>!LOCATIONS.some(l=>l.id===id)))throw Error('Bản đồ không hợp lệ.');
 return s;
}

export function equip(s,id){
 if(inColdPalace(s)){
  if(id!=='robe-0')return {error:'Trong lãnh cung chỉ được mặc áo vải giản dị, không đeo trang sức.'};
  enforceColdOutfit(s);return {ok:true};
 }
 return B.equip(s,id);
}

function resolveCrownStory(s,choice){const q=s.story,p=s.p;if(!p.alive)return {error:'Kiếp này đã khép.'};
 if(q.kind==='crownRevenge'){if(choice==='guard'&&p.silver<50)return {error:'Cần 50 bạc để tăng cường hộ vệ.'};if(choice==='guard')p.silver-=50;const odds=clamp(35+effective(s,'intelligence')*.3+effective(s,'luck')*.15+(choice==='guard'?20:0),25,90);s.story=s.event=null;if(q.roll*100<odds){apply(s,{health:-range(s,2,7),reputation:3});result(s,'Bóng dao đã bị chặn','Âm mưu báo thù thất bại. Hộ vệ bảo toàn phụng điện, nhưng nàng vẫn phải dưỡng sức.');if(p.health<=0)die(s,'crownRevenge','Vết thương trong vụ báo thù đã lấy đi mạng sống của nàng.');}else die(s,'crownRevenge','Một mũi dao từ phe cánh bị phế truất khép lại cuộc đời nàng.');return {ok:true,death:!p.alive};}
 if(choice==='skip'){p.cooldowns.crown=p.months;s.story=s.event=null;result(s,'Phụng vị chưa đổi','Nàng quyết định giữ phẩm vị hiện tại và chờ thời cơ khác.');return {ok:true};}
 if(['crownOffer','crownCouncil'].includes(q.kind)&&crownEligibility(s)!=='vacant'||q.kind==='crownContest'&&crownEligibility(s)!=='contest')return {error:'Điều kiện phụng vị đã thay đổi.'};
 if(q.kind==='crownOffer')return startCrownCouncil(s);
 if(q.kind==='crownCouncil'){
  if(choice==='reveal')return revealCrownCouncil(s);
  if(choice==='leave'){p.cooldowns.crown=p.months;s.story=s.event=null;return {ok:true,approved:false};}
  if(choice==='accept'&&q.phase==='verdict'&&q.support>50){crownPlayer(s);return {crowned:true};}
  return {error:'Triều thần chưa thông qua việc lập hậu.'};
 }
 if(q.roll*100<q.odds){crownPlayer(s,true);return {crowned:true};}
 s.story=s.event=null;const emperor=s.npcs.find(n=>n.id==='emperor');if(emperor.bond>50)enterColdPalace(s,'Tranh đoạt phụng vị thất bại. Hoàng đế giữ lại mạng nàng nhưng phạt lãnh cung trọn đời.',{kind:'life',ignoreProtection:true,allowSisterPlea:false});else die(s,'crownExecution','Tranh đoạt phụng vị thất bại. Hoàng đế ban án tử, khép lại kiếp này.');return {death:!p.alive,rescued:p.alive};
}

export function claimLakeReward(s,choice){
 if(s.imperialNight||!lakeRewardReady(s)||!['chest','night'].includes(choice))return {error:'Chưa có phần thưởng du hồ.'};
 if(choice==='night')return beginImperialNight(s,'lake');
 const stars=fishingStars(s.lake.game);s.lake.claimed=true;giveChest(s,stars===5?'jade':'silk','Hoàng đế ban thưởng câu cá');s.lake=null;result(s,'Ngự thưởng bên hồ','Hoàng đế mỉm cười, ban rương thưởng cho tài câu cá của nàng.');s.result.npc='emperor';return {ok:true};
}

export function finishImperialNight(s){
 const g=s.imperialNight;if(g?.phase!=='scene')return {error:'Chưa tiến vào tẩm điện.'};
 const r=g.emperor==='prince'?princeVisit(s):imperialVisit(s,{lakeReward:g.source==='lake',fashionReward:g.source==='fashion'});
 if(!r?.error){s.imperialNight=null;if(g.source==='lake')s.lake=null;if(g.source==='fashion')s.fashion=null;}return r;
}

export function claimFashionWinner(s){
 const g=s.fashion;if(g?.phase!=='winner')return {error:'Hoa khôi chưa được công bố.'};
 const winner=fashionWinner(s),e=s.npcs.find(n=>n.id==='emperor');
 if(winner.id!=='player'){
  leaveFashionFestival(s);
  result(s,'Lễ hội khép lại',winner.age>=18?`Hoàng đế ${e.name} hài lòng, đêm đó mời ${winner.name} đến tẩm điện. Nàng trở về viện, tiếp tục việc trong tháng.`:`Hoàng đế ${e.name} hài lòng, ban lời khen cho hoa khôi ${winner.name}. Nàng trở về viện, tiếp tục việc trong tháng.`);
  return {ok:true,winner:winner.id};
 }
 if(!fashionRewardReady(s))return {error:'Lời mời dự hội chưa sẵn sàng.'};
 if(fashionJadeReason(s)){
  const returnText=fashionJadeReason(s)==='pregnant'?'trở về viện dưỡng thai':'trở về viện';
  leaveFashionFestival(s);const chest=giveChest(s,'jade','Hoa khôi Lễ hội thời trang cung đình');
  result(s,'Ngự thưởng hoa khôi',`Hoàng đế ${e.name} hài lòng, ban cho hoa khôi ${s.p.name} một Rương Ngọc rồi cho nàng ${returnText}. Rương đã được cất vào túi đồ.`);
  return {ok:true,honored:true,chest:chest.id};
 }
 if(!fashionNightEligible(s)){
  leaveFashionFestival(s);result(s,'Hoa khôi cung đình',`Hoàng đế ${e.name} hài lòng, ban lời khen cho hoa khôi ${s.p.name}. ${s.p.pregnancy?'Nàng được trở về viện dưỡng thai.':'Nàng nhận vinh danh và trở về viện.'}`);return {ok:true,honored:true};
 }
 e.met=e.talked=true;
 return beginImperialNight(s,'fashion');
}

export function startWishingPool(s){
 const error=blocked(s);if(error)return {error};
 if(s.p.outside||!access(s,'pavilion'))return {error:'Nàng chưa thể đến Thủy Tạ.'};
 return openWishingPool(s);
}

export function chooseSecret(s,choice){
 const r=chooseImperialSecret(s,choice);if(r.startPrinceNight)return beginImperialNight(s,'prince-first');return r;
}
function princeVisit(s){
 const g=s.imperialNight,p=s.p,n=s.npcs.find(n=>n.id==='prince'),e=s.npcs.find(n=>n.id==='emperor');
 if(!princeAgreement(s)||!e?.alive||g?.emperor!=='prince'||g.month!==p.months||g.phase!=='scene'||!p.alive||age(p)<18||n.age<18||p.pregnancy||g.source!=='prince-first'&&p.lastImperialVisit===p.months)return {error:'Chưa có mật hẹn hợp lệ.'};
 const first=s.imperialSecret.nights===0,before=n.bond,roll=rand(s),mood=first?'normal':roll<IMPERIAL_MOODS.normal?'normal':roll<IMPERIAL_MOODS.normal+IMPERIAL_MOODS.pleased?'pleased':'displeased';
 const pregnant=rand(s)<pregnancyChance(s,.25,'prince');
 const bondRoll=first?15:mood==='pleased'?range(s,1,10):mood==='displeased'?-range(s,5,10):0;n.bond=clamp(before+bondRoll,-100,100);
 let chest=null;if(mood==='pleased')chest=giveChest(s,rand(s)<.5?'silk':'jade','Thân vương hài lòng sau lần mật hẹn');
 if(pregnant){p.pregnancy={since:p.months,due:p.months+9,father:e.name,secretProxy:{prince:n.name,emperor:e.name}};const envyGain=B.increaseEnvy(s,'pregnancy');s.notices.push({kind:'pregnancy',theme:'imperial',title:'Tin mừng được giữ kín',text:`Thái y xác nhận nàng mang thai. Đứa trẻ được ghi vào hoàng tộc dưới danh nghĩa hoàng tự của ${e.name}. Đố kỵ +${envyGain}.`});}
 p.lastImperialVisit=p.months;p.cooldowns.imperial=p.months;s.imperialSecret.nights++;
 const delta=n.bond-before,summary=first?`Thân vương ${n.name} cùng nàng giữ kín mật ước. Lần đầu gặp riêng, thiện cảm +15.`:mood==='pleased'?'Thân vương hài lòng, gửi nàng một rương báu cùng đôi lời quan tâm.':mood==='displeased'?PRINCE_SILENT_TEXT:'Một đêm bình thường trôi qua, không có quà ban thưởng.';
 const details=[pregnant?'Có tin thai.':'Lần này chưa có tin thai.',...(chest?['Đã cất '+(chest.tier==='jade'?'rương ngọc':'rương gấm')+' vào túi đồ.']:[])];
 result(s,first?'Mật ước dưới đèn':mood==='pleased'?'Thân vương hài lòng':mood==='displeased'?'Thân vương im lặng':'Một đêm bình thường',summary+' '+details.join(' '),true);
 Object.assign(s.result,{theme:'imperial',imperial:{mood,summary,details,emperor:n.id,pregnant,chest:chest?.id??null,promotedTo:null,confinedUntil:null,bondRoll},bondBefore:before,bondAfter:n.bond,bondGain:delta});
 return {ok:true,pregnant,mood,bondGain:delta,chest:chest?.id??null,promotedTo:null,confinedUntil:null};
}
