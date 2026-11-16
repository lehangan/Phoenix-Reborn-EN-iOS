export const DICH_DUNG_DAN={id:'dich-dung-dan',name:'Dịch Dung đan',price:500,asset:'assets/v71/dich-dung-dan.webp',description:'Thay đổi gương mặt ngẫu nhiên, chữa hủy dung.',useLabel:'Uống Dịch Dung đan'};
export const ELIXIR_DROP_RATES={wood:.025,silk:.05,jade:.075};
export const AN_THAI_HOAN={id:'an-thai-hoan',name:'An Thai Hoàn',price:1000,asset:'assets/v135/an-thai-hoan.webp',description:'Dùng khi mang thai, bảo đảm thai kỳ và lần sinh này mẹ tròn con vuông. Chỉ được mua 1 viên mỗi 5 năm (60 tháng).',useLabel:'Uống An Thai Hoàn'};
export const AN_THAI_PURCHASE_MONTHS=60;
export function supplyWaitMonths(s,id){const last=s.p.cooldowns?.anThaiPurchase;return id===AN_THAI_HOAN.id&&last!==undefined?Math.max(0,last+AN_THAI_PURCHASE_MONTHS-s.p.months):0;}
export const SHOP_ITEMS=[
 {id:'pastries',name:'Hộp quà bánh',price:30,asset:'assets/v35/shop-pastries.webp',description:'Bánh ngon gói lụa, dùng đem đi biếu tặng người trong cung. Mỗi hộp giảm 10 Đố kỵ.',useLabel:'Biếu tặng · Giảm Đố kỵ'},
 {id:'cage',name:'Lồng thú kỳ duyên',price:100,asset:'assets/v35/shop-cage.webp',description:'Mở một lần để tìm thú đồng hành. Bắt trượt thì lồng trống; thú trùng đổi thành bạc theo độ hiếm.',useLabel:'Mở lồng thú'},
 DICH_DUNG_DAN,
 AN_THAI_HOAN
];
export const supplyById=id=>SHOP_ITEMS.find(i=>i.id===id);
export function migrateSupplies(s){
 s.p.supplies??={};
 if(typeof s.p.supplies!=='object'||Array.isArray(s.p.supplies))throw Error('Đồ vật khác không hợp lệ.');
 for(const item of SHOP_ITEMS)if(s.p.supplies[item.id]===undefined)s.p.supplies[item.id]=0;
}
export function validateSupplies(s){migrateSupplies(s);if(Object.keys(s.p.supplies).some(k=>!supplyById(k))||SHOP_ITEMS.some(i=>!Number.isInteger(s.p.supplies[i.id])||s.p.supplies[i.id]<0||s.p.supplies[i.id]>9999))throw Error('Đồ vật khác không hợp lệ.');const last=s.p.cooldowns?.anThaiPurchase;if(last!==undefined&&(!Number.isSafeInteger(last)||last<0||last>s.p.months))throw Error('Mốc mua An Thai Hoàn không hợp lệ.');}
