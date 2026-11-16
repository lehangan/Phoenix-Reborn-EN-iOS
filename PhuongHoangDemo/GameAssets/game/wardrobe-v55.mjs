// Dunhuang collection: each entry has its own generated wearable sprite.
const robes=[
 ['Bích Sa Phi Thiên',42],['Xích Liên Vũ Y',54],['Lưu Ly Nguyệt Ảnh',65],['Mật Sa Lưu Kim',47],
 ['Thanh Liên Vân Vũ',58],['Tử Hà Thiên Y',64],['Bạch Ngọc Phi Sa',68],['Chu Tước Kim Vũ',82],
 ['Bích Hải San Hô',74],['Hoàng Kim Liên Hoa',85],['Ngân Hà Bảo Tướng',87],['Phi Thiên Hồng Vũ',79],
 ['Ngọc Bích Thiên Hoa',88],['Dạ Lam Kim Sa',91],['Thiên Trúc Liên Y',72],['Huyền Kim Nhật Luân',93],
 ['Cửu Sắc Lộc Vân',95],['Nguyệt Tuyền Thủy Y',89],['Hỏa Liên Thiên Vũ',97],['Cửu Thiên Đôn Hoàng',100]
];
const ornaments=[
 ['Nguyệt Sa Liên Mạo',72],['Bích Ngọc Sa Quan',81],['Xích Liên Hồng Sa',86],['Lưu Ly Lam Sa',88],
 ['Tử Vân Màn Châu',90],['Nhật Luân Kim Sa',96],['Phi Thiên Liên Quan',75],['Lam Ngọc Hoa Trâm',70],
 ['Kim Diệp Chuỗi Châu',64],['Bích Hải Lưu Tô',78],['Xích Kim Hỏa Liên',85],['Ngân Nguyệt Anh Lạc',71],
 ['Khổng Tước Bích Quan',91],['Nhật Diệu Bảo Luân',79],['Cửu Sắc Lộc Giác',83],['Mạn Đà La Kim Quan',93],
 ['Thanh Liên Bảo Điền',67],['Huyền Kim Tinh Miện',89],['Phi Thiên Lưu Châu',95],['Đôn Hoàng Thiên Bảo',100]
];
function catalog(rows,type){return rows.map(([name,luxury],i)=>{
 const index=71+i,rarity=luxury<25?0:luxury<50?1:luxury<75?2:3;
 return {id:`${type}-${index}`,type,index,name,rarity,luxury,unlock:'chest',collection:'dunhuang',source:'Bộ sưu tập Đôn Hoàng · Rương báu',beauty:(type==='robe'?[1,4,8,13]:[1,3,6,10])[rarity],art:(type==='robe'?[0,2,5,9]:[0,1,3,6])[rarity],...(type==='hair'&&i<6?{veil:true}:{})};
 });}
export const DUNHUANG_ROBES=catalog(robes,'robe');
export const DUNHUANG_ORNAMENTS=catalog(ornaments,'hair');
