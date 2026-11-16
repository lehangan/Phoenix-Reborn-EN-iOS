import {itemById} from './inventory.mjs';

export const PET_SALE_PRICES=Object.freeze([20,50,100,200]);
export function salePrice(id){
 const item=itemById(id);
 if(item?.type==='pet')return PET_SALE_PRICES[item.rarity];
 if(item?.type==='robe'||item?.type==='hair')return item.luxury;
 return 0;
}
