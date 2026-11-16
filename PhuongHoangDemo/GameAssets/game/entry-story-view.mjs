import {entryStoryLines} from './entry-story.mjs';
import {FAMILY_BACKGROUNDS} from './family-origins.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function entryStoryPanel(s){
 const g=s.entryStory;if(!g)return '';
 const background=FAMILY_BACKGROUNDS[g.background],text=entryStoryLines(s)[g.step];
 return `<article class="entry-story-panel"><img class="entry-story-background" src="${background.asset}" alt="${esc(background.label)}"><div class="entry-story-shade"></div><header><small>${esc(background.label)}</small><h2>${g.step===0?'Một đời mới':'Ngày tiến cung'}</h2></header><div class="entry-story-copy"><p class="entry-story-spoken">${esc(text)}</p><p class="entry-story-typed" data-entry-typing aria-hidden="true">${esc(text)}</p></div></article><button class="primary full" data-action="entry-story-next">${g.step===0?'Tiếp tục':s.p.role==='candidate'?'Vào tuyển tú':'Nhập cung'}</button>`;
}
export function mountEntryStory(root){
 const el=root.querySelector('[data-entry-typing]');if(!el)return ()=>{};
 const text=el.textContent,chars=Array.from(text),button=root.querySelector('[data-action="entry-story-next"]');
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return ()=>{};
 let frame=0,started=null,complete=false;el.textContent='';
 function finish(){complete=true;cancelAnimationFrame(frame);el.textContent=text;el.classList.add('entry-text-complete');}
 function tick(now){started??=now;const count=Math.floor((now-started)/28);el.textContent=chars.slice(0,count).join('');if(count>=chars.length)finish();else frame=requestAnimationFrame(tick);}
 function reveal(event){if(complete)return;event.preventDefault();event.stopImmediatePropagation();finish();}
 button?.addEventListener('click',reveal,true);frame=requestAnimationFrame(tick);
 return ()=>{cancelAnimationFrame(frame);button?.removeEventListener('click',reveal,true);};
}
