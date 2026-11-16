import * as B from './life-engine.mjs';
import {enterColdPalace,inColdPalace} from './cold-palace.mjs';
import {clearBlockedWhiteMoon} from './white-moon-events.mjs';

export const INFERTILE_EMPEROR_CHANCE=.20;
export const SECRET_TRUST_CHANCE=.50;
export const SECRET_MONTH=38; // Năm thứ tư, tháng ba; tháng nhập cung là tháng một.
export const SECRET_INTRO='Hôm đó, nàng một mình dạo bước trong ngự uyển, tình cờ bắt gặp hoàng đế đang nói chuyện riêng với thần y. Thấy vẻ mặt nghiêm trọng của hai người, nàng khẽ nép sau gốc liễu, chẳng ngờ sắp nghe được một bí mật không nên biết…';
const king=s=>s.npcs.find(n=>n.id==='emperor');
export const emperorInfertile=s=>s.imperialSecret?.infertile===true&&s.imperialSecret.emperor===king(s)?.name;
export const princeAgreement=s=>emperorInfertile(s)&&s.imperialSecret.status==='accepted'&&s.npcs.some(n=>n.id==='prince'&&n.alive&&n.age>=18);
export const princeDateProtected=(s,id)=>id==='prince'&&emperorInfertile(s)&&['accepted','refused','amnesia','concluded'].includes(s.imperialSecret.status);
export const amnesiaNightBlocked=s=>emperorInfertile(s)&&s.imperialSecret.status==='amnesia'&&(king(s)?.bond??-100)<50;
export function initImperialSecret(s,roll=false){
 if(!s.imperialSecret||roll){
  const infertile=roll&&B.rand(s)<INFERTILE_EMPEROR_CHANCE;
  s.imperialSecret={version:1,emperor:king(s)?.name||'',infertile,status:infertile?'waiting':'fertile',scene:null,nights:0,refusalUntil:null,refusalMother:null,refusalChild:null};
 }
 const g=s.imperialSecret;
 if(g.emperor!==king(s)?.name){g.status='cancelled';g.scene=null;}
 clearBlockedWhiteMoon(s);
 return g;
}
function otherEvents(s){
 return !s.p.alive||s.intro||s.entryStory||s.p.outside||s.p.ageMonths<216||s.p.prison||inColdPalace(s)||s.dynasty?.death||
 ['event','story','exam','mini','decree','result','dateScene','imperialNight','lake','wishingPool','coronation','festival','guqin','caro','tea','sisterEvent','adoptionChoice'].some(k=>!!s[k])||
 s.notices.length>0||s.sideEvents?.length>0||!!s.fashion;
}
export function imperialSecretReady(s){
 const g=s.imperialSecret;
 return !!g?.scene||!!(emperorInfertile(s)&&king(s)?.alive&&!otherEvents(s)&&
  (g.status==='waiting'&&s.p.months>=SECRET_MONTH||g.status==='refused'&&s.p.months>=g.refusalUntil));
}
export function beginImperialSecret(s){
 if(!imperialSecretReady(s))return false;
 const g=s.imperialSecret;if(g.scene)return true;
 if(g.status==='refused'){completeRefusal(s);return false;}
 g.scene={step:0,intro:true,month:s.p.months,branch:B.rand(s)<SECRET_TRUST_CHANCE?'trust':'execution'};
 g.status='scene';
 B.addLog(s,`Năm ${Math.floor(s.p.months/12)+1}, tháng ${s.p.months%12+1} · Vô tình nghe được bí mật trong ngự uyển.`,'court');
 return true;
}
export function secretDialogue(s){
 const g=s.imperialSecret,e=king(s),prince=s.npcs.find(n=>n.id==='prince');
 const lines=[
  ['Hoàng đế',e?.name,'Ngươi nói… trẫm thực sự không có khả năng để lại hậu duệ?'],
  ['Thần y',s.npcs.find(n=>n.id==='physician')?.name,'Thần không dám nói bừa… chuyện này… thần đã cố hết sức. Bệ hạ tha tội, độc tính năm xưa người trúng quá mạnh đã ảnh hưởng…'],
  ['Hoàng đế',e?.name,'Chuyện này trước hết phải giữ bí mật, đợi trẫm tính…'],
  ['Ngự uyển','Cành khô dưới chân','Nàng hốt hoảng lùi lại. Rắc! Một cành cây khô gãy dưới chân. Hoàng đế đột ngột quay đầu: “Ai ở đó? Bước ra đây!”'],
 ];
 if(g?.scene?.branch==='execution')lines.push(['Hoàng đế',e?.name,'Bí mật của trẫm không thể để lọt ra ngoài. Người đâu, đưa nàng đi!']);
 else lines.push(
  ['Hoàng đế',e?.name,'Nàng đã nghe thấy rồi. Lại đây. Chuyện này liên quan đến giang sơn xã tắc… trẫm chỉ có thể tin nàng. Nàng có bằng lòng giúp trẫm giữ lấy huyết mạch hoàng gia?'],
  ['Ngự uyển','Một người tiến vào',`Từ cuối lối nhỏ, Thân vương ${prince?.name} lặng lẽ bước đến. Thần y cúi đầu cáo lui, để lại hai huynh đệ.`],
  ['Hoàng đế',e?.name,`${prince?.name} là huynh đệ ruột của trẫm. Trẫm muốn nhờ đệ ấy giúp nàng có con. Đứa trẻ vẫn mang danh nghĩa hoàng tự của trẫm; nếu là hoàng tử, ngay khi tròn một tuổi sẽ được lập làm Thái tử.`],
  ['Hoàng đế',e?.name,'Việc này chỉ có chúng ta được biết. Nàng có bằng lòng cùng trẫm giữ kín bí mật này không?'],
 );
 return lines[g?.scene?.step]||null;
}
export function nextImperialSecret(s){
 const g=s.imperialSecret,q=g?.scene;
 if(!q||!s.p.alive||!emperorInfertile(s))return {error:'Không có bí mật đang chờ.'};
 if(q.intro===true){q.intro=false;return {ok:true};}
 if(q.branch==='execution'&&q.step===4)return executeSecret(s);
 if(q.branch==='trust'&&q.step>=7)return {error:'Hãy chọn nhận lời hoặc từ chối.'};
 q.step++;return {ok:true};
}
function executeSecret(s){
 const g=s.imperialSecret;g.scene=null;g.status='executed';
 B.die(s,'imperialSecret','Nàng vô tình nghe được bí mật của hoàng đế. Một đạo mật chỉ ban xuống.');
 if(!s.p.alive)return {ok:true,ended:true};
 const p=s.p,e=king(s),before=e.bond;
 g.status='amnesia';e.bond=B.clamp(before-80,-100,100);
 Object.assign(p,{role:'maid',rank:-1,rankTitle:null,serviceRank:0,palace:null,nextMaidExam:p.months+24,prison:0,coldPalace:null,coldPalaceUntil:null});
 p.appearance.robe=p.inventory.includes('robe-0')?'robe-0':p.inventory[0];p.appearance.ornament=null;B.restoreServiceRobe(s);
 s.pendingTitle=s.decree=s.coronation=null;s.courtCeremonies=[];
 const text='Linh thú đã thay nàng chịu chết. Hoàng đế giáng nàng làm cung nữ, ép uống thuốc mất trí để quên đi điều vừa nghe. Thiện cảm hoàng đế −80; chỉ khi hồi phục đến 50 mới được gọi thị tẩm trở lại.';
 s.result.text+=' '+text;s.result.effects={};s.result.bonds=[{id:e.id,before,after:e.bond,delta:e.bond-before}];
 B.addLog(s,text,'setback');return {ok:true,rescued:true};
}
export function chooseImperialSecret(s,choice){
 const g=s.imperialSecret,q=g?.scene,prince=s.npcs.find(n=>n.id==='prince'&&n.alive&&n.age>=18);
 if(!q||q.branch!=='trust'||q.step!==7||!['accept','refuse'].includes(choice))return {error:'Chưa đến lúc quyết định.'};
 if(choice==='accept'){
  if(!prince||s.p.ageMonths<216||s.p.infertile||s.p.pregnancy)return {error:'Hiện chưa thể nhận lời thực hiện việc này.'};
  prince.met=prince.talked=true;king(s).met=king(s).talked=true;g.scene=null;g.status='accepted';
  clearBlockedWhiteMoon(s);
  B.addLog(s,`Nhận lời giữ kín bí mật, cùng Thân vương ${prince.name} thực hiện mật ước.`,'court');
  return {ok:true,startPrinceNight:true};
 }
 g.scene=null;g.status='refused';g.refusalUntil=s.p.months+12;
 const r=enterColdPalace(s,'Nàng khước từ mật ước của hoàng đế. Để giữ kín bí mật, người ban lệnh giam nàng trong lãnh cung.',{kind:'temporary',months:12,ignoreProtection:true,allowSisterPlea:false});
 if(s.p.coldPalace)s.p.coldPalace.secretRefusal=true;
 return {...r,ok:!r.error};
}
function completeRefusal(s){
 const g=s.imperialSecret,e=king(s),women=s.npcs.filter(n=>n.gender==='female'&&n.alive&&n.age>=18&&n.roleClass==='consort');
 // The court always has consorts. Defer the news if an old test save has none.
 if(!women.length){g.status='concluded';return;}
 const mother=B.pick(s,women),child={id:`secret-heir-${s.legacy.lives}`,name:B.pick(s,['Cảnh Hành','Minh Hiên','Thừa An','Dục Thành','Hoài Cẩn']),gender:'Hoàng tử',title:'Hoàng tử',month:s.p.months,father:e.name,portraits:Array.from({length:4},()=>B.range(s,0,4)),biologicalFather:s.npcs.find(n=>n.id==='prince')?.name,secretHeir:true};
 mother.children??=[];mother.children.push(child);g.refusalMother=mother.id;g.refusalChild=child.id;g.status='concluded';
 const text=`Mười hai tháng trôi qua. Vừa rời lãnh cung, nàng nghe tin ${mother.role} ${mother.name} đã sinh Hoàng tử ${child.name}. Nhớ lại lời hoàng đế năm ấy, nàng thầm đoán đứa trẻ là con của Thân vương, nhưng vì mạng sống, nàng không dám hé môi.`;
 s.result={title:'Tin vui sau cửa cung',text,success:true,effects:{},npc:mother.id};B.addLog(s,text,'family');
}
export function validateImperialSecret(s){
 const g=s.imperialSecret,int=(n,a,b)=>Number.isInteger(n)&&n>=a&&n<=b;
 if(!g||g.version!==1||typeof g.infertile!=='boolean'||typeof g.emperor!=='string'||!['waiting','fertile','scene','accepted','refused','amnesia','executed','cancelled','concluded'].includes(g.status)||!int(g.nights,0,100000)||g.refusalUntil!==null&&!int(g.refusalUntil,0,s.p.months+12))throw Error('Mật sự hoàng gia không hợp lệ.');
 const q=g.scene;
 if(q&&(q.intro!==undefined&&typeof q.intro!=='boolean'||q.intro===true&&q.step!==0))throw Error('Lời dẫn mật sự không hợp lệ.');
 if(q&&(!s.p.alive||!emperorInfertile(s)||g.status!=='scene'||!int(q.month,SECRET_MONTH,s.p.months)||!['trust','execution'].includes(q.branch)||!int(q.step,0,q.branch==='trust'?7:4)))throw Error('CG mật sự không hợp lệ.');
 if(g.status==='scene'&&!q||!g.infertile&&!['fertile','cancelled'].includes(g.status))throw Error('Tiến trình mật sự không hợp lệ.');
 if(emperorInfertile(s)&&s.p.pregnancy&&s.p.pregnancy.father===g.emperor&&!s.p.pregnancy.secretProxy)throw Error('Hoàng đế vô sinh không thể tạo thai kỳ.');
}
