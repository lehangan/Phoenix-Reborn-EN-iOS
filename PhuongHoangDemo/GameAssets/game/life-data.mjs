import {HONORIFICS} from './honorific-data.mjs';
import {COLD_EVENTS} from './cold-palace-data.mjs';
export const NON_BIRTH_DOWAGER_TITLES=['Từ An','Từ Ninh','Chiêu Đức','Từ Huệ','Từ Hòa','Từ Khánh','Đoan Ý','Chiêu Ý','Tĩnh An','Ôn Huệ','Khánh An','Từ Minh'].map(h=>h+' Hoàng Thái Hậu');
export const DOWAGER_TITLES=['Thái Hậu','Thánh Mẫu Hoàng Thái Hậu','Mẫu Hậu Hoàng Thái Hậu',...NON_BIRTH_DOWAGER_TITLES];
export const STATS=[
 ['beauty','Dung mạo','Ảnh hưởng ấn tượng đầu, yến tiệc và sự chú ý trong cung.','#bd7b86'],
 ['intelligence','Trí tuệ','Giúp đọc tình thế, tìm chứng cứ và vượt kỳ khảo hạch.','#718f9d'],
 ['art','Tài nghệ','Giúp việc thêu, hội họa, trình diễn và thi tuyển.','#9d83ad'],
 ['speech','Hoạt ngôn','Giúp thuyết phục, thương lượng và tự biện hộ.','#ba965e'],
 ['kindness','Thiện','Tăng cơ hội được giúp đỡ và kết giao chân thành.','#759581'],
 ['malice','Ác','Tăng khả năng dùng mưu hiểm, đồng thời dễ sinh thù oán.','#8e6e7f'],
 ['luck','May mắn','Điều chỉnh vận may trong biến cố và các phép thử.','#bcaa69']
];
export const PHI_RANK=7;
export const IMPERIAL_NOBLE_CONSORT_RANK=8;
export const EMPRESS_RANK=9;
export const RANK_SCHEMA_VERSION=2;
// Existing robe IDs remain stable when a new court rank is inserted.
export const rankRobeIndex=rank=>4+(rank>=EMPRESS_RANK?8:Math.min(rank,PHI_RANK));
export const legacyItemRank=rank=>rank===8?EMPRESS_RANK:rank;
export const RANKS=[
 {name:'Thải nữ',grade:'Chánh bát phẩm',pay:14},
 {name:'Ngự nữ',grade:'Chánh thất phẩm',pay:18},
 {name:'Bảo lâm',grade:'Chánh lục phẩm',pay:24},
 {name:'Tài nhân',grade:'Chánh ngũ phẩm',pay:32},
 {name:'Mỹ nhân',grade:'Chánh tứ phẩm',pay:44},
 {name:'Tiệp dư',grade:'Chánh tam phẩm',pay:58},
 {name:'Cửu tần',grade:'Chánh nhị phẩm',pay:78,titles:['Chiêu nghi','Chiêu dung','Chiêu viện','Tu nghi','Tu dung','Tu viện','Sung nghi','Sung dung','Sung viện',...HONORIFICS.map(h=>h+' Tần')]},
 {name:'Tứ phi',grade:'Chánh nhất phẩm',pay:105,titles:['Quý phi','Thục phi','Đức phi','Hiền phi',...HONORIFICS.filter(h=>!['Thục','Đức','Hiền'].includes(h)).map(h=>h+' Phi')]},
 {name:'Hoàng Quý Phi',grade:'Trên nhất phẩm',pay:120,titles:HONORIFICS.map(h=>h+' Hoàng Quý Phi')},
 {name:'Hoàng hậu',grade:'Chủ vị trung cung',pay:140}
];
export const SERVICE_RANKS=['Cung nữ thường','Cung nữ trưởng','Nữ quan','Tổng quản ma ma'];
export const DEPARTMENTS=[
 {id:'kitchen',name:'Nhà bếp',office:'Thượng Thực cục',skill:'intelligence',task:'Chăm bếp, kiểm thực đơn và chuẩn bị các bữa ăn trong cung.',icon:'tea'},
 {id:'laundry',name:'Giặt giũ',office:'Hoán Y viện',skill:'kindness',task:'Phân loại gấm lụa, giặt phơi và giữ gìn y phục.',icon:'water'},
 {id:'sweeping',name:'Quét dọn',office:'Thượng Tẩm cục',skill:'speech',task:'Quét sân, sửa soạn cung thất và trông coi hành lang.',icon:'broom'},
 {id:'embroidery',name:'Xưởng thêu',office:'Thượng Công cục',skill:'art',task:'Thêu hoa văn, may áo và sửa lễ phục cho nội đình.',icon:'needle'}
];
export const OFFICIALS=[['Huyện úy','Cửu phẩm'],['Huyện lệnh','Thất phẩm'],['Viên ngoại lang','Lục phẩm'],['Lang trung','Ngũ phẩm'],['Thị lang','Tứ phẩm'],['Thượng thư','Tam phẩm'],['Hầu gia','Nhị phẩm'],['Vương gia','Nhất phẩm'],['Thái phó','Nhất phẩm']];
export const COMMON_JOBS=['nông dân','thợ mộc','thợ dệt','người bán trà','thầy thuốc làng','ngư dân','thợ gốm','người bán vải'];
export const MOTHER_JOBS=['thợ thêu','người trồng hoa','thợ dệt lụa','người bán bánh','người hái thuốc','người làm ruộng'];
export {SURNAMES,NAMES,MALE_NAMES} from './names.mjs';
export const PLANS=[
 {id:'duty',name:'Chuyên tâm bổn phận',desc:'Công trạng +3 · Uy danh +1 · Sức khỏe −1',icon:'palace'},
 {id:'study',name:'Đọc sách, học lễ',desc:'Trí tuệ +2 · Hoạt ngôn +1 · 3 bạc/tháng',icon:'book',cost:3},
 {id:'art',name:'Luyện tài nghệ',desc:'Tài nghệ +2 · 3 bạc/tháng',icon:'brush',cost:3},
 {id:'social',name:'Kết giao trong cung',desc:'Hoạt ngôn +2 · Nhân mạch +1',icon:'heart'},
 {id:'rest',name:'Tĩnh dưỡng',desc:'Sức khỏe +6 · Đố kỵ −1 · Chậm tích công',icon:'moon'},
 {id:'charity',name:'Giúp người khó khăn',desc:'Thiện +2 · Uy danh +2 · 6 bạc/tháng',icon:'lotus',cost:6},
 {id:'scheme',name:'Thăm dò thế cục',desc:'Ác +2 · Trí tuệ +1 · Đố kỵ +2',icon:'fan'}
];
export const ACHIEVEMENTS=[
 ['first','Cánh cửa son','Bắt đầu cuộc đời đầu tiên.','palace'],
 ['kitchen','Giữ lửa cung đình','Từng được phân vào nhà bếp.','tea'],
 ['laundry','Gấm vóc qua tay','Từng được phân vào Hoán Y viện.','water'],
 ['sweeping','Dấu chân hiên ngọc','Từng được phân việc quét dọn.','broom'],
 ['embroidery','Một đường kim','Từng được phân vào xưởng thêu.','needle'],
 ['candidate','Con nhà danh giá','Sinh vào gia đình quan lại.','scroll'],
 ['painter','Nét bút như thần','Đạt ít nhất 90 điểm giống mẫu trong một kỳ thi.','brush'],
 ['baolin','Một bước Bảo lâm','Được xếp Bảo lâm ngay trong tuyển tú.','crown'],
 ['promotion','Đường mây mở lối','Được thăng một bậc trong cung.','arrow'],
 ['maidToConsort','Từ áo vải đến gấm hoa','Từ cung nữ trở thành người có phẩm vị.','dress'],
 ['chief','Giữ việc nội đình','Đạt bậc Tổng quản ma ma.','palace'],
 ['empress','Phượng nghi thiên hạ','Đạt ngôi Hoàng hậu.','phoenix'],
 ['firstChild','Tiếng khóc trong cung','Đón người con đầu tiên chào đời.','heart'],
 ['bothChildren','Nếp tẻ đủ đầy','Có cả hoàng tử và công chúa trong một đời.','heart'],
 ['largeFamily','Mãn đường hoàng tự','Có ít nhất ba người con trong một đời.','palace'],
 ['princessMarriage','Ngày con xuất giá','Có công chúa trưởng thành được ban hôn.','lotus'],
 ['princeInvestiture','Vinh hiển tông thất','Có hoàng tử được phong Vương gia hoặc Thân vương.','crown'],
 ['crownPrince','Mẫu thân Đông cung','Có con được lập làm Thái tử.','crown'],
 ['empressDowager','Mẫu nghi tân triều','Được tân đế tôn làm Hoàng Thái Hậu.','phoenix'],
 ['decade','Mười năm dưới mái son','Sống trong một đời ít nhất 120 tháng.','moon'],
 ['longLife','Thất tuần bình an','Sống đến 70 tuổi.','lotus'],
 ['kind','Tâm lành giữa cung sâu','Thực hiện 12 việc thiện trong một đời.','heart'],
 ['schemer','Người giấu quân cờ','Thành công 8 lần dùng mưu trong một đời.','fan'],
 ['rich','Hòm bạc đầy','Có ít nhất 1.000 bạc trong một đời.','coin'],
 ['recovery','Qua cơn sinh tử','Bình phục 3 lần bệnh trong một đời.','health'],
 ['friends','Không còn cô độc','Có 3 người đạt thiện cảm từ 60 trở lên.','heart'],
 ['artist','Tài danh trong cung','Tài nghệ đạt 95.','brush'],
 ['wisdom','Trí tuệ hơn người','Trí tuệ đạt 95.','book'],
 ['freedom','Bước qua tường son','Được xuất cung hoặc rời cung thành công.','gate'],
 ['wardrobe','Ngũ thập cẩm y','Sưu tập đủ 50 bộ y phục qua các đời.','dress'],
 ['fiveLives','Năm lần hoa nở','Bắt đầu kiếp thứ 5.','rebirth'],
 ['tenLives','Mười giấc phù sinh','Bắt đầu kiếp thứ 10.','rebirth'],
 ['allEndings','Sử sách muôn màu','Mở khóa 8 kết cục khác nhau.','book']
];
export const ENDINGS=[
 ['rescueEmperor','Xả thân cứu giá','Nàng hy sinh đỡ kiếm cho hoàng đế, lưu danh nghĩa liệt.'],
 ['lakeAmbush','Sóng dữ ngự hồ','Nàng và hoàng đế cùng tử nạn trong cuộc tập kích trên hồ.'],
 ['longevity','Thọ chung chính tẩm','Nàng ra đi khi thọ số đã tròn, sau một đời dài nhiều biến đổi.'],
 ['disease','Hoa rụng vì bệnh','Bệnh tật khép lại cuộc đời nàng; những điều đã làm vẫn còn trong ký ức người sống.'],
 ['punishment','Án dưới cửa son','Một bản án đã định đoạt số phận. Cung đình không cho nàng thêm cơ hội.'],
 ['childbirth','Khó sinh','Nàng không qua khỏi cơn trở dạ.'],
 ['accident','Một đêm biến cố','Tai biến bất ngờ làm câu chuyện dừng lại giữa chừng.'],
 ['poison','Hương độc sau rèm','Một lần trúng độc khép lại đời nàng giữa chốn cung đình.'],
 ['exhaustion','Áo vải bạc màu','Sức lực cạn kiệt sau những tháng ngày mỏi mệt.'],
 ['empress','Phượng ghi sử sách','Nàng từng ngồi ở ngôi trung cung, để tên mình lại giữa những trang sử.'],
 ['chief','Một đời chưởng sự','Từ công việc nhỏ, nàng đã trở thành người trông coi nội đình.'],
 ['artist','Mực thơm còn mãi','Tài nghệ của nàng được nhớ đến lâu hơn những lời tranh giành.'],
 ['benevolent','Người giữ lòng lành','Nàng để lại lòng biết ơn trong nhiều người từng được mình giúp.'],
 ['ruthless','Bóng người sau rèm','Nàng hiểu lòng người, biết dùng mưu và để lại cả quyền thế lẫn những oán hờn.'],
 ['free','Ngoài bức tường son','Nàng sống phần đời còn lại bên ngoài cung, tự chọn những tháng ngày của mình.'],
 ['coldpalace','Trăng lạnh cô cung','Những năm cuối trôi qua trong cảnh bị giam lỏng, xa tiếng nhạc và yến tiệc.'],
 ['wealth','Gấm vóc đầy rương','Nàng dành dụm được một gia sản, dù danh phận không kể hết câu chuyện.'],
 ['quiet','Một đời vô danh','Không được ghi trong sử, nàng vẫn có một đời với những lựa chọn của riêng mình.']
];

import {FIRE_CHOICES,PALACE_INCIDENTS,randomizeQuietChoices} from './encounters.mjs';
const good=(text,effects={},extra={})=>({text,effects,...extra});
const choice=(label,stat,dc,success,failure,extra={})=>({label,stat,dc,success,failure,...extra});
const safe=(label,text,effects={},extra={})=>choice(label,null,0,good(text,effects,extra));
export const EVENTS=[
 {id:'spill',title:'Chén trà nghiêng',group:'duty',text:'Trong lúc dâng trà ở {office}, tay áo một người quệt vào khay. Chén trà sắp rơi ngay trước mặt nữ quan.',choices:[choice('Nhanh tay giữ lấy khay','luck',42,good('Nàng giữ được khay trà. Nữ quan ghi nhận sự nhanh nhẹn.',{merit:5,reputation:2}),good('Nước trà đổ ra thảm. Nàng bị trừ bổng lộc.',{silver:-5,envy:2})),safe('Nhận trách nhiệm và xin dọn sạch','Nàng cúi đầu nhận lỗi, tự lau sạch vết trà. Chuyện lớn hóa nhỏ.',{kindness:1,merit:1}),choice('Giải thích rằng có người va vào mình','speech',50,good('Lời giải thích rành mạch khiến nữ quan không trách phạt.',{speech:1}),good('Nữ quan cho rằng nàng đang đổ lỗi.',{reputation:-3,envy:3}))]},
 {id:'ledger',title:'Một con số bất thường',group:'duty',text:'Sổ chi tiêu của {office} có một dòng bị sửa. Chỉ mình nàng nhận ra số mực chưa khô.',choices:[choice('Đối chiếu các trang sổ','intelligence',48,good('Nàng tìm được khoản chi ghi nhầm, tránh thất thoát cho cục.',{merit:8,intelligence:1,reputation:3}),good('Nàng chưa đủ hiểu biết để kết luận. Mất một buổi công.',{merit:-1})),safe('Báo riêng cho nữ quan','Nữ quan nhận sổ, ghi nhớ sự cẩn thận của nàng.',{merit:3}),choice('Dùng chuyện này để đổi lợi ích','malice',58,good('Người sửa sổ lặng lẽ đưa nàng một túi bạc.',{silver:22,malice:3,envy:5},{scheme:true}),good('Lời đe dọa bị tố cáo. Nàng bị đưa vào diện dò xét.',{envy:15,reputation:-5}))]},
 {id:'sickfriend',title:'Người cùng phòng phát sốt',group:'kind',text:'{friend} nằm co dưới tấm chăn mỏng. Ngày mai vẫn còn rất nhiều việc phải làm.',choices:[safe('Dành bạc mua thuốc giúp nàng','Nàng chia phần bổng lộc ít ỏi. Người bạn không quên tấm lòng ấy.',{kindness:3,bond:12},{cost:12,charity:true}),choice('Xin nữ quan cho nàng ấy nghỉ','speech',45,good('Lời xin được chấp thuận. Người bệnh được nghỉ một hôm.',{bond:8,kindness:2,reputation:2},{charity:true}),good('Nữ quan không đồng ý, nhưng người bạn vẫn biết nàng đã cố gắng.',{bond:3})),safe('Để nàng ấy tự tìm cách','Nàng giữ sức cho mình, song căn phòng lặng hơn mọi hôm.',{bond:-6,malice:1})]},
 {
  id:'sick-matron', title:'Ma ma cũ lâm bệnh', group:'kind',
  text:'Ma ma từng chỉ dạy bạn những ngày đầu vào cung nay đã có tuổi. Bà lâm bệnh mấy hôm, tiền dành dụm cũng sắp cạn.',
  choices:[
   safe('Gửi 12 bạc mua thuốc','Nhờ khoản bạc bạn gửi, ma ma mua được thuốc. Bà nhờ chuyển lời cảm ơn vì bạn vẫn nhớ đến bà.',{kindness:3},{cost:12,charity:true}),
   safe('Đến thăm và hỏi han','Bạn ghé thăm, rót cho bà chén nước ấm và ngồi nghe bà kể chuyện cũ. Ma ma vui vì còn có người nhớ tới mình.',{kindness:1}),
   safe('Bỏ qua chuyện này','Bạn nghe xong rồi quay lại lo việc của mình. Ma ma đành nhờ một người quen khác giúp đỡ.',{malice:1})
  ]
 },
 {id:'lostpin',title:'Chiếc trâm ở bậc thềm',group:'fortune',text:'Một chiếc trâm ngọc rơi bên bậc đá. Người qua lại đều đang vội.',choices:[safe('Mang nộp cho quản sự','Chủ nhân tìm lại được trâm và gửi nàng một lời cảm tạ.',{kindness:2,reputation:4,merit:2},{charity:true}),choice('Tìm chủ nhân để xin thưởng','speech',40,good('Chủ nhân trâm thưởng nàng 18 bạc.',{silver:18,reputation:1}),good('Nàng bị nghi ngờ đã giữ trâm từ trước.',{envy:4})),choice('Lặng lẽ giữ lại','malice',52,good('Chiếc trâm được đổi thành bạc, nhưng nàng phải giữ kín chuyện này.',{silver:32,malice:3,envy:4},{scheme:true}),good('Một cung nữ trông thấy và báo lại.',{silver:-10,envy:12}))]},
 {id:'rumor',title:'Lời đồn sau rèm',group:'intrigue',text:'Có lời đồn rằng nàng được thiên vị. {rival} cố ý kể lại giữa một nhóm người.',choices:[choice('Bình tĩnh hỏi rõ nguồn tin','intelligence',52,good('Câu chuyện không đứng vững trước vài câu hỏi đơn giản.',{reputation:5,envy:-4}),good('Nàng không tìm được đầu mối. Lời đồn tiếp tục lan.',{envy:5})),choice('Đáp lại bằng lời mềm mỏng','speech',45,good('Nàng không để người khác kéo mình vào tranh cãi.',{reputation:3,envy:-2}),good('Lời nói bị hiểu là chối quanh.',{reputation:-2})),choice('Tung tin bất lợi về đối phương','malice',58,good('Đối phương phải lo tự biện hộ, không còn theo sát nàng.',{malice:4,envy:7,rivalry:8},{scheme:true}),good('Người ta truy ra nàng là nguồn tin mới.',{envy:15,reputation:-7}))]},
 {id:'library',title:'Trang sách còn mở',group:'study',text:'Thư phòng vắng người. Một quyển sách về điển lễ nằm mở trên bàn.',choices:[choice('Ghi nhớ điều vừa đọc','intelligence',38,good('Nàng hiểu thêm một phép tắc hữu ích trong cung.',{intelligence:3,merit:2}),good('Những câu chữ khó khiến nàng nhớ chưa trọn.',{intelligence:1})),safe('Hỏi nữ quan nghĩa của một đoạn','Câu hỏi đúng lúc mở ra một buổi học nhỏ.',{intelligence:1,speech:1,bond:2}),safe('Đóng sách và trở lại công việc','Nàng không muốn bị hiểu lầm là tự tiện.',{merit:2})]},
 {id:'music',title:'Tiếng đàn vướng gió',group:'art',text:'Một buổi tập nhạc thiếu người đọc nhịp. Nữ quan nhìn quanh tìm người thay.',choices:[choice('Xung phong thử sức','art',48,good('Nàng bắt đúng nhịp, được mời dự các buổi tập sau.',{art:3,reputation:4,favor:3}),good('Nhịp đàn lệch vài lần. Nàng nhớ ra mình cần luyện thêm.',{art:1,reputation:-1})),safe('Giúp sửa soạn phòng tập','Nàng yên lặng làm tốt phần việc của mình.',{merit:3}),choice('Tiến cử một người bạn','kindness',42,good('Người bạn làm rất tốt và nhắc đến lòng tốt của nàng.',{bond:8,reputation:2,kindness:1}),good('Buổi biểu diễn chưa trọn, nhưng tình bạn không thay đổi.',{bond:3}))]},
 {id:'gift',title:'Một món quà khó hiểu',group:'intrigue',minMonths:6,text:'{rival} gửi đến một hộp hương, không nói rõ lý do. Dấu niêm phong dường như đã bị mở.',choices:[choice('Nhờ người kiểm tra trước','intelligence',48,good('Đây là loại hương không được phép dùng ngoài chính điện. Nàng tránh một lỗi lớn.',{intelligence:2,envy:-4}),good('Chưa rõ nguồn gốc, nàng quyết định cất hộp đi.',{envy:1})),safe('Trả lại và cảm ơn','Nàng giữ khoảng cách vừa đủ, không để ai nắm được sơ hở.',{reputation:1}),choice('Dùng món quà để tạo thiện cảm','luck',62,good('Đó chỉ là phép thử. Cách đáp lễ khiến đối phương bớt đề phòng.',{bond:6}),good('Mùi hương khiến nàng khó chịu và bị hỏi tội dùng đồ cấm.',{health:-12,envy:10}))]},
 {id:'homeletter',title:'Thư từ cố hương',group:'family',text:'Thư nhà kể rằng mẹ đang lo một khoản chi bất ngờ. Nàng đọc đi đọc lại vài dòng mực nhòe.',choices:[safe('Gửi 15 bạc về nhà','Một phần khó khăn được giải quyết. Nàng ngủ ngon hơn đêm ấy.',{kindness:3,health:2},{cost:15,charity:true}),safe('Viết thư an ủi và hẹn giúp sau','Lời hồi âm khiến người nhà biết nàng vẫn bình an.',{kindness:1,speech:1}),safe('Giữ bạc cho đường đi của mình','Nàng cất thư xuống đáy hòm.',{malice:2})]},
 {id:'rain',title:'Cơn mưa bất chợt',group:'weather',text:'Mưa đổ xuống khi mọi người đang chuyển đồ qua sân. Một hòm sách và mấy cuộn lụa còn ở ngoài.',choices:[choice('Cùng mọi người cứu đồ khỏi mưa','luck',42,good('Nàng kéo được hòm sách vào hiên, không để ướt trang nào.',{merit:6,kindness:1}),good('Đồ được cứu nhưng nàng bị lạnh.',{merit:3,health:-7})),safe('Mang khăn và nước ấm đến','Nàng giúp người vừa dầm mưa, không ai trách nàng.',{kindness:2,bond:3},{charity:true}),safe('Chờ dưới mái hiên','Cơn mưa qua đi. Hôm nay nàng tránh được một lần ướt áo.',{health:2})]},
 {id:'portrait',title:'Người vẽ trong điện',group:'art',text:'Họa sư đang vẽ bình phong. Ông thiếu một người đủ khéo để nghiền mực và chỉnh nét cành hoa.',choices:[choice('Xin giúp hoàn thiện cành hoa','art',53,good('Họa sư khen nét bút mềm và tặng nàng một ít tiền công.',{art:3,silver:12,reputation:4}),good('Nàng làm nét cành hơi thô. Họa sư kiên nhẫn sửa lại.',{art:1})),safe('Chỉ giúp mài mực','Trong lúc mài mực, nàng học được cách giữ bút.',{art:1,merit:2}),safe('Đứng xem cách phối màu','Nàng nhớ một sắc xanh mới.',{art:2})]},
 {id:'compliment',title:'Một ánh nhìn chú ý',group:'beauty',text:'Giữa buổi lễ, nữ quan chủ lễ dừng mắt ở bộ y phục và dáng đứng của nàng.',choices:[choice('Giữ lễ nghi thật điềm đạm','beauty',50,good('Sự chỉn chu khiến nàng được chọn đứng trong hàng nghi lễ.',{favor:5,reputation:4}),good('Không có điều gì đặc biệt xảy ra. Nàng tiếp tục buổi lễ.',{merit:1})),choice('Trả lời câu hỏi bằng một câu thơ','speech',52,good('Câu trả lời khiến mọi người mỉm cười.',{favor:4,reputation:4,speech:1}),good('Câu thơ chưa hợp hoàn cảnh, nàng vội sửa lời.',{reputation:-2})),safe('Nhường vị trí cho người khác','Nàng không muốn nổi bật hôm nay.',{kindness:1,envy:-2})]},
 {id:'bribe',title:'Túi bạc dưới khay',group:'intrigue',minMonths:8,text:'Một nội thị nhờ nàng chuyển lời không đúng quy trình, rồi đặt một túi bạc xuống khay.',choices:[safe('Từ chối và nhắc đúng phép tắc','Túi bạc được thu lại. Nàng không mắc nợ ai.',{reputation:4,kindness:1,envy:-2}),choice('Nhận bạc, giữ kín việc chuyển lời','malice',62,good('Việc trót lọt. Nàng có thêm tiền và một mối quan hệ khó gọi tên.',{silver:45,malice:4,envy:6},{scheme:true}),good('Chuyện bị phát giác, nàng bị phạt bổng lộc và theo dõi.',{silver:-15,reputation:-6,envy:18})),choice('Hỏi thêm để dò lai lịch người nhờ','intelligence',55,good('Nàng tìm ra người đứng sau, rồi khéo léo thoái thác.',{intelligence:2,merit:5}),good('Người kia nhận ra nàng đang dò xét.',{rivalry:5,envy:4}))]},
 {id:'accusation',title:'Gấm quý thất lạc',group:'intrigue',minMonths:10,text:'Một cuộn gấm biến mất. Người cuối nhìn thấy nó nói rằng nàng đã đi ngang kho.',choices:[choice('Xin đối chiếu sổ kho và người trực','intelligence',58,good('Gấm đã được chuyển sang điện khác. Nàng được minh oan.',{reputation:7,envy:-8,intelligence:1}),good('Chứng cứ chưa rõ. Nàng bị ghi tên vào sổ điều tra.',{envy:15})),choice('Nhờ người quen làm chứng','kindness',54,good('Một người từng được nàng giúp nhớ rõ nàng ở đâu.',{bond:5,envy:-5,kindness:1}),good('Không ai dám đứng ra. Nàng chịu thêm áp lực.',{envy:10})),safe('Chịu trách nhiệm quản lý lỏng lẻo','Nàng bị trừ một phần bổng lộc, nhưng cuộc điều tra không kéo dài.',{silver:-15,merit:-3,envy:2})]},
 {id:'market',title:'Phiên đổi đồ trong cung',group:'fortune',text:'Cung nhân đổi vài món đồ nhỏ vào cuối tháng. Một người bán giấy, người khác bán chỉ màu.',choices:[safe('Mua giấy và mực để học','Những tối sau, nàng có đủ giấy để luyện chữ và vẽ.',{art:3,intelligence:1},{cost:10}),choice('Mặc cả món đồ mình cần','speech',44,good('Nàng mua được với giá tốt rồi đổi phần dư lấy bạc.',{speech:2,silver:8}),good('Nàng mua đắt hơn dự tính.',{silver:-5,speech:1})),safe('Chỉ dạo một vòng','Nàng nghe vài câu chuyện mới trong cung.',{bond:2})]},
 {id:'poetry',title:'Vế thơ bên hồ',group:'study',text:'Một tờ giấy ghi vế thơ chưa hoàn chỉnh được truyền qua những người đang nghỉ bên hồ.',choices:[choice('Viết một vế đối','intelligence',52,good('Vế đối thanh thoát, được chép vào sổ thơ.',{reputation:5,intelligence:2,favor:3}),good('Vế đối chưa chỉnh. Nàng nhận một lời góp ý hữu ích.',{intelligence:1})),choice('Đọc thành lời cho mọi người nghe','speech',45,good('Giọng đọc rõ ràng khiến buổi nghỉ thêm vui.',{speech:2,bond:4}),good('Nàng đọc vấp vài chỗ nhưng không ai nặng lời.',{speech:1})),safe('Nghe và ghi nhớ','Nàng lặng lẽ chép lại câu mình thích.',{art:1})]},
 {id:'fire',title:'Khói sau cửa kho',group:'danger',minMonths:12,text:'Khói bốc lên từ góc kho. Chuông báo chưa kịp vang, một người vẫn còn ở gần cửa trong.',choices:FIRE_CHOICES},
 {id:'winter',title:'Đêm gió lùa',group:'weather',text:'Cửa sổ đóng không kín. Nàng nghe tiếng gió len qua bức rèm mỏng suốt đêm.',choices:[safe('Sửa lại khung cửa và nghỉ sớm','Nàng ngủ một giấc yên, giữ được sức khỏe.',{health:6}),safe('Mua thêm chăn cho mình và bạn','Căn phòng ấm hơn, cả người bạn cũng ngủ ngon.',{health:8,bond:6,kindness:2},{cost:12,charity:true}),choice('Vẫn thức khuya hoàn thành việc','intelligence',50,good('Việc xong đúng hạn, nhưng nàng mệt đi một chút.',{merit:6,health:-4}),good('Nàng vừa mệt vừa không hoàn thành hết công việc.',{health:-10}))]},
 {id:'fairness',title:'Phần việc không đều',group:'duty',text:'Người mới được giao quá nhiều việc. Mọi người đều nhận thấy nhưng chưa ai lên tiếng.',choices:[choice('Đề nghị chia lại công việc','speech',48,good('Quản sự đồng ý sửa lịch. Người mới nhìn nàng đầy biết ơn.',{reputation:5,bond:7,kindness:2},{charity:true}),good('Quản sự không vui vì bị góp ý trước đám đông.',{envy:4,kindness:1})),safe('Âm thầm làm giúp một phần','Nàng mệt hơn, nhưng người mới không còn đơn độc.',{health:-3,kindness:3,bond:6},{charity:true}),safe('Giữ nguyên việc của mình','Mọi người lại cúi xuống làm việc.',{merit:2,malice:1})]},
 {id:'rivalhelp',title:'Đối thủ cần người giúp',group:'kind',text:'{rival} gặp lỗi trong công việc, chỉ nàng biết cách sửa. Nàng ấy ngập ngừng nhìn sang.',choices:[choice('Chỉ cho nàng ấy cách sửa','kindness',40,good('Một chút thiện ý hóa giải phần nào sự ganh ghét.',{rivalry:-12,reputation:3,kindness:2},{charity:true}),good('Đối phương vẫn dè chừng, nhưng nhận sự giúp đỡ.',{rivalry:-3,kindness:1})),choice('Đổi sự giúp đỡ lấy một lời hứa','speech',52,good('Đối phương đồng ý, nàng có thêm một mối nợ ân tình.',{bond:8,merit:4}),good('Cuộc thương lượng thất bại.',{rivalry:4})),choice('Để sai sót lộ ra trước nữ quan','malice',56,good('Đối phương bị trách, nàng nhận phần việc quan trọng hơn.',{merit:6,malice:3,rivalry:10,envy:3},{scheme:true}),good('Nữ quan nhận ra nàng cố ý giấu cách sửa.',{reputation:-6,envy:8}))]},
 {id:'audience',title:'Lời hỏi giữa buổi chầu',group:'court',where:'consort',text:'Trong một buổi nghị sự nội đình, nàng được hỏi cách tiết giảm chi tiêu mà vẫn đủ lễ nghi.',choices:[choice('Đề xuất dựa trên sổ chi tiêu','intelligence',58,good('Ý kiến thiết thực được ghi nhận.',{favor:8,merit:8,reputation:5}),good('Một vài con số chưa khớp khiến lời đề xuất thiếu sức nặng.',{favor:-2})),choice('Trình bày khéo léo, giữ thể diện mọi người','speech',55,good('Lời nói vừa phải giúp đề xuất được nghe trọn.',{favor:6,reputation:5}),good('Cách nói chưa rõ ý, buổi chầu chuyển sang việc khác.',{favor:-1})),safe('Xin học hỏi rồi trả lời sau','Sự thận trọng không đem lại phần thưởng, nhưng cũng tránh sai sót.',{intelligence:1,envy:-1})]},
 {id:'banquet',title:'Yến tiệc mùa hoa',group:'beauty',where:'consort',text:'Đại điện thắp đèn. Mỗi người được chọn một cách góp vui cho buổi yến.',choices:[choice('Trình diễn một khúc nhạc','art',58,good('Khúc nhạc tròn trịa, cả điện lắng nghe.',{favor:9,reputation:6,art:1}),good('Nàng quá hồi hộp nên chưa thể hiện hết điều đã tập.',{favor:-2,art:1})),choice('Xuất hiện với phong thái thanh nhã','beauty',60,good('Y phục và lễ nghi của nàng để lại ấn tượng đẹp.',{favor:8,reputation:4,envy:2}),good('Nàng hòa vào buổi tiệc như bao người khác.',{reputation:1})),safe('Giúp chăm sóc khách lớn tuổi','Buổi yến trôi qua yên ổn, có người nhớ đến sự chu đáo.',{kindness:2,reputation:3},{charity:true})]},
 {id:'maidexam',title:'Khảo hạch nữ quan',group:'promotion',where:'maid',minMonths:12,cooldown:18,text:'Cục tổ chức khảo hạch về quy trình, tính toán và phép tắc. Đây là cơ hội để nàng được giao việc cao hơn.',choices:[choice('Dự khảo hạch','intelligence',62,good('Nàng vượt qua bài khảo, được đề bạt thêm một bậc.',{merit:6,reputation:5},{servicePromote:true}),good('Bài khảo chưa đạt. Nàng được phép thử lại ở một kỳ sau.',{intelligence:2})),safe('Xin học thêm trước kỳ sau','Nàng xem đề cũ và nhận ra phần mình còn thiếu.',{intelligence:3}),choice('Nhờ quan hệ hỗ trợ hồ sơ','speech',66,good('Hồ sơ của nàng được chú ý, công trạng tăng thêm.',{merit:12,envy:2}),good('Việc vận động khiến vài người không hài lòng.',{envy:7}))]},
 {id:'festival',title:'Đèn hoa đêm hội',group:'fortune',text:'Đêm hội, cung nhân được nghỉ sớm. Những chiếc đèn giấy soi nhẹ trên mặt nước.',choices:[safe('Cùng bạn thả đèn và trò chuyện','Nàng có một buổi tối không phải lo nghĩ.',{health:4,bond:6,kindness:1}),choice('Ghi lại cảnh đẹp bằng một bài thơ','art',42,good('Bài thơ được truyền tay, mang lại chút tiếng tăm.',{art:2,reputation:4}),good('Nàng giữ bài thơ cho riêng mình.',{art:1})),safe('Nghỉ một đêm thật sớm','Tiếng nhạc xa dần. Nàng ngủ yên.',{health:8})]},
 {id:'inheritance',title:'Một phần bạc từ nhà',group:'family',minMonths:24,cooldown:36,text:'Gia đình gửi vào một ít bạc dành dụm được sau mùa làm ăn thuận lợi.',choices:[safe('Giữ lại để phòng khi khó khăn','Nàng cất bạc vào hòm và viết thư cảm tạ.',{silver:35,health:2}),safe('Chia một phần cho người đang túng thiếu','Bạc không còn nhiều, nhưng lòng nàng nhẹ hơn.',{silver:15,kindness:4,reputation:4},{charity:true}),safe('Mua sách và giấy tốt','Những món học cụ giúp nàng tiến bộ.',{silver:5,intelligence:3,art:3})]},
 {id:'illness',title:'Cơn bệnh đầu mùa',group:'illness',text:'Nàng thức dậy với người nóng ran và bước chân nặng hơn thường lệ. Cần quyết định cách chăm sóc mình.',choices:[safe('Mời y quan chữa trị','Y quan kê thuốc và dặn nghỉ. Nàng dần bình phục.',{health:18},{cost:18,cure:true}),choice('Dùng kinh nghiệm đã học để tĩnh dưỡng','intelligence',52,good('Nàng chăm sóc đúng cách và vượt qua cơn bệnh.',{health:10,intelligence:1},{cure:true}),good('Bệnh kéo dài hơn nàng tưởng.',{health:-12},{illness:true})),safe('Vẫn cố làm việc','Nàng làm xong phần việc nhưng bệnh nặng thêm.',{health:-15,merit:4},{illness:true})]},
 {id:'hearing',title:'Lệnh triệu tra',group:'hearing',text:'Đố kỵ đã chồng chất. Nàng bị gọi đến giải trình về những lời tố cáo và các sai sót trước đây.',choices:[choice('Trình bày chứng cứ theo từng việc','intelligence',70,good('Các lời buộc tội không đủ chắc chắn. Nàng được trở về.',{envy:-35,reputation:4}),good('Nàng không giải thích được các điểm mâu thuẫn.',{envy:8,health:-18},{punishment:true})),choice('Xin người có uy tín nói giúp','speech',74,good('Một người đứng ra bảo đảm. Nàng được giảm trách.',{envy:-25,silver:-10}),good('Không ai sẵn lòng đứng về phía nàng.',{health:-15,envy:10},{punishment:true})),safe('Nhận lỗi, xin chịu phạt nhẹ','Nàng bị giáng bậc và quản thúc. Ít nhất, vẫn còn ngày mai.',{health:-12,silver:-30,envy:-20},{demote:true,prison:3})]},
 {id:'specialselection',title:'Một lần đặc tuyển',group:'selection',where:'maid',minMonths:24,cooldown:30,text:'Nội đình mở đợt tuyển người có tài nghệ trong các cục. Cung nữ đủ công trạng cũng có thể dự thi họa.',choices:[safe('Xin dự thi họa','Nàng nhận giấy bút và bước vào kỳ tuyển.',{},{exam:'selection'}),safe('Chọn tiếp tục con đường nữ quan','Nàng muốn tiến lên bằng việc quản lý và chuyên môn.',{merit:8,intelligence:2})]},
 {id:'paintingcontest',title:'Hội họa nội đình',group:'art',minMonths:6,cooldown:12,text:'Một kỳ thi vẽ nhỏ được tổ chức. Đề thi sẽ được bốc ngẫu nhiên khi nàng nhận giấy.',choices:[safe('Nhận giấy, dự thi','Nàng chuẩn bị bút mực.',{},{exam:'art'}),safe('Đứng xem để học hỏi','Nàng học được một cách bố cục mới.',{art:2})]},
 {id:'promotion',title:'Sắc chỉ xét công',group:'promotion',where:'consort',minMonths:12,cooldown:18,text:'Công trạng và uy danh của nàng đã được ghi vào sổ xét phẩm. Một cuộc khảo hạch đang chờ.',choices:[choice('Dự khảo hạch lễ nghi và tài học','intelligence',65,good('Nàng được chuẩn y thăng thêm một bậc.',{favor:4,reputation:6},{promote:true}),good('Hồ sơ được giữ lại để xét ở kỳ sau.',{intelligence:2})),choice('Dùng tài nghệ để chứng tỏ mình','art',68,good('Tài nghệ thuyết phục được người chấm khảo.',{favor:5,reputation:5},{promote:true}),good('Màn trình bày chưa đạt yêu cầu của phẩm vị mới.',{art:2})),safe('Tạm nhường cơ hội, giữ mình yên ổn','Nàng chọn một bước chậm.',{envy:-5,kindness:1})]},
 {id:'release',title:'Danh sách xuất cung',group:'release',where:'maid',minAge:25,minMonths:120,cooldown:24,text:'Đến kỳ xét cho cung nhân lâu năm trở về quê. Tên nàng đủ điều kiện được ghi vào danh sách.',choices:[safe('Xin xuất cung, bắt đầu đời tự do','Nàng nhận tiền lộ phí, bước qua cửa son. Cuộc đời vẫn tiếp tục ngoài cung.',{silver:60,health:8},{leave:true}),safe('Ở lại, tiếp tục công việc','Nàng chọn con đường quen thuộc, nhưng lần này là do tự mình quyết.',{merit:10,reputation:3})]},
 {id:'escape',title:'Cánh cổng hé mở',group:'danger',minAge:18,minMonths:36,cooldown:36,text:'Trong lúc đổi ca, một lối ra ít người canh gác xuất hiện. Nàng có thể thử rời cung, nhưng cái giá nếu thất bại không nhỏ.',choices:[choice('Đánh cược một lần để rời cung','luck',76,good('Nàng vượt qua cổng, bắt đầu cuộc sống mới ở một trấn xa.',{health:-8},{leave:true}),good('Nàng bị giữ lại, chịu quản thúc và giáng bậc.',{health:-20,envy:20},{demote:true,prison:6})),safe('Quay lại trước khi ai phát hiện','Nàng chưa muốn đánh đổi mọi thứ.',{envy:-2})]},
 {id:'oldfriend',title:'Gặp lại người xưa',group:'free',where:'free',text:'Ở phiên chợ, nàng gặp một người từng làm việc trong cung. Hai người nhận ra nhau sau phút ngỡ ngàng.',choices:[safe('Mời người ấy một chén trà','Những chuyện cũ giờ nghe đã nhẹ hơn.',{health:5,kindness:1}),choice('Cùng mở một việc buôn bán nhỏ','speech',52,good('Việc làm ăn có lãi, nàng dành thêm được ít bạc.',{silver:30,reputation:3}),good('Lần thử chưa thuận, nàng chịu một khoản lỗ nhỏ.',{silver:-12})),safe('Kể lại chuyện cung đình cho trẻ nhỏ','Những bài học được truyền lại bằng lời kể bình dị.',{intelligence:1,kindness:2})]},
 {id:'freework',title:'Một nghề ngoài cung',group:'free',where:'free',text:'Có người nhờ nàng sửa y phục, dạy chữ hoặc vẽ một bức tranh. Những năm trong cung hóa thành một nghề.',choices:[choice('Nhận việc bằng tài nghệ của mình','art',45,good('Khách hài lòng, mang theo thêm lời giới thiệu.',{silver:25,art:1,reputation:2}),good('Công việc khó hơn dự tính, nàng vẫn nhận được ít tiền công.',{silver:5})),choice('Mở lớp dạy chữ nhỏ','intelligence',45,good('Vài học trò chăm chỉ tìm đến.',{silver:18,kindness:2}),good('Lớp còn vắng, nàng kiên nhẫn chuẩn bị bài.',{intelligence:1})),safe('Giữ ngày hôm nay để nghỉ ngơi','Một ngày bình dị, tự do và không có tiếng gọi từ trong điện.',{health:7})]}
];
// Work assignments have their own recurring incidents, rather than merely changing a label.
const work=[
 ['kitchen','Nồi canh cần cứu','Món canh của bữa yến có vị chưa đúng. Nàng còn ít thời gian để sửa.','intelligence'],
 ['laundry','Vết mực trên gấm','Một vết mực xuất hiện trên áo lụa quý vừa được chuyển đến.','intelligence'],
 ['sweeping','Khách lạ ngoài hiên','Một người đi lạc qua khu vực cần giữ yên tĩnh. Nàng được yêu cầu hướng dẫn.','speech'],
 ['embroidery','Nét thêu còn thiếu','Đường thêu trên lễ phục bị lệch, nhưng giờ giao áo đang đến gần.','art']
];
for(const [dept,title,text,stat] of work)EVENTS.push({id:'work-'+dept,title,text,department:dept,where:'maid',group:'duty',choices:[choice('Tự mình xử lý',''+stat,48,good('Nàng xử lý khéo léo, nữ quan ghi thêm công trạng.',{merit:7,[stat]:2,reputation:2}),good('Sai sót chưa được sửa trọn. Nàng phải làm lại và chịu trừ bổng.',{silver:-6,health:-3})),safe('Nhờ người có kinh nghiệm cùng giúp','Công việc hoàn thành nhờ hai người chung sức.',{merit:3,bond:4,[stat]:1}),choice('Đẩy trách nhiệm cho người khác','malice',55,good('Nàng tránh bị phạt, nhưng có người ghi nhớ chuyện này.',{malice:2,rivalry:5,envy:3},{scheme:true}),good('Quản sự tìm ra sự thật và trách phạt nàng.',{reputation:-5,envy:8,merit:-3}))]});

randomizeQuietChoices(EVENTS);
EVENTS.push(...PALACE_INCIDENTS);

EVENTS.push(...COLD_EVENTS);

import {WHITE_MOON_EVENTS} from './white-moon-events.mjs';
EVENTS.push(...WHITE_MOON_EVENTS);
