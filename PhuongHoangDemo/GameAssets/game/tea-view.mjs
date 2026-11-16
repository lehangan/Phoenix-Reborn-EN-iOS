import {TEA_DURATION,TEA_DROPS,teaQuality,teaNextAward,teaPointLabel,aimTeaBowl,advanceTeaCatch} from './tea-catching.mjs';
import {ingredientArt,bowlArt} from './tea-art.mjs';
import {QUALITIES} from './palace-data.mjs';
const TEA_BOX_IMAGES=['assets/v127/tea-poor.webp','assets/v127/tea-common.webp','assets/v127/tea-fine.webp','assets/v121/tea-box.webp'];
export const teaArt=quality=>`<img class="tea-box-art tea-q${quality}" src="${TEA_BOX_IMAGES[quality]??TEA_BOX_IMAGES[0]}" alt="Hộp trà tự ủ · ${QUALITIES[quality]??QUALITIES[0]}" loading="lazy">`;
const legend=t=>Object.entries(TEA_DROPS).map(([id,v])=>`<span class="tea-ingredient-key ${v.points<0||v.stun?'tea-harmful':''}">${ingredientArt(id)}<span>${v.name}<b>${v.stun?'Choáng 3s':v.points>0&&t.goodDropsStopped?'Đã ngừng rơi':`${v.points>0?'+':''}${teaPointLabel(v.points>0?teaNextAward(t,id):v.points)} điểm`}</b></span></span>`).join('');
export function teaPanel(s){
 const t=s.tea;if(!t)return '';const done=t.phase==='review',ready=t.phase==='ready';
 if(done)return `<section class="tea-workshop tea-catch-result"><p class="eyebrow">HƯƠNG TRÀ GỬI Ý</p><h2>Một hộp trà, một tâm ý</h2><div class="tea-result-art">${teaArt(teaQuality(t.score))}</div><p class="tea-result-grade">${QUALITIES[teaQuality(t.score)]}</p><p class="tea-final-score"><strong>${t.score}</strong> / 100 điểm</p><div class="tea-result-counts"><span><b>${t.good}</b> nguyên liệu tốt</span><span><b>${t.bad}</b> lá hỏng</span><span><b>${t.shocks}</b> lần choáng</span></div><p>Đã hoàn thành 30 giây hứng nguyên liệu.</p><button class="primary full" data-action="tea-pack">Đóng hộp · Cất vào Thủ công</button></section>`;
 return `<section class="tea-workshop tea-catch-workshop"><div class="tea-catch-title"><div><p class="eyebrow">THỦ CÔNG · TRÀ HOA CUNG ĐÌNH</p><h2>Hứng hương trà</h2></div><span class="tea-stamina-note">1 thể lực / lượt</span></div><div class="tea-catch-hud"><div><small>Còn lại</small><strong data-tea-time>${Math.ceil((TEA_DURATION-t.elapsed)/1000)}<span>s</span></strong></div><div><small>Hương trà</small><strong data-tea-score>${t.score}<span>/100</span></strong></div><div class="tea-live-grade"><small>Phẩm cấp</small><strong data-tea-grade>${QUALITIES[teaQuality(t.score)]}</strong></div></div><div class="tea-time-track"><i data-tea-timebar style="width:${(1-t.elapsed/TEA_DURATION)*100}%"></i></div><div class="tea-catch-board ${ready?'is-ready':''}" data-tea-board tabindex="0" role="application" aria-label="Hứng nguyên liệu trà. Kéo ngang để di chuyển bát, hoặc dùng phím mũi tên trái phải."><div class="tea-garden-mist" aria-hidden="true"></div><div class="tea-board-branch tea-branch-left" aria-hidden="true">${ingredientArt('leaf')}${ingredientArt('flower')}${ingredientArt('leaf')}</div><div class="tea-board-branch tea-branch-right" aria-hidden="true">${ingredientArt('leaf')}${ingredientArt('flower')}</div><div class="tea-drop-layer" data-tea-drops aria-hidden="true"></div><div class="tea-bowl" data-tea-bowl style="left:${t.bowl}%">${bowlArt()}<span class="tea-stun-stars" aria-hidden="true">✦ ✧ ✦</span></div><div class="tea-catch-feedback" data-tea-feedback aria-live="polite"></div><div class="tea-stun-notice" data-tea-stun role="status" hidden></div><div class="tea-pause-cover" data-tea-paused hidden>Tạm dừng</div>${ready?`<div class="tea-ready-cover"><div class="tea-ready-sprig">${ingredientArt('leaf')}${ingredientArt('flower')}</div><h3>Gom lá, giữ hương</h3><p>Kéo bát hứng lá trà, hoa cúc và kỷ tử.<br>Né lá hỏng và quả gai.${t.version>=4?'<br>Hứng đủ nguyên liệu tốt được 100 điểm, trước khi trừ lá hỏng.':''}</p><button class="primary" data-action="tea-catch-start">Bắt đầu · 30 giây</button><small>Đã dùng 1 thể lực cho lượt này</small></div>`:''}</div><div class="tea-catch-controls"><button type="button" class="subtle" data-tea-left aria-label="Di chuyển bát sang trái" ${ready?'disabled':''}>←</button><p>Kéo bát sang trái / phải<br><small>Hoặc giữ nút mũi tên</small></p><button type="button" class="subtle" data-tea-right aria-label="Di chuyển bát sang phải" ${ready?'disabled':''}>→</button></div><div class="tea-ingredient-legend" data-tea-legend>${legend(t)}</div><p class="tea-quality-guide">35 điểm: Thường · 65: Ưu Tú · 88: Tuyệt Tác</p></section>`;
}
export function mountTea(root,s,{persist=()=>{},complete=()=>{}}={}){
 const t=s.tea,board=root.querySelector('[data-tea-board]');if(!t||t.phase!=='playing'||!board)return ()=>{};
 const find=q=>root.querySelector(q),layer=find('[data-tea-drops]'),bowl=find('[data-tea-bowl]'),timer=find('[data-tea-time]'),score=find('[data-tea-score]'),grade=find('[data-tea-grade]'),bar=find('[data-tea-timebar]'),feedback=find('[data-tea-feedback]'),stun=find('[data-tea-stun]'),paused=find('[data-tea-paused]'),legendBox=find('[data-tea-legend]');
 const nodes=new Map,cleanups=[];let raf=0,last=null,savedAt=t.elapsed,ended=false,drag=null,left=false,right=false,feedbackText='',legendKey='';
 const on=(el,event,fn,options)=>{el.addEventListener(event,fn,options);cleanups.push(()=>el.removeEventListener(event,fn,options));};
 const aim=e=>{const r=board.getBoundingClientRect();aimTeaBowl(t,(e.clientX-r.left)/r.width*100);};
 on(board,'pointerdown',e=>{if(e.button&&e.button!==0)return;e.preventDefault();drag=e.pointerId;board.focus({preventScroll:true});board.setPointerCapture?.(e.pointerId);aim(e);});
 on(board,'pointermove',e=>{if(drag===e.pointerId){e.preventDefault();aim(e);}});
 const release=e=>{if(drag===e.pointerId)drag=null;left=right=false;};
 on(window,'pointerup',release);on(window,'pointercancel',release);
 on(board,'keydown',e=>{if(['ArrowLeft','ArrowRight','a','d'].includes(e.key)){e.preventDefault();if(e.key==='ArrowLeft'||e.key==='a')left=true;else right=true;}});
 on(window,'keyup',e=>{if(e.key==='ArrowLeft'||e.key==='a')left=false;if(e.key==='ArrowRight'||e.key==='d')right=false;});
 for(const [selector,direction]of [['[data-tea-left]',-1],['[data-tea-right]',1]]){const b=find(selector);on(b,'pointerdown',e=>{e.preventDefault();direction<0?left=true:right=true;b.setPointerCapture?.(e.pointerId);});on(b,'click',e=>{if(e.detail===0)aimTeaBowl(t,t.bowl+direction*12);});}
 const suspend=()=>{last=null;left=right=false;drag=null;persist();};
 on(window,'blur',suspend);on(window,'pagehide',suspend);on(document,'visibilitychange',()=>{suspend();paused.hidden=!document.hidden;});
 function draw(){
  const key=`${t.goodPointProgress}:${t.scoreRaw}:${t.score}:${t.goodDropsStopped}`;if(legendBox&&key!==legendKey){legendKey=key;legendBox.innerHTML=legend(t);}
  timer.innerHTML=`${Math.ceil((TEA_DURATION-t.elapsed)/1000)}<span>s</span>`;score.innerHTML=`${t.score}<span>/100</span>`;grade.textContent=QUALITIES[teaQuality(t.score)];bar.style.width=(1-t.elapsed/TEA_DURATION)*100+'%';bowl.style.left=t.bowl+'%';
  const frozen=t.elapsed<t.stunUntil;bowl.classList.toggle('is-stunned',frozen);stun.hidden=!frozen;if(frozen)stun.textContent=`Choáng · ${((t.stunUntil-t.elapsed)/1000).toFixed(1)}s`;
  const label=t.feedback&&t.elapsed<t.feedback.until?t.feedback.text:'';if(label!==feedbackText){feedbackText=label;feedback.textContent=label;feedback.className='tea-catch-feedback '+(t.feedback?.kind==='spoiled'||t.feedback?.kind==='thorn'?'is-harmful':'');}
  const alive=new Set(t.items.map(i=>i.id));for(const [id,el]of nodes)if(!alive.has(id)){el.remove();nodes.delete(id);}
  for(const item of t.items){let el=nodes.get(item.id);if(!el){el=document.createElement('div');el.className='tea-falling '+(TEA_DROPS[item.type].points<0||TEA_DROPS[item.type].stun?'is-harmful':'');el.innerHTML=ingredientArt(item.type);layer.append(el);nodes.set(item.id,el);}el.style.left=item.x+'%';el.style.top=item.y+'%';el.style.transform=`translate(-50%,-50%) rotate(${item.tilt}deg)`;}
 }
 function tick(now){
  if(ended)return;const dt=last===null||document.hidden?0:Math.max(0,now-last);last=now;
  if(left!==right)aimTeaBowl(t,t.bowl+(right?1:-1)*Math.max(12,dt*.105));advanceTeaCatch(t,dt);draw();
  if(t.elapsed-savedAt>=1000){savedAt=t.elapsed;persist();}
  if(t.phase==='review'){ended=true;persist();complete();return;}raf=requestAnimationFrame(tick);
 }
 draw();raf=requestAnimationFrame(tick);
 return ()=>{ended=true;cancelAnimationFrame(raf);for(const off of cleanups)off();if(s.tea===t)persist();};
}
