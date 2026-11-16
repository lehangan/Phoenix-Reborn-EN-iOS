import {maidJewelryAllowed} from './maid-rules.mjs';
import {validVipFace} from './vip-faces.mjs';
import {EMPRESS_RANK,IMPERIAL_NOBLE_CONSORT_RANK} from './life-data.mjs';
import * as B from './life-engine.mjs';
import {canAttendNpcCeremony} from './court-progression.mjs';
import {EYE_VARIANTS,FACIAL_VARIANTS,MOUTH_VARIANTS,HUADIAN_NAMES} from './facial-features.mjs';
import {HAIRSTYLES} from './hairstyles.mjs';
import {STAGE_STAT_COLUMNS} from './palace-data.mjs';
import {childAptitude} from './child-aptitudes.mjs';
import {EMPRESS_ROBE,EMPRESS_CROWN} from './regalia.mjs';
import {itemById} from './inventory.mjs';
const clone=x=>JSON.parse(JSON.stringify(x));
export const reigningEmpress=s=>s.npcs.find(n=>n.alive&&n.gender==='female'&&n.roleClass==='consort'&&n.courtRank===EMPRESS_RANK&&!n.deposed);
export function crownEligibility(s){
 const p=s.p,emperor=s.npcs.find(n=>n.id==='emperor'&&n.alive);
 if(!p.alive||p.outside||p.role!=='consort'||p.rank!==IMPERIAL_NOBLE_CONSORT_RANK||p.prison||p.coldPalaceUntil!=null||p.coldPalace||!emperor)return null;
 const children=p.children.filter(c=>c.alive!==false&&c.royal!==false),queen=reigningEmpress(s);
 if(queen)return children.some(c=>c.gender==='Hoàng tử')?'contest':null;
 const stats=STAGE_STAT_COLUMNS.flat().map(([key])=>p.stats[key]!==undefined?B.effective(s,key):p[key]);
 return children.length>=2&&stats.every(n=>n>80)&&emperor.bond>55?'vacant':null;
}
export function crownSupport(s){return B.clamp(30+s.p.children.filter(c=>c.alive!==false&&c.royal!==false).reduce((total,c)=>total+childAptitude(c).crownBonus,0),30,100);}
export const crownContestOdds=s=>crownSupport(s);
const CROWN_OFFER_TEXT='Phụng vị đang trống. Hoàng đế muốn lập nàng làm Hoàng hậu, truyền đưa việc này ra trước triều thần để nghị bàn.';
export function migrateCrownStory(s){
 const q=s.story;if(!q)return;
 // A pending event from an older rank schema cannot bypass the new rank gate.
 if(['crownOffer','crownCouncil','crownContest'].includes(q.kind)&&(s.p.role!=='consort'||s.p.rank!==IMPERIAL_NOBLE_CONSORT_RANK)){s.story=null;return;}
 if(q.kind==='crownOffer'){q.title='Ý chỉ lập hậu';q.text=CROWN_OFFER_TEXT;}
 // Keep the saved random outcome; update only the old stat-based chance once.
 if(q.kind==='crownContest'&&q.supportVersion===undefined){q.odds=crownContestOdds(s);q.supportVersion=1;}
}
export function startCrownCouncil(s){
 if(crownEligibility(s)!=='vacant')return {error:'Chỉ Hoàng Quý Phi đủ điều kiện mới được đưa việc lập hậu ra nghị bàn.'};
 s.story={kind:'crownCouncil',phase:'waiting',title:'Đang chờ ý kiến đại thần…',text:'Tấu sớ lập hậu đã được đưa tới triều đường. Các đại thần đang nghị bàn về người sẽ giữ ngôi mẫu nghi; tư chất của các hoàng tự cũng được cân nhắc.',support:crownSupport(s),month:s.p.months,supportVersion:1};
 s.event=null;return {pending:true};
}
export function revealCrownCouncil(s){
 const q=s.story,approved=q.support>50;q.phase='verdict';q.title=approved?'Triều thần tán thành':'Việc lập hậu tạm gác';
 q.text=approved?'Hơn một nửa triều thần tán thành. Hoàng đế chuẩn y lập nàng làm Hoàng hậu, truyền chuẩn bị đại lễ sắc phong.':'Triều thần chưa đạt quá nửa số ý kiến tán thành. Hoàng đế tạm gác việc lập hậu; nàng trở về cung, giữ nguyên phẩm vị và chờ cơ hội khác.';
 B.addLog(s,`Nghị bàn lập hậu: ${q.support}% đại thần tán thành. ${approved?'Đủ sự ủng hộ để chuẩn bị đại lễ.':'Việc lập hậu tạm gác.'}`,'court');return {approved,support:q.support};
}
export function maybeCrownEvent(s){const p=s.p;if(p.role==='consort'&&p.rank===EMPRESS_RANK&&p.crownSeized&&p.stats.malice>=70&&p.months-(p.cooldowns.crownRevenge??-99)>=6&&B.rand(s)<.04+(p.stats.malice-70)*.002){p.cooldowns.crownRevenge=p.months;s.event=null;s.story={kind:'crownRevenge',title:'Bóng dao sau phụng điện',text:'Phe cánh của người bị phế truất âm thầm báo thù. Một cung nhân báo có kẻ lạ trà trộn vào đoàn dâng trà; nàng phải tự định đoạt.',roll:B.rand(s)};return true;}
 const eligible=crownEligibility(s);if(!eligible||p.months-(p.cooldowns.crown??-99)<12||B.rand(s)>=.08)return false;p.cooldowns.crown=p.months;s.event=null;const queen=reigningEmpress(s);s.story=eligible==='vacant'?{kind:'crownOffer',title:'Ý chỉ lập hậu',text:CROWN_OFFER_TEXT}:{kind:'crownContest',title:'Tranh đoạt phụng vị',text:`${queen.name} đang giữ ngôi Hoàng hậu. Có hoàng tử làm chỗ dựa, nàng có thể tranh đoạt phụng vị. Tư chất của các con giúp tăng cơ hội thành công. Thành công: Ác +50, Đố kỵ +50. Thất bại khép lại kiếp này: thiện cảm hoàng đế trên 50 thì lãnh cung cả đời, từ 50 trở xuống thì ban chết.`,queen:queen.id,odds:crownContestOdds(s),roll:B.rand(s),supportVersion:1};return true;}
export function queueCoronation(s,look=s.p.appearance){const p=s.p;if(p.role!=='consort'||p.rank<7||!p.alive)return;const empress=p.rank===EMPRESS_RANK;s.coronation={kind:empress?'empress':'consort',phase:'entrance',wish:0,month:p.months,title:B.rankLabel(p),look:clone(empress?{...p.appearance,robe:EMPRESS_ROBE,ornament:EMPRESS_CROWN}:look),guests:s.npcs.filter(n=>n.alive&&n.gender==='female'&&!n.deposed).slice(0,8).map(n=>({id:n.id,name:n.name,role:n.role,appearance:clone(n.appearance)}))};s.event=null;}
export function crownPlayer(s,seized=false){const p=s.p;p.rank=EMPRESS_RANK;p.role='consort';p.rankTitle='Hoàng hậu';p.highestRank=EMPRESS_RANK;p.lastPromotion=p.months;p.counters.promotions++;p.crownSeized=seized;const queen=reigningEmpress(s);if(queen){queen.deposed=true;queen.role='Phế hậu';queen.courtRank=-1;queen.roleClass='service';}if(seized)B.apply(s,{malice:50,envy:50});else B.increaseEnvy(s,'promotion');s.story=s.event=s.result=s.pendingTitle=s.decree=null;B.award(s,'promotion');B.checkAchievements(s);queueCoronation(s);B.addLog(s,seized?'Tranh đoạt thành công, phụng vị đổi chủ. Ác +50 · Đố kỵ +50.':'Hoàng đế ban chiếu lập nàng làm Hoàng hậu.','court');}
// Resolve the guest snapshot, never the entire court, and never charge twice.
export function coronationEnvelopeGuests(s){
 const c=s.coronation;if(!c||c.npc)return [];
 return [...new Set(c.guests.map(g=>g.id))].filter(id=>id!=='player')
  .map(id=>s.npcs.find(n=>n.id===id&&n.alive)).filter(Boolean);
}
function finishCoronation(s){
 const c=s.coronation;
 if(c.kind==='empress'&&!c.npc){B.grant(s,EMPRESS_ROBE,'Đại lễ phong hậu',false);B.grant(s,EMPRESS_CROWN,'Đại lễ phong hậu',false);s.p.appearance.robe=EMPRESS_ROBE;s.p.appearance.ornament=EMPRESS_CROWN;}
 if(!c.npc){
  s.notices=s.notices.filter(n=>!(n.kind==='rank-decree'&&n.month===c.month));
  if(c.kind==='consort')s.decree??={title:c.title,reason:`Hoàn tất đại lễ sắc phong ${c.title}, được chọn cung điện`,month:s.p.months};
 }
 B.addLog(s,c.npc?`Nàng đã dự lễ sắc phong ${c.title} cho ${c.name}, đứng cùng nội đình chúc tụng.`:`Hoàn tất đại lễ sắc phong ${c.title}.${c.kind==='empress'?' Nhận Cửu Thiên Phụng Bào và Cửu Phụng Minh Châu Quan.':''}`,'court');
 s.coronation=null;queueNextNpcCoronation(s);return {completed:true};
}
export function nextCoronation(s){
 const c=s.coronation;
 if(!c||!s.p.alive||!['entrance','congratulations','decree','gift','envelope-result'].includes(c.phase))return {error:'Không có đại lễ đang chờ.'};
 if(c.phase==='entrance')c.phase='congratulations';
 else if(c.phase==='congratulations'){c.wish++;if(c.wish>=3)c.phase='decree';}
 else if(c.phase==='decree'){
  if(c.npc){
   c.giftAmount=B.range(s,10,50);B.apply(s,{silver:c.giftAmount});c.phase='gift';
   B.addLog(s,`${c.title} ${c.name} trong lòng phấn khởi, liền đem ${c.giftAmount} bạc tặng cho tất cả người đến dự. Nàng nhận được ${c.giftAmount} bạc.`,'court');
  }else c.phase='envelopes';
 }else return finishCoronation(s);
 return {ok:true};
}
export function resolveCoronationEnvelopes(s,distribute){
 const c=s.coronation;
 if(!c||c.npc||c.phase!=='envelopes'||!s.p.alive||typeof distribute!=='boolean')return {error:'Chưa đến lúc phát phong bao.'};
 if(!distribute){B.addLog(s,'Nàng cảm tạ khách dự lễ, không phát phong bao.','court');return finishCoronation(s);}
 const guests=coronationEnvelopeGuests(s),cost=guests.length*20;
 if(!guests.length)return {error:'Không có khách dự lễ để nhận phong bao.'};
 if(s.p.silver<cost)return {error:`Cần đủ ${cost} bạc để phát cho ${guests.length} người dự lễ.`};
 B.apply(s,{silver:-cost});
 for(const n of guests)n.bond=B.clamp(n.bond+20,-100,100);
 c.envelopes={recipients:guests.map(n=>n.id),cost};c.phase='envelope-result';
 B.addLog(s,`Nàng phát phong bao cho ${guests.length} người dự lễ, mỗi người 20 bạc (tổng ${cost} bạc). Thiện cảm với từng người tăng 20, tối đa 100.`,'court');
 return {ok:true};
}
export function validateCoronation(s){s.coronation??=null;s.p.crownSeized??=false;if(typeof s.p.crownSeized!=='boolean')throw Error('Dấu phụng vị không hợp lệ.');if(s.p.rank===EMPRESS_RANK)for(const n of s.npcs.filter(n=>n.gender==='female'&&n.courtRank===EMPRESS_RANK)){n.deposed=true;n.role='Phế hậu';n.roleClass='service';n.courtRank=-1;}const c=s.coronation;if(!c)return;validateCoronationGifts(c);const look=a=>a&&validVipFace(a.vipFace)&&itemById(a.robe)?.type==='robe'&&(a.ornament==null||itemById(a.ornament)?.type==='hair')&&['face','eyes','nose','mouth','front','back'].every(k=>Number.isInteger(a[k])&&a[k]>=0&&a[k]<(k==='front'?HAIRSTYLES.length:k==='eyes'?EYE_VARIANTS:k==='mouth'?MOUTH_VARIANTS:k==='nose'?FACIAL_VARIANTS:3))&&(a.huadian==null||Number.isInteger(a.huadian)&&a.huadian>=0&&a.huadian<HUADIAN_NAMES.length);if(!look(c.look)||c.guests?.some(n=>!look(n.appearance)))throw Error('Ngoại hình đại lễ không hợp lệ.');if(!s.p.alive||!['empress','consort'].includes(c.kind)||!(c.npc?['invite','dress','entrance','congratulations','decree','gift']:['entrance','congratulations','decree','envelopes','envelope-result']).includes(c.phase)||!Number.isInteger(c.wish)||c.wish<0||c.wish>3||!Number.isInteger(c.month)||c.month<0||c.month>s.p.months||typeof c.title!=='string'||!c.look||!itemById(c.look.robe)||!Array.isArray(c.guests)||c.guests.length>8||c.guests.some(n=>!(c.npc&&n.id==='player'||s.npcs.some(x=>x.id===n.id))||typeof n.name!=='string'||!n.appearance||!itemById(n.appearance.robe)))throw Error('Đại lễ sắc phong không hợp lệ.');if(c.npc&&(!canAttendNpcCeremony(s)||c.kind!=='consort'||!s.npcs.some(n=>n.id===c.npc&&n.alive&&n.gender==='female'&&[7,IMPERIAL_NOBLE_CONSORT_RANK].includes(n.courtRank))||typeof c.name!=='string'||!look(c.attendeeLook)||!['robe','hair'].includes(c.wardrobeType)||!s.p.inventory.includes(c.attendeeLook.robe)||c.attendeeLook.ornament!==null&&!s.p.inventory.includes(c.attendeeLook.ornament)||c.guests.filter(n=>n.id==='player').length!==1||c.guests.some(n=>n.id===c.npc)))throw Error('Khách dự lễ phong Phi không hợp lệ.');}


export function queueNextNpcCoronation(s){
 if(s.coronation||!s.courtCeremonies?.length)return false;
 if(!canAttendNpcCeremony(s)){s.courtCeremonies=[];return false;}
 let entry,n;
 while(s.courtCeremonies.length&&!n){entry=s.courtCeremonies.shift();n=s.npcs.find(n=>n.id===entry.npc&&n.alive&&n.gender==='female'&&n.roleClass==='consort'&&[7,IMPERIAL_NOBLE_CONSORT_RANK].includes(n.courtRank)&&!n.deposed);}
 if(!n)return false;
 const guests=s.npcs.filter(g=>g.alive&&g.gender==='female'&&!g.deposed&&g.id!==n.id).slice(0,7).map(g=>({id:g.id,name:g.name,role:g.role,appearance:clone(g.appearance)}));
 guests.splice(Math.min(4,guests.length),0,{id:'player',name:s.p.name,role:B.rankLabel(s.p)+' · Bạn',appearance:clone(s.p.appearance)});
 s.coronation={kind:'consort',npc:n.id,name:n.name,title:n.role,month:entry.month,phase:'invite',wish:0,look:clone(n.appearance),attendeeLook:clone(s.p.appearance),wardrobeType:'robe',guests};
 return true;
}
export function coronationOutfits(s,type='robe'){return ['robe','hair'].includes(type)?s.p.inventory.map(itemById).filter(i=>i?.type===type&&maidJewelryAllowed(s.p,i)):[];}
const attending=(s,phase)=>canAttendNpcCeremony(s)&&!!s.coronation?.npc&&s.coronation.phase===phase;
export function acceptNpcCoronation(s){if(!attending(s,'invite'))return {error:'Không có lời mời dự lễ phù hợp.'};s.coronation.phase='dress';return {ok:true};}
export function coronationWardrobeTab(s,type){if(!attending(s,'dress')||!['robe','hair'].includes(type))return {error:'Không có ngăn đồ này.'};s.coronation.wardrobeType=type;return {ok:true};}
export function chooseCoronationOutfit(s,id){if(!attending(s,'dress'))return {error:'Chưa đến bước chọn lễ phục.'};const c=s.coronation,type=c.wardrobeType;if(id===null&&type==='hair'){c.attendeeLook.ornament=null;return {ok:true};}if(!coronationOutfits(s,type).some(i=>i.id===id))return {error:'Hãy chọn trang phục đã sở hữu.'};c.attendeeLook[type==='robe'?'robe':'ornament']=id;return {ok:true};}
export function enterNpcCoronation(s){if(!attending(s,'dress'))return {error:'Hãy nhận lời và chọn lễ phục trước.'};const c=s.coronation,a=c.attendeeLook;if(!coronationOutfits(s).some(i=>i.id===a.robe)||a.ornament!==null&&!coronationOutfits(s,'hair').some(i=>i.id===a.ornament))return {error:'Trang phục dự lễ không thuộc tủ đồ.'};c.guests.find(n=>n.id==='player').appearance=clone(a);c.phase='entrance';B.addLog(s,`Nàng mặc ${itemById(a.robe).name} đến dự lễ phong ${c.title} cho ${c.name}.`,'court');return {ok:true};}
export function skipNpcCoronation(s){const c=s.coronation;if(!c?.npc||!['invite','dress'].includes(c.phase))return {error:'Đại lễ đang diễn ra.'};B.addLog(s,`Nàng xin vắng mặt trong lễ phong ${c.title} cho ${c.name}.`,'court');s.coronation=null;queueNextNpcCoronation(s);return {ok:true};}

function validateCoronationGifts(c){
 if(c.phase==='gift'? !c.npc||!Number.isInteger(c.giftAmount)||c.giftAmount<10||c.giftAmount>50 : c.giftAmount!==undefined)throw Error('Phong bao dự lễ không hợp lệ.');
 const e=c.envelopes;
 if(c.phase==='envelope-result'){
  if(c.npc||!e||!Array.isArray(e.recipients)||!e.recipients.length||new Set(e.recipients).size!==e.recipients.length||e.recipients.some(id=>id==='player'||!c.guests.some(g=>g.id===id))||e.cost!==e.recipients.length*20)throw Error('Phong bao sắc phong không hợp lệ.');
 }else if(e!==undefined)throw Error('Phong bao chưa đến lượt.');
}
