import {displayNames} from './english-names.mjs';
import {english} from './english.mjs';
import {FASHION_PRIZES} from './fashion-awards.mjs';
import {chestArt} from './chest-art.mjs';
import {fashionCeremonyPanel,fashionCeremonyScene,fashionSkipButton,flowerEmblem,fashionFlowerName} from './fashion-award-view.mjs';
import {COLOR_GROUPS} from './wearable-colors.mjs';
import {FASHION_SKIP_COST,FASHION_PRAISE,fashionOutfits,fashionEntryCheck,luxuryLabel,fashionWinner,fashionNightEligible,fashionJadeReason} from './fashion-festival.mjs';
import {itemById} from './inventory.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button=(label,action,cls='primary full',extra='')=>`<button class="${cls}" data-action="${action}" ${extra}>${label}</button>`;
const color=id=>COLOR_GROUPS.find(c=>c.id===id);
function heading(g){return `<header class="fashion-heading"><small>THÁNG 6 · NĂM ${g.year}</small><h2>Lễ hội thời trang<br>cung đình</h2></header>`;}
function themeCard(g,check=null){
 const t=g.theme,c=t.requirement!=='luxury'?color(t.color):null;
 const requirement=c?`<p class="fashion-color-requirement ${check?(check.color?'met':'unmet'):''}"><i style="--swatch:${c.swatch}"></i> Có màu <b>${c.name}</b>${check?`<strong>${check.color?'✓':'✕'}</strong>`:''}</p>`:'';
 const luxury=t.requirement!=='color'?`<p class="fashion-luxury-requirement ${check?(check.luxury?'met':'unmet'):''}">Tổng xa xỉ <b>${luxuryLabel(t)}</b>${check?`<strong>${check.total}/200 ${check.luxury?'✓':'✕'}</strong>`:''}</p>`:'';
 return `<div class="fashion-theme"><span>CHỦ ĐỀ</span><h3>${esc(t.name)}</h3><div class="fashion-requirements">${requirement}${luxury}</div></div>`;
}
// Translate the whole speech before splitting it into animated captions.
function caption(text){return english(text).split(/(?<=[.!?])\s+/u).map((line,i)=>`<span style="--caption-delay:${.35+i*.8}s">${esc(line)}</span>`).join(' ');}
function cgHeading(g,winner=null){return `<header class="fashion-cg-heading"><small>${winner?'HOA KHÔI LỄ HỘI':'THÁNG 6 · NĂM '+g.year}</small><h2>${winner?esc(winner.name):'Lễ hội thời trang cung đình'}</h2>${winner?'':`<p>${esc(g.theme.name)}</p>`}</header>`;}
function cast(s){return [{id:'player',name:s.p.name,appearance:s.fashion.playerLook},...s.fashion.guests];}
function scene(s,character,winner=null){const g=s.fashion;return `<div class="fashion-scene ${winner?'fashion-has-winner':''}"><img class="fashion-courtyard" src="assets/fashion31/courtyard.webp" alt="Sân cung đình rộng, trang hoàng đèn lồng và rèm đỏ vàng"><div class="fashion-stage-title">${esc(g.theme.name)}</div>${cast(s).map((n,i)=>{const row=i<4?1:0,x=[13,37,63,87][i%4],bottom=row?50:16;return `<figure class="fashion-person ${row?'fashion-back-row':'fashion-front-row'} ${n.id==='player'?'fashion-player':''} ${winner?.id===n.id?'fashion-chosen':''}" style="--person-x:${x}%;--person-bottom:${bottom}%;--person-height:${row?31:32}%;--person-width:${row?31:34}%" aria-label="${esc(displayNames(n.name))}${n.id==='player'?' · Người chơi':''}">${character(n.appearance,'full')}<figcaption><span>${esc(displayNames(n.name))}</span></figcaption></figure>`;}).join('')}<img class="fashion-emperor" src="assets/v51/emperor-back.webp" alt="Hoàng đế quay lưng, ngồi ngắm hội ở phía trước"><span class="fashion-emperor-label">${esc(s.npcs.find(n=>n.id==='emperor')?.name)}</span></div>`;}
function winnerMessage(s){const w=fashionWinner(s);if(w.id==='player'&&fashionJadeReason(s))return `Hoàng đế hài lòng, ban một Rương Ngọc cho hoa khôi ${w.name} rồi cho nàng ${fashionJadeReason(s)==='pregnant'?'trở về viện dưỡng thai':'trở về viện'}.`;if(w.age<18)return `Hoàng đế hài lòng, ban lời khen cho hoa khôi ${w.name}.`;return `Hoàng đế hài lòng, đêm đó mời ${w.name} đến tẩm điện để sủng ái.`;}
export const FASHION_PAGE_SIZE=3;
export function fashionWardrobePage(s,requested=0){
 const type=s.fashion?.wardrobeType||'robe',entries=[...(type==='hair'?[null]:[]),...fashionOutfits(s,type)],pages=Math.max(1,Math.ceil(entries.length/FASHION_PAGE_SIZE)),page=Math.max(0,Math.min(pages-1,Number.isFinite(requested)?Math.trunc(requested):0));
 return {page,pages,total:entries.length,items:entries.slice(page*FASHION_PAGE_SIZE,(page+1)*FASHION_PAGE_SIZE)};
}
export function fashionPanel(s,{character,itemArt,wardrobePage=0}){
 const g=s.fashion;if(!g)return '';
 if(g.phase==='invite')return `<article class="fashion-invitation">${heading(g)}<div class="fashion-invite-art"><img src="assets/fashion31/courtyard.webp" alt="Sân cung đình trang hoàng cho ngày hội"></div><p class="fashion-invite-copy">Xiêm y đã sẵn, sân hội đã mở.<br>Nàng có muốn dự hội cùng các mỹ nhân trong cung?</p>${s.p.role==='maid'?'<p class="fashion-loan-note">Hệ thống cho bạn mượn ngẫu nhiên <b>5 quần áo, 5 trang sức</b>. Trong lễ hội, cung nữ có thể mượn và mặc đồ xa xỉ &gt;40.</p>':'<p class="fashion-loan-note">Phối y phục và trang sức trong túi đồ của nàng để đáp ứng chủ đề.</p>'}<footer class="event-outfit-actions">${button('Tham gia lễ hội','fashion-accept')}${button('Không tham gia','fashion-leave','subtle full')}</footer></article>`;
 if(g.phase==='dress'){
  const check=fashionEntryCheck(s),type=g.wardrobeType,selected=type==='robe'?g.robe:g.ornament,look={...s.p.appearance,robe:g.robe||s.p.appearance.robe,ornament:g.ornament};
  const paging=fashionWardrobePage(s,wardrobePage);
  const tiles=paging.items.map(i=>i?button(`${itemArt(i,'',{showDetails:true})}<strong>${esc(i.name)}</strong>`,'fashion-outfit',`fashion-item ${type==='hair'?'fashion-jewel':''} ${selected===i.id?'selected':''}`,`data-id="${i.id}" data-type="${type}" aria-pressed="${selected===i.id}" title="${esc(i.name)}"`):button('<span class="fashion-no-jewel">—</span><strong>Không đeo</strong>','fashion-outfit',`fashion-item ${selected===null?'selected':''}`,`data-type="hair" aria-pressed="${selected===null}"`)).join('');
  return `<article class="fashion-dressing">
   <header class="fashion-dress-heading"><h2>Phối đồ dự hội</h2><small>THÁNG 6 · NĂM ${g.year}</small></header>
   <div class="fashion-dress-preview">
    <div class="fashion-dress-character">${character(look,'fitting')}</div>
    <aside class="fashion-dress-details">${themeCard(g,check)}
     <strong class="fashion-fit-status ${check.valid?'met':'unmet'}" role="status">${check.valid?'✓ Đủ điều kiện':'Chưa đủ điều kiện'}</strong>
     <p class="fashion-wardrobe-note">${g.mode==='loan'?'Mượn 5 y phục, 5 trang sức. Được mặc xa xỉ trên 40.':'Dùng đồ đang có.'} ${g.theme.requirement!=='luxury'?'Màu cần có ở 1 món. ':''}${g.theme.requirement!=='color'?'Xa xỉ cộng cả 2 món.':''}</p>
    </aside>
   </div>
   <section class="fashion-closet" aria-label="Tủ đồ dự hội">
    <div class="festival-dress-tabs">${['robe','hair'].map(t=>button(t==='robe'?'Y phục':'Trang sức','fashion-tab',t===type?'selected':'',`data-id="${t}" aria-pressed="${t===type}"`)).join('')}</div>
    <div class="fashion-wardrobe">${tiles||'<p class="empty">Chưa có y phục.</p>'}</div>
    <nav class="fashion-pagination" aria-label="Trang tủ đồ">${button('‹','fashion-page','fashion-page-arrow',`data-id="${paging.page-1}" aria-label="Trang trước" ${paging.page===0?'disabled':''}`)}<span role="status">${type==='robe'?'Y phục':'Trang sức'} · <b>${paging.page+1} / ${paging.pages}</b></span>${button('›','fashion-page','fashion-page-arrow',`data-id="${paging.page+1}" aria-label="Trang sau" ${paging.page===paging.pages-1?'disabled':''}`)}</nav>
   </section>
   <footer class="event-outfit-actions">${button('Tham gia','fashion-enter','primary full',check.valid?'':'disabled')}${button('Rút lui','fashion-leave','subtle full')}</footer>
  </article>`;
 }
 if(g.phase==='scene')return `<article class="fashion-cg">${scene(s,character)}${fashionSkipButton(s)}${cgHeading(g)}<div class="fashion-cg-dialogue"><p>${caption(FASHION_PRAISE[g.praiseIndex])}</p></div><footer class="event-outfit-actions">${button(g.praiseIndex===2?'Nghe xướng danh':'Nghe tiếp','fashion-praise')}</footer></article>`;
 if(g.phase==='awards')return fashionCeremonyPanel(s,character);
 if(g.phase==='winner'&&g.skipPaid)return fashionSkipResult(s,character);
 if(g.phase==='winner'){const w=fashionWinner(s);return `<article class="fashion-cg fashion-cg-winner">${g.ceremony?fashionCeremonyScene(s,character,{finished:true}):scene(s,character,w)}${cgHeading(g,w)}<div class="fashion-cg-dialogue"><p>${caption(winnerMessage(s))}</p></div><footer class="event-outfit-actions">${button(w.id==='player'&&fashionJadeReason(s)?'Nhận Rương Ngọc · Trở về viện':w.id==='player'&&fashionNightEligible(s)?'Nhận lời · Tiến vào tẩm điện':'Khép lại lễ hội','fashion-claim')}</footer></article>`;}
 return '';
}
export function mountFashion(root,{complete}){
 const motion=root.querySelector('[data-fashion-motion]');if(!motion)return ()=>{};
 const step=Number(motion.dataset.fashionStep),depart=motion.dataset.fashionMotion==='depart',button=root.querySelector('[data-action="fashion-next"]');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches,duration=reduced?100:1800;
 let disposed=false,frame=0,start=0,elapsed=0;
 function tick(now){
  if(disposed)return;if(start&&!document.hidden)elapsed+=Math.max(now-start,0);start=now;
  if(elapsed>=duration){if(button)button.disabled=false;if(depart){disposed=true;complete(step);}return;}
  frame=requestAnimationFrame(tick);
 }
 const visibility=()=>{motion.classList.toggle('fashion-motion-paused',document.hidden);start=0;};
 document.addEventListener('visibilitychange',visibility);visibility();frame=requestAnimationFrame(tick);
 return ()=>{disposed=true;cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',visibility);};
}

export function fashionSkipConfirmation(s){
 if(!s.fashion||!['scene','awards'].includes(s.fashion.phase))return '';
 return `<article class="fashion-skip-confirm"><span class="eyebrow">LỄ HOA KHÔI</span><h2>Bỏ qua CG?</h2><p>Nàng muốn dùng <strong>${FASHION_SKIP_COST} bạc</strong> để bỏ qua phần diễn cảnh còn lại?</p><p>Kết quả xếp hạng và phần thưởng vẫn được giữ nguyên.</p><p class="tip">Đang có <b>${s.p.silver} bạc</b></p><div class="choices">${button(`Xác nhận · ${FASHION_SKIP_COST} bạc`,'fashion-skip-confirm','primary full',s.p.silver<FASHION_SKIP_COST?'disabled':'')}${button('Xem tiếp · Không mất bạc','fashion-skip-cancel','subtle full')}</div></article>`;
}
function fashionSkipResult(s,character){
 const g=s.fashion,rank=g.ceremony.order.indexOf(0)+1,p=FASHION_PRIZES[rank],jade=rank===1&&fashionJadeReason(s),winner=fashionWinner(s);
 const reward=p.silver?`+ ${p.silver} bạc`:p.chest?(p.chest==='wood'?'Hộp gỗ':'Hộp gấm'):jade?'Rương Ngọc':'Lời mời đến tẩm điện';
 const action=rank!==1?'Khép lại lễ hội':jade?'Nhận Rương Ngọc · Trở về viện':'Nhận lời · Tiến vào tẩm điện';
 return `<article class="fashion-skip-result"><span class="eyebrow">LỄ HOA KHÔI · NĂM ${g.year}</span><h2>Kết quả của nàng</h2><div class="fashion-result-portrait">${character(g.playerLook,'head')}</div><h3>${esc(displayNames(s.p.name))}</h3><strong class="fashion-result-rank">${esc(p.title||'Hạng '+rank)}</strong><div class="fashion-result-prize">${flowerEmblem(rank)}<div><strong>${esc(fashionFlowerName(rank))}</strong><span>${reward}</span></div>${p.chest?chestArt(p.chest):jade?chestArt('jade'):''}</div><p>${rank===1?jade?'Hoàng đế ban thưởng rương ngọc cho nàng.':'Hoàng đế mời nàng đến tẩm điện.':`Hoa khôi năm nay là ${esc(winner.name)}. Hoa và phần thưởng của nàng đã được nhận.`}</p><p class="small">Đã dùng ${FASHION_SKIP_COST} bạc để bỏ qua CG.</p>${button(action,'fashion-claim')}</article>`;
}
