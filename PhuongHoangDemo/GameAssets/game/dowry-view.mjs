import {itemById} from './inventory.mjs';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function dowryPanel(s,{itemArt,chestArt,chestName,button}){
 const notice=s.notices.find(n=>n.kind==='dowry'),item=itemById(notice?.item);if(!notice||!item&&!notice.chest)return '';
 const art=item?itemArt(item.id):chestArt(notice.chest),name=item?.name||chestName(notice.chest);
 return `<section class="dowry-panel"><h2>Phụ mẫu tiễn nhập cung</h2><p class="story">${esc(notice.text)}</p><div class="dowry-gift">${art}</div><h3>${esc(name)}</h3>${notice.silver===undefined?'':`<p class="dowry-silver">+ ${esc(notice.silver)} bạc</p>`}<p class="footnote">${item?'Của hồi môn đã được cất vào túi đồ.':'Hộp hồi môn đã được cất vào Túi đồ · Rương.'}</p></section>${button('Nhận hồi môn · Tiếp tục','accept-dowry','primary full')}`;
}
