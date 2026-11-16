import {displayNames} from './english-names.mjs';
import {activeSisters} from './female-relationships.mjs';
import {femaleLine,femaleLineBetween} from './female-speech.mjs';
import {childTitleLabel} from './child-titles.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button=(label,id,cls='primary')=>`<button class="${cls} full" data-action="sister-choice" data-id="${id}">${label}</button>`;
export function sisterPanel(s,character){
 const q=s.sisterEvent,n=s.npcs.find(n=>n.id===q?.npc);if(!q||!n)return '';
 const names=`${s.p.name} · ${n.name}`,invitation=femaleLine(s,n,'Ở chốn thâm cung, gặp được {you} là duyên của {self}. {Self} mong được cùng {you} kết nghĩa tỷ muội, từ nay phúc họa cùng chia, có được không?');
 if(q.phase==='offer')return `<div class="sister-offer"><p class="eyebrow">${q.kind==='invite'?'KIM LAN HỮU ƯỚC':'TÌNH NGHĨA RẠN NỨT'}</p><div class="sister-offer-face">${character(n.appearance,'head')}</div><h2>${q.kind==='invite'?'Lời kết nghĩa tỷ muội':'Trở mặt thành thù'}</h2><h3>${esc(displayNames(n.name))}</h3><p class="story">${q.kind==='invite'?`“${esc(invitation)}”`:`Nàng tìm thấy chứng cứ cho thấy ${esc(displayNames(n.name))}, người từng cùng mình thề nguyền, đang âm thầm tính kế hãm hại mình.`}</p>${q.kind==='invite'?`<p class="footnote">Đang có ${activeSisters(s).length}/2 tỷ muội kết nghĩa.</p>${button('Đồng ý · Cùng đến chùa','accept')}${button('Xin khất lời kết nghĩa','decline','subtle')}`:button('Đến sân cung đối chất','confront')}</div>`;
 if(q.phase==='portrait')return `<article class="kim-lan-scroll"><p class="eyebrow">THẦN PHẬT CHỨNG GIÁM</p><h2>Một lời kim lan</h2><div class="kim-lan-painting"><div class="kim-lan-person kim-lan-player">${character(s.p.appearance,'waist')}</div><div class="kim-lan-person kim-lan-sister">${character(n.appearance,'waist')}</div><div class="kim-lan-seal" aria-label="Kết nghĩa kim lan"><span>Kết nghĩa</span><strong>Sworn Sisters</strong></div></div><p class="kim-lan-names">${esc(names)}</p><p>Phúc cùng hưởng · Họa cùng chia<br>Nguyện giữ trọn tình tỷ muội</p><small>Tháng ${s.p.months%12+1} · Năm ${Math.floor(s.p.months/12)+1}</small></article>${button('Ghi nhớ lời thề · Trở về cung','finish')}`;
 const temple=q.phase==='temple',copy=temple?`Trước Thần Phật chứng giám, ${s.p.name} và ${n.name} nguyện kết nghĩa tỷ muội. Từ nay có phúc cùng hưởng, có họa cùng chia, hoạn nạn không rời, chẳng phụ lòng nhau.`:`${s.p.name}: “${femaleLineBetween(s.p,n,'{Self} coi {you} như tỷ muội ruột thịt, vậy mà {you} lại âm thầm hại {self}!')}”\n${n.name}: “${femaleLine(s,n,'Trong cung này, {self} cũng phải lo đường sống cho mình. Tình nghĩa với {you}, coi như chưa từng có!')}”`;
 return `<div class="sister-cg ${temple?'sister-temple':'sister-courtyard'}" data-sister-cg><img class="sister-bg" src="assets/v121/kim-lan-${temple?'temple':'courtyard'}.webp" alt="${temple?'Chùa trong hoàng cung':'Sân cung lúc chạng vạng'}"><div class="sister-pair"><div class="sister-person first">${character(s.p.appearance,'full')}</div><div class="sister-person second">${character(n.appearance,'full')}</div></div><div class="sister-cg-copy"><h2>${temple?'Đồng hành đến cửa Phật':'Lời thề tan vỡ'}</h2><p data-sister-text>${esc(copy)}</p></div></div><button class="primary full" data-action="sister-choice" data-id="${temple?'vow':'break'}" data-sister-next>${temple?'Lập lời thề · Kết nghĩa kim lan':'Đoạn tuyệt · Hủy kết nghĩa'}</button>`;
}
export function adoptionChoicePanel(s,character){
 const q=s.adoptionChoice,n=s.npcs.find(n=>n.id===q?.npc),c=n?.children?.find(c=>c.id===q?.sourceChild);if(!q)return '';
 return `<div class="decree-scroll"><p class="eyebrow">ÂN CHỈ TỪ ĐIỆN THỪA THIÊN</p><h2>Một duyên mẫu tử</h2><p class="story">Hoàng đế thương xót nàng không còn khả năng sinh nở, cho nàng lựa chọn một mối duyên mẫu tử để cùng chăm sóc, nuôi dạy đứa trẻ.</p><button class="primary full" data-action="adoption-choice" data-id="royal">Ban hoàng nhi khác</button>${c?`<div class="godchild-mother">${character(n.appearance,'head')}<p>Tỷ muội <strong>${esc(displayNames(n.name))}</strong><br>${esc(childTitleLabel(c)+' '+c.name)}</p></div><button class="primary full" data-action="adoption-choice" data-id="godchild">Làm mẫu thân đỡ đầu con của ${esc(displayNames(n.name))}</button>`:'<p class="footnote">Chưa có tỷ muội kết nghĩa phù hợp để gửi con đỡ đầu. Nàng vẫn có thể lĩnh chỉ nhận hoàng nhi làm con nuôi.</p>'}</div>`;
}
export function mountSisterScene(root){
 const cg=root.querySelector('[data-sister-cg]'),text=cg?.querySelector('[data-sister-text]'),button=root.querySelector('[data-sister-next]');if(!cg||!text||!button)return ()=>{};
 const full=text.textContent,chars=Array.from(full),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let frame=0,start=0,done=false;
 text.setAttribute('aria-label',full);text.textContent='';
 function finish(){done=true;cancelAnimationFrame(frame);text.textContent=full;cg.classList.add('cg-complete');}
 function tick(now){if(!start)start=now;const count=Math.floor((now-start)/30);text.textContent=chars.slice(0,count).join('');if(count>=chars.length)finish();else frame=requestAnimationFrame(tick);}
 function skip(e){if(!done){e.preventDefault();e.stopImmediatePropagation();finish();}}
 if(reduced)finish();else frame=requestAnimationFrame(tick);button.addEventListener('click',skip,true);
 return ()=>{cancelAnimationFrame(frame);button.removeEventListener('click',skip,true);};
}
