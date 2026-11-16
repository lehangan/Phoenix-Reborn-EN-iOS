const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const DATE_MEN=['prince','chancellor','general','physician'];
export function datePanel(s,character){
 const g=s.dateScene,n=s.npcs.find(n=>n.id===g?.npc);if(!n||!DATE_MEN.includes(n.id))return '';
 return panel({kind:'date',background:'assets/v91/date-garden.webp',title:'Lời hẹn dưới hàng liễu',caption:`${n.name} đang đợi bên lối nhỏ. Nàng bước tới, cùng người ấy dạo qua vườn vắng, lắng nghe tiếng gió giữa những tán liễu.`,people:`<div class="journey-hero" aria-label="${esc(s.p.name)} tiến đến buổi hẹn">${character(s.p.appearance,'full')}</div><img class="journey-man" src="assets/v91/${n.id}-back.webp" alt="${esc(n.name)} nhìn từ phía sau, toàn thân"><span class="journey-name">${esc(n.name)}</span>`,action:'date-finish',label:'Kết thúc buổi hẹn'});
}
function panel({kind,background,title,caption,people,action,label}){
 return `<article class="journey-cg journey-${kind}" data-journey style="--journey-bg:url('${background}')"><div class="journey-fit"><img class="journey-background" src="${background}" alt="Khu vườn hẹn hò bên hàng liễu">${people}<header class="journey-copy"><h2>${title}</h2><p class="journey-spoken">${esc(caption)}</p><p data-journey-text aria-hidden="true">${esc(caption)}</p></header></div></article><button class="primary full" data-action="${action}" data-journey-next data-finished-label="${label}">Tiếp tục</button>`;
}
// First tap completes the CG. Only a subsequent tap may settle the event.
export function mountJourney(root){
 const scene=root.querySelector('[data-journey]');if(!scene)return ()=>{};
 const fit=scene.querySelector('.journey-fit'),copy=scene.querySelector('[data-journey-text]'),text=copy.textContent,chars=Array.from(text),button=root.querySelector('[data-journey-next]');
 let disposed=false,finished=false,started=false,frame=0,last=0,elapsed=0;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches,duration=reduced?0:8000;
 function resize(){const {width,height}=scene.getBoundingClientRect(),w=Math.min(width,height*2/3);fit.style.width=w+'px';fit.style.height=w*1.5+'px';}
 const observer=new ResizeObserver(resize);observer.observe(scene);resize();
 function paint(p){scene.style.setProperty('--journey-progress',p);copy.textContent=chars.slice(0,Math.floor(chars.length*Math.min(1,p*1.6))).join('');}
 function finish(){if(disposed)return;finished=true;cancelAnimationFrame(frame);paint(1);scene.classList.add('journey-finished');button.textContent=button.dataset.finishedLabel;}
 function tick(now){if(disposed)return;if(last&&!document.hidden)elapsed+=Math.min(100,now-last);last=now;const p=Math.min(1,elapsed/duration);paint(p);if(p===1)finish();else frame=requestAnimationFrame(tick);}
 function start(){if(disposed||started||finished)return;started=true;clearTimeout(fallback);scene.classList.add('journey-running');if(reduced)finish();else frame=requestAnimationFrame(tick);}
 function skip(event){if(finished)return;event.preventDefault();event.stopImmediatePropagation();finish();}
 function visibility(){last=0;scene.classList.toggle('journey-paused',document.hidden);}
 paint(0);button.addEventListener('click',skip,true);document.addEventListener('visibilitychange',visibility);
 const fallback=setTimeout(start,6000),images=[...scene.querySelectorAll('img')].map(img=>img.decode());
 for(const layer of scene.querySelectorAll('svg image')){const url=layer.getAttribute('href');if(url){const img=new Image();img.src=url;images.push(img.decode());}}
 Promise.allSettled(images).then(start);
 return ()=>{disposed=true;clearTimeout(fallback);cancelAnimationFrame(frame);observer.disconnect();button.removeEventListener('click',skip,true);document.removeEventListener('visibilitychange',visibility);};
}
