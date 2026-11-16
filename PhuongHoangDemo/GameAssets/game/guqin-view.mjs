import {displayNames} from './english-names.mjs';
import {english} from './english.mjs';
import {composition,GUQIN_DURATION,HIT_WINDOW,performanceScore,advancePerformance,pressNote,releaseNote,pausePerformance,resumePerformance} from './guqin.mjs';

export function guqinPanel(g,emperor,portrait,esc,chestArt){
  if(!g)return '';
  const song=composition(g.seed),o=g.outcome;
  if(o)return `<div class="qin-result"><span class="eyebrow">NGỰ TIỀN · THƯỞNG ÂM</span><h2>Khúc đàn đã khép</h2><p>${esc(song.title)} · 30 giây</p><div class="qin-stars" aria-label="${o.stars} trên 5 sao">${Array.from({length:5},(_,i)=>`<span class="${i<o.stars?'lit':''}">★</span>`).join('')}</div><strong class="qin-final-score">${o.score}<small>/100 điểm</small></strong><p class="qin-tally">${g.marks.filter(v=>v>=85).length} nốt tốt · ${g.marks.filter(v=>v>0&&v<85).length} nốt lệch · ${g.marks.filter(v=>v===0).length} nốt lỡ</p><div class="qin-emperor"><img src="${portrait}" alt="Hoàng đế ${esc(displayNames(emperor.name))}"><div><small>Hoàng đế ${esc(displayNames(emperor.name))}</small><p>“${esc(english(o.text))}”</p></div></div>${o.chest?`<div class="qin-prize">${chestArt(o.stars===5?'jade':'silk')}<strong>+1 ${o.stars===5?'rương ngọc':'rương gấm'}</strong><span>Đã cất vào túi đồ</span></div>`:o.loss?`<p class="qin-loss">Thiện cảm hoàng đế −${o.loss}</p>`:''}<button class="primary full" data-action="guqin-finish">Tiếp tục</button></div>`;
  return `<div class="qin-heading"><span class="eyebrow">NGỰ TIỀN · ĐÀN CỔ CẦM</span><h2>${esc(song.title)}</h2><p>Một khúc riêng cho lần gặp này</p></div><div class="qin-hud"><span>CÒN <b data-qin-time>30.0</b>s</span><span><b data-qin-score>${performanceScore(g)}</b><small>/100</small></span><button class="qin-small" data-qin-sound aria-label="Tắt âm thanh" aria-pressed="true">♫ Bật</button><button class="qin-small" data-qin-pause aria-label="Tạm dừng bài đàn">Ⅱ</button></div><div class="qin-stage" role="group" aria-label="Sân khấu đàn cổ cầm"><img class="qin-art" src="assets/v31/guqin-v31.webp" width="800" height="1200" alt="Đàn cổ cầm bằng gỗ bên ánh đèn cung điện"><div class="qin-targets"></div><div class="qin-feedback" role="status" aria-live="polite">Chạm đúng nhịp · Giữ trọn nốt</div><div class="qin-overlay"><div class="qin-instructions"><span class="qin-emblem">♫</span><h3 data-qin-pause-title>Gảy một khúc tri âm</h3><p><b>Nốt vàng:</b> chạm khi vòng sáng khép lại.<br><b>Nốt hồng:</b> giữ đến khi vòng hồng đầy.</p><p class="qin-key-help">Có thể dùng phím 1–9 theo vị trí nốt.</p><button class="primary full" data-qin-start>Bắt đầu · 30 giây</button><small>Âm thanh mở khi bắt đầu. Rời màn hình sẽ tạm dừng; nốt đang giữ tính theo phần đã giữ.</small></div></div><div class="qin-song-seal">CỔ CẦM <span>✦</span> TRI ÂM</div></div><p class="qin-hint"><span>Vàng: chạm · Hồng: giữ</span><span><b data-qin-progress>0/${g.marks.length}</b> nốt</span></p><details class="qin-rewards"><summary>Thưởng phạt theo số sao</summary><p>★ dưới 25: −1–10 thiện cảm<br>★★ 25–49: lui về luyện thêm<br>★★★ 50–69: tiếng đàn tạm được<br>★★★★ 70–89: khen ngợi, 1 rương gấm<br>★★★★★ 90–100: tán thưởng, 1 rương ngọc</p></details>`;
}

// A small local plucked-string voice. Every chart is its own pentatonic melody.
function instrument(){
  let context=null,muted=false,voices=new Set();
  function start(){const Audio=globalThis.AudioContext||globalThis.webkitAudioContext;if(!Audio)return false;try{context??=new Audio();context.resume().catch(()=>{});return true;}catch{return false;}}
  function pluck(midi,soft=false){
    if(!context||muted||context.state!=='running')return;
    const now=context.currentTime,frequency=440*2**((midi-69)/12),gain=context.createGain(),filter=context.createBiquadFilter();
    filter.type='lowpass';filter.frequency.setValueAtTime(soft?1700:3800,now);filter.frequency.exponentialRampToValueAtTime(550,now+1.1);
    gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(soft?.15:.30,now+.008);gain.gain.exponentialRampToValueAtTime(.0001,now+1.65);
    filter.connect(gain);gain.connect(context.destination);
    const oscillators=[1,2,3].map((harmonic,i)=>{const o=context.createOscillator(),level=context.createGain();o.type=i?'sine':'triangle';o.frequency.value=frequency*harmonic;level.gain.value=[.65,.22,.09][i];o.connect(level);level.connect(filter);o.start(now);o.stop(now+1.7);o.onended=()=>{o.disconnect();level.disconnect();};return o;});
    voices.add(gain);oscillators[0].addEventListener('ended',()=>{gain.disconnect();filter.disconnect();voices.delete(gain);});
  }
  function silence(){for(const gain of voices)try{gain.gain.cancelScheduledValues(context.currentTime);gain.gain.setTargetAtTime(.0001,context.currentTime,.015);}catch{}}
  return {start,pluck,silence,toggle(){muted=!muted;if(muted)silence();else start();return !muted;},close(){silence();context?.close().catch(()=>{});context=null;}};
}

export function mountGuqin(root,g,{persist,complete,prepare}){
  if(g.outcome)return ()=>{};
  if(g.status==='ended'){const retry=document.createElement('button');retry.className='primary full';retry.textContent='Nhận kết quả khúc đàn';retry.onclick=()=>complete();root.querySelector('.qin-overlay .qin-instructions')?.replaceChildren(retry);queueMicrotask(complete);return ()=>{};}
  const song=composition(g.seed),stage=root.querySelector('.qin-stage'),field=root.querySelector('.qin-targets'),overlay=root.querySelector('.qin-overlay'),feedback=root.querySelector('.qin-feedback'),start=root.querySelector('[data-qin-start]'),pause=root.querySelector('[data-qin-pause]'),sound=root.querySelector('[data-qin-sound]');
  const timeLabel=root.querySelector('[data-qin-time]'),scoreLabel=root.querySelector('[data-qin-score]'),progress=root.querySelector('[data-qin-progress]');
  const music=instrument(),nodes=new Map(),pointers=new Map(),keys=new Map(),played=new Set(song.notes.filter(n=>n.at<g.elapsed).map(n=>n.id));
  let frame=0,base=0,startAt=0,lastSave=0,disposed=false,completed=false,lastMarks='';
  const elapsed=()=>g.status==='playing'?Math.min(GUQIN_DURATION,base+performance.now()-startAt):g.elapsed;
  const tell=text=>{feedback.textContent=text;};
  function update(){
    timeLabel.textContent=((GUQIN_DURATION-g.elapsed)/1000).toFixed(1);scoreLabel.textContent=performanceScore(g);progress.textContent=`${g.marks.filter(v=>v!==null).length}/${g.marks.length}`;
    const marks=g.marks.join(',');if(marks!==lastMarks){lastMarks=marks;persist();}
    for(const n of song.notes){
      const active=g.status==='playing'&&g.marks[n.id]===null&&g.elapsed>=n.at-n.travel&&(g.elapsed<=n.at+HIT_WINDOW||g.holding?.id===n.id);
      let el=nodes.get(n.id);
      if(!active){if(el){el.remove();nodes.delete(n.id);}continue;}
      if(!el){el=document.createElement('button');el.type='button';el.className=`qin-note ${n.hold?'hold-note':'tap-note'}`;el.dataset.note=n.id;el.setAttribute('aria-label',`${n.hold?'Giữ':'Chạm'} nốt ${n.id+1}, phím ${n.cell+1}`);el.style.left=`${18+(n.cell%3)*32}%`;el.style.top=`${17+Math.floor(n.cell/3)*32}%`;el.innerHTML=`<i class="qin-approach"></i><i class="qin-hold-progress"></i><b>${n.hold?'♬':'♪'}</b><span>${n.hold?'GIỮ':'CHẠM'}</span><small>${n.cell+1}</small>`;field.append(el);nodes.set(n.id,el);}
      const isHolding=g.holding?.id===n.id,approach=Math.max(0,(n.at-g.elapsed)/n.travel);
      el.classList.toggle('holding',isHolding);el.classList.toggle('on-beat',Math.abs(n.at-g.elapsed)<=110);
      el.style.setProperty('--approach',1+approach*1.25);el.style.setProperty('--held',`${isHolding?Math.min(100,(g.elapsed-g.holding.at)/n.hold*100):0}%`);
    }
  }
  function finish(){if(completed||disposed)return;completed=true;cancelAnimationFrame(frame);music.silence();persist();overlay.hidden=false;const retry=document.createElement('button');retry.className='primary full';retry.textContent='Nhận kết quả khúc đàn';retry.onclick=()=>complete();root.querySelector('.qin-instructions')?.replaceChildren(retry);complete();}
  function loop(){if(disposed||g.status!=='playing')return;const heldBefore=g.holding?.id,missedBefore=g.marks.filter(v=>v===0).length;advancePerformance(g,elapsed());
    if(heldBefore!==undefined&&!g.holding&&g.marks[heldBefore]>0)tell('Giữ trọn nốt!');else if(g.marks.filter(v=>v===0).length>missedBefore)tell('Lỡ nhịp · Đón nốt tiếp theo');
    for(const n of song.notes)if(n.at<=g.elapsed&&!played.has(n.id)){played.add(n.id);music.pluck(n.pitch,true);}
    update();if(g.elapsed-lastSave>=500){lastSave=g.elapsed;persist();}if(g.status==='ended'){finish();return;}frame=requestAnimationFrame(loop);
  }
  function doPause(){if(g.status!=='playing')return;pausePerformance(g,elapsed());cancelAnimationFrame(frame);music.silence();pointers.clear();keys.clear();persist();if(g.status==='ended'){finish();return;}showPause();update();}
  function showPause(){overlay.hidden=false;pause.disabled=true;root.querySelector('[data-qin-pause-title]').textContent=g.status==='ready'?'Gảy một khúc tri âm':'Khúc đàn tạm dừng';start.textContent=g.status==='ready'?'Bắt đầu · 30 giây':`Tiếp tục · ${Math.ceil((GUQIN_DURATION-g.elapsed)/1000)} giây`;}
  async function begin(){if(start.disabled)return;if(prepare&&g.status==='ready'&&!g.audit){start.disabled=true;try{if(await prepare())return;}catch(error){tell(error.message);return;}finally{start.disabled=false;}}if(!resumePerformance(g))return;music.start();base=g.elapsed;startAt=performance.now();overlay.hidden=true;pause.disabled=false;persist();frame=requestAnimationFrame(loop);}
  function hit(id){if(g.status!=='playing')return false;const accepted=pressNote(g,id,elapsed());if(accepted){const n=song.notes[id];if(g.holding?.id===id){tell('Giữ đến khi vòng hồng đầy…');music.pluck(n.pitch);}else{const v=g.marks[id];tell(v===100?'Chuẩn nhịp!':v>=85?'Êm tai':v>0?'Hơi lệch nhịp':'Chạm chưa đúng nhịp');if(v)music.pluck(n.pitch);}persist();update();}return accepted;}
  function release(id,cancelled=false){if(g.holding?.id!==id)return;releaseNote(g,id,elapsed());const v=g.marks[id];tell(cancelled?'Nốt giữ đã ngắt':v>=85?'Giữ trọn nốt!':v>0?'Buông hơi sớm':'Nốt giữ chưa đủ');persist();update();}
  function down(e){const el=e.target.closest('[data-note]');if(!el||g.status!=='playing')return;e.preventDefault();const id=Number(el.dataset.note);if(hit(id)&&g.holding?.id===id){pointers.set(e.pointerId,id);stage.setPointerCapture(e.pointerId);}}
  function up(e){const id=pointers.get(e.pointerId);if(id!==undefined){e.preventDefault();pointers.delete(e.pointerId);release(id,e.type==='pointercancel');}}
  function keydown(e){if(e.repeat||g.status!=='playing'||!/^[1-9]$/.test(e.key))return;const n=song.notes.find(n=>n.cell===Number(e.key)-1&&nodes.has(n.id));if(!n)return;e.preventDefault();if(hit(n.id)&&g.holding?.id===n.id)keys.set(e.key,n.id);}
  function keyup(e){if(keys.has(e.key)){e.preventDefault();release(keys.get(e.key));keys.delete(e.key);}}
  const hidden=()=>{if(document.hidden)doPause();};
  start.addEventListener('click',begin);pause.addEventListener('click',doPause);sound.addEventListener('click',()=>{const on=music.toggle();sound.textContent=on?'♫ Bật':'♫ Tắt';sound.setAttribute('aria-pressed',String(on));sound.setAttribute('aria-label',on?'Tắt âm thanh':'Bật âm thanh');});
  stage.addEventListener('pointerdown',down);stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);stage.addEventListener('lostpointercapture',up);document.addEventListener('keydown',keydown);document.addEventListener('keyup',keyup);document.addEventListener('visibilitychange',hidden);window.addEventListener('pagehide',doPause);window.addEventListener('blur',doPause);
  showPause();update();
  return ()=>{if(disposed)return;doPause();disposed=true;cancelAnimationFrame(frame);music.close();document.removeEventListener('keydown',keydown);document.removeEventListener('keyup',keyup);document.removeEventListener('visibilitychange',hidden);window.removeEventListener('pagehide',doPause);window.removeEventListener('blur',doPause);};
}
