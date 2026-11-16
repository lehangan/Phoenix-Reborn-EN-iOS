export const gowns = [
  {id:'crimson',name:'Phượng Vũ',subtitle:'Gấm son thêu cánh phượng',rarity:5,tag:'Lộng lẫy',color:'#a44146',stats:[54,76,94],price:0,currency:'silver',image:'assets/crimson.png'},
  {id:'jade',name:'Trúc Ảnh',subtitle:'Lụa ngọc đón gió đầu xuân',rarity:4,tag:'Thanh nhã',color:'#72978b',stats:[94,52,48],price:140,currency:'silver',image:'assets/jade.png'},
  {id:'violet',name:'Nguyệt Hoa',subtitle:'Tơ tím nhuộm ánh trăng',rarity:5,tag:'Diễm lệ',color:'#87709a',stats:[66,96,64],price:80,currency:'jade',image:'assets/violet.png'}
];
export const ornaments = {
  hair:[{id:'pearl',name:'Trâm bạch ngọc',icon:'pin',stats:[16,5,3],price:0},{id:'phoenix',name:'Trâm phượng vàng',icon:'phoenix',stats:[4,10,22],price:90},{id:'flower',name:'Trâm hoa đào',icon:'flower',stats:[8,20,6],price:65}],
  jewel:[{id:'moon',name:'Bội ngọc nguyệt',icon:'gem',stats:[12,7,4],price:0},{id:'ruby',name:'Chuỗi hồng ngọc',icon:'necklace',stats:[3,20,16],price:85},{id:'lotus',name:'Bội liên hoa',icon:'lotus',stats:[22,6,8],price:75}]
};
export const attributes=['Thanh nhã','Diễm lệ','Khí chất'];
export const people=[
  {id:'lan',name:'Tô Nhược Lan',role:'Nữ quan Thượng phục',icon:'flower',color:'#748f83',quote:'Trong cung, một đường kim cũng có thể cứu người.',description:'Chân thành, kín đáo. Coi trọng sự tử tế và lòng tin.',gift:'Một túi trà sen',giftCost:35},
  {id:'ning',name:'Ninh Quý phi',role:'Chủ nhân Chiêu Dương điện',icon:'phoenix',color:'#a05d6d',quote:'Người khéo léo không cần nói hết điều mình biết.',description:'Kiêu hãnh, sắc sảo. Nể phục người biết giữ chừng mực.',gift:'Một hộp hương trầm',giftCost:50},
  {id:'emperor',name:'Tiêu Cảnh Hành',role:'Thiên tử Đại Ninh',icon:'crown',color:'#a1854e',quote:'Trẫm muốn nghe điều nàng thật sự nghĩ.',description:'Thận trọng, yêu thi họa. Đánh giá cao sự chính trực.',gift:'Một quyển cổ thi',giftCost:45}
];
export const chapters=[
 {title:'Hoa nở Trường Lạc',place:'Trường Lạc cung',subtitle:'Ngày đầu nhập cung',theme:0,target:86,reward:[70,15],
 intro:'Cánh cửa son khép lại sau lưng. Nàng bước vào Trường Lạc cung với một hòm y phục và bức thư dặn dò của mẫu thân: “Giữ lòng trong, nhưng đừng để ai nhìn thấu.”',
 speaker:'Tô Nhược Lan',dialog:'Lát nữa Thái hậu sẽ gặp các tú nữ ở vườn xuân. Người yêu sự thanh nhã. Nếu nàng muốn, ta có thể chỉ nàng cách chọn y phục.',
 choices:[{title:'Chân thành nhờ Nhược Lan giúp đỡ',hint:'Kết giao · Nhược Lan +12',effects:{lan:12,influence:3},response:'Nhược Lan mỉm cười, khẽ đặt một nhành trúc lên hòm áo. “Đẹp vừa đủ để người ta nhớ, nàng nhé.”',flag:'trustedLan'},
 {title:'Tự tin với lựa chọn của mình',hint:'Thể hiện bản lĩnh · Uy vọng +7',effects:{influence:7,risk:3},response:'Nàng cảm tạ rồi tự chọn áo. Nhược Lan nhìn nàng đầy tò mò; sự tự tin ấy đã khiến một vài người chú ý.'},
 {title:'Âm thầm quan sát các tú nữ khác',hint:'Tìm hiểu thế cục · Mưu trí +8',effects:{scheme:8},response:'Giữa những tà áo rực rỡ, nàng nhận ra các nữ quan đều dùng ngọc trắng. Một gợi ý kín đáo về sở thích của Thái hậu.'}],
 event:'Thưởng hoa đầu xuân',eventText:'Thái hậu dạo bước qua vườn mai. Y phục thanh nhã cùng lời chào đúng mực sẽ giúp nàng tạo ấn tượng đầu tiên.',success:'Thái hậu dừng lại bên nàng: “Tựa trúc đầu xuân, thanh mà chẳng nhạt.” Cả khu vườn bỗng quay nhìn.',failure:'Thái hậu gật đầu đáp lễ rồi đi tiếp. Nàng hiểu rằng đẹp thôi chưa đủ; đúng hoàn cảnh mới khiến người khác nhớ.'},
 {title:'Mũi kim giấu sóng',place:'Thượng Phục cục',subtitle:'Lời đồn dưới hiên son',theme:2,target:110,reward:[85,15],
 intro:'Một tấm gấm dùng cho lễ phục biến mất. Tin đồn đổ về Nhược Lan, người cuối cùng rời kho vải. Nàng tìm thấy một sợi chỉ lạ trên ngạch cửa.',
 speaker:'Ninh Quý phi',dialog:'Nghe nói nàng thân thiết với nữ quan họ Tô. Nếu biết điều gì, tốt nhất đừng giấu bổn cung.',
 choices:[{title:'Xin kiểm tra sổ kho trước khi kết tội',hint:'Mưu trí +10 · Nhược Lan +8',effects:{scheme:10,lan:8,influence:4},response:'Sổ kho có một dòng mực còn mới. Nàng phát hiện tấm gấm đã được chuyển sang điện khác, chứ chưa từng mất.',flag:'evidence'},
 {title:'Công khai đứng ra bảo vệ Nhược Lan',hint:'Nhược Lan +18 · Đố kỵ +8',effects:{lan:18,risk:8,favor:4},response:'Nhược Lan cúi đầu giấu đôi mắt đỏ. Lòng tốt của nàng được nhớ, nhưng lời bảo đảm chưa kèm chứng cứ khiến Quý phi không hài lòng.'},
 {title:'Giao sợi chỉ cho Ninh Quý phi',hint:'Quý phi +14 · Mưu trí +5',effects:{ning:14,scheme:5,lan:-5},response:'Quý phi giữ sợi chỉ trong tay, nở nụ cười khó đoán. “Nàng biết chọn người để tin đấy.”',flag:'ningAlly'}],
 event:'Chầu Chiêu Dương',eventText:'Nàng được gọi vào điện để trình bày. Một bộ lễ phục có khí chất sẽ giúp lời nói của nàng thêm trọng lượng.',success:'Giọng nàng bình tĩnh, dáng đứng đường hoàng. Quý phi ra lệnh kiểm tra lại mọi sổ sách, không ai dám xem nhẹ nàng.',failure:'Dưới ánh mắt dò xét, nàng hơi mất tự tin. Lời trình bày vẫn được ghi lại, nhưng người trong điện chưa thật sự bị thuyết phục.'},
 {title:'Khúc nhạc dưới trăng',place:'Lưu Nguyệt đình',subtitle:'Một lần tương ngộ',theme:1,target:112,reward:[90,20],
 intro:'Đêm Trung thu, tiếng đàn từ Lưu Nguyệt đình vang qua mặt hồ. Một người mặc thường phục đứng bên lan can, trên tay là bài thơ còn viết dở.',
 speaker:'Tiêu Cảnh Hành',dialog:'Ai cũng chúc trăng tròn mãi. Nàng nghĩ, trăng khuyết có điều gì đáng quý?',
 choices:[{title:'“Có khuyết mới biết quý lúc đoàn viên.”',hint:'Hoàng đế +15 · Ân sủng +8',effects:{emperor:15,favor:8},response:'Người nhìn vầng trăng rất lâu. “Lâu rồi, trẫm mới nghe một câu không phải để lấy lòng.”',flag:'moonBond'},
 {title:'“Dù khuyết, trăng vẫn soi sáng nhân gian.”',hint:'Uy vọng +8 · Hoàng đế +10',effects:{influence:8,emperor:10},response:'Người đặt bút viết câu cuối của bài thơ. Sáng hôm sau, câu nói của nàng được truyền tới thư phòng.'},
 {title:'Mỉm cười, xin đàn một khúc thay lời',hint:'Ân sủng +12 · Đố kỵ +5',effects:{favor:12,risk:5,emperor:6},response:'Tiếng đàn hòa cùng gió đêm. Khoảnh khắc ấy thật đẹp; cũng có người ở bờ bên kia lặng lẽ nhìn thấy.'}],
 event:'Dạ yến Trung thu',eventText:'Đèn hoa thắp sáng hồ sen. Một bộ y phục diễm lệ sẽ hòa vào ánh trăng và khúc nhạc đêm nay.',success:'Tà áo bắt lấy ánh đèn như một vầng trăng nhỏ. Thiên tử nâng chén về phía nàng; khúc nhạc dường như chậm lại.',failure:'Nàng vẫn thưởng trọn một đêm trăng đẹp. Nhưng giữa bao y phục rực rỡ, dáng hình nàng chưa để lại dấu ấn sâu đậm.'},
 {title:'Hương trầm hữu ý',place:'Chiêu Dương điện',subtitle:'Lòng tin có giá',theme:0,target:118,reward:[100,20],
 intro:'Một hộp hương lạ được gửi đến tẩm cung, kèm lời nhắn của Quý phi. Nhược Lan nhận ra dấu niêm phong đã bị mở. Đây có thể là món quà, cũng có thể là một phép thử.',
 speaker:'Tô Nhược Lan',dialog:'Ta không biết ai đã động vào hộp. Chỉ xin nàng đừng vội dùng, cũng đừng vội kết tội bất kỳ ai.',
 choices:[{title:'Niêm phong hộp, mời nữ quan kiểm tra',hint:'Mưu trí +12 · Giảm đố kỵ 8',effects:{scheme:12,risk:-8,influence:5},response:'Hương không có độc, nhưng đã bị đổi sang loại cấm dùng ngoài chính điện. Biên bản kiểm tra giúp nàng tránh một cái bẫy.',flag:'incenseProof'},
 {title:'Mang trả và hỏi thẳng Quý phi',hint:'Quý phi +12 · Uy vọng +6',effects:{ning:12,influence:6,risk:3},response:'Ninh Quý phi khựng lại khi thấy dấu niêm phong. Nàng đã cho người một cơ hội giải thích; điều ấy không bị lãng quên.'},
 {title:'Giấu hộp hương, giữ làm lợi thế',hint:'Mưu trí +16 · Đố kỵ +12',effects:{scheme:16,risk:12,ning:-6},response:'Nàng cất hộp vào ngăn kín. Trong tay nàng có thêm một bí mật, nhưng người gửi chưa nhận được lời hồi đáp.',flag:'secretIncense'}],
 event:'Tiệc trà Từ An',eventText:'Thái hậu mời nàng uống trà. Vẻ thanh nhã giúp làm dịu những lời bàn tán đang vây quanh.',success:'Hương sen, màu ngọc và lời nói vừa đủ. Thái hậu ban cho nàng một chén trà, như ngầm chấm dứt chuyện thị phi.',failure:'Buổi trà trôi qua lặng lẽ. Những lời đồn chưa tan, nàng cần cẩn trọng hơn trong các mối quan hệ.'},
 {title:'Bão trước điện vàng',place:'Càn Thanh điện',subtitle:'Một bước giữa bàn cờ',theme:2,target:130,reward:[110,25],
 intro:'Bức thư nặc danh tố nàng dùng mưu để được sủng ái. Trước điện vàng, người ta không chỉ nhìn y phục mà còn chờ xem nàng sẽ kéo ai xuống cùng.',
 speaker:'Tiêu Cảnh Hành',dialog:'Trẫm cho nàng một cơ hội nói rõ. Điều gì trong bức thư này là sự thật?',
 choices:[{title:'Trình chứng cứ, chỉ nói điều xác thực',hint:'Mưu trí +8 · Giảm đố kỵ 12',effects:{scheme:8,risk:-12,emperor:10},response:'Nàng trình bày từng sự việc theo thứ tự. Những điểm mâu thuẫn trong bức thư dần lộ ra.',flag:'fairTrial'},
 {title:'Nhờ Quý phi đứng ra làm chứng',hint:'Dựa vào quan hệ với Quý phi',effects:{ning:6},conditional:'ning',response:'Nàng nhìn về phía Ninh Quý phi. Tình nghĩa đã gây dựng nay đứng trước một phép thử.'},
 {title:'Phản công, chất vấn người đưa thư',hint:'Uy vọng +15 · Đố kỵ +10',effects:{influence:15,risk:10,scheme:5},response:'Người đưa thư lúng túng trước các câu hỏi. Nàng giành lại thế chủ động, nhưng cách đối đầu khiến nhiều người dè chừng.'}],
 event:'Đối chất điện vàng',eventText:'Giữ lưng thẳng, mắt nhìn bình tĩnh. Khí chất của lễ phục sẽ giúp nàng đứng vững trước triều đường.',success:'Nàng không lùi bước. Khi người đọc thư ngừng lời, thiên tử cho lui tất cả để nghe nàng nói thêm.',failure:'Uy thế trong điện khiến nàng căng thẳng. Nàng cần dựa nhiều hơn vào chứng cứ và những đồng minh đã lựa chọn.'},
 {title:'Người viết vận mệnh',place:'Thái Hòa điện',subtitle:'Đêm cuối mùa hoa',theme:1,target:132,reward:[150,35],
 intro:'Sắc phong được đặt trên khay vàng. Qua những mùa hoa, nàng đã hiểu: một danh phận chỉ có ý nghĩa khi nàng biết mình muốn trở thành người thế nào.',
 speaker:'Lời trong lòng',dialog:'Đêm nay, mọi ánh mắt sẽ hướng về nàng. Nhưng sau tất cả, nàng muốn giữ lại điều gì?',
 choices:[{title:'Một chỗ đứng để che chở người mình quý',hint:'Uy vọng +10 · Nhược Lan +10',effects:{influence:10,lan:10,risk:-5},response:'Nàng nhớ những bàn tay từng giúp mình chỉnh áo, những chén trà sẻ chia khi hoạn nạn.',flag:'kindEnding'},
 {title:'Một người hiểu được lòng mình',hint:'Hoàng đế +12 · Ân sủng +10',effects:{emperor:12,favor:10},response:'Trong lòng nàng hiện lên mặt hồ đêm ấy, cùng một câu thơ chưa từng quên.',flag:'loveEnding'},
 {title:'Quyền tự quyết, không còn bị sắp đặt',hint:'Mưu trí +10 · Uy vọng +12',effects:{scheme:10,influence:12,risk:6},response:'Nàng khép chiếc hòm cũ. Từ giờ, từng bước đi sẽ là do chính mình lựa chọn.',flag:'powerEnding'}],
 event:'Đại yến sắc phong',eventText:'Đây là sân khấu cuối cùng của mùa hoa. Hãy chọn bộ phối diễm lệ nhất để viết đoạn kết cho câu chuyện.',success:'Giữa đại điện rực ánh đèn, nàng bước tới bằng sự tự tin đã tự mình giành lấy. Không còn là tú nữ bỡ ngỡ của ngày đầu.',failure:'Ánh đèn không làm nàng chói lọi nhất, nhưng không chiếc áo nào xóa được những điều nàng đã làm. Câu chuyện vẫn thuộc về nàng.'}
];
