import {displayNames} from './english-names.mjs';
import {nightOutfits} from './imperial-night.mjs';
import {itemById,RARITIES} from './inventory.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button=(label,action,cls='primary full',extra='')=>`<button class="${cls}" data-action="${action}" ${extra}>${label}</button>`;
const heart='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21S2 15 2 8a5 5 0 0 1 10-1A5 5 0 0 1 22 8c0 7-10 13-10 13Z"/></svg>';
export function imperialNightPanel(s,{character,itemArt}){
 const g=s.imperialNight;if(!g)return '';const look={...s.p.appearance,robe:g.robe,ornament:g.ornament},e=s.npcs.find(n=>n.id===g.emperor);
 if(g.phase==='dress'){
  const type=g.wardrobeType,item=itemById(g.robe),jewel=itemById(g.ornament),selected=type==='robe'?g.robe:g.ornament;
  return `<article class="event-outfit-panel night-dressing"><header class="lake-heading"><span class="eyebrow">ÂN SỦNG · ${esc(displayNames(e.name))}</span><h2>Y phục thị tẩm</h2></header><div class="festival-fitting"><div class="festival-fitting-person">${character(look,'fitting')}</div><div class="festival-fitting-label"><span>${RARITIES[item.rarity]}</span><h3>${esc(item.name)}</h3><p>${jewel?esc(jewel.name):'Không đeo trang sức'}</p></div></div><div class="festival-dress-tabs">${['robe','hair'].map(t=>button(t==='robe'?'Y phục':'Trang sức','night-tab',t===type?'selected':'',`data-id="${t}"`)).join('')}</div><p class="festival-wardrobe-note">Chọn y phục và trang sức đã có trong tủ.</p><div class="festival-wardrobe">${type==='hair'?button('<strong>Không đeo</strong>','night-outfit',`festival-robe ${selected===null?'selected':''}`,'data-type="hair"'):''}${nightOutfits(s,type).map(i=>button(`${itemArt(i)}<strong>${esc(i.name)}</strong>`,'night-outfit',`festival-robe ${type==='hair'?'festival-hair':''} ${selected===i.id?'selected':''}`,`data-id="${i.id}" data-type="${type}" aria-pressed="${selected===i.id}"`)).join('')}</div><footer class="event-outfit-actions">${button('Đã chọn · Tiến vào tẩm điện','night-enter')}</footer></article>`;
 }
 return `<article class="imperial-night"><div class="night-scene" data-night-scene aria-label="Nàng tiến vào tẩm điện, bên dưới là bóng lưng ${g.emperor==='prince'?'Thân vương':'hoàng đế'} và long sàng"><img class="night-room" src="assets/v58/imperial-bedchamber.webp" alt="Tẩm điện với long sàng chạm rồng, ánh nến ấm"><div class="night-player">${character(look,'full')}</div><img class="night-emperor" src="${g.emperor==='prince'?'assets/v91/prince-back.webp':'assets/v51/emperor-back.webp'}" alt="Bóng lưng ${g.emperor==='prince'?'Thân vương':'hoàng đế'} bên long sàng"><div class="night-curtain night-curtain-left" aria-hidden="true"><img src="assets/v58/crimson-dragon-phoenix.webp" alt=""></div><div class="night-curtain night-curtain-right" aria-hidden="true"><img src="assets/v58/crimson-dragon-phoenix.webp" alt=""></div><div class="night-hearts" aria-hidden="true">${Array.from({length:11},(_,i)=>`<i style="--heart-x:${12+(i*29)%78}%;--heart-delay:${(i%6)*.28}s;--heart-size:${18+(i*7)%18}px;--heart-drift:${i%2?20:-20}px">${heart}</i>`).join('')}</div><p class="night-caption">Một đêm ân ái trôi qua,<br>kết quả…</p><p class="night-loading" role="status">Đang mở tẩm điện…</p><span class="night-seal">TẨM ĐIỆN · ${esc(displayNames(e.name))}</span></div><footer class="event-outfit-actions">${button('Xem kết quả','night-finish','subtle full')}</footer></article>`;
}
export function mountImperialNight(root,{complete}){
 const scene=root.querySelector('[data-night-scene]');if(!scene)return ()=>{};
 let disposed=false,finished=false,started=false,frame=0,last=0,elapsed=0;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function finish(){if(disposed||finished)return;finished=true;cancelAnimationFrame(frame);complete();}
 function tick(now){if(disposed)return;if(last&&!document.hidden)elapsed+=Math.min(100,now-last);last=now;if(elapsed>=(reduced?2500:9000))return finish();frame=requestAnimationFrame(tick);}
 function start(){if(started||disposed)return;started=true;clearTimeout(fallback);scene.classList.add('night-running');scene.classList.toggle('night-reduced',reduced);frame=requestAnimationFrame(tick);}
 const fallback=setTimeout(start,6000);
 const images=[...scene.querySelectorAll('img')];Promise.allSettled(images.map(img=>img.decode())).then(start);
 const visibility=()=>{scene.classList.toggle('night-paused',document.hidden);last=0;};
 document.addEventListener('visibilitychange',visibility);visibility();
 return ()=>{disposed=true;clearTimeout(fallback);cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',visibility);};
}
