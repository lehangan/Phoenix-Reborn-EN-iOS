import {MIAO_ITEMS} from './miao-wardrobe111.mjs';
import {WEARABLE_COLORS} from './wearable-colors.mjs';
import {MAID_ROBES} from './maid-wardrobe.mjs';
import {REGALIA} from './regalia.mjs';
import {PETS} from './pets.mjs';
import {NEW_ROBES,NEW_ORNAMENTS} from './wardrobe-v30.mjs';
import {DUNHUANG_ROBES,DUNHUANG_ORNAMENTS} from './wardrobe-v55.mjs';
import {ORNAMENT_ART} from './appearance-catalog.mjs';
export const CLOTH_NAMES=[
 'Thanh Bố','Lam Trưởng','Thanh Quan','Tử Đàn Chưởng Sự','Hạnh Vũ','Liễu Yên','Ngọc Lan Bảo Lâm','Lan Đình Tài Nhân','Điệp Hoa Mỹ Nhân','Hồng Cẩm Tiệp Dư',
 'Vân Hạc Cửu Tần','Phượng Nghi Tứ Phi','Cửu Phượng Trung Cung','Nguyệt Liên','Tuyết Mai','Thu Phong','Trúc Khê','Anh Đào Mộng','Huyền Vân','Bích Thủy',
 'Sơn Trà','Tử Diên','Hạnh Chi','Mạt Lỵ','Bích Mẫu Đơn','Kim Cúc','Tử Đằng','Thanh Liên','Mộc Lan','Phù Dung',
 'Đăng Hội','Xuân Yến','Hạ Trúc','Thu Lô','Đông Tùng','Vãn Hà','Tinh Dạ','Vũ Liễu','Giang Sương','Phong Niên',
 'Bạch Phượng','Thanh Sơn','Ngân Nguyệt','Dạ Mai','Kim Điệp','Thanh Từ','Đồng Sắc Mẫu Đơn','Liên Đăng','Huyền Trúc','Kim Trì'
];
export const HAIR_NAMES=[
 'Trâm Bạch Ngọc','Đào Hoa Điểm Tuyết','Ngân Nguyệt Lược','Trâm Trúc Thanh','Ngọc Lan Châu','Liễu Diệp Ngân','Hồng Mai Trâm','Lam Điệp','Thủy Liên Châu','Kim Cúc',
 'Phượng Vĩ Kim','Hạc Vân Bạch','Tử Đằng Châu','Bích Ngọc Thoa','Hạnh Hoa Ngọc','Lưu Ly Tinh','Hải Đường Kim','Tuyết Chi','Mạt Lỵ Lược','Hồng Liên',
 'Song Điệp','Thanh Tước','Ngân Hồ Điệp','Vân Văn Kim','Hồng Ngọc Kết','Mộc Lan Tâm','Đông Tùng Ngọc','Xuân Yến Thoa','Thu Diệp','Nguyệt Quế',
 'Kim Sa Châu','Bích Thủy Lược','Dạ Tinh Trâm','Liên Hoa Hồng','Ngọc Cầm','Tử Yên Thoa','Mai Ảnh','Thanh Từ Lược','Phù Dung Châu','Vũ Lộ Ngân',
 'Cửu Phượng Miện','Ngọc Thố Nguyệt','Long Phụng Kim','Bách Hoa Quan','Lưu Vân Châu','Huyền Ngọc Trâm','Bích Đào Lược','Kim Liên Miện','Tuyết Phượng','Nhất Thế Cẩm Tú'
].map(name=>'Song '+name.replace(/^Song /,'').replace(/\b(Trâm|Thoa|Miện|Quan)\b/g,'').replaceAll('Lược','').replace(/\s+/g,' ').trim());
export const ATLAS_GROUPS=['cung-vu','sac-phong','hoa-tin','bon-mua','truyen-ky'];
export const ITEMS=[
 ...CLOTH_NAMES.map((name,i)=>({id:'robe-'+i,type:'robe',index:i,name,rarity:i<4?0:i<10?1:i<13?3:i>=40?3:i>=30?2:1,source:i<4?'Cấp bậc cung nữ':i<13?'Sắc phong phi tần':i<20?'Thành tựu':'Ban thưởng / rương báu',unlock:i<4?'service':i<13?'rank':i<20?'achievement':'chest',beauty:i<4?i:i<13?i-3:i>=40?8:5,art:i<4?i:i>=30?5:3})),
 ...HAIR_NAMES.map((oldName,i)=>({id:'hair-'+i,type:'hair',index:i,name:ORNAMENT_ART['hair-'+i]?.name||oldName,rarity:i<10?0:i<30?1:i<40?2:3,source:i<8?'Thành tựu':i<17?'Sắc phong / thăng chức':'Ban thưởng / rương báu',unlock:i<8?'achievement':i<17?'rank':'chest',beauty:1+Math.floor(i/12),art:Math.floor(i/15)}))
];
// Art-directed luxury: plain cloth < embroidered silk < layered silk / tassels < ornate ceremonial work.
const robeLuxury=[4,18,36,56,28,32,44,64,48,69,78,91,100,67,42,38,35,46,52,49,44,39,43,46,59,54,48,65,47,63,57,62,51,53,56,72,68,61,66,58,96,82,86,79,85,77,89,94,80,92];
const ornamentBase={'small-pair':16,'forehead-chain':38,'large-pair':49,'tassel-pair':62,'flower-crown':76,'tassel-tiara':83,'crown':93};
for(const item of ITEMS){
 const kind=ORNAMENT_ART[item.id]?.kind||'small-pair';
 if(item.type==='hair'&&item.index<5){item.unlock='chest';item.source='Gia đình / ban thưởng / rương báu';}
 if(item.id==='robe-13'){item.unlock='chest';item.source='Ban thưởng / rương báu';}
 item.luxury=item.type==='robe'?robeLuxury[item.index]:Math.min(100,ornamentBase[kind]+(item.index%4)*2+(item.index>=40?4:0));
 item.rarity=item.luxury<25?0:item.luxury<50?1:item.luxury<75?2:3;
 item.beauty=(item.type==='robe'?[1,4,8,13]:[1,3,6,10])[item.rarity];
 item.art=(item.type==='robe'?[0,2,5,9]:[0,1,3,6])[item.rarity];
 if(item.id==='robe-0')item.beauty=0;
}
ITEMS.push(...MIAO_ITEMS,...NEW_ROBES,...NEW_ORNAMENTS,...REGALIA,...DUNHUANG_ROBES,...DUNHUANG_ORNAMENTS,...MAID_ROBES,...PETS);
for(const item of ITEMS)if(WEARABLE_COLORS[item.id])item.colors=WEARABLE_COLORS[item.id];
// Court rewards draw from the full collection at the rank's quality tier.
export const rankRewardRarity=rank=>[0,1,1,1,2,2,3,3,3,3][Math.max(0,Math.min(9,rank))];
export const wearableRewardPool=(type,rarity)=>ITEMS.filter(i=>i.type===type&&i.rarity===rarity&&!['service','achievement','coronation'].includes(i.unlock)&&!(i.type==='robe'&&i.index===12));
export const rankRobePool=rank=>wearableRewardPool('robe',rankRewardRarity(rank));
export const rankJewelryPool=p=>wearableRewardPool('hair',p.role==='maid'?[0,0,1,1][p.serviceRank]:rankRewardRarity(p.rank)).filter(i=>p.role!=='maid'||i.luxury<=40);
export const dowryRarity=grade=>({'Cửu phẩm':0,'Thất phẩm':0,'Lục phẩm':1,'Ngũ phẩm':1,'Tứ phẩm':2,'Tam phẩm':3,'Nhị phẩm':3,'Nhất phẩm':3}[grade]??0);
export const dowryJewelryPool=grade=>wearableRewardPool('hair',dowryRarity(grade));
export const familyWardrobePool=(type,grade)=>wearableRewardPool(type,dowryRarity(grade));
export const dowryChestTier=grade=>['wood','silk','silk','jade'][dowryRarity(grade)];
export const serviceRobeRank=item=>item?.type==='robe'?(item.serviceGrant??(item.index<4?item.index:-1)):-1;
export const serviceRobePool=rank=>ITEMS.filter(i=>serviceRobeRank(i)===rank);
export const itemById=id=>ITEMS.find(x=>x.id===id);
export const RARITIES=['Thường','Tinh xảo','Quý giá','Trân bảo'];
export const ACHIEVEMENT_GIFTS={first:null,kitchen:null,laundry:null,sweeping:null,embroidery:null,candidate:null,painter:null,baolin:'hair-5',promotion:'robe-14',maidToConsort:'robe-15',chief:'hair-6',empress:'hair-7',decade:'robe-16',longLife:'robe-17',kind:'robe-18',schemer:'robe-19'};
