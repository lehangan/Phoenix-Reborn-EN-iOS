import {displayNames} from './english-names.mjs';
import {femaleDisplayedLine} from './female-speech.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Keep pleas ahead of the ending, and show other visits after the incident result.
export function pendingFemaleNotice(s){
 return s.notices.find(n=>n.kind==='sisterhood'&&n.beforeEnding)||s.notices.find(n=>n.kind==='sisterhood');
}
export function dismissFemaleNotice(s){
 const notice=pendingFemaleNotice(s);if(!notice)return {error:'Không có lời thăm hỏi đang chờ.'};
 s.notices.splice(s.notices.indexOf(notice),1);return {ok:true};
}
export function femaleNoticePanel(s,character){
 const notice=pendingFemaleNotice(s);if(!notice)return '';
 const ids=[...new Set(notice.npcs||[notice.npc])],women=ids.map(id=>s.npcs.find(n=>n.id===id)).filter(Boolean);
 const prose=String(notice.text??''),story=women.length===1?prose.replace(/“([^”]*)”/gu,(_,line)=>`“${femaleDisplayedLine(s,women[0],line)}”`):prose;
 return `<section class="female-notice"><p class="eyebrow">${notice.beforeEnding?'TÌNH NGHĨA TRƯỚC ĐIỆN':'TÌNH NGHĨA NỘI CUNG'}</p><h2>${esc(notice.title)}</h2><div class="female-notice-people">${women.map(n=>`<figure><div class="female-notice-avatar">${character(n.appearance,'head','npc-floral-portrait')}</div><figcaption><span>${esc(n.role)}</span><strong>${esc(displayNames(n.name))}</strong></figcaption></figure>`).join('')}</div><p class="story">${esc(story)}</p>${notice.silver>0?`<p class="female-notice-silver">Đã nhận ${notice.silver} bạc</p>`:''}<button class="primary full" data-action="accept-female-notice">Tiếp tục</button></section>`;
}

export function lynxIntro(n){
 return n.bond>50?`Có người thả linh miêu lao về phía nàng. Tin đồn kẻ đứng sau là ${n.role} ${n.name}, nhưng nàng chưa có căn cứ xác thực. Nàng không kịp tránh những móng vuốt sắc nhọn…`:`${n.role} ${n.name} vì ghen tị đã sai người thả linh miêu lao về phía nàng. Nàng không kịp tránh những móng vuốt sắc nhọn…`;
}
export function rumorPortrait(n,character){
 if(!n)return '';
 return `<figure class="side-portrait rumor-portrait"><div class="side-portrait-art"><div class="rumor-base">${character(n.appearance,'avatar','npc-floral-portrait')}</div><div class="rumor-shadow" aria-hidden="true"></div></div><figcaption><span>${esc(n.role)} · Lời đồn chưa rõ</span><strong>${esc(displayNames(n.name))}</strong></figcaption></figure>`;
}
