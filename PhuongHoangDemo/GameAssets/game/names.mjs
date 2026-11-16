// Curated Sino-Vietnamese names. Existing saves retain their recorded names.
const list=text=>text.split('|').map(s=>s.trim()).filter(Boolean);
export const SURNAMES=list('Tô|Lâm|Thẩm|Lục|Diệp|Liễu|Tạ|Vân|Bạch|Tống|Hứa|Đường|Lý|Lưu|Triệu|Chu|Tiêu|Cố|Phó|Hàn|Tần|Tề|Yến|Ninh|Ôn|Trình|Giang|Hạ|Mạnh|Vệ|Viên|Đỗ|Từ|Lương|Lạc|Bùi|Tôn|Lã|La|Dương|Vương|Trần|Tưởng|Khương|Thôi|Phùng|Tào|Đoàn|Chung|Kỷ|Mộ Dung|Thượng Quan|Âu Dương|Tư Mã|Nam Cung|Đông Phương|Hạ Hầu|Đoan Mộc|Công Tôn|Tư Đồ');
export const ROYAL_SURNAMES=list('Lý|Lưu|Triệu|Chu|Tiêu|Tần|Tề|Yến|Ninh|Vệ|Lương|Trần|Mộ Dung|Nam Cung|Hạ Hầu|Đoàn');
export const NAMES=list(`
Uyển Nhi|Ngọc Lan|Thanh Chi|Nhược Y|Tử Ninh|Mộng Dao|Tố Cầm|An Nhiên|Vân Khê|Tuyết Liên|Minh Nguyệt|Chiêu Hoa|Ánh Tuyết|Cẩm Tâm|Hạ Vi|Như Ý|
Uyển Thanh|Uyển Dung|Uyển Tâm|Uyển Nghi|Uyển Chi|Uyển Ngọc|Uyển Trúc|Uyển Khanh|Uyển Đình|Uyển Như|Uyển Hà|Uyển Tú|
Ngọc Dao|Ngọc Chi|Ngọc Châu|Ngọc Nghi|Ngọc Hân|Ngọc Bích|Ngọc Cầm|Ngọc Sương|Ngọc Yên|Ngọc Quỳnh|Ngọc Dung|Ngọc Oanh|
Thanh Uyển|Thanh Dao|Thanh Yên|Thanh Nghi|Thanh Trúc|Thanh Nhã|Thanh Lê|Thanh La|Thanh Sương|Thanh Hoan|Thanh Vi|Thanh Hà|
Nhược Lan|Nhược Hi|Nhược Dao|Nhược Cầm|Nhược Trúc|Nhược Ninh|Nhược Vân|Nhược Tuyết|Nhược Hoa|Nhược Thủy|Nhược Lê|Nhược Yên|
Tử Yên|Tử Dao|Tử Uyển|Tử Lam|Tử Cầm|Tử Huyên|Tử San|Tử Ngọc|Tử Tình|Tử Lăng|Tử Hà|Tử Oanh|
Mộng Điệp|Mộng Cầm|Mộng Yên|Mộng Trúc|Mộng Lan|Mộng Thi|Mộng Liên|Mộng Tuyền|Mộng Kỳ|Mộng Hoan|Mộng Vân|Mộng Hà|
Tố Uyển|Tố Nghi|Tố Nga|Tố Tâm|Tố Lan|Tố Nguyệt|Tố Như|Tố Yên|Tố Mai|Tố Liên|Tố Trinh|Tố Hương|
An Chi|An Hạ|An Nhã|An Dao|An Kỳ|An Nghi|An Lạc|An Ninh|An Tình|An Vy|An Lan|An Nguyệt|
Vân Yên|Vân Cẩm|Vân Chi|Vân Dao|Vân Tịch|Vân Thường|Vân La|Vân Nghi|Vân Hoan|Vân Sương|Vân Tú|Vân Linh|
Tuyết Mai|Tuyết Dao|Tuyết Nghi|Tuyết Trúc|Tuyết Cầm|Tuyết Như|Tuyết Yên|Tuyết Oanh|Tuyết Kỳ|Tuyết Tâm|Tuyết Châu|Tuyết San|
Minh Châu|Minh Ngọc|Minh Dao|Minh Nghi|Minh Tú|Minh Lan|Minh Yên|Minh Cầm|Minh Huyên|Minh Hà|Minh Sương|Minh Khuê|
Chiêu Ninh|Chiêu Ngọc|Chiêu Dung|Chiêu Dao|Chiêu Yên|Chiêu Vân|Chiêu Nhã|Chiêu Tâm|Chiêu Tuyết|Chiêu Nguyệt|Chiêu Uyển|Chiêu Linh|
Cẩm Tú|Cẩm Nghi|Cẩm Dao|Cẩm Vân|Cẩm Nguyệt|Cẩm Hoa|Cẩm Như|Cẩm Yên|Cẩm Lê|Cẩm Lan|Cẩm Trúc|Cẩm Huyên|
Hạ Lan|Hạ Nhiên|Hạ Yên|Hạ Nguyệt|Hạ Trúc|Hạ Dao|Hạ Tình|Hạ Nghi|Hạ Liên|Hạ Oanh|Hạ Uyển|Hạ Như|
Quỳnh Hoa|Quỳnh Dao|Quỳnh Chi|Quỳnh Ngọc|Quỳnh Anh|Quỳnh Nghi|Quỳnh Như|Quỳnh Hương|Quỳnh Liên|Quỳnh Lam|Quỳnh Yên|Quỳnh Mai|
Nhã Cầm|Nhã Uyển|Nhã Nghi|Nhã Tâm|Nhã Lan|Nhã Trúc|Nhã Khanh|Nhã Vân|Nhã Tịnh|Nhã Nguyệt|Nhã Chi|Nhã Dung|
Tịnh Yên|Tịnh Nghi|Tịnh Tâm|Tịnh Như|Tịnh Lan|Tịnh Uyển|Tịnh Dao|Tịnh Hà|Tịnh Tuyết|Tịnh Châu|Tịnh Sương|Tịnh Liên|
Thiều Hoa|Thiều Nguyệt|Thiều Yên|Thiều Ninh|Bích Dao|Bích Ngọc|Bích Vân|Bích Liên|Bích Trúc|Bích Hà|Bích La|Bích Tâm|
Sơ Nguyệt|Sơ Tuyết|Sơ Ninh|Sơ Hạ|Linh Chi|Linh Dao|Linh Đan|Linh San|Hải Đường|Hải Lan|Hải Nguyệt|Hải Yến|
Hoài Ninh|Hoài Ngọc|Hoài Sương|Hoài Lan|Gia Ninh|Gia Hân|Gia Tuệ|Gia Nghi|Diệu Anh|Diệu Cầm|Diệu Liên|Diệu Ngọc|
Khuynh Thành|Khuynh Vân|Yên Nhiên|Yên Chi|Yên La|Yên Vũ|Nguyệt Cầm|Nguyệt Quế|Nguyệt Anh|Nguyệt Dao|Nguyệt Lê|Nguyệt Sương|
Thư Nghi|Thư Nhàn|Thư Yểu|Thư Dao|Hàm Yên|Hàm Châu|Hàm Ngọc|Hàm Hương|Lan Chi|Lan Nhược|Mai Khanh|Mai Anh|Vĩnh Ninh|Uyển Nguyệt`);
export const MALE_NAMES=list(`
Văn Chính|Đình An|Quang Viễn|Tử Khiêm|Hoài Sơn|Thiên Hựu|
Thừa Cảnh|Hoài An|Hành Chi|Thanh Hòa|Cảnh Thần|Mặc Uyên|Tử Dạ|Vân Tranh|Tu Viễn|Thừa An|Vĩnh Khang|Cảnh Hành|Minh Triệt|Hoài Cẩn|Dực Thần|Cảnh Nghi|Ngọc Hành|
Cảnh Minh|Cảnh Dương|Cảnh Du|Cảnh Hạo|Cảnh Nhiên|Cảnh Huy|Cảnh Hiên|Cảnh Nguyên|Cảnh Vũ|Cảnh Lâm|Cảnh Tu|Cảnh Phong|
Thừa Minh|Thừa Dục|Thừa Phong|Thừa Quân|Thừa Hạo|Thừa Viễn|Thừa Đức|Thừa Hiên|Thừa Nguyên|Thừa Trạch|Thừa Vũ|Thừa Khiêm|
Hoài Chương|Hoài Nam|Hoài Dương|Hoài Viễn|Hoài Thanh|Hoài Phong|Hoài Trạch|Hoài Lâm|Hoài Dực|Hoài Du|Hoài Khanh|Hoài Tín|
Tử Hiên|Tử Hạo|Tử Du|Tử Mặc|Tử Thần|Tử Phong|Tử Lâm|Tử Ngôn|Tử Hành|Tử Nghiêu|Tử Khanh|Tử Sâm|
Minh Hiên|Minh Hạo|Minh Đức|Minh Viễn|Minh Tu|Minh Phong|Minh Thần|Minh Dục|Minh Quân|Minh Trạch|Minh Chính|Minh Khang|
Vân Thâm|Vân Cảnh|Vân Chu|Vân Hạc|Vân Tiêu|Vân Dực|Vân Hoài|Vân Hành|Vân Chương|Vân Kỳ|Vân Tu|Vân Giang|
Mặc Hàn|Mặc Trần|Mặc Ngôn|Mặc Khanh|Mặc Thần|Mặc Nghiêu|Mặc Phong|Mặc Lâm|Mặc Sâm|Mặc Hiên|Mặc Du|Mặc Châu|
Thanh Huyền|Thanh Hoài|Thanh Viễn|Thanh Phong|Thanh Ngôn|Thanh Hành|Thanh Dực|Thanh Du|Thanh Trạch|Thanh Nguyên|Thanh Tùng|Thanh Bách|
Quân Hạo|Quân Dật|Quân Hiên|Quân Nghiêu|Quân Lâm|Quân Hành|Quân Mặc|Quân Viễn|Quân Trạch|Quân Vũ|Quân Thần|Quân Huy|
Dật Phong|Dật Thần|Dật Hiên|Dật Minh|Dật Chi|Dật Quân|Dật Trần|Dật Hành|Dật Lâm|Dật Nhiên|Dật Khanh|Dật Dương|
Hạo Nhiên|Hạo Hiên|Hạo Vũ|Hạo Minh|Hạo Thần|Hạo Thiên|Hạo Trạch|Hạo Dương|Hạo Quân|Hạo Lâm|Hạo Nguyên|Hạo Viễn|
Trường An|Trường Phong|Trường Khanh|Trường Minh|Trường Uyên|Trường Lâm|Trường Dực|Trường Hành|Trường Ninh|Trường Hạo|Trường Viễn|Trường Quân|
Thiên Dực|Thiên Vũ|Thiên Trạch|Thiên Hành|Thiên Du|Thiên Lãng|Thiên Cảnh|Thiên Lâm|Thiên Quân|Thiên Hạo|Thiên Minh|Thiên Dương|
Vĩnh An|Vĩnh Nghiêu|Vĩnh Minh|Vĩnh Hạo|Vĩnh Trạch|Vĩnh Dương|Vĩnh Du|Vĩnh Chi|Vĩnh Tín|Vĩnh Đức|Vĩnh Chương|Vĩnh Thần|
Đình Viễn|Đình Phong|Đình Quân|Đình Hạo|Đình Nguyên|Đình Hiên|Đình Chi|Đình Chương|Đình Dực|Đình Trạch|Đình Khang|Đình Du|
Văn Uyên|Văn Hạo|Văn Hiên|Văn Cảnh|Văn Chương|Văn Trạch|Văn Khiêm|Văn Hành|Văn Kỳ|Văn Du|Văn Nghiêu|Văn Tín|
Tu Trúc|Tu Hành|Tu Minh|Tu Nghiêu|Tu Ngôn|Tu Văn|Tu Cảnh|Tu Dương|Tu Hiên|Tu Hạo|Tu Đức|Tu Khanh|
Ngọc Thần|Ngọc Hiên|Ngọc Phong|Ngọc Khanh|Ngọc Trạch|Ngọc Du|Ngọc Lâm|Ngọc Chương|Ngọc Huyền|Ngọc Quân|Ngọc Dực|Ngọc Thư|
Duy An|Duy Khanh|Duy Nghiêu|Duy Hạo|Duy Phong|Duy Trạch|Duy Minh|Duy Hành|Duy Nguyên|Duy Chương|Duy Lâm|Duy Hiên|
Bá Khiêm|Bá Hiên|Bá Dực|Bá Nguyên|Kính An|Kính Chi|Kính Hành|Kính Du|Tĩnh Uyên|Tĩnh Chi|Tĩnh Viễn|Tĩnh Sâm|
Huyền Lăng|Huyền Kỳ|Huyền Cảnh|Huyền Dực|Sở Hàn|Sở Hiên|Sở Khanh|Sở Dương|Chiêu Minh|Chiêu Dực|Chiêu Hành|Chiêu Viễn|
Gia Hựu|Gia Lâm|Gia Hạo|Gia Khiêm|Lăng Tiêu|Lăng Phong|Lăng Hàn|Lăng Vân|Dục Thần|Dục Hành|Dục Minh|Dục Chi`);
const key=name=>String(name||'').normalize('NFC').trim().toLocaleLowerCase('vi');
const nameEntries={female:NAMES.map(name=>({name,key:key(name)})),male:MALE_NAMES.map(name=>({name,key:key(name)}))};
export const givenName=name=>String(name||'').trim().split(/\s+/).slice(-2).join(' ');
export function familyName(name){return [...SURNAMES].sort((a,b)=>b.length-a.length).find(s=>String(name).startsWith(s+' '))||String(name).split(' ')[0];}
// Finite candidate filtering avoids retry loops even with a repeating RNG.
// Full names never collide; repeated given names and recent-life names are avoided when possible.
export function chooseName(pick,{gender='female',surname=null,used=new Set(),avoid=[],givenOnly=false}={}){
 const names=gender==='male'?MALE_NAMES:NAMES,families=givenOnly?['']:surname?[surname]:SURNAMES;
 const usedFull=new Set([...used].map(key)),usedGiven=new Set([...used].map(n=>key(givenName(n))));
 const avoided=new Set([...avoid].map(n=>key(givenName(n))));
 const full=(family,name)=>family?family+' '+name:name;
 const distinct=nameEntries[gender==='male'?'male':'female'].filter(n=>!usedGiven.has(n.key)),fresh=distinct.filter(n=>!avoided.has(n.key));
 let result;
 if(distinct.length){
  const {name}=pick(fresh.length?fresh:distinct),family=families.length===1?families[0]:pick(families);result=full(family,name);
 }else{
  const candidates=names.map(name=>({name,families:families.filter(f=>!usedFull.has(key(full(f,name))))})).filter(c=>c.families.length);
  if(!candidates.length)throw Error('Đã dùng hết tên trong danh sách.');
  const selected=pick(candidates),family=selected.families.length===1?selected.families[0]:pick(selected.families);result=full(family,selected.name);
 }
 used.add(result);return result;
}
export function worldNames(s){return [s.p?.name,s.p?.family?.father,s.p?.family?.mother,...(s.p?.children||[]).map(c=>c.name),...(s.npcs||[]).map(n=>n.name),...(s.dynasty?.predecessors||[]).map(n=>n.name),s.dynasty?.successor?.name,s.story?.otherPrince?.name].filter(Boolean);}
