const entries=[
 ['Sa Khâu Miêu',1,{luck:2,speech:1},{}],
 ['Bích Linh Thố',1,{beauty:2,luck:1},{fertility:.05}],
 ['Kim Sa Tước',1,{art:2,intelligence:1},{offspringQuality:10}],
 ['Đào Vân Hồ',1,{speech:2,beauty:1},{fertility:.07}],
 ['Nguyệt Tuyền Ly',2,{luck:3,intelligence:2},{fertility:.08}],
 ['Lưu Ly Khổng Tước',2,{beauty:3,art:2},{offspringQuality:10}],
 ['Xích Ngọc Linh Miêu',2,{intelligence:3,speech:2},{lifeGuard:true}],
 ['Bạch Vân Linh Dương',2,{luck:3,beauty:2},{coldImmunity:true}],
 ['Tử Liên Điệp',2,{art:3,luck:2},{offspringQuality:20}],
 ['Kim Diệu Lộc',2,{beauty:3,intelligence:2},{lifeGuard:true,fertility:.05}],
 ['Cửu Sắc Thần Lộc',3,{luck:4,art:3},{offspringQuality:30,fertility:.10}],
 ['Nguyệt Hoa Cửu Vĩ',3,{beauty:4,speech:3},{fertility:.15,offspringQuality:10}],
 ['Thanh Loan Bảo Vũ',3,{art:4,intelligence:3},{coldImmunity:true,offspringQuality:20}],
 ['Huyền Vũ Ngọc Giáp',3,{intelligence:4,luck:3},{lifeGuard:true,coldImmunity:true}],
 ['Kim Nghê Hộ Chủ',2,{speech:3,art:2},{lifeGuard:true}],
 ['Bạch Trạch Linh Thú',3,{intelligence:4,beauty:3},{lifeGuard:true,offspringQuality:20}],
 ['Thiên Hương Bạch Tượng',2,{luck:3,speech:2},{coldImmunity:true,fertility:.08}],
 ['Liên Hoa Kỳ Lân',3,{art:4,beauty:3},{offspringQuality:30,fertility:.12}],
 ['Nhật Luân Kim Ô',3,{intelligence:4,speech:3},{lifeGuard:true}],
 ['Ngọc Long Thiên Vũ',3,{luck:4,intelligence:3},{lifeGuard:true,coldImmunity:true,fertility:.10}]
];
export const DUNHUANG_PETS=entries.map(([name,rarity,bonuses,perks],i)=>({
 id:`pet-${30+i}`,type:'pet',index:30+i,name,rarity,luxury:[12,42,68,96][rarity],collection:'dunhuang',source:'Lồng thú Kỳ trân các / rương báu',unlock:'chest',asset:`assets/v55/pets/pet-${30+i}.webp`,bonuses,perks
}));
