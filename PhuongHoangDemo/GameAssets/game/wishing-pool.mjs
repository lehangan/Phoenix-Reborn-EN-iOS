import {itemById} from './inventory.mjs';
import {rand,addLog} from './life-engine.mjs';

export const WISH_COST=100;
export const WISH_INTERVAL=12;
export const WISH_MIN_RARITY=1;
export const WISH_OUTCOMES=Object.freeze([
 Object.freeze({id:'empty',weight:35,silver:0,title:'Một lời nguyện gửi nước',text:'Mặt hồ khẽ gợn rồi lặng yên. Lễ vật đã tan vào làn nước, lần này nàng không nhận được gì.'}),
 Object.freeze({id:'return',weight:35,silver:100,title:'Bạc trở về, lễ vật ở lại',text:'Tinh linh khẽ phất tay, một trăm bạc trở lại bên bờ. Món đồ đã hiến tế vẫn ở lại dưới hồ.'}),
 Object.freeze({id:'fortune',weight:20,silver:500,title:'Phúc lộc bên hồ',text:'Ánh ngọc dâng lên từ mặt nước. Tinh linh mỉm cười, trao nàng năm trăm bạc.'}),
 Object.freeze({id:'great-fortune',weight:10,silver:1000,title:'Đại cát lâm môn',text:'Hoa sen bừng sáng giữa hồ. Vận may đã mỉm cười, tinh linh ban nàng một nghìn bạc.'})
]);
export function wishingOutcome(roll){
 if(!Number.isFinite(roll)||roll<0||roll>=1)throw Error('Vận số hồ ước nguyện không hợp lệ.');
 const ticket=Math.floor(roll*100);let end=0;
 return WISH_OUTCOMES.find(o=>ticket<(end+=o.weight));
}
export function wishWaitMonths(s){
 const last=s.p.cooldowns.wishingPool;
 return last==null?0:Math.max(0,WISH_INTERVAL-(s.p.months-last));
}
export function wishItemError(s,id){
 const item=itemById(id);
 if(!item||!['robe','hair'].includes(item.type)||item.rarity<WISH_MIN_RARITY||!s.p.inventory.includes(id))return 'Hãy chọn một trang phục hoặc trang sức từ phẩm Tinh xảo trở lên trong tủ.';
 if([s.p.appearance.robe,s.p.appearance.ornament].includes(id))return 'Món này đang mặc. Hãy tháo hoặc đổi món khác trước khi hiến tế.';
 return '';
}
export function wishItems(s){
 return [...new Set(s.p.inventory)].map(itemById).filter(i=>i&&['robe','hair'].includes(i.type)&&i.rarity>=WISH_MIN_RARITY);
}
export function wishPaymentError(s,id){
 const wait=wishWaitMonths(s);
 if(wait)return `Nàng đã cầu may, còn ${wait} tháng mới được trở lại.`;
 if(s.p.silver<WISH_COST)return 'Cần đủ 100 bạc để dâng lễ.';
 return wishItemError(s,id);
}
// The palace entry point checks location access and other active events.
export function openWishingPool(s){
 const wait=wishWaitMonths(s);
 if(wait)return {error:`Nàng đã cầu may, còn ${wait} tháng mới được trở lại.`};
 s.wishingPool={phase:'greeting',month:s.p.months,item:null};
 return {ok:true};
}
export function browseWishOfferings(s){
 const g=s.wishingPool;
 if(!g||!['greeting','confirm'].includes(g.phase))return {error:'Hãy nghe lời tinh linh trước.'};
 g.phase='offering';g.item=null;return {ok:true};
}
export function selectWishOffering(s,id){
 if(s.wishingPool?.phase!=='offering')return {error:'Chưa đến lúc chọn lễ vật.'};
 const error=wishItemError(s,id);if(error)return {error};
 s.wishingPool.item=id;s.wishingPool.phase='confirm';return {ok:true};
}
export function confirmWishOffering(s){
 const g=s.wishingPool;
 if(!s.p.alive||g?.phase!=='confirm'||g.month!==s.p.months)return {error:'Lượt cầu may này không còn hiệu lực.'};
 const error=wishPaymentError(s,g.item);if(error)return {error};
 const item=itemById(g.item),outcome=wishingOutcome(rand(s));
 const before=s.p.silver;
 s.p.silver=before-WISH_COST+outcome.silver;
 s.p.inventory=s.p.inventory.filter(id=>id!==item.id);
 s.legacy.collection=s.legacy.collection.filter(id=>id!==item.id);
 s.p.confiscatedItems=[...new Set([...(s.p.confiscatedItems||[]),item.id])];
 s.p.collectionRevision=(s.p.collectionRevision||0)+1;
 s.p.cooldowns.wishingPool=s.p.months;
 g.phase='result';g.receipt={outcome:outcome.id,before,after:s.p.silver,award:outcome.silver};
 addLog(s,`Hồ Ước Nguyện · Dâng 100 bạc và ${item.name}. ${outcome.silver?`Nhận ${outcome.silver} bạc.`:'Không nhận được gì.'}`,'wishing');
 return {ok:true,...g.receipt};
}
export function leaveWishingPool(s){
 if(!s.wishingPool)return {error:'Nàng không ở Hồ Ước Nguyện.'};
 s.wishingPool=null;return {ok:true};
}
export function validateWishingPool(s){
 s.wishingPool??=null;
 const last=s.p.cooldowns.wishingPool,g=s.wishingPool;
 if(last!=null&&(!Number.isInteger(last)||last<0||last>s.p.months))throw Error('Thời hạn cầu may không hợp lệ.');
 if(!g)return;
 if(!s.p.alive||!['greeting','offering','confirm','result'].includes(g.phase)||g.month!==s.p.months)throw Error('Lượt cầu may không hợp lệ.');
 if(['confirm','result'].includes(g.phase)){
  const item=itemById(g.item);
  if(!item||!['robe','hair'].includes(item.type)||item.rarity<WISH_MIN_RARITY)throw Error('Lễ vật không hợp lệ.');
 }else if(g.item!==null)throw Error('Lễ vật chưa được chọn.');
 if(g.phase==='result'){
  const r=g.receipt,o=WISH_OUTCOMES.find(o=>o.id===r?.outcome);
  if(!o||last!==g.month||r.award!==o.silver||!Number.isInteger(r.before)||r.before<100||r.after!==r.before-100+o.silver||s.p.silver!==r.after||s.p.inventory.includes(g.item))throw Error('Kết quả cầu may không hợp lệ.');
 }else if(wishWaitMonths(s)||g.receipt||g.phase==='confirm'&&wishItemError(s,g.item))throw Error('Lượt cầu may chưa thanh toán không hợp lệ.');
}
