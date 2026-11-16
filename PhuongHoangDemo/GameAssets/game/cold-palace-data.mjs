// The cold-palace pool is selected separately from ordinary court incidents.
export const COLD_ACTIVITIES=[
 {id:'cold-scripture',name:'Viết kinh',primary:'intelligence',illustration:'study'},
 {id:'cold-meditate',name:'Thiền',primary:'kindness',illustration:'rest'},
 {id:'cold-garden',name:'Trồng cây',primary:'beauty',illustration:'etiquette'},
 {id:'cold-sew',name:'May vá',primary:'art',illustration:'embroidery'},
 {id:'cold-recital',name:'Ngâm thơ',primary:'speech',illustration:'art'},
 {id:'cold-clean',name:'Quét viện',primary:'merit',illustration:'duty'}
];
const out=(text,effects={},extra={})=>({text,effects,...extra});
const safe=(label,text,effects={},extra={})=>({label,success:out(text,effects,extra)});
const test=(label,stat,difficulty,success,failure,extra={})=>({label,stat,dc:difficulty,success,failure,...extra});
const event=(id,title,text,choices,tone='bad')=>({id:'cold-'+id,title,text,choices,group:'cold',tone});
export const COLD_EVENTS=[
 event('roof','Mưa qua mái dột','Mưa lạnh ngấm qua lớp ngói vỡ. Chăn và sách đều bị ướt.',[
  test('Che lại mái bằng tấm ván cũ','intelligence',40,out('Nàng che được chỗ dột, nhưng phải thức trắng đêm.',{health:-2,intelligence:1}),out('Tấm ván trượt khỏi tay, nước vẫn tràn vào phòng.',{health:-6,art:-2})),
  safe('Giữ chăn khô, bỏ bớt sách ướt','Nàng giữ được chỗ ngủ, những trang sách đã nhòe mực.',{intelligence:-3,health:-1})]),
 event('food','Bữa cơm có mùi lạ','Cơm đưa vào viện đã nguội và có mùi chua. Không ai chịu đổi phần mới.',[
  {...safe('Đổi phần cơm sạch','Một phần cơm đạm bạc được đưa đến, đủ qua cơn đói.',{}),cost:8},
  test('Nhặt phần còn ăn được','luck',58,out('Nàng ăn dè sẻn, bụng vẫn cồn cào.',{health:-3}),out('Cơn đau bụng kéo dài suốt đêm. Nàng đã trúng thực.',{health:-12,beauty:-2},{illness:true})),
  safe('Nhịn bữa này','Nàng uống nước qua bữa, sức lực suy giảm.',{health:-5,merit:-2})]),
 event('cold','Gió lùa qua cửa mục','Gió bấc luồn qua những khe cửa. Nàng chỉ còn một tấm chăn mỏng.',[
  test('Vá rèm chắn gió','art',42,out('Mảnh rèm vá chặn bớt gió, đôi tay nàng rớm máu.',{health:-2,art:1}),out('Rèm lại rách giữa đêm. Nàng lên cơn sốt.',{health:-7,speech:-2},{illness:true})),
  safe('Co mình bên chăn cũ','Nàng chịu qua đêm rét, sắc mặt thêm nhợt nhạt.',{health:-4,beauty:-2})]),
 event('medicine','Gói thuốc bị đánh tráo','Gói thuốc để trên bàn có màu khác thường. Một vết chân lạ còn in dưới cửa.',[
  test('Kiểm tra từng vị thuốc','intelligence',48,out('Nàng nhận ra vị lạ, bỏ đi cả gói thuốc.',{health:-2}),out('Nàng bỏ sót vị độc, cơn choáng ập đến sau khi uống.',{health:-14,intelligence:-3},{illness:true})),
  safe('Đổ bỏ, chờ mời y quan','Nàng không uống thuốc lạ. Cơn đau chưa được chữa.',{health:-4})]),
 event('water','Giếng nước đục','Nước giếng sau viện bỗng có vị tanh. Củi khô chỉ còn một ít.',[
  safe('Đun kỹ phần nước còn lại','Nàng dùng hết củi và phải chịu một đêm lạnh.',{health:-2,silver:-3}),
  test('Múc lớp nước trong phía trên','luck',62,out('Nàng tạm tìm được chút nước dùng.',{health:-2}),out('Nước bẩn khiến nàng bệnh nặng nhiều ngày.',{health:-12,art:-3},{illness:true}))]),
 event('shadow','Bóng người ngoài song cửa','Giữa đêm, tiếng bước chân dừng lại ngoài cửa. Then cài đang bị cạy.',[
  test('Gọi lính canh thật lớn','speech',46,out('Lính gác đi tới, kẻ lạ bỏ chạy. Nàng vẫn còn run sợ.',{speech:-1,health:-2}),out('Không ai nghe thấy. Nàng bị thương khi giữ cửa.',{health:-13,envy:4})),
  test('Mở cửa đối mặt','luck',68,out('Kẻ lạ hoảng hốt bỏ chạy khi bị nhận ra.',{reputation:1,health:-4}),out('Kẻ lạ ra tay trước khi nàng kịp kêu cứu. Cuộc đời dừng lại sau cửa viện.',{},{death:'assassination'}),{risk:true})]),
 event('needle','Kim gãy trong tay','Áo cũ đã sờn, kim lại gãy khi nàng vá đến đường cuối.',[
  test('Tìm cách vá nốt','art',44,out('Nàng khéo nối đường chỉ, nhưng đầu ngón tay đau nhức.',{health:-2,art:1}),out('Vết thương sưng đỏ, việc may vá phải dừng lại.',{health:-6,art:-3})),
  safe('Để áo lại, băng vết thương','Nàng tránh làm vết thương sâu hơn; chiếc áo còn rách.',{beauty:-2,art:-1})]),
 event('theft','Chiếc hộp trống','Vài đồng bạc dành dụm biến mất. Người đưa cơm nói chưa từng nhìn thấy.',[
  test('Hỏi rõ người đưa cơm','speech',50,out('Nàng lấy lại được một phần, vẫn mất chút bạc.',{silver:-3,speech:1}),out('Lời hỏi bị coi là gây chuyện. Bạc không tìm lại được.',{silver:-10,reputation:-3})),
  safe('Lặng lẽ giữ đồ còn lại','Nàng giấu kỹ phần còn lại, chấp nhận khoản bạc đã mất.',{silver:-6,favor:-1})]),
 event('rumor','Lời gièm ngoài cửa son','Một lời đồn mới lan đến chính điện, còn nàng chẳng thể ra ngoài biện bạch.',[
  test('Viết thư tự trình bày','speech',54,out('Lời lẽ chừng mực giúp ngăn chuyện lan thêm, nhưng uy tín vẫn tổn hại.',{favor:-2,reputation:-2}),out('Bức thư bị bóp méo thành lời oán trách.',{favor:-6,reputation:-5,speech:-2})),
  safe('Giữ im lặng','Lời đồn dần lắng xuống, ân điển dành cho nàng cũng nhạt đi.',{favor:-4,reputation:-3})]),
 event('exhaustion','Một ngày kiệt sức','Bụi bẩn và công việc vụn vặt kéo dài từ sáng đến tối. Nàng hoa mắt bên bậc cửa.',[
  safe('Dừng tay nghỉ sớm','Việc còn dang dở, nhưng nàng tránh kiệt sức thêm.',{health:-2,merit:-3}),
  test('Cố dọn nốt gian phòng','luck',52,out('Gian phòng đã sạch; nàng mệt lả.',{health:-5,merit:1}),out('Nàng ngất giữa sân lạnh, mất nhiều ngày mới hồi tỉnh.',{health:-10,beauty:-3}))]),
 event('books','Trang kinh bị ẩm','Mùi ẩm mốc phủ kín chiếc rương gỗ. Những trang kinh nàng chép đã dính vào nhau.',[
  test('Tách từng trang ra hong','intelligence',45,out('Nàng cứu được phần lớn bản kinh, mắt mỏi sau nhiều giờ.',{health:-2,intelligence:1}),out('Giấy rách trong tay, những đoạn đã học cũng dần quên.',{intelligence:-4,art:-2})),
  safe('Chép lại phần còn nhớ','Nàng phải bỏ phần đã hỏng và học lại từ đầu.',{intelligence:-2,art:-1})]),
 event('beam','Tiếng nứt trên mái hiên','Một thanh xà mục phát ra tiếng răng rắc. Rương đồ còn nằm ngay phía dưới.',[
  safe('Lùi vào trong, bỏ lại rương cũ','Mái hiên đổ sập. Nàng an toàn nhưng mất ít đồ dùng.',{silver:-8,art:-2}),
  test('Lao ra cứu rương','luck',65,out('Nàng kéo được rương trước khi xà rơi, vai bị thương.',{health:-7}),out('Thanh xà đổ xuống trước khi nàng kịp lùi lại. Tai nạn khép lại đời nàng.',{},{death:'accident'}),{risk:true})]),
 event('bell','Tiếng chuông xa','Tiếng chuông từ ngôi chùa ngoài thành vọng qua bức tường rêu.',[
  safe('Ngồi nghe hết hồi chuông','Nàng tìm lại chút bình tâm giữa khoảng sân vắng.',{kindness:1,favor:-1}),
  safe('Chép một bài kệ ngắn','Nàng ghi lại đôi dòng, giữ lòng mình khỏi xao động.',{intelligence:1,art:-1})],'neutral'),
 event('paper','Mảnh giấy cuối cùng','Dưới đáy hộp chỉ còn một mảnh giấy sạch. Nàng cân nhắc nên viết hay vẽ.',[
  safe('Vẽ nhành cỏ ngoài hiên','Nàng nhớ lại vài nét bút đã lâu không dùng.',{art:1,merit:-1}),
  safe('Đọc thành tiếng bài thơ cũ','Giọng nói bớt ngập ngừng sau những ngày ít trò chuyện.',{speech:1,favor:-1})],'neutral'),
 event('seed','Mầm xanh trên đất cằn','Luống cây nhỏ nàng chăm cuối cùng cũng nhú lá non.',[
  safe('Chăm thêm chút nước','Một sắc xanh hiếm hoi khiến nàng khỏe khoắn hơn.',{health:3,beauty:1}),
  safe('Ghi lại cách trồng','Nàng giữ lại kinh nghiệm cho mùa sau.',{intelligence:2,kindness:1})],'good'),
 event('herbs','Nắm lá thuốc lành','Một gói lá thuốc sạch được gửi cùng phần cơm, kèm lời nhắn dưỡng sức.',[
  safe('Sắc thuốc theo lời dặn','Cơn đau dịu lại; nàng hồi phục chút sức lực.',{health:5},{cure:true}),
  safe('Để dành dùng khi cần','Nàng dùng một phần nhỏ, sức khỏe khá hơn.',{health:3,intelligence:1})],'good'),
 event('recall','Hoàng đế nhớ người cũ','Một nội thị mang chiếu chỉ đến viện. Hoàng đế nhớ những ngày xưa, cho phép nàng trở lại cung và phục chức.',[
  safe('Nhận chiếu chỉ · Trở về cung','Cửa lãnh cung mở. Nàng được phục chức và trở lại cung viện.',{favor:3},{release:true})],'recall')
];
