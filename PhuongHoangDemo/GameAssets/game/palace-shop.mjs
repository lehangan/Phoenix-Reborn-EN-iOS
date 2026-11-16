import {salePrice} from './shop-prices.mjs';
import {cureDisfigurement} from './disfigurement.mjs';
import * as B from './life-engine.mjs';
import {PETS,PET_RARITY_WEIGHTS} from './pets.mjs';
import {SHOP_ITEMS,DICH_DUNG_DAN,AN_THAI_HOAN,supplyWaitMonths,migrateSupplies} from './supplies.mjs';
import {randomizeFace} from './face-elixir.mjs';
export {SHOP_ITEMS,migrateSupplies,validateSupplies} from './supplies.mjs';
export const CAGE_CATCH_CHANCE=.60;
// Conditional on a successful catch. Rare quality is drawn first, then species.
export const CAGE_RARITY_WEIGHTS=PET_RARITY_WEIGHTS;
function available(s){return !s.p.alive?'Kiếp này đã khép lại.':s.intro?'Hãy nhập cung trước.':s.p.prison||s.p.coldPalaceUntil!=null?'Trong lãnh cung không thể đến Kỳ trân các hay biếu tặng.':s.wishingPool||s.fashion||s.lake||s.imperialNight||s.sideEvents?.length||s.coronation||s.festival||s.guqin||s.caro||s.story||s.event||s.exam||s.mini||s.decree||s.result?'Hãy hoàn thành việc đang chờ trước.':null;}
export function buySupply(s,id){const item=SHOP_ITEMS.find(i=>i.id===id),error=available(s);if(error)return {error};if(!item)return {error:'Vật phẩm không có trong cửa hàng.'};migrateSupplies(s);const wait=supplyWaitMonths(s,id);if(wait)return {error:`An Thai Hoàn chỉ được mua 1 viên mỗi 5 năm. Còn ${wait} tháng mới được mua tiếp.`};if(s.p.supplies[id]>=9999)return {error:'Túi đã đầy vật phẩm này.'};if(s.p.silver<item.price)return {error:`Cần ${item.price} bạc.`};s.p.silver-=item.price;s.p.supplies[id]++;if(id===AN_THAI_HOAN.id)s.p.cooldowns.anThaiPurchase=s.p.months;B.addLog(s,`Kỳ trân các: mua ${item.name}, −${item.price} bạc.`,'shop');return {ok:true,text:`Đã mua ${item.name} · Cất tại Đồ vật khác.`};}
export function useSupply(s,id){const error=available(s);if(error)return {error};migrateSupplies(s);if(!SHOP_ITEMS.some(i=>i.id===id)||!s.p.supplies[id])return {error:'Không có vật phẩm này.'};if(id===AN_THAI_HOAN.id){if(!s.p.pregnancy)return {error:'Chỉ dùng An Thai Hoàn khi đang mang thai.'};if(s.p.pregnancy.anThaiProtected)return {error:'Thai kỳ này đã được An Thai Hoàn bảo vệ.'};}if(id==='pastries'&&s.p.envy===0)return {error:'Đố kỵ đã bằng 0; hãy giữ hộp quà dùng sau.'};s.p.supplies[id]--;
 let title,text,item=null,duplicate=false,success=true;
 if(id===AN_THAI_HOAN.id){s.p.pregnancy.anThaiProtected=true;title='An Thai Hoàn · Thai kỳ bình an';text='Nàng dùng một viên An Thai Hoàn. Thai kỳ này được bảo vệ, không sảy thai và không gặp tai biến khi sinh; mẹ tròn con vuông 100%.';}
 else if(id===DICH_DUNG_DAN.id){const cured=cureDisfigurement(s);s.p.appearance=randomizeFace(s.p.appearance,()=>B.rand(s));title='Dịch Dung đan · Diện mạo mới';text='Nàng uống một viên Dịch Dung đan. Gương mặt trong gương đã đổi sang một dung mạo ngẫu nhiên mới.'+(cured?' Những vết cào đã biến mất. Dung mạo được khôi phục và có thể tăng trở lại.':'');}
 else if(id==='pastries'){const reduction=Math.min(10,s.p.envy);s.p.envy-=reduction;title='Tâm ý gửi trong hộp bánh';text=`Nàng biếu quà bánh cho người trong cung, làm dịu lời dị nghị. Đố kỵ −${reduction}, còn ${s.p.envy}.`;}
 else if(B.rand(s)>=CAGE_CATCH_CHANCE){title='Lồng trống · Bắt thú trượt';text='Thú nhỏ đã chạy mất trước khi cửa lồng khép lại. Lần này không nhận được thú hay bạc.';success=false;}
 else{let roll=B.rand(s)*100,rarity=3;for(let i=0;i<4;i++){roll-=CAGE_RARITY_WEIGHTS[i];if(roll<0){rarity=i;break;}}const pet=B.pick(s,PETS.filter(p=>p.rarity===rarity));item=pet.id;duplicate=s.p.inventory.includes(item);if(duplicate){const price=salePrice(pet.id);s.p.silver=B.clamp(s.p.silver+price,0,999999);title='Gặp lại thú đã có';text=`${pet.name} đã có trong viện. Tự bán lại, nhận ${price} bạc.`;}else{B.grant(s,item,'Lồng thú Kỳ trân các',false);title='Một người bạn mới';text=`Nàng nhận được ${pet.name}. Thú đã vào tab Thú cưng; có thể chọn cho đi cùng.`;}}
 s.result={title,text,success,effects:{},shop:{id,item,duplicate}};B.addLog(s,text,'shop');return {ok:true,item,duplicate,success};
}
