import {displayNames} from './english-names.mjs';
import {childPortrait,childAgeLabel,childAptitude} from './family.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function adoptionDecree(s,{icon,button}){
 const d=s.notices.find(n=>n.kind==='adoption-decree'),c=s.p.children.find(c=>c.id===d?.child);
 if(!c)return '';
 const tier=childAptitude(c),godchild=c.adoption?.kind==='godchild';
 return `<div class="decree-scroll adoption-scroll"><div class="imperial-seal">${icon('crown')}</div><h2 class="center">${godchild?'Chiếu chỉ nhận con đỡ đầu':'Chiếu chỉ ban hoàng nhi'}</h2><p class="story">${esc(d.text)}</p><img class="adoption-portrait" src="${childPortrait(s,c)}" width="140" height="140" alt="${esc(c.gender+' '+c.name)}"><p class="center adoption-child-title">${esc(c.royal===false?(c.gender==='Hoàng tử'?'Công tử':'Tiểu thư'):c.gender)} · ${childAgeLabel(s,c)}</p><h2 class="decree-title child-name aptitude-${tier.id}">${esc(displayNames(c.name))}</h2><p class="center"><span class="child-aptitude aptitude-${tier.id}">Tư chất · ${tier.name}</span></p><p class="footnote center">Con đã được ghi vào Nhân duyên · Con cái.</p>${button(godchild?'Lĩnh chỉ · Nhận con đỡ đầu':'Lĩnh chỉ · Nhận nuôi hoàng nhi','accept-adoption-decree','primary full')}</div>`;
}
