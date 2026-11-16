export const EXPANSION=6;
export const MEN=[
 {id:'emperor',name:'Lý Thừa Cảnh',role:'Hoàng đế',age:32,kindness:32,temper:'Uy nghiêm',home:'emperor',quote:'Trong cung này, lời nói luôn có sức nặng.'},
 {id:'prince',name:'Lý Hoài An',role:'Thân vương',age:27,kindness:78,temper:'Ôn hòa',home:'pavilion',quote:'Nếu có dịp, ta muốn nghe chuyện quê hương nàng.'},
 {id:'general',name:'Tiêu Dực',role:'Tướng quân',age:30,kindness:44,temper:'Thẳng thắn',home:'gate',quote:'Một lời đã hứa, ta nhất định giữ.'},
 {id:'chancellor',name:'Tạ Hành Chi',role:'Tể tướng',age:35,kindness:20,temper:'Khó tính',home:'library',quote:'Điều đáng quý nằm ở tâm ý lẫn công phu.'},
 {id:'physician',name:'Thẩm Thanh Hòa',role:'Thần y',age:29,kindness:92,temper:'Nhân hậu',home:'medicine',quote:'Trước hết, hãy chăm sóc bản thân cho tốt.'},
];
export const LOCATIONS=[
 {id:'emperor',name:'Điện Thừa Thiên',short:'Thừa Thiên',x:50,y:15,gate:'emperor',desc:'Nơi hoàng đế nghỉ ngơi và triệu kiến. Tần trở lên mới được tự do thăm viếng.'},
 {id:'lotus',name:'Cung Liên Hoa',short:'Liên Hoa',x:23,y:29,gate:'inner',residence:true,desc:'Sen trắng nở quanh sân ngọc. Cung nữ từ Nữ quan trở lên hoặc người có phẩm vị được vào.'},
 {id:'moon',name:'Cung Vọng Nguyệt',short:'Vọng Nguyệt',x:77,y:29,gate:'inner',residence:true,desc:'Một cung điện thanh tĩnh dưới trăng.'},
 {id:'jade',name:'Cung Ngọc Lan',short:'Ngọc Lan',x:23,y:44,gate:'inner',residence:true,desc:'Hương ngọc lan thoảng qua những hành lang sơn son.'},
 {id:'phoenix',name:'Cung Phượng Nghi',short:'Phượng Nghi',x:77,y:44,gate:'inner',residence:true,desc:'Mái ngói lưu ly và rèm gấm của nội cung.'},
 {id:'garden',name:'Ngự hoa viên',short:'Ngự hoa viên',x:50,y:38,gate:'public',desc:'Nơi thưởng hoa, nghỉ chân và gặp gỡ người trong cung.'},
 {id:'pavilion',name:'Thủy Tạ',short:'Thủy Tạ',x:50,y:58,gate:'public',desc:'Đình ven hồ thường có tiếng đàn và những cuộc gặp tình cờ.'},
 {id:'library',name:'Tàng Thư các',short:'Tàng Thư',x:22,y:62,gate:'public',desc:'Sảnh sách ngoài mở cho cung nhân đến học lễ và đọc sách.'},
 {id:'medicine',name:'Thái Y viện',short:'Thái Y viện',x:78,y:62,gate:'public',desc:'Y quan lui tới, hương thảo dược vương trên bậc cửa.'},
 {id:'workshop',name:'Thượng Phục cục',short:'Thượng Phục',x:22,y:78,gate:'public',desc:'Xưởng thêu và nơi nhận việc của cung nhân.'},
 {id:'gate',name:'Cửa Chu Tước',short:'Chu Tước',x:50,y:88,gate:'public',desc:'Cổng ngoài, nơi thị vệ và quan lại qua lại.'},
 {id:'kitchen',name:'Ngự Thiện phòng',short:'Ngự Thiện',x:78,y:78,gate:'public',desc:'Khói bếp và tiếng chuyện trò lan dưới mái hiên.'},
];
export const QUALITIES=['Tệ','Thường','Ưu Tú','Tuyệt Tác'];
export const REQUIREMENTS=[['beauty','Dung mạo'],['intelligence','Trí tuệ'],['art','Tài nghệ'],['speech','Hoạt ngôn'],['merit','Công trạng'],['reputation','Uy danh'],['favor','Ân điển']];
export {HONORIFICS} from './honorific-data.mjs';
export const MEMORY_SYMBOLS=['❀','☾','♜','♧','✦','♬','♢','☀','♠','♥'];
export const EXTRA_ENDINGS=[['crownExecution','Tranh ngôi thất bại · Ban chết','Tranh đoạt phụng vị thất bại, nàng bị hoàng đế ban chết.'],['crownRevenge','Ám sát vì thù cũ','Phe cánh bị phế truất trả thù, khép lại cuộc đời nàng.'],['assassination','Bóng dao đoạt mệnh','Một vụ ám sát bất ngờ khép lại kiếp này.'],['empressDowager','Mẫu nghi tân triều','Tân đế đăng cơ, nàng được tôn làm Hoàng Thái Hậu.'],['imperialJourney','Cùng người du ngoạn thiên hạ','Hoàng đế nhường ngôi cho Thái tử, cùng nàng rời cung du ngoạn.'],['imperialTemple','Tiếng chuông cuối đời','Tiên đế băng hà, nàng vào chùa hoàng gia.'],['funeralSacrifice','Khép cùng tiên đế','Số phận khép lại bởi lệnh tuẫn táng.'],['palaceRetirement','Bình yên sau đổi triều','Mẹ con rời vòng tranh quyền, lui về đất phong hoặc biệt cung.'],['dynastyRelease','Rời cung khi đổi triều','Cung nhân được tân triều cho hồi hương.'],['elopeSuccess','Duyên nơi chân trời','Bỏ trốn thành công, đổi tên sống cùng người thương.'],['elopeCaptured','Mật thư bại lộ','Bỏ trốn thất bại, bị bắt trở về lãnh cung.'],['elopeLost','Lạc nhau ngoài kinh thành','Cuộc trốn chạy khép lại trong truy bắt.'],['forced','Tự chọn luân hồi','Chủ động khép kiếp cũ, mở một cuộc đời mới.'],['marriage','Duyên ngoài cửa son','Được ban hôn và rời cung cùng người tri kỷ.']];
export const ACTIVITIES=[
 {id:'study',name:'Đọc sách',primary:'intelligence'},
 {id:'art',name:'Tài nghệ',primary:'art'},
 {id:'duty',name:'Nhận việc',primary:'merit'},
 {id:'etiquette',name:'Lễ nghi',primary:'beauty'},
 {id:'offer',name:'Dâng công',primary:'favor'},
 {id:'rest',name:'Đối đáp',primary:'speech'},
 {id:'reputation',name:'Lập danh',primary:'reputation',illustration:'etiquette'},
];
// Shared order for the two stat rails and monthly activity buttons.
export const STAGE_STAT_COLUMNS=[
 [['beauty','Dung mạo'],['intelligence','Trí tuệ'],['art','Tài nghệ'],['speech','Hoạt ngôn']],
 [['health','Sức khỏe'],['merit','Công trạng'],['reputation','Uy danh'],['favor','Ân điển']]
];
