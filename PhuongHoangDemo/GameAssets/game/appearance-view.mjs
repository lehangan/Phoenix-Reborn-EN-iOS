import {displayNames} from './english-names.mjs';
import {APPEARANCE_PARTS,VIP_APPEARANCE_PART,appearanceChanged,appearanceCost} from './appearance-customization.mjs';
import {vipFaceById} from './vip-faces.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const value=id=>id===null?'none':id;
export const APPEARANCE_PAGE_SIZE=4;
export function appearancePage(part,page=0){
 const current=part==='vipFace'?VIP_APPEARANCE_PART:APPEARANCE_PARTS.find(p=>p.key===part)||APPEARANCE_PARTS[0];
 const count=Math.ceil(current.options.length/APPEARANCE_PAGE_SIZE),index=Math.max(0,Math.min(count-1,Math.floor(Number(page)||0)));
 return {current,index,count,options:current.options.slice(index*APPEARANCE_PAGE_SIZE,(index+1)*APPEARANCE_PAGE_SIZE)};
}
export function appearancePanel(s,draft,part,{character,page=0}){
 if(!draft)return '';
 const {current,index,count,options}=appearancePage(part,page),vipMode=current.key==='vipFace',vip=vipFaceById(draft.look.vipFace),cost=appearanceCost(draft),enough=s.legacy.points>=cost,changed=appearanceChanged(s,draft),previewMode=current.key==='front'?'head':'portrait';
 const preview=o=>{const look={...draft.look,[current.key]:o.id};if(!vipMode&&current.key!=='front')delete look.vipFace;return look;};
 return `<div class="appearance-heading"><span class="eyebrow">LUÂN HỒI · DUNG NHAN</span><h2>Dung nhan kiếp này</h2></div>
 <div class="appearance-preview"><div class="appearance-mirror">${character(draft.look,previewMode)}</div><div class="appearance-summary"><strong>${esc(displayNames(s.p.name))}</strong><p>Đang có <b>${s.legacy.points}</b> điểm luân hồi</p><span class="appearance-price">${cost} điểm / lần xác nhận</span><small>${vip?'Mặt VIP · '+esc(vip.name):'Tự phối ngũ quan'}<br>Thử mẫu không mất điểm.</small></div></div>
 <div class="appearance-tools"><button type="button" class="appearance-random" data-action="appearance-random"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/><g fill="currentColor"><circle cx="8" cy="8" r="1.5"/><circle cx="16" cy="8" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="8" cy="16" r="1.5"/><circle cx="16" cy="16" r="1.5"/></g></svg>Ngẫu nhiên</button><button type="button" class="appearance-vip ${vipMode?'selected':''}" data-action="appearance-tab" data-id="vipFace" aria-pressed="${vipMode}"><span aria-hidden="true">♛</span> Mặt VIP <small>5 điểm</small></button></div>
 <div class="appearance-tabs" role="group" aria-label="Chọn phần diện mạo">${APPEARANCE_PARTS.map(p=>`<button type="button" data-action="appearance-tab" data-id="${p.key}" aria-pressed="${p.key===current.key}" class="${p.key===current.key?'selected':''}">${p.name}</button>`).join('')}</div>
 <div class="appearance-options" role="group" aria-label="${current.name}">${options.map(o=>{const active=(draft.look[current.key]??null)===o.id&&(!vip||vipMode||current.key==='front');return `<button type="button" class="appearance-option ${active?'selected':''}" data-action="appearance-pick" data-part="${current.key}" data-id="${value(o.id)}" aria-label="${esc(o.name)}" aria-pressed="${active}"><span class="appearance-option-art" aria-hidden="true">${character(preview(o),previewMode)}</span><span>${esc(o.name)}</span>${active?'<i aria-hidden="true">✓</i>':''}</button>`}).join('')}${'<span class="appearance-option-placeholder" aria-hidden="true"></span>'.repeat(APPEARANCE_PAGE_SIZE-options.length)}</div>
 <div class="appearance-pagination" aria-label="Chuyển trang diện mạo"><button type="button" data-action="appearance-page" data-id="${index-1}" aria-label="Trang trước" ${index===0?'disabled':''}><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M27 16H5M15 6 5 16l10 10"/></svg></button><span>${esc(current.name)} · ${index+1}/${count}</span><button type="button" data-action="appearance-page" data-id="${index+1}" aria-label="Trang sau" ${index===count-1?'disabled':''}><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 16h22M17 6l10 10-10 10"/></svg></button></div>
 <p class="appearance-note">${vipMode?'32 khuôn mặt có sẵn makeup. NPC và kiếp mới có thể nhận ngẫu nhiên miễn phí.':'Tự phối: 3 điểm. Chọn Mặt VIP: 5 điểm. Không thay đổi chỉ số nhân vật.'}</p>
 <p class="appearance-note appearance-balance" role="status">${!enough?`Cần thêm ${cost-s.legacy.points} điểm để xác nhận.`:changed?`Xác nhận xong còn ${s.legacy.points-cost} điểm luân hồi.`:'Chọn mẫu bên trên để thay đổi diện mạo.'}</p>
 <div class="choices"><button type="button" class="primary full" data-action="appearance-apply" ${!enough||!changed?'disabled':''}>Xác nhận diện mạo · ${cost} điểm</button><button type="button" class="subtle full" data-action="appearance-cancel">Quay lại · Không dùng điểm</button></div>`;
}
