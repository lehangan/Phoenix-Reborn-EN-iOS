import {WISH_COST,WISH_OUTCOMES,wishItems,wishItemError,wishPaymentError,wishWaitMonths} from './wishing-pool.mjs';
import {itemById,RARITIES} from './inventory.mjs';
import {itemPage,itemPager} from './item-pagination.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function wishingEntry(s,disabled=false){
 const wait=wishWaitMonths(s);
 return `<div class="wish-entry"><button class="primary full wish-open" data-action="wish-open" ${disabled||wait?'disabled':''}>Ước nguyện cầu may</button><small>${wait?`Còn ${wait} tháng mới được cầu may tiếp`:'Mỗi năm một lần · 100 bạc + một trang phục / trang sức từ Tinh xảo trở lên'}</small></div>`;
}
export function wishingPanel(s,{itemArt,page=0}){
 const g=s.wishingPool;if(!g)return '';
 const image='<img class="wish-cg" src="assets/v136/wishing-merman.webp" alt="Mỹ nam ngư hiện lên giữa hồ sen dưới ánh trăng" width="1024" height="1536">';
 const head='<p class="wish-kicker">THỦY TẠ · DUYÊN KHỞI BÊN HỒ</p><h2>Hồ Ước Nguyện</h2>';
 const exit=label=>`<button class="subtle full" data-action="wish-leave">${label}</button>`;
 if(g.phase==='greeting')return `<section class="wish-scene">${image}<div class="wish-scene-shade"></div><div class="wish-dialogue">${head}<p class="wish-speaker">Ngư linh giữ hồ</p><p class="wish-speech">“Người hữu duyên, nàng có muốn thử vận may? Hãy gửi xuống hồ một trăm bạc cùng một món bảo vật, rồi để mặt nước trả lời.”</p><p class="wish-terms">Lễ vật: <b>100 bạc + 1 trang phục hoặc trang sức từ phẩm Tinh xảo trở lên.</b> Món đồ đã dâng sẽ mất trong mọi kết quả. Mỗi 12 tháng chỉ được cầu may một lần.</p><div class="wish-actions"><button class="primary full" data-action="wish-browse">Chọn lễ vật</button>${exit('Để dịp khác')}</div></div></section>`;
 if(g.phase==='offering'){
  const p=itemPage(wishItems(s),page);
  return `<section class="wish-offerings">${head}<p class="center">Chọn một lễ vật trong tủ · Đang có <b>${s.p.silver} bạc</b></p><p class="tip">Từ phẩm Tinh xảo trở lên. Đồ đang mặc cần tháo trước; mỗi món đã dâng đều mất. Chọn đồ chưa trừ bạc.</p><div class="wish-items">${p.items.map(i=>{const error=wishItemError(s,i.id);return `<button class="wish-item rarity-${i.rarity}" data-action="wish-select" data-id="${esc(i.id)}" ${error?'disabled':''}>${itemArt(i)}<strong>${esc(i.name)}</strong><small>${RARITIES[i.rarity]} · ${['Thường','Xanh','Tím','Vàng'][i.rarity]}</small><span>${error?'Đang mặc':`Dâng món này + ${WISH_COST} bạc`}</span></button>`;}).join('')||'<p class="wish-empty">Chưa có trang phục hoặc trang sức từ phẩm Tinh xảo trở lên. Nàng hãy mang lễ vật trở lại sau.</p>'}</div>${p.total>3?itemPager(p,'wish-page'):''}<div class="wish-actions">${exit('Rời hồ · Không dâng lễ')}</div></section>`;
 }
 const item=itemById(g.item);
 if(g.phase==='confirm'){
  const error=wishPaymentError(s,g.item);
  return `<section class="wish-confirm">${head}<h3 class="center">Dâng lễ cầu may?</h3><div class="wish-sacrifice-art">${itemArt(item)}</div><h3 class="center">${esc(item.name)}</h3><p class="wish-cost">−100 bạc <span>và mất vĩnh viễn món đồ này</span></p><p class="tip">Hồ có thể trả 0, 100, 500 hoặc 1.000 bạc. Kết quả không làm thay đổi việc mất lễ vật.</p>${error?`<p class="wish-error" role="status">${esc(error)}</p>`:''}<div class="wish-actions"><button class="primary full" data-action="wish-confirm" ${error?'disabled':''}>Ném 100 bạc và lễ vật xuống hồ</button><button class="subtle full" data-action="wish-browse">Chọn món khác</button>${exit('Thôi, giữ lại lễ vật')}</div></section>`;
 }
 const o=WISH_OUTCOMES.find(o=>o.id===g.receipt.outcome),net=o.silver-100;
 return `<section class="wish-scene wish-result">${image}<div class="wish-scene-shade"></div><div class="wish-dialogue">${head}<h3>${o.title}</h3><p class="wish-speech">${o.text}</p><div class="wish-receipt"><span>Nhận được</span><strong>${o.silver?`+${o.silver.toLocaleString('en-US')} bạc`:'Không có phần thưởng'}</strong><small>Bạc ${g.receipt.before.toLocaleString('en-US')} → ${g.receipt.after.toLocaleString('en-US')} (${net>0?'+':''}${net})</small><p>Đã dâng 100 bạc và ${esc(item.name)}.</p><small>Lần cầu may tiếp theo: sau 12 tháng.</small></div><div class="wish-actions"><button class="primary full" data-action="wish-leave">Rời Hồ Ước Nguyện</button></div></div></section>`;
}
