import {itemById} from './inventory.mjs';
import {maidEquipmentError} from './maid-rules.mjs';
import {addLog} from './life-engine.mjs';
import {inColdPalace} from './cold-palace.mjs';
import {salePrice} from './shop-prices.mjs';
export {salePrice} from './shop-prices.mjs';

const TYPES=new Set(['robe','hair','pet']);
export function shopOwnedItems(s,type='all'){
 return [...new Set(s.p.inventory)].map(itemById).filter(i=>i&&TYPES.has(i.type)&&(type==='all'||i.type===type));
}
function replacementRobe(s,id){
 return shopOwnedItems(s,'robe').find(i=>i.id!==id&&!maidEquipmentError(s.p,i));
}
export function saleError(s,id){
 if(!s.p.alive)return 'Kiếp này đã khép lại.';
 if(s.intro||s.p.outside)return 'Hãy nhập cung trước.';
 if(s.p.prison||inColdPalace(s))return 'Đang ở lãnh cung, chưa thể đến Kỳ trân các.';
 if(s.wishingPool||s.entryStory||s.dateScene||s.fashion||s.lake||s.imperialNight||s.sideEvents?.length||s.coronation||s.festival||s.guqin||s.caro||s.story||s.event||s.exam||s.mini||s.decree||s.result||s.notices?.length)return 'Hãy hoàn thành việc đang chờ trước.';
 const item=itemById(id);
 if(!item||!TYPES.has(item.type)||!s.p.inventory.includes(id))return 'Nàng không còn sở hữu món này.';
 if(s.p.appearance.robe===id&&!replacementRobe(s,id))return 'Cần giữ một bộ y phục phù hợp để mặc.';
 if(s.p.silver+salePrice(id)>999999)return 'Bạc đã gần đầy, chưa thể bán món này.';
 return '';
}
export function sellItem(s,id){
 const error=saleError(s,id);if(error)return {error};
 const item=itemById(id),price=salePrice(id);
 if(s.p.appearance.robe===id)s.p.appearance.robe=replacementRobe(s,id).id;
 if(s.p.appearance.ornament===id)s.p.appearance.ornament=null;
 if(s.p.pet===id)s.p.pet=null;
 s.p.inventory=s.p.inventory.filter(x=>x!==id);
 s.legacy.collection=s.legacy.collection.filter(x=>x!==id);
 s.p.confiscatedItems=[...new Set([...(s.p.confiscatedItems||[]),id])];
 s.p.collectionRevision=(s.p.collectionRevision||0)+1;
 s.p.silver+=price;
 const text=`Đã bán ${item.name} · Nhận ${price} bạc.`;
 addLog(s,text,'shop');
 return {ok:true,id,price,text};
}
