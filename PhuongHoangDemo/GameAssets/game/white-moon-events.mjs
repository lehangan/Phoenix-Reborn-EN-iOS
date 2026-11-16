// Monthly court intrigues. The saved outcomeRoll fixes the sentence before resolution.
const sentence=(text,coldPalace,weight=1)=>({weight,text,effects:{},coldPalace,setback:true});
// The promise lasts for this emperor's reign, even if the prince becomes unavailable.
export function whiteMoonBlocked(s){
 const g=s.imperialSecret;
 return g?.status==='accepted'&&g.infertile===true&&g.emperor===s.npcs.find(n=>n.id==='emperor')?.name;
}
export function clearBlockedWhiteMoon(s){
 if(!whiteMoonBlocked(s)||!WHITE_MOON_EVENTS.some(e=>e.id===s.event?.id))return false;
 s.event=null;
 return true;
}
export const WHITE_MOON_EVENTS=[
 {
  id:'white-moon-return',title:'Bạch Nguyệt Quang trở về',group:'white-moon',where:'candidate-consort',minMonths:3,cooldown:60,
  text:'Người con gái hoàng đế từng khắc ghi trong lòng đã trở về. Nàng ta tựa bên long án, sắc mặt tái nhợt: “Thiếp không muốn nhìn thấy bệ hạ quan tâm đến nàng ấy. Mỗi lần như thế, lòng thiếp lại đau.” Hoàng đế vội dỗ dành nàng ta, rồi lạnh giọng truyền nội thị đưa nàng rời khỏi cung viện.',
  choices:[{label:'Lặng người tiếp chỉ',success:{variants:[
   sentence('Vì một lời than yếu ớt của người cũ, hoàng đế gạt bỏ mọi lời phân trần và truyền chỉ đưa nàng vào lãnh cung.',{kind:'temporary',months:12}),
   sentence('Hoàng đế ôm người cũ vào lòng, quay lưng trước lời cầu xin của nàng. Một đạo chiếu phạt được ban xuống, cắt đứt mọi đường trở lại cung son.',{kind:'life'})
  ]}}]
 },
 {
  id:'white-moon-lake',title:'Lời vu oan bên hồ',group:'white-moon',where:'candidate-consort',minMonths:3,cooldown:60,
  text:'Bạch Nguyệt Quang của hoàng đế được vớt lên từ hồ, toàn thân run rẩy. Nàng ta chỉ về phía nàng, nghẹn ngào nói chính nàng đã đẩy mình xuống nước. Không nghe lời giải thích, hoàng đế quát: “Quỳ xuống, xin lỗi nàng ấy ngay!” Ánh mắt cả cung viện dồn về phía nàng.',
  choices:[
   {label:'Quỳ xuống xin lỗi, tạm nuốt uất ức',success:{text:'Nàng quỳ trên nền đá lạnh, nhận một lỗi mình chưa từng gây ra. Chuyện tạm khép lại, nhưng những lời bàn tán và nỗi tủi nhục vẫn theo nàng về viện.',effects:{health:-6,reputation:-8,speech:-3,favor:-5},setback:true}},
   {label:'Không quỳ, khẳng định mình vô tội',success:{variants:[
    {weight:1,text:'Nàng đứng thẳng, kiên quyết không nhận tội. Hoàng đế nổi giận, truyền cấm túc nàng tại cung viện sáu tháng.',effects:{favor:-8},prison:6,setback:true},
    sentence('Nàng không chịu quỳ trước lời vu cáo. Hoàng đế cho rằng nàng cố chấp, truyền nội thị áp giải nàng khỏi cung viện.',{kind:'temporary',months:12})
   ]}}
  ]
 }
];
