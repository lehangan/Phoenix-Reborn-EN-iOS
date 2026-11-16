import {displayNames} from './english-names.mjs';
import {english} from './english.mjs';
import {FASHION_SKIP_COST} from './fashion-festival.mjs';
import {fashionEntrants,fashionAwardStep,fashionAwardSpeech,FASHION_PRIZES} from './fashion-awards.mjs';
import {chestArt} from './chest-art.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const FLOWER_ART={1:'peony',2:'golden-orchid',3:'magnolia',4:'aster',5:'forget-me-not',6:'hibiscus',7:'jasmine',8:'chrysanthemum'};
// Kim Lan names a flower here, rather than the sworn-sisterhood relationship.
export const fashionFlowerName=rank=>Number(rank)===2?'Golden Orchid':english(FASHION_PRIZES[rank].flower);
export function flowerEmblem(rank){
 return `<img class="fashion-flower" src="assets/fashion31/${FLOWER_ART[rank]}.webp" alt="${esc(fashionFlowerName(rank))}" width="320" height="320">`;
}
function gift(rank){
 const p=FASHION_PRIZES[rank];
 return `<aside class="fashion-award-gift ${p.chest?'with-chest':''}" role="status" aria-label="Ngự thưởng">${flowerEmblem(rank)}<div class="fashion-gift-copy"><small>NGỰ THƯỞNG</small><strong>${esc(fashionFlowerName(rank))}</strong><span class="${p.silver?'fashion-gift-amount':''}">${p.silver?'+ '+p.silver+' bạc':p.chest?(p.chest==='wood'?'Hộp gỗ':'Hộp gấm'):'Hoa khôi'}</span></div>${p.chest?chestArt(p.chest,'fashion-gift-chest'):''}</aside>`;
}
export function fashionCeremonyScene(s,character,{finished=false}={}){
 const g=s.fashion,c=g.ceremony,step=finished?{kind:'winner',rank:1}:fashionAwardStep(g),entrants=fashionEntrants(s);
 if(!c||!step)return '';
 const line=step.kind==='finalists'||step.rank<=3,finalists=c.order.slice(0,3).sort((a,b)=>a-b);
 const current=step.kind==='opening'||step.kind==='finalists'?null:c.order[step.rank-1];
 const people=entrants.map((n,i)=>{
  const rank=c.order.indexOf(i)+1;if(rank>step.rank&&step.kind!=='opening')return '';
  const back=i<4,x=[13,37,63,87][i%4],bottom=back?53:34,fx=[25,50,75][finalists.indexOf(i)];
  const active=i===current,kind=active?step.kind:step.kind==='finalists'?'gather':'waiting';
  return `<figure class="fashion-person fashion-award-person ${back?'award-back-row':'award-front-row'} ${n.id==='player'?'fashion-player':''} ${line?'in-final-line':''} is-${kind}" style="--start-x:${x}%;--start-bottom:${bottom}%;--line-x:${fx??x}%" aria-label="${esc(displayNames(n.name))}${n.id==='player'?' · Người chơi':''}">${character(n.appearance,'full')}<figcaption>${esc(displayNames(n.name))}${active&&rank<=3?`<b>${FASHION_PRIZES[rank].title}</b>`:''}</figcaption></figure>`;
 }).join('');
 return `<div class="fashion-scene fashion-ceremony-scene"><img class="fashion-courtyard" src="assets/fashion31/courtyard.webp" alt="Sân lễ hội trong cung">${people}<img class="fashion-emperor" src="assets/v51/emperor-back.webp" alt="Hoàng đế ngồi trước sân hội"></div>`;
}
export function fashionCeremonyPanel(s,character){
 const g=s.fashion,step=fashionAwardStep(g),moving=['call','depart','finalists'].includes(step.kind),title=step.kind==='opening'?'Hoa ngự ban':step.kind==='finalists'?'Ba giai nhân còn lại':FASHION_PRIZES[step.rank].title||'Lễ xướng danh';
 const isPlayer=g.ceremony.order[step.rank-1]===0;
 const label=step.kind==='opening'?'Bắt đầu xướng danh':step.kind==='call'?'Nghe ban thưởng':step.kind==='award'?!isPlayer?'Tiếp theo':step.rank===1?'Nghe lời hoàng đế':'Tạ ơn · Lui về':step.kind==='finalists'?'Nghe xướng danh Á khôi':'Xướng tên tiếp';
 return `<article class="fashion-cg fashion-ceremony" ${moving?`data-fashion-motion="${step.kind}" data-fashion-step="${g.ceremony.step}"`:''}>
  ${fashionCeremonyScene(s,character)}${fashionSkipButton(s)}
  <header class="fashion-cg-heading"><small>THÁNG 6 · NĂM ${g.year}</small><h2>${title}</h2></header>
  <div class="fashion-cg-dialogue" aria-live="polite"><small>${step.kind==='depart'?'SÂN HỘI':`HOÀNG ĐẾ · ${esc(s.npcs.find(n=>n.id==='emperor')?.name)}`}</small><p>${esc(fashionAwardSpeech(s))}</p></div>
  ${step.kind==='award'?gift(step.rank):''}
  <footer class="event-outfit-actions"><button class="primary full" data-action="fashion-next" data-id="${g.ceremony.step}" ${moving?'disabled':''}>${label}</button></footer>
 </article>`;
}
export function fashionFlowerCollection(s){
 const awards=s.p.fashionAwards||[];if(!awards.length)return '';
 return `<section class="fashion-flower-collection"><h3>Hoa ngự thưởng</h3><div>${[...awards].reverse().map(a=>`<article>${flowerEmblem(a.rank)}<div><strong>${esc(fashionFlowerName(a.rank))}</strong><small>${FASHION_PRIZES[a.rank].title||'Hạng '+a.rank} · Lễ hội năm ${a.year}</small></div></article>`).join('')}</div></section>`;
}

export function fashionSkipButton(s){
 return `<button class="fashion-skip" data-action="fashion-skip" ${s.p.silver<FASHION_SKIP_COST?'disabled':''} aria-label="Bỏ qua CG Hoa khôi · ${FASHION_SKIP_COST} bạc">Skip <small>${FASHION_SKIP_COST} bạc</small></button>`;
}
