// Alternate silhouettes preserve all existing item IDs and unlock conditions.
export const ROBE_ART={
 'robe-7':{file:'pibo-robes-0-v4',index:0},
 'robe-12':{file:'pibo-robes-0-v4',index:1},
 'robe-13':{file:'pibo-robes-0-v4',index:2},
 'robe-27':{file:'pibo-robes-0-v4',index:3},
 'robe-29':{file:'pibo-robes-1-v4',index:0},
 'robe-35':{file:'pibo-robes-1-v4',index:1},
 'robe-40':{file:'pibo-robes-1-v4',index:2},
 'robe-47':{file:'pibo-robes-1-v4',index:3}
};
export const ORNAMENT_ART={};
function family(file,kind,ids,names){ids.forEach((id,index)=>ORNAMENT_ART['hair-'+id]={file,index,kind,name:names[index]});}
family('crowns-v4','crown',[10,40,42,48],['Phượng Vĩ Kim Miện','Cửu Phượng Miện','Long Phụng Kim Quan','Tuyết Phượng Ngân Miện']);
family('flowers-v4','flower-crown',[4,9,43,47],['Ngọc Lan Hoa Quan','Kim Cúc Hoa Quan','Bách Hoa Quan','Kim Liên Miện']);
family('chains-v4','forehead-chain',[2,13,29,44],['Ngân Nguyệt Châu Liên','Bích Ngọc Mi Tâm','Nguyệt Quế Châu Liên','Lưu Vân Châu']);
family('tassel-tiaras-v4','tassel-tiara',[15,23,32,49],['Lưu Ly Tinh Quan','Vân Văn Kim Quan','Dạ Tinh Lưu Tô','Nhất Thế Cẩm Tú']);
family('large-blooms-v4','large-pair',[1,6,16,38],['Đào Hoa Điểm Tuyết','Hồng Mai Song Hoa','Hải Đường Song Hoa','Phù Dung Châu']);
family('side-tassels-v4','tassel-pair',[12,18,30,39],['Tử Đằng Lưu Tô','Mạt Lỵ Châu Rủ','Kim Sa Lưu Tô','Vũ Lộ Ngân']);
