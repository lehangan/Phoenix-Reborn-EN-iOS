import {effective,clamp,range,apply,addLog,die} from './life-engine.mjs';

const outcomes={
 defend:{
  good:[
   {id:'proof',title:'Chứng cứ dưới ánh đèn',text:'Nàng tìm được dấu vết bị sửa trên vật chứng. Lời gièm không còn đứng vững.',effects:{reputation:[3,6],favor:[1,3],envy:[-9,-5]}},
   {id:'witness',title:'Một người chịu làm chứng',text:'Một cung nhân kể lại điều đã thấy, giúp nàng rũ bỏ phần lớn oan khuất.',effects:{reputation:[2,4],merit:[2,4],envy:[-7,-4]}},
   {id:'forgery',title:'Mật thư lộ nét giả',text:'Những nét chữ khác lạ khiến kẻ gièm pha bị tra hỏi. Nàng được trả lại lòng tin.',effects:{favor:[3,5],envy:[-14,-7]}}
  ],
  bad:[
   {id:'missing-proof',title:'Chứng cứ chưa đủ',text:'Vật chứng quan trọng đã biến mất. Nàng bị trách phạt vì chưa thể tự minh oan.',effects:{health:[-9,-4],reputation:[-6,-3],favor:[-4,-1],envy:[-5,-2]}},
   {id:'lost-letter',title:'Bức thư bị đánh tráo',text:'Thư nhờ người giúp bị tráo giữa đường. Nàng kiệt sức tìm manh mối, hao tổn cả bạc lẫn việc học.',effects:{health:[-8,-4],silver:[-14,-6],intelligence:[-3,-1],envy:[-2,4]}},
   {id:'counter-trap',title:'Chứng cứ thành cạm bẫy',text:'Kẻ đứng sau chuẩn bị vật chứng giả, khiến lời biện bạch bị coi là chống đối. Nàng chịu một trận trách phạt nặng.',effects:{health:[-16,-9],reputation:[-10,-6],favor:[-8,-4],envy:[-6,-3]}}
  ]
 },
 endure:{
  good:[
   {id:'rumor-fades',title:'Lời đồn tự lắng xuống',text:'Nàng giữ im lặng đúng lúc. Chuyện khác trong cung khiến lời đồn bị quên đi; lần này nàng thoát phạt.',effects:{envy:[-11,-5]}},
   {id:'intercession',title:'Có người nói đỡ',text:'Thái độ điềm tĩnh khiến một nữ quan đứng ra nói đỡ. Nàng được miễn phạt và giữ lại lòng tin.',effects:{reputation:[1,3],favor:[1,3],envy:[-6,-3]}},
   {id:'culprit',title:'Kẻ gièm pha tự lộ',text:'Những lời khai của kẻ gièm pha mâu thuẫn. Nàng không phải tranh cãi mà vẫn được minh oan.',effects:{reputation:[3,5],envy:[-12,-7]}}
  ],
  bad:[
   {id:'assumed-guilt',title:'Im lặng bị hiểu lầm',text:'Không ai biện bạch, sự im lặng bị coi là nhận lỗi. Nàng bị phạt quỳ, sức khỏe và lòng tin của người trên đều tổn hại.',effects:{health:[-9,-4],reputation:[-6,-3],favor:[-5,-2],envy:[-5,-2]}},
   {id:'night-duty',title:'Đêm dài chịu phạt',text:'Nàng bị buộc chép sổ và trực đêm giữa gió lạnh. Sức lực cùng công trạng đều hao hụt.',effects:{health:[-10,-5],merit:[-4,-2],envy:[-6,-3]}},
   {id:'tainted-tea',title:'Chén trà sau lời gièm',text:'Kẻ hãm hại tiếp tục ra tay, tráo chén trà đưa đến phòng. Nàng phát bệnh sau khi uống.',effects:{health:[-18,-10],beauty:[-3,-1],envy:[-5,-2]},illness:true}
  ]
 }
};

export function envyAttackChance(s){return s.p.alive&&!s.p.outside&&s.p.envy>40?.10+clamp(s.p.envy)*.004:0;}

export function envyOdds(s,choice){
 const luck=effective(s,'luck');
 return Math.round(choice==='defend'?clamp(28+effective(s,'intelligence')*.35+luck*.15-s.p.envy*.1,18,78):clamp(34+effective(s,'speech')*.2+luck*.12-s.p.envy*.08,20,68));
}
function variantDraw(q){
 if(q.outcomeRoll!==undefined)return q.outcomeRoll;
 // Pending pre-V29 stories gain a stable second draw without consuming RNG.
 let x=Math.floor(q.roll*4294967296)>>>0;x=Math.imul(x^(x>>>16),2246822507)>>>0;
 return x/4294967296;
}
export function resolveEnvy(s,q,choice){
 const odds=envyOdds(s,choice),success=q.roll*100<odds,pool=outcomes[choice][success?'good':'bad'];
 const o=pool[Math.min(pool.length-1,Math.floor(variantDraw(q)*pool.length))],rolled=Object.fromEntries(Object.entries(o.effects).map(([key,[lo,hi]])=>[key,range(s,lo,hi)]));
 const before=Object.fromEntries(Object.keys(rolled).map(k=>[k,s.p.stats[k]??s.p[k]]));
 apply(s,rolled);
 const effects=Object.fromEntries(Object.keys(rolled).map(k=>[k,(s.p.stats[k]??s.p[k])-before[k]]));
 if(o.illness&&!s.p.illness)s.p.illness={name:'Trúng độc',months:0};
 const labels={health:'Sức khỏe',reputation:'Uy danh',favor:'Ân điển',envy:'Đố kỵ',merit:'Công trạng',silver:'Bạc',intelligence:'Trí tuệ',beauty:'Dung mạo'};
 const receipt=Object.entries(effects).filter(([,v])=>v).map(([k,v])=>`${labels[k]} ${v>0?'+':''}${v}`).join(' · ');
 addLog(s,`${choice==='defend'?'Thu thập chứng cứ':'Nhẫn nhịn chờ thời'}: ${o.text}${receipt?' '+receipt+'.':''}`,success?'success':'setback');
 if(s.p.health<=0){die(s,o.illness?'poison':'exhaustion','Sức khỏe suy kiệt sau lần bị hãm hại. '+o.text);s.story=s.mini=s.decree=s.pendingTitle=s.visit=null;return {death:!s.p.alive,rescued:s.p.alive};}
 s.result={title:o.title,text:o.text,success,effects,odds,envyEvent:{choice,outcome:o.id,odds}};
 return {ok:true,success,outcome:o.id};
}
