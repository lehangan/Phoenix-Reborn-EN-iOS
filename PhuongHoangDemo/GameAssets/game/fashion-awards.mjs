import {addLog,apply,giveChest} from './life-engine.mjs';

// A separate deterministic stream ranks the remaining guests. It never redraws
// the winner or consumes the world's random stream.
export function fashionAwardOrder(seed,winnerIndex){
 let x=(seed^0x484f414b)>>>0;
 const rest=Array.from({length:8},(_,i)=>i).filter(i=>i!==winnerIndex);
 for(let i=rest.length-1;i>0;i--){x=(Math.imul(x,1664525)+1013904223)>>>0;const j=Math.floor(x/4294967296*(i+1));[rest[i],rest[j]]=[rest[j],rest[i]];}
 return [winnerIndex,...rest];
}
export const FASHION_PRIZES={
 8:{flower:'Cúc trắng',silver:10,color:'#f5e6b8',praise:'nàng hôm nay giản dị mà duyên dáng, tựa một nhành cúc thanh khiết bên thềm'},
 7:{flower:'Hoa nhài',silver:20,color:'#fff4da',praise:'nàng hôm nay có nét dịu dàng kín đáo, cử chỉ đoan trang khiến trẫm rất hài lòng'},
 6:{flower:'Hoa dâm bụt',silver:30,color:'#eb8d91',praise:'nàng hôm nay tươi tắn như nắng sớm, sắc áo cùng dáng đi đều mang vẻ tự nhiên đáng quý'},
 5:{flower:'Hoa lưu ly',silver:40,color:'#abcce8',praise:'nàng hôm nay phối sắc thật hài hòa, mỗi bước đi đều nhẹ nhàng, thanh thoát'},
 4:{flower:'Hoa thạch thảo',silver:50,color:'#c7a6df',praise:'nàng hôm nay nhã nhặn mà có nét riêng, tà áo và phong thái đều để lại ấn tượng đẹp'},
 3:{flower:'Bạch Ngọc Lan',chest:'wood',color:'#fff0d3',title:'Á khôi đệ nhị',praise:'nàng có vẻ thanh nhã tựa ngọc lan, đoan trang mà không mờ nhạt. Danh vị Á khôi đệ nhị thật xứng đáng với nàng'},
 2:{flower:'Kim Lan',chest:'silk',color:'#f6ce6b',title:'Á khôi đệ nhất',praise:'nàng có phong tư kiều diễm và thần thái ung dung, rực rỡ mà vẫn giữ nét cao quý. Trẫm phong nàng làm Á khôi đệ nhất'},
 1:{flower:'Mẫu Đơn',color:'#e97999',title:'Hoa khôi',praise:'phong thái của nàng nổi bật nhất trong ngày hội, cốt cách thanh nhã hòa cùng vẻ rạng rỡ khó quên. Trẫm phong nàng làm Hoa khôi năm nay'}
};
export const FASHION_CEREMONY_STEPS=[
 {kind:'opening',rank:8},
 ...[8,7,6,5,4].flatMap(rank=>['call','award','depart'].map(kind=>({kind,rank}))),
 {kind:'finalists',rank:3},
 ...[3,2].flatMap(rank=>['call','award','depart'].map(kind=>({kind,rank}))),
 {kind:'call',rank:1},{kind:'award',rank:1}
];
export const fashionAwardStep=g=>FASHION_CEREMONY_STEPS[g?.ceremony?.step]||null;
export const fashionEntrants=s=>[{id:'player',name:s.p.name,age:Math.floor(s.p.ageMonths/12),appearance:s.fashion.playerLook},...s.fashion.guests];
export function initializeFashionCeremony(g){
 g.ceremony={version:1,order:fashionAwardOrder(g.seed,g.winnerIndex),step:0,rewarded:[]};
}
export function grantFashionPrize(s,rank){
 const g=s.fashion,c=g.ceremony;
 if(c.rewarded.includes(rank))return false;
 const n=fashionEntrants(s)[c.order[rank-1]],prize=FASHION_PRIZES[rank];
 if(n.id==='player'){
  // One award per annual festival, including after reload or repeated actions.
  const awards=s.p.fashionAwards??=[];
  if(!awards.some(a=>a.year===g.year)){
   if(prize.silver)apply(s,{silver:prize.silver});
   const chest=prize.chest?giveChest(s,prize.chest,`${prize.title} · Lễ hội năm ${g.year}`,false):null;
   awards.push({year:g.year,rank,flower:prize.flower,silver:prize.silver||0,chest:chest?.id||null});
  }
 }
 c.rewarded.push(rank);
 addLog(s,`${prize.title||'Hạng '+rank} · ${n.name}: nhận ${prize.flower}${prize.silver?', '+prize.silver+' bạc':''}${prize.chest?', '+(prize.chest==='wood'?'hộp gỗ':'hộp gấm'):''} trong lễ hội năm ${g.year}.`,'festival');
 return true;
}
export function fashionAwardSpeech(s){
 const g=s.fashion,step=fashionAwardStep(g);
 if(!step)return '';
 if(step.kind==='opening')return 'Các nàng sau đây đều được tặng hoa và ngân lượng. Hãy lần lượt bước lên trước điện nhận thưởng.';
 if(step.kind==='finalists')return 'Ba nàng còn lại, hãy tiến lại đứng cùng một hàng. Trẫm sẽ công bố hai danh vị Á khôi và Hoa khôi của năm nay.';
 const n=fashionEntrants(s)[g.ceremony.order[step.rank-1]],p=FASHION_PRIZES[step.rank];
 if(step.kind==='depart')return `${n.name} tạ ơn hoàng đế, nâng hoa ngự thưởng rồi lui sang bên, rời khỏi sân hội.`;
 if(step.kind==='call')return step.rank===1?`${n.name}, nàng là người có phong thái nổi bật nhất ngày hội năm nay. Hãy bước lên nhận danh vị Hoa khôi!`:step.rank<=3?`${p.title} năm nay là… ${n.name}. Nàng hãy tiến lên trước mặt trẫm.`:`${n.name}, nàng hãy bước lên nhận thưởng.`;
 return `${n.name}, ${p.praise}. Ban thưởng nàng ${p.flower}${p.silver?' cùng '+p.silver+' bạc':p.chest?' cùng một '+(p.chest==='wood'?'hộp gỗ':'hộp gấm'):''}.`;
}
export function validateFashionAwards(s){
 const awards=s.p.fashionAwards;
 if(!Array.isArray(awards)||awards.length>125||new Set(awards.map(a=>a.year)).size!==awards.length||awards.some(a=>!Number.isInteger(a.year)||a.year<1||a.year>s.p.lastFashionYear||!Number.isInteger(a.rank)||!FASHION_PRIZES[a.rank]||a.flower!==FASHION_PRIZES[a.rank].flower||a.silver!==(FASHION_PRIZES[a.rank].silver||0)||(FASHION_PRIZES[a.rank].chest?typeof a.chest!=='string':a.chest!==null)))throw Error('Hoa ngự thưởng không hợp lệ.');
 const g=s.fashion,c=g?.ceremony;if(!c){if(g?.phase==='awards')throw Error('Thiếu lễ xướng danh.');return;}
 if(c.version!==1||!Array.isArray(c.order)||c.order.length!==8||new Set(c.order).size!==8||c.order.some(i=>!Number.isInteger(i)||i<0||i>7)||c.order[0]!==g.winnerIndex||!Number.isInteger(c.step)||c.step<0||c.step>=FASHION_CEREMONY_STEPS.length||!Array.isArray(c.rewarded))throw Error('Thứ tự xướng danh không hợp lệ.');
 const expected=FASHION_CEREMONY_STEPS.slice(0,c.step+1).filter(x=>x.kind==='award').map(x=>x.rank);
 if(JSON.stringify(c.rewarded)!==JSON.stringify(expected))throw Error('Ban thưởng lễ hội không hợp lệ.');
 if(['winner','night'].includes(g.phase)&&c.step!==FASHION_CEREMONY_STEPS.length-1)throw Error('Lễ xướng danh chưa hoàn tất.');
}
