import * as B from './life-engine.mjs';
import {EMPRESS_RANK,IMPERIAL_NOBLE_CONSORT_RANK} from './life-data.mjs';
import {lakeEligible} from './imperial-lake.mjs';
import {crownPlayer} from './coronation.mjs';
import {resolveEmperorDeath,appointRescuedEmpressHeir} from './family.mjs';
import {resolveRescuePosthumous} from './posthumous.mjs';

export const LAKE_AMBUSH_CHANCE=.30;
export function ambushOutcome(choice,roll){
 if(!Number.isFinite(roll)||roll<0||roll>=1)return null;
 if(choice==='hide')return ['both-die','escape','emperor-dies','demotion'][Math.floor(roll*4)];
 if(choice==='rescue')return roll<.34?'sacrifice':roll<.67?'saved':'scolded';
 return null;
}
function demoteForCowardice(s){
 const p=s.p,from=B.rankLabel(p);
 s.pendingTitle=s.decree=s.coronation=null;
 s.notices=s.notices.filter(n=>n.kind!=='rank-decree');
 if(p.rank<2){
  p.role='maid';p.rank=-1;p.rankTitle=null;p.serviceRank=0;p.palace=null;
  p.nextMaidExam=p.months+24;B.restoreServiceRobe(s);
 }else{B.demote(s);B.demote(s);}
 return `Hoàng đế trách nàng tham sống sợ chết, giáng từ ${from} xuống ${B.rankLabel(p)}.`;
}
function promoteForRescue(s){
 const p=s.p;
 if(p.rank>=EMPRESS_RANK)return 'Nàng tiếp tục giữ ngôi Hoàng hậu.';
 if(p.rank===IMPERIAL_NOBLE_CONSORT_RANK){crownPlayer(s);return 'Hoàng đế đặc cách lập nàng làm Hoàng hậu vì công cứu giá.';}
 const merit=p.merit;p.role='consort';B.promote(s);p.merit=merit;
 return `Hoàng đế phong nàng một cấp, trở thành ${B.rankLabel(p)}.`;
}
function killEmperorTogether(s){
 const e=s.npcs.find(n=>n.id==='emperor');
 e.alive=false;s.dynasty.death={cause:'assassination',month:s.p.months,name:e.name,age:e.age};
}
export function chooseLakeAmbush(s,choice){
 const g=s.lake,outcome=ambushOutcome(choice,g?.outcomeRoll);
 if(g?.phase!=='ambush'||!lakeEligible(s)||!outcome||s.result)return {error:'Không có lựa chọn thích khách này.'};
 const p=s.p,e=s.npcs.find(n=>n.id==='emperor'),healthBefore=p.health,bondBefore=e.bond;
 // Consume the encounter before other systems clear their pending state.
 s.lake=null;
 let title,text,success=false,effects={},heir=null,petSacrifice=null;
 if(outcome==='both-die'){
  title='Sóng dữ ngự hồ';text='Nàng tìm nơi ẩn nấp nhưng thích khách vẫn đuổi theo. Cấm vệ đến quá muộn; nàng cùng hoàng đế tử nạn giữa sóng nước.';
  killEmperorTogether(s);B.die(s,'lakeAmbush',text);
 }else if(outcome==='escape'){
  title='Qua cơn hiểm nguy';success=true;
  text='Nàng ẩn nấp thành công. Hoàng đế thi triển võ nghệ cao cường, tự mình giải quyết hết thích khách. Cấm vệ sau đó xuất hiện, hộ tống hai người trở về cung.';
 }else if(outcome==='emperor-dies'){
  title='Hoàng đế băng hà';
  resolveEmperorDeath(s,'assassination',{forceEnd:true});
  text=s.story?.kind==='succession'?'Hoàng đế tử nạn trong cuộc tập kích. Nàng được cấm vệ đưa về cung. Với ngôi Hoàng hậu, nàng phải định người kế vị theo quy củ hoàng triều.':p.death?.text||'Hoàng đế tử nạn trong cuộc tập kích trên hồ.';
 }else if(outcome==='demotion'){
  title='Thánh nhan nổi giận';
  text='Hoàng đế một mình dẹp yên thích khách. Khi tìm thấy nàng đang trốn, người nổi giận. '+demoteForCowardice(s);
 }else if(outcome==='sacrifice'){
  title='Xả thân cứu giá';text='Nàng lao ra đỡ kiếm cho hoàng đế. Thích khách bị tiêu diệt, nhưng nàng không qua khỏi vết thương.';
  B.die(s,'rescueEmperor',text);
  if(p.alive){
   petSacrifice=s.result?.petSacrifice;title='Linh thú cứu chủ';success=true;
   text=s.result?.text||'Linh thú gánh lấy lưỡi kiếm, cứu nàng thoát chết.';
   text+=' Hoàng đế dẹp yên thích khách, cấm vệ hộ tống nàng về cung dưỡng thương.';
  }else{
   resolveRescuePosthumous(s);
   heir=appointRescuedEmpressHeir(s);
   text=p.death.text;
  }
 }else if(outcome==='saved'){
  title='Cứu giá thành công';success=true;p.health=Math.max(0,p.health-30);effects.health=p.health-healthBefore;
  text=(p.health===0?'Nàng cứu được hoàng đế nhưng bị thương nặng, sức khỏe về 0. Ngự y kịp thời giữ lại tính mạng. ':'Nàng cứu được hoàng đế, chịu một vết thương khiến sức khỏe giảm 30. ')+promoteForRescue(s);
  B.giveChest(s,'jade','Có công cứu giá trên hồ');e.bond=B.clamp(bondBefore+25,-100,100);
  text+=' Hoàng đế ban một rương ngọc và càng thêm cảm kích nàng.';
 }else{
  title='Lời trách giữa hiểm nguy';
  text='Hoàng đế quát: “Nàng chạy ra đây làm gì cho vướng chân? Trẫm lo được, đám súc sinh này có là gì!” Người tự mình xử hết thích khách, rồi cùng nàng trở về cung.';
  e.bond=B.clamp(bondBefore-30,-100,100);
 }
 s.result={theme:'lake-ambush',title,text,success,effects,outcome,emperor:e.id,petSacrifice,
  ...(outcome==='saved'||outcome==='scolded'?{bondBefore,bondAfter:e.bond,bondGain:e.bond-bondBefore}:{}),heir:heir?.id??null};
 B.addLog(s,text,'lake');return {ok:true,outcome,death:!p.alive,heir:heir?.id??null};
}
