import {displayNames} from './english-names.mjs';
import {displayPosthumous} from './english-titles.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function posthumousDecree(p,d,{icon,button}){
 return `<div class="decree-scroll posthumous-scroll"><div class="imperial-seal">${icon('moon')}</div><h2 class="center">Chiếu truy phong</h2><p class="story center">Hoàng đế ${esc(d.emperor)} tưởng niệm<br>${esc(displayNames(p.name))} · ${esc(d.fromTitle)}</p><p class="center">${d.reason==='rescueEmperor'?(d.fromRank===d.rank?'Ban thụy hiệu · Ghi công cứu giá':'Truy phong · Ghi công cứu giá'):'Đặc ân truy phong một bậc'}</p><h2 class="decree-title">${esc(d.rankTitle)}</h2><p class="story center">Ban thụy hiệu <strong>${esc(displayPosthumous(d.posthumousName))}</strong></p><div class="posthumous-mourning">${d.mourning.map(line=>`<p class="story">${esc(line)}</p>`).join('')}</div>${button('Kính nhận chiếu truy phong','accept-rank-decree','primary full')}</div>`;
}
