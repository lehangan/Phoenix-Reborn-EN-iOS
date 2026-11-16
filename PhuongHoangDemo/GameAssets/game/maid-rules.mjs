import {itemById,serviceRobeRank} from './inventory.mjs';
export const MAID_JEWELRY_LIMIT=40;
export const maidJewelryAllowed=(p,item)=>p.role!=='maid'||p.outside||item?.type!=='hair'||item.luxury<=MAID_JEWELRY_LIMIT;
export function maidEquipmentError(p,item){
 if(!maidJewelryAllowed(p,item))return 'Cung nữ chỉ được đeo trang sức có độ xa xỉ từ 40 trở xuống.';
 if(p.role==='maid'&&!p.outside&&item?.type==='robe'&&serviceRobeRank(item)!==p.serviceRank)return 'Cung nữ chỉ được mặc y phục đúng cấp hiện tại. Bộ khác vẫn được giữ trong túi đồ.';
 return '';
}
// Old saves keep ownership; only disallowed equipped/borrowed jewelry is removed.
export function enforceMaidJewelry(s){
 const p=s.p;if(p.role!=='maid'||p.outside)return;
 const looks=[p.appearance,p.coldPalace?.restore,s.festival,s.festival?.playerLook,s.lake,s.lake?.playerLook,s.coronation?.attendeeLook];
 for(const look of looks)if(look?.ornament&&!maidJewelryAllowed(p,itemById(look.ornament)))look.ornament=null;
 const guest=s.coronation?.guests?.find(n=>n.id==='player');if(guest?.appearance&&!maidJewelryAllowed(p,itemById(guest.appearance.ornament)))guest.appearance.ornament=null;
}
