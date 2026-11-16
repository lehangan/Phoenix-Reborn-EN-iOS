// One decision can lead to several stories. Weights apply within the favourable
// or unfavourable pool; the character's stats determine which pool is drawn.
const o=(weight,text,effects={},extra={})=>({weight,text,effects,...extra});
const pool=(...variants)=>({...variants[0],variants});
const c=(label,stat,dc,success,failure,extra={})=>({label,stat,dc,success,failure,...extra});

export const FIRE_CHOICES=[
 c('Báo động và tìm đường đưa người ra','intelligence',48,
  pool(o(3,'Mọi người tới kịp. Nàng được ghi công cứu người.',{merit:12,reputation:8,kindness:3,health:-4},{charity:true}),o(2,'Lính cứu hỏa mở được cửa phụ. Nàng cùng người mắc kẹt trở ra bình an.',{merit:6,kindness:2})),
  pool(o(5,'Nàng phải lùi lại trước sức nóng, nhưng đội cứu hỏa kéo được mọi người ra.',{health:-6,merit:1}),o(4,'Một thanh xà rơi chắn lối. Nàng được cứu ra với vết thương ở vai.',{health:-22,kindness:2}),o(1,'Mái kho bất ngờ đổ sập trước khi đội cứu hỏa đến. Nàng không kịp thoát.',{},{death:'accident'})),{risk:true}),
 c('Chạy gọi đội cứu hỏa','speech',20,
  pool(o(3,'Đội cứu hỏa tới nơi kịp thời. Nàng giúp giữ lối đi thông thoáng.',{merit:4,reputation:2}),o(1,'Lời báo động giúp dập lửa trước khi lan sang viện bên. Nàng được thưởng bạc.',{merit:5,silver:12})),
  pool(o(3,'Nàng gọi được người nhưng đã quá muộn để cứu số hàng trong kho. Quản sự trách việc báo tin chậm.',{merit:-3,reputation:-2}),o(1,'Giữa dòng người chạy vội, nàng trượt chân ở bậc đá.',{health:-8})),{baseChance:80}),
 c('Lao vào một mình để lập công','luck',65,
  pool(o(2,'Nàng tìm được lối tắt, đưa người mắc kẹt ra ngoài và được ghi công lớn.',{merit:18,reputation:10,health:-8}),o(3,'Một phen may mắn, nàng cứu được người nhưng bị bỏng ở tay.',{merit:12,reputation:6,health:-18})),
  pool(o(4,'Khói quá dày. Nàng quay đầu kịp lúc và thoát qua cửa sổ, không cứu được ai.',{health:-10,reputation:-2}),o(4,'Nàng mắc kẹt dưới xà gỗ, may được lính cứu hỏa kéo ra. Phải dưỡng thương nhiều ngày.',{health:-32}),o(2,'Lối ra bị chặn giữa đám khói. Tai biến khép lại đời nàng.',{},{death:'accident'})),{risk:true})
];

export const PALACE_INCIDENTS=[
 {id:'v19-teacup',title:'Chén thuốc đổi màu',group:'intrigue',minMonths:4,cooldown:9,text:'Chén thuốc vừa đưa tới có một lớp cặn lạ. Người mang thuốc khăng khăng rằng đó chỉ là dược liệu mới.',choices:[
  c('Giữ lại chén thuốc, nhờ thái y xem','intelligence',36,
   pool(o(3,'Thái y nhận ra vị thuốc bị đổi. Nàng thoát một vụ đầu độc và giữ được chứng cứ.',{intelligence:2,envy:-7,reputation:4}),o(2,'Thuốc chỉ bị sắc quá lửa. Thái y đổi một chén khác giúp nàng hồi sức.',{health:5})),
   pool(o(3,'Chén thuốc bị đánh đổ trước khi thái y tới. Kẻ đứng sau đổ lỗi nàng vu cáo.',{reputation:-5,envy:8}),o(2,'Chờ đợi trong gió lạnh khiến nàng mệt hơn; nguồn thuốc vẫn chưa rõ.',{health:-8}))),
  c('Uống thử để tránh làm mất lòng','luck',62,
   pool(o(2,'Đó là vị thuốc đắng mới, giúp nàng khỏe hơn sau vài hôm.',{health:8}),o(1,'Chén thuốc không có độc. Người tặng ghi nhớ sự tin tưởng của nàng.',{bond:4})),
   pool(o(6,'Nàng nhận ra mùi khác lạ và nhổ thuốc ra, chỉ bị chóng mặt một lúc.',{health:-10}),o(3,'Thuốc đã bị tráo. Thái y cứu được nàng nhưng sức khỏe suy giảm nặng.',{health:-28},{illness:true}),o(1,'Độc phát quá nhanh, thái y đến không kịp. Chén thuốc khép lại kiếp này.',{},{death:'poison'})),{risk:true}),
  c('Khéo léo trả lại chén thuốc','speech',25,
   pool(o(3,'Nàng từ chối êm thấm và dùng thuốc do chính thái y kê.',{health:3,envy:-2}),o(1,'Người mang thuốc hoảng hốt bỏ đi. Nàng tránh được một cái bẫy.',{intelligence:2})),
   pool(o(2,'Người tặng coi lời từ chối là xúc phạm và gieo tiếng xấu về nàng.',{reputation:-4,rivalry:5}),o(1,'Tin nàng kén chọn thuốc truyền đến quản sự, khiến nàng bị khiển trách.',{merit:-3,envy:3})),{baseChance:75})]},
 {id:'v19-bridge',title:'Tiếng gỗ nứt trên cầu',group:'danger',minMonths:6,cooldown:10,text:'Nàng đang qua cầu gỗ thì lan can rung mạnh. Phía trước có người đánh rơi một hộp nhỏ, phía sau là đám cung nhân đang chen tới.',choices:[
  c('Bám lan can, lùi từng bước','intelligence',32,
   pool(o(3,'Nàng nhận ra nhịp cầu còn chắc, lùi về bờ an toàn.',{intelligence:1}),o(1,'Nàng chỉ đường cho những người phía sau cùng thoát. Quản sự ghi công.',{merit:6,reputation:3})),
   pool(o(6,'Lan can bật ra. Nàng bám được cọc cầu nhưng bị trẹo tay.',{health:-12}),o(3,'Nàng rơi xuống chỗ nước nông và được kéo lên, phải dưỡng bệnh.',{health:-24},{illness:true}),o(1,'Dòng nước xiết cuốn nàng đi trước khi dây cứu hộ chạm tới.',{},{death:'accident'})),{risk:true}),
  c('Chạy tới nhặt hộp rồi nhảy sang bờ','luck',65,
   pool(o(2,'Nàng nhảy qua đúng lúc, trả hộp cho chủ nhân và được thưởng.',{silver:25,reputation:5}),o(1,'Chiếc hộp rỗng nhưng nàng đã kịp sang bờ bình an.',{health:-2})),
   pool(o(5,'Hộp rơi xuống nước; nàng phải bỏ lại để bám mép bờ.',{health:-14}),o(4,'Nàng trượt chân, được cứu lên với một vết thương sâu.',{health:-30}),o(1,'Nhịp cầu gãy trước khi nàng kịp nhảy. Nàng không trở lại bờ.',{},{death:'accident'})),{risk:true}),
  c('Gọi mọi người dừng lại để chờ cứu','speech',24,
   pool(o(3,'Đám đông dừng kịp. Lính gác đưa từng người qua cầu.',{merit:4,kindness:2}),o(1,'Một người thả dây từ bờ, giúp nàng lên trước.',{bond:3})),
   pool(o(2,'Tiếng gọi bị lấn át. Nàng bị chen ngã nhưng được kéo lại.',{health:-9}),o(1,'Cầu được chặn, song người quản cầu đổ lỗi nàng làm rối hàng ngũ.',{reputation:-3,envy:4})),{baseChance:78})]},
 {id:'v19-seal',title:'Dấu ngọc trong hòm áo',group:'intrigue',minMonths:8,cooldown:10,text:'Một dấu ngọc không thuộc về nàng nằm giữa hòm áo. Ngoài cửa, nội thị báo sắp khám xét toàn viện.',choices:[
  c('Chủ động báo và xin niêm phong hòm','speech',40,
   pool(o(3,'Dấu ngọc là đồ giả. Sự chủ động giúp nàng được minh oan.',{reputation:6,envy:-8}),o(1,'Người trực hòm làm chứng giúp nàng tìm ra kẻ gài đồ.',{merit:6,envy:-5})),
   pool(o(3,'Không ai tin lời nàng ngay. Nàng bị tạm quản thúc để điều tra.',{envy:12,reputation:-5},{prison:2}),o(2,'Dấu ngọc thuộc kho lễ nghi. Nàng phải chịu phạt vì giữ đồ không báo sớm.',{silver:-15,merit:-5}))),
  c('Lén mang dấu ngọc trả về kho','luck',56,
   pool(o(3,'Lối kho vắng người. Nàng trả được đồ mà không bị trông thấy.',{envy:-3}),o(1,'Một nội thị nhận lại đồ thất lạc và cảm ơn nàng.',{silver:10,reputation:3})),
   pool(o(3,'Lính gác bắt gặp nàng đang cầm dấu ngọc. Chuyện càng khó giải thích.',{envy:18,reputation:-8},{prison:3}),o(2,'Nàng phải bỏ đồ lại dọc đường, làm rách y phục khi chạy về.',{silver:-10,health:-4}))),
  c('Tìm dấu vết người đã mở hòm','intelligence',46,
   pool(o(3,'Vết sáp trên khóa dẫn đến người gài đồ. Nàng đưa chứng cứ cho nữ quan.',{intelligence:2,reputation:7}),o(1,'Một cung nhân thấy kẻ lạ ra vào và sẵn lòng làm chứng.',{bond:5,envy:-5})),
   pool(o(3,'Cuộc khám xét tới trước khi nàng tìm đủ bằng chứng.',{envy:12,merit:-4}),o(2,'Kẻ gài đồ xóa dấu vết và tung thêm lời buộc tội nàng.',{reputation:-7,rivalry:8}))) ]},
 {id:'v19-lantern',title:'Đèn lồng rơi giữa yến',group:'danger',minMonths:5,cooldown:8,text:'Dây treo chiếc đèn lớn trên hành lang bị đứt một phần. Bên dưới có cung nhân và các cuộn rèm dễ cháy.',choices:[
  c('Kéo người gần nhất ra khỏi chỗ đèn','luck',40,
   pool(o(3,'Nàng kéo người ấy ra ngay trước khi đèn rơi. Không ai bị thương.',{kindness:3,merit:8}),o(1,'Người được cứu báo lại với chủ viện, nàng được thưởng bạc.',{silver:18,reputation:5})),
   pool(o(5,'Nàng đẩy được người ra nhưng mảnh gỗ quệt trúng vai.',{health:-16,kindness:2}),o(4,'Người bên cạnh kéo nàng lại; cả hai thoát nhưng bị bỏng nhẹ.',{health:-9,bond:3}),o(1,'Khung đèn nặng đổ xuống quá nhanh. Nàng không kịp tránh.',{},{death:'accident'})),{risk:true}),
  c('Hô lớn cảnh báo rồi nép vào cột','speech',20,
   pool(o(3,'Mọi người tản ra, lính gác dập lửa kịp thời.',{merit:4,reputation:2}),o(1,'Người phụ trách ghi nhận nàng đã phát hiện dây đứt.',{merit:6})),
   pool(o(3,'Tiếng hô khiến đám đông xô đẩy, nàng ngã trầy đầu gối.',{health:-7}),o(1,'Quản sự hiểu nhầm nàng làm náo loạn yến tiệc.',{reputation:-4,merit:-2})),{baseChance:80})]},
 {id:'v19-letter',title:'Mật thư dưới gối',group:'intrigue',minMonths:6,cooldown:9,text:'Một mảnh giấy lạ hẹn nàng tới hành lang sau giờ đóng cửa. Chữ ký cố tình viết nhòe, chỉ nói có chuyện hệ trọng.',choices:[
  c('Đến chỗ hẹn và quan sát từ xa','intelligence',42,
   pool(o(3,'Nàng thấy kẻ đặt thư đang đợi để gài bẫy, liền rời đi an toàn.',{intelligence:2,envy:-3}),o(1,'Một cung nhân muốn trả món nợ cũ, gửi nàng ít bạc trước khi xuất cung.',{silver:20,bond:3})),
   pool(o(3,'Lính tuần đêm bắt gặp nàng ngoài giờ. Nàng bị phạt bổng.',{silver:-12,envy:7}),o(2,'Kẻ viết thư không đến. Đêm lạnh khiến nàng đổ bệnh.',{health:-12},{illness:true}))),
  c('Mang thư trình nữ quan','speech',30,
   pool(o(3,'Nữ quan tìm ra trò trêu chọc và khen nàng giữ đúng phép tắc.',{merit:5,reputation:3}),o(1,'Bức thư giúp phát hiện một vụ trao đổi đồ cấm.',{merit:8,envy:-4})),
   pool(o(3,'Bức thư bị xem là do nàng bịa ra để gây chú ý.',{reputation:-5,envy:6}),o(1,'Người gửi bị phạt, rồi ghi hận nàng.',{rivalry:8}))),
  c('Đốt thư và ở lại trong viện','luck',18,
   pool(o(3,'Đêm ấy trôi qua yên ổn. Kẻ gài thư không có cơ hội ra tay.',{envy:-2}),o(1,'Tin đồn về cái bẫy lộ ra vào sáng hôm sau; nàng mừng vì đã tránh được.',{health:3})),
   pool(o(3,'Kẻ viết thư tung tin nàng đã nhận lời. Không còn giấy để đối chất.',{reputation:-4,envy:5}),o(1,'Nàng bỏ lỡ lời nhắc về một đợt kiểm tra, bị trừ công vì thiếu chuẩn bị.',{merit:-4})),{baseChance:78})]},
 {id:'v19-horse',title:'Ngựa hoảng trước cửa viện',group:'danger',minMonths:9,cooldown:12,text:'Ngựa kéo xe chở lễ vật bỗng giật dây, lao về phía đoàn cung nhân. Chiếc xe đang chặn lối ra.',choices:[
  c('Nép vào hốc cửa, kéo người bên cạnh theo','intelligence',32,
   pool(o(3,'Xe lướt qua trước cửa. Nàng và người bên cạnh đều bình an.',{kindness:2,bond:4}),o(1,'Người được giúp gửi lời cảm ơn tới quản sự.',{merit:5,reputation:3})),
   pool(o(5,'Nàng tránh được xe nhưng bị va vào khuỷu tay.',{health:-10}),o(3,'Mảnh xe gãy văng vào cửa, khiến nàng bị thương nặng.',{health:-25}),o(1,'Bức vách cạnh cửa đổ sập sau cú va. Tai nạn cướp đi đời nàng.',{},{death:'accident'})),{risk:true}),
  c('Thử giữ dây cương để dừng xe','luck',64,
   pool(o(2,'Nàng giật được dây vào cọc. Đoàn người thoát nạn, nàng được trọng thưởng.',{merit:15,reputation:9,silver:20}),o(2,'Mã phu tới tiếp ứng kịp, nàng chỉ xây xát nhẹ.',{merit:7,health:-5})),
   pool(o(5,'Nàng phải buông tay và lăn sang bên để tránh bánh xe.',{health:-18}),o(3,'Dây kéo nàng ngã. Lính gác cứu được nàng nhưng phải dưỡng thương lâu.',{health:-35}),o(1,'Nàng không tránh kịp chiếc xe lật. Kiếp này khép lại ở cửa viện.',{},{death:'accident'})),{risk:true}),
  c('Gọi mã phu và chạy khỏi đường xe','speech',22,
   pool(o(3,'Mã phu nghe tiếng gọi, dừng xe trước khi vào viện.',{merit:4}),o(1,'Nàng mở được lối để mọi người chạy ra ngoài.',{reputation:4,kindness:2})),
   pool(o(3,'Nàng vấp phải lễ vật rơi, bị trẹo chân.',{health:-8}),o(1,'Một rương lễ vật hỏng, người phụ trách bắt nàng góp tiền bồi thường.',{silver:-14,reputation:-2})),{baseChance:78})]},
 {id:'v19-cosmetics',title:'Hộp phấn được biếu',group:'beauty',minMonths:3,cooldown:8,text:'Một hộp phấn thơm được gửi tới viện. Người đưa nói đó là loại quý, nhưng không có dấu của cửa hàng.',choices:[
  c('Thử một ít lên cổ tay trước','intelligence',25,
   pool(o(3,'Da nổi mẩn nhẹ, nàng kịp ngừng dùng và tránh làm hại khuôn mặt.',{intelligence:2}),o(2,'Phấn hợp da, giúp nàng thêm rạng rỡ trong buổi lễ.',{beauty:3,reputation:2})),
   pool(o(3,'Nàng thử chưa đủ lâu. Khi dùng lên mặt, da mới bắt đầu kích ứng.',{beauty:-5,health:-5}),o(1,'Hộp phấn bị đánh tráo sau đó, khiến nàng mất khoản bạc mua thuốc.',{silver:-10,health:-4}))),
  c('Dùng ngay cho buổi lễ','luck',47,
   pool(o(3,'Phấn làm sáng gương mặt; người chủ lễ khen nàng chỉn chu.',{beauty:4,favor:3}),o(1,'Đó chỉ là phấn thường, buổi lễ trôi qua không có chuyện gì.',{reputation:1})),
   pool(o(3,'Da mặt nổi mẩn khiến nàng phải nghỉ trong viện vài hôm.',{beauty:-8,health:-10}),o(2,'Mùi phấn bị cho là không hợp nghi lễ; nàng chịu khiển trách.',{favor:-4,reputation:-4}))),
  c('Trả lại, nói mình không quen dùng phấn','speech',20,
   pool(o(3,'Người tặng hiểu ý và không nhắc lại chuyện này.',{envy:-2}),o(1,'Nàng được khen biết tiết chế, không chạy theo đồ quý.',{reputation:3})),
   pool(o(3,'Người tặng giận vì bị từ chối trước mặt người khác.',{rivalry:6}),o(1,'Lời nàng bị kể thành chê bai quà của chủ viện.',{reputation:-4,favor:-2})),{baseChance:78})]},
 {id:'v19-embroidery',title:'Lễ phục bị cắt chỉ',group:'duty',minMonths:4,cooldown:8,text:'Lễ phục cần giao sáng mai có đường chỉ bị cắt. Người giao việc nói nếu chậm, cả viện phải chịu trách nhiệm.',choices:[
  c('Tự thêu lại trong đêm','art',42,
   pool(o(3,'Nàng nối được đường thêu, giao áo đúng giờ và được ghi công.',{art:2,merit:7}),o(1,'Cách sửa khiến họa tiết đẹp hơn; chủ viện thưởng thêm bạc.',{art:3,reputation:4,silver:15})),
   pool(o(3,'Áo sửa kịp nhưng đường chỉ lộ rõ, nàng bị trừ công.',{merit:-5,health:-5}),o(2,'Nàng thức trắng vẫn không xong; việc giao áo bị lỡ.',{art:-3,reputation:-5,health:-10}))),
  c('Nhờ thợ thêu cùng sửa','speech',32,
   pool(o(3,'Người thợ đồng ý giúp. Hai người chia việc và hoàn thành vừa kịp.',{merit:4,bond:4}),o(1,'Người thợ còn chỉ cho nàng một cách giấu mối nối.',{art:3,bond:2})),
   pool(o(3,'Người thợ báo bận; nàng mất thời gian chờ và phải nhận lỗi.',{merit:-4,reputation:-3}),o(1,'Người giúp đòi thêm tiền công sau khi hoàn thành.',{silver:-18}))),
  c('Giữ nguyên hiện trạng để trình báo','intelligence',34,
   pool(o(3,'Dấu kéo cho thấy có người phá hoại. Nàng được miễn trách nhiệm.',{envy:-4,reputation:3}),o(1,'Nữ quan tìm được người cắt chỉ và ghi nhận sự tỉnh táo của nàng.',{intelligence:2,merit:6})),
   pool(o(3,'Quản sự chỉ thấy áo chưa được sửa, buộc nàng bồi thường.',{silver:-15,merit:-3}),o(1,'Người phá áo đổ lỗi ngược lại cho nàng.',{envy:10,reputation:-5}))) ]},
 {id:'v19-rainwatch',title:'Đổi ca giữa giông',group:'duty',where:'maid',minMonths:2,cooldown:8,text:'Một cung nhân nhờ nàng đổi ca trực đêm. Trời đang nổi giông, còn người ấy nói phải đi chăm thân nhân bị bệnh.',choices:[
  c('Nhận ca và tìm chỗ tránh mưa','intelligence',28,
   pool(o(3,'Nàng chọn được chỗ canh khô ráo, hoàn thành ca trực mà không mệt.',{merit:4,bond:5}),o(1,'Nàng phát hiện mái dột trước khi sách bị ướt, được ghi công thêm.',{merit:7,reputation:3})),
   pool(o(3,'Gió đổi hướng khiến nàng ướt sũng và phát sốt.',{health:-15},{illness:true}),o(2,'Người nhờ đổi ca không quay lại đúng hẹn; nàng phải trực đến sáng.',{health:-10,bond:-4}))),
  c('Xin quản sự bố trí thêm người','speech',30,
   pool(o(3,'Quản sự đồng ý, hai người luân phiên nên ca trực nhẹ hơn.',{merit:3,health:2}),o(1,'Ca trực được chuyển vào hiên, cả nhóm cảm ơn nàng.',{reputation:4,bond:3})),
   pool(o(3,'Quản sự cho rằng nàng né việc và trừ công.',{merit:-4}),o(1,'Lời xin bị kể thành nàng xúi người khác chống lệnh.',{envy:6,reputation:-4}))),
  c('Từ chối đổi ca, giữ lịch của mình','luck',18,
   pool(o(3,'Người kia tìm được người thay, nàng có một tối nghỉ yên.',{health:4}),o(1,'Hóa ra chuyện thân nhân là giả; nàng tránh được một lần bị lợi dụng.',{intelligence:1})),
   pool(o(3,'Người kia giận và không chịu giúp nàng lúc cần.',{bond:-7}),o(1,'Cuối cùng quản sự điều cả hai đi trực, nàng vẫn bị lạnh.',{health:-7,merit:-2})),{baseChance:78})]},
 {id:'v19-medicine',title:'Gói thảo dược không tên',group:'fortune',minMonths:4,cooldown:10,text:'Trong lúc dọn vườn, nàng thấy gói thảo dược buộc kỹ cùng mảnh giấy ghi công dụng hồi sức. Không biết ai đã để lại.',choices:[
  c('Mang tới thái y hỏi công dụng','intelligence',28,
   pool(o(3,'Đó là vị thuốc tốt. Thái y bào chế giúp nàng một thang dưỡng sức.',{health:9}),o(1,'Thái y nhận ra thảo dược bị mốc, khen nàng đã không dùng bừa.',{intelligence:2})),
   pool(o(3,'Nguồn dược liệu không rõ khiến nàng bị giữ lại hỏi chuyện.',{envy:5,health:-3}),o(1,'Một người nhận là chủ gói thuốc và trách nàng tự tiện lấy.',{reputation:-3}))),
  c('Thử sắc uống để hồi sức','luck',58,
   pool(o(2,'Thuốc giúp nàng ngủ ngon và khỏe lại sau những ngày mệt mỏi.',{health:14}),o(2,'Gói thuốc chỉ là trà thảo mộc bình thường.',{health:3})),
   pool(o(6,'Thuốc không hợp cơ địa, nàng đau bụng và phải dưỡng sức.',{health:-15}),o(3,'Dược liệu có độc. Thái y cứu được nàng nhưng để lại bệnh kéo dài.',{health:-25},{illness:true}),o(1,'Nàng không qua khỏi cơn trúng độc vì dùng nhầm thảo dược.',{},{death:'poison'})),{risk:true}),
  c('Để nguyên và báo người coi vườn','speech',20,
   pool(o(3,'Người coi vườn tìm lại được đồ thất lạc và gửi nàng ít bạc cảm ơn.',{silver:8,reputation:2}),o(1,'Đó là vật được cố ý để lại thử lòng, nàng được ghi nhận ngay thẳng.',{kindness:2,merit:3})),
   pool(o(3,'Người coi vườn nghi nàng đã mở gói, cuộc nói chuyện kết thúc khó chịu.',{envy:4}),o(1,'Nàng bị nhờ dọn thêm cả khu vườn, mệt hơn dự định.',{health:-5})),{baseChance:78})]},
 {id:'v19-jade',title:'Miếng ngọc ở giếng cũ',group:'fortune',minMonths:6,cooldown:10,text:'Một miếng ngọc sáng lấp lánh trên mép giếng bỏ hoang. Có tiếng người tìm đồ vọng từ sân bên.',choices:[
  c('Dùng cành cây gạt ngọc về phía mình','intelligence',35,
   pool(o(3,'Nàng lấy được ngọc, trả chủ nhân và nhận bạc cảm ơn.',{silver:20,reputation:3}),o(1,'Miếng ngọc hóa ra là đồ thủy tinh, chủ nhân vẫn cảm ơn nàng.',{bond:3})),
   pool(o(3,'Ngọc rơi xuống giếng. Chủ nhân giận và yêu cầu nàng bồi thường.',{silver:-18,reputation:-3}),o(1,'Cành cây gãy, nàng bị xước tay nhưng tránh được mép giếng.',{health:-6}))),
  c('Nhoài người ra lấy ngọc','luck',58,
   pool(o(3,'Nàng lấy được miếng ngọc quý, chủ nhân thưởng hậu vì tìm lại được kỷ vật.',{silver:35,reputation:5}),o(1,'Ngọc tuột tay nhưng nàng bám lại mép giếng kịp lúc.',{health:-4})),
   pool(o(6,'Gạch mép giếng vỡ. Nàng được kéo lại nhưng tay bị thương.',{health:-17}),o(3,'Nàng rơi xuống chỗ cạn và được cứu, phải nghỉ dưỡng lâu.',{health:-32}),o(1,'Thành giếng sụp xuống. Không ai kịp cứu nàng khỏi tai nạn.',{},{death:'accident'})),{risk:true}),
  c('Gọi chủ nhân tới và chờ người giúp','speech',22,
   pool(o(3,'Lính gác mang móc tới lấy ngọc. Chủ nhân cảm ơn nàng đã báo tin.',{reputation:3,merit:2}),o(1,'Chủ nhân chia nàng ít bạc mừng tìm được kỷ vật.',{silver:10})),
   pool(o(3,'Người tới nghi nàng đã giấu ngọc rồi giả vờ tìm thấy.',{envy:6,reputation:-3}),o(1,'Nàng chờ lâu ngoài gió, chưa được cảm ơn đã mệt đi.',{health:-5})),{baseChance:78})]},
 {id:'v19-banquet',title:'Lời tố giữa tiệc trà',group:'court',where:'consort',minMonths:6,cooldown:10,text:'Giữa tiệc trà, một người công khai nói nàng từng sửa sổ ban thưởng. Những ánh nhìn đều hướng về phía nàng.',choices:[
  c('Xin mang sổ gốc ra đối chiếu','intelligence',44,
   pool(o(3,'Sổ gốc chứng minh nàng vô can. Lời buộc tội phản lại người nói.',{reputation:7,envy:-8}),o(1,'Việc đối chiếu còn phát hiện khoản thưởng ghi thiếu của nàng.',{silver:20,merit:4})),
   pool(o(3,'Sổ gốc đã bị sửa trước. Nàng phải chịu điều tra và giảm ân điển.',{favor:-7,envy:12}),o(1,'Người giữ sổ không tới; sự im lặng khiến nhiều người nghi ngờ.',{reputation:-6,envy:7}))),
  c('Đáp lời mềm mỏng, nhờ chủ tiệc phân xử','speech',38,
   pool(o(3,'Chủ tiệc yêu cầu đưa chứng cứ trước khi kết tội, giúp nàng thoát thế khó.',{reputation:5,favor:3}),o(1,'Lối đáp bình tĩnh khiến người buộc tội mất đà.',{speech:2,envy:-4})),
   pool(o(3,'Lời đáp bị cho là quanh co. Nàng bị mời rời tiệc sớm.',{favor:-5,reputation:-4}),o(1,'Người kia thêm thắt câu chuyện, khiến lời đồn lan khắp nội đình.',{envy:10,reputation:-7}))),
  c('Im lặng rời tiệc để tránh tranh cãi','luck',20,
   pool(o(3,'Một người khác lên tiếng bênh vực. Chuyện lắng xuống trước khi nàng về viện.',{bond:4,envy:-3}),o(1,'Chủ tiệc cho người nhắn rằng đã hiểu sự tình.',{favor:3})),
   pool(o(3,'Sự rời đi bị hiểu là nhận lỗi; nàng mất phần ban thưởng tháng này.',{silver:-20,reputation:-6}),o(1,'Người tố cáo được đà lấn tới, nàng bị cấm dự yến một thời gian.',{favor:-7,envy:6})),{baseChance:75})]}
];

// Even cautious ordinary choices can turn out differently. Entering an exam,
// accepting release and other explicit transitions remain the chosen action.
const quietSetbacks={
 spill:['Nàng đã nhận dọn trà nhưng quản sự vẫn quy lỗi cho nàng làm hỏng thảm.',{silver:-5,reputation:-2}],
 ledger:['Quản sự không muốn xem lại sổ, còn cho rằng nàng gây phiền hà.',{merit:-3,envy:3}],
 sickfriend:['Người bệnh vẫn chưa khỏe; việc trong phòng dồn lại khiến nàng mệt mỏi.',{health:-5,merit:-2}],
 lostpin:['Chủ chiếc trâm nghi nàng giữ đồ rồi mới trả, nên không có lời cảm ơn.',{reputation:-3,envy:4}],
 library:['Nữ quan nhắc nàng trở lại việc đang dở; buổi học phải bỏ giữa chừng.',{merit:-2}],
 music:['Buổi tập kéo dài, nàng bị trách vì chậm phần việc sau đó.',{merit:-3,health:-3}],
 gift:['Người gửi hương không hài lòng và kể xấu nàng với người cùng viện.',{reputation:-4,rivalry:5}],
 homeletter:['Thư nhà tiếp theo báo tình hình khó khăn hơn. Lo lắng khiến nàng mất ngủ.',{health:-5}],
 rain:['Mưa kéo dài hơn dự tính. Gió lạnh khiến nàng mệt dù đã tìm chỗ trú.',{health:-6}],
 portrait:['Họa sư bận chỉnh tranh, nàng phải chờ lâu và lỡ phần việc được giao.',{merit:-3,health:-2}],
 compliment:['Chủ lễ hiểu nhầm cử chỉ của nàng, nhắc nhở trước mặt mọi người.',{reputation:-3,favor:-2}],
 bribe:['Người nội thị ghi hận và gây khó dễ trong những lần chuyển việc sau.',{rivalry:6,merit:-2}],
 accusation:['Lời nhận trách nhiệm bị xem là thú nhận, nàng còn bị giữ lại điều tra.',{silver:-10,envy:9}],
 market:['Phiên đổi đồ phát sinh tranh cãi. Nàng bị kéo vào và lỡ giờ trở về.',{merit:-3,envy:2}],
 poetry:['Có người chê nàng chỉ phụ họa; lời đồn nhỏ làm nàng mất chút uy danh.',{reputation:-3}],
 winter:['Gió đổi hướng lúc nửa đêm, khiến nàng bị lạnh và ngủ không yên.',{health:-6}],
 fairness:['Quản sự không hài lòng với cách nàng xử lý phần việc, buộc nàng làm thêm.',{health:-5,merit:-2}],
 audience:['Sự thận trọng bị cho là chưa chuẩn bị; nàng bị nhắc nhở trong buổi chầu.',{favor:-3,reputation:-2}],
 banquet:['Một vị khách hiểu nhầm ý nàng, khiến chủ tiệc phải đứng ra giảng hòa.',{favor:-3,reputation:-3}],
 maidexam:['Nàng bị giao thêm việc nên không học được như dự định.',{health:-4,merit:-2}],
 festival:['Tiếng ồn kéo dài đến khuya khiến nàng mất ngủ, sáng ra mệt mỏi.',{health:-5}],
 inheritance:['Tin gia đình đến chậm và không như nàng mong đợi, khiến nàng lo lắng.',{health:-4}],
 specialselection:['Cách nàng trả lời khiến người phụ trách không vui, hồ sơ bị xếp lại.',{merit:-3,reputation:-2}],
 paintingcontest:['Chỗ đứng xem quá đông, nàng không học được gì và lỡ việc trong viện.',{merit:-2}],
 promotion:['Có người lợi dụng lúc nàng chần chừ để giành phần công trạng.',{merit:-4,reputation:-2}],
 release:['Việc ở lại khiến nàng được giao thêm ca trực, mệt hơn trước.',{health:-6}],
 escape:['Lính gác thấy nàng quanh quẩn gần cổng, gọi lại hỏi chuyện.',{envy:6}],
 oldfriend:['Cuộc gặp gợi lại chuyện buồn; nàng trở về với tâm trạng nặng nề.',{health:-4}],
 freework:['Việc nhà phát sinh khiến nàng không được nghỉ như dự tính.',{health:-4}]
};
export function randomizeQuietChoices(events){
 for(const e of events)for(const ch of e.choices){
  if(ch.stat||ch.failure||['exam','leave','cure','punishment','promote','servicePromote'].some(k=>ch.success?.[k]))continue;
  const setback=quietSetbacks[e.id]||(e.id.startsWith('work-')?['Người được nhờ không giúp kịp, công việc chậm và nàng bị trừ bổng.',{silver:-6,merit:-3}]:null);
  if(!setback)continue;
  ch.stat='luck';ch.dc=15;ch.baseChance=85;
  ch.failure={text:setback[0],effects:setback[1]};
 }
}
