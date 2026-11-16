import {displayNames} from './english-names.mjs';
import {secretDialogue,SECRET_INTRO} from './imperial-secret.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function imperialSecretPanel(s,character){
 const q=s.imperialSecret?.scene,line=secretDialogue(s);if(!q||!line)return '';
 if(q.intro===true)return `<article class="secret-intro"><p class="eyebrow">NGỰ UYỂN · NĂM ${Math.floor(q.month/12)+1} · THÁNG ${q.month%12+1}</p><h2>Một cuộc gặp tình cờ</h2><p class="secret-intro-copy">${esc(SECRET_INTRO)}</p><div class="intro-actions"><button class="primary full" data-action="secret-next">Tiếp tục</button></div></article>`;
 const choice=q.branch==='trust'&&q.step===7,entering=q.branch==='trust'&&q.step>=5,revealed=q.step>=4;
 return `<article class="secret-cg ${q.step===3?'secret-startled':''} ${revealed?'secret-revealed':''} ${q.step===4?'secret-player-emerges':''} ${entering?'secret-prince-arrives':''} ${q.step===5?'secret-prince-enters':''}" data-secret-cg>
  <img class="secret-background" src="assets/secret45/garden.webp" alt="Ngự uyển bên hồ sen, lối đá rộng và đình ở xa">
  <header class="secret-heading"><span>NĂM ${Math.floor(q.month/12)+1} · THÁNG ${q.month%12+1}</span><h2>Bí mật dưới hàng liễu</h2></header>
  <div class="secret-cast" aria-label="${revealed?'Nữ chính bước ra trước cây':'Nữ chính nấp sau cây ở phía trên bên trái'}, ${entering?'Thân vương ở bên trái gần nữ chính, hoàng đế ở bên phải':'thần y đứng phía sau hoàng đế ở bên phải'}">
   <div class="secret-observer-space"><div class="secret-player" aria-label="${esc(displayNames(s.p.name))} ${revealed?'được gọi ra khỏi chỗ nấp':'nấp sau gốc liễu'}">${character(s.p.appearance,'full')}</div></div>
   <img class="secret-willow" src="assets/secret45/willow-layer.png" alt="Cây liễu ở phía trên bên trái, che trước nữ chính khi nàng chưa được gọi ra">
   <img class="secret-king" src="assets/v51/emperor-back.webp" alt="Hoàng đế áo trắng vàng, toàn thân nhìn từ sau">
   ${entering?'':`<img class="secret-doctor" src="assets/v91/physician-back.webp" alt="Thần y đứng phía sau lưng vua, gần phía người xem, toàn thân nhìn từ sau">`}
   ${entering?`<img class="secret-prince" src="assets/v91/prince-back.webp" alt="Thân vương áo xanh ngọc tiến vào bên trái gần nữ chính, toàn thân nhìn từ sau">`:''}
  </div>
  <section class="secret-dialogue" aria-label="Lời thoại"><p class="secret-speaker">${esc(line[0])}<small>${esc(line[1])}</small></p><p class="secret-full-line">${esc(line[2])}</p><p data-secret-line aria-hidden="true">${esc(line[2])}</p></section>
  <footer class="secret-actions" data-secret-actions>${choice?`<button class="primary" data-action="secret-choice" data-id="accept" ${s.p.infertile?'disabled':''}>Đồng ý · Giữ kín mật ước</button><button class="subtle" data-action="secret-choice" data-id="refuse">Từ chối</button>${s.p.infertile?'<small>Nàng không còn khả năng mang thai.</small>':''}`:`<button class="primary" data-action="secret-next">${q.branch==='execution'&&q.step===4?'Nghe mật chỉ':'Tiếp tục'}</button>`}</footer>
 </article>`;
}
// First tap reveals the full line, a separate tap advances. Timers never change game state.
export function mountImperialSecret(root){
 const scene=root.querySelector('[data-secret-cg]');if(!scene)return ()=>{};
 const copy=scene.querySelector('[data-secret-line]'),chars=Array.from(copy.textContent),actions=scene.querySelector('[data-secret-actions]');
 let timer=null,count=0,done=false;
 const reveal=()=>{if(done)return;done=true;clearInterval(timer);copy.textContent=chars.join('');scene.classList.add('secret-line-complete');};
 const tick=()=>{if(document.hidden)return;count++;copy.textContent=chars.slice(0,count).join('');if(count>=chars.length)reveal();};
 const tap=e=>{if(done)return;e.preventDefault();e.stopImmediatePropagation();reveal();};
 copy.textContent='';actions.addEventListener('click',tap,true);
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)reveal();else timer=setInterval(tick,30);
 return ()=>{clearInterval(timer);actions.removeEventListener('click',tap,true);};
}
