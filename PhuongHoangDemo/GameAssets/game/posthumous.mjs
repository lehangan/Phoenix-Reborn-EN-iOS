import {rand,pick,rankLabel,addLog} from './life-engine.mjs';
import {EMPRESS_RANK,IMPERIAL_NOBLE_CONSORT_RANK,RANKS,DOWAGER_TITLES} from './life-data.mjs';

export const POSTHUMOUS_CHANCE=.5;
const LEGACY_POSTHUMOUS_NAMES=['Ôn Hiền','Đoan Huệ','Tĩnh An','Thuần Ý','Nhu Gia','Minh Đức','Từ Ninh','Huệ Tâm'];
export const POSTHUMOUS_PHI_NAMES=[...LEGACY_POSTHUMOUS_NAMES,
 'Ôn Nghi','Tĩnh Uyển','Nhu Thuận','Đoan Ninh','Thục Hòa','Trang Kính',
 'Huệ Nghi','Uyển Dung','An Trinh','Ôn Tĩnh','Từ Uyển','Thuần Hòa',
 'Chiêu Hòa','Hiền Thuận','Đoan Trang','Minh Nhu','Kính Thận','Thục Ninh',
 'Ý Thuận','Hoài Cẩn','Tĩnh Dung','Huệ Lan','Trinh Nhu','Ôn Từ'
];
export const POSTHUMOUS_EMPRESS_NAMES=[...LEGACY_POSTHUMOUS_NAMES,
 'Hiếu Hiền','Hiếu Đoan','Hiếu Trang','Hiếu Huệ','Hiếu Kính','Hiếu Từ',
 'Hiếu Hòa','Hiếu Nghi','Hiếu An','Hiếu Thuần','Chiêu Đức','Chiêu Hiến',
 'Trang Hiến','Đoan Hiến','Thục Đức','Thánh Từ','Ý Đức','Thuần Đức',
 'Kính Hiền','Nhân Hiếu','Minh Ý','An Đức','Trinh Hiến','Ôn Thành'
];
export const POSTHUMOUS_IMPERIAL_NOBLE_NAMES=[...LEGACY_POSTHUMOUS_NAMES,'Đoan Kính','Ôn Cung','Thuần Huệ','Hiền Ninh','Trang Thuận','Kính Ý','Thục Gia','Minh Cẩn','Nhu Kính','Chiêu Nhu','Tĩnh Huệ','Tuệ An'];
export const POSTHUMOUS_NAMES=[...new Set([...POSTHUMOUS_PHI_NAMES,...POSTHUMOUS_IMPERIAL_NOBLE_NAMES,...POSTHUMOUS_EMPRESS_NAMES])];
const namesForRank=rank=>rank===7?POSTHUMOUS_PHI_NAMES:rank===IMPERIAL_NOBLE_CONSORT_RANK?POSTHUMOUS_IMPERIAL_NOBLE_NAMES:rank===EMPRESS_RANK?POSTHUMOUS_EMPRESS_NAMES:LEGACY_POSTHUMOUS_NAMES;
const titleFor=(rank,name)=>rank===6?`${name} Tần`:rank===7?`${name} Phi`:rank===IMPERIAL_NOBLE_CONSORT_RANK?`${name} Hoàng Quý Phi`:rank===EMPRESS_RANK?`${name} Hoàng hậu`:RANKS[rank].name;

// Called only after a delivery has actually ended this life, never on load.
export function resolvePosthumousPromotion(s){
 const p=s.p,d=p.death;
 if(p.alive||d?.cause!=='childbirth'||d.posthumousChecked)return null;
 d.posthumousChecked=true;
 const emperor=s.npcs.find(n=>n.id==='emperor'&&n.alive),fromRank=p.role==='consort'?p.rank:-1;
 if(!emperor||fromRank>=EMPRESS_RANK||DOWAGER_TITLES.includes(p.rankTitle)||rand(s)>=POSTHUMOUS_CHANCE)return null;
 const fromTitle=rankLabel(p),rank=fromRank+1,posthumousName=pick(s,namesForRank(rank)),rankTitle=titleFor(rank,posthumousName);
 const mourning=[
  'Trẫm nghe tin nàng không qua khỏi cơn trở dạ, lòng đau như cắt. Cửa cung vẫn đó, mà bóng người xưa đã khuất.',
  'Nhớ những ngày nàng bên cạnh, một lời chưa kịp nói nay đã hóa nghìn thu. Ban ân điển này để ghi lòng thương tiếc.',
  'Mong nàng yên nghỉ. Từ nay trong cung, mỗi ngọn đèn thắp lên đều gửi một lời tiễn biệt.'
 ];
 return applyPosthumous(s,{fromRank,fromTitle,rank,rankTitle,posthumousName,emperor:emperor.name,month:p.months,mourning});
}

export function resolveRescuePosthumous(s){
 const p=s.p,d=p.death;
 if(p.alive||d?.cause!=='rescueEmperor'||d.posthumousChecked)return null;
 d.posthumousChecked=true;
 const emperor=s.npcs.find(n=>n.id==='emperor'&&n.alive);
 if(!emperor)return null;
 const fromRank=p.role==='consort'?p.rank:-1,fromTitle=rankLabel(p);
 const rank=fromRank<IMPERIAL_NOBLE_CONSORT_RANK?7:EMPRESS_RANK;
 const posthumousName=pick(s,namesForRank(rank)),rankTitle=titleFor(rank,posthumousName);
 return applyPosthumous(s,{reason:'rescueEmperor',fromRank,fromTitle,rank,rankTitle,posthumousName,emperor:emperor.name,month:p.months,mourning:[
  'Nàng lấy thân mình đỡ lưỡi kiếm cho trẫm. Thích khách đã bị dẹp yên, mà người cùng trẫm ngắm hồ chẳng thể trở về.',
  'Trẫm ban ân điển, ghi công cứu giá và tấm lòng nghĩa liệt. Tên nàng sẽ được lưu lại trong sử sách hoàng triều.',
  'Giữa muôn trùng cung khuyết, trẫm mãi nhớ người đã che chở mình trước hiểm nguy. Mong nàng yên nghỉ.'
 ]});
}
function applyPosthumous(s,record){
 const p=s.p,d=p.death,{fromTitle,rank,rankTitle,posthumousName,emperor}=record;
 p.role='consort';p.rank=rank;p.rankTitle=rankTitle;p.highestRank=Math.max(p.highestRank,rank);d.posthumous=record;
 const text=`Hoàng đế ${emperor} thương tiếc, ${record.fromRank===rank?'ban thụy hiệu':'truy phong'} ${p.name} ${record.fromRank===rank?'là':`từ ${fromTitle} lên`} ${rankTitle}.`;
 d.text+=' '+text;
 const history=s.legacy.histories.find(h=>h.life===s.legacy.lives);
 if(history){history.rank=rankTitle;history.posthumous=JSON.parse(JSON.stringify(record));}
 s.story=s.mini=s.decree=s.pendingTitle=s.visit=s.coronation=null;
 s.notices=s.notices.filter(n=>n.kind!=='rank-decree');
 s.notices.unshift({kind:'rank-decree',posthumous:true,title:'Chiếu truy phong',role:'consort',rankTitle,month:p.months,text,...record});
 addLog(s,text,'death');return record;
}

export function validatePosthumous(s){
 const p=s.p,d=p.death,q=d?.posthumous;
 if(d?.posthumousChecked!==undefined&&typeof d.posthumousChecked!=='boolean')throw Error('Truy phong không hợp lệ.');
 if(q&&(!d.posthumousChecked||p.alive||!['childbirth','rescueEmperor'].includes(d.cause)||!Number.isInteger(q.fromRank)||q.fromRank< -1||q.fromRank>(d.cause==='rescueEmperor'?EMPRESS_RANK:IMPERIAL_NOBLE_CONSORT_RANK)||!(d.cause==='rescueEmperor'?q.reason==='rescueEmperor'&&q.rank===(q.fromRank<IMPERIAL_NOBLE_CONSORT_RANK?7:EMPRESS_RANK):q.rank===q.fromRank+1||q.legacyRankSchema===1&&q.fromRank===7&&q.rank===EMPRESS_RANK)||p.rank!==q.rank||!namesForRank(q.rank).includes(q.posthumousName)||q.rankTitle!==titleFor(q.rank,q.posthumousName)||p.rankTitle!==q.rankTitle||q.month!==p.months||!Array.isArray(q.mourning)||q.mourning.length!==3))throw Error('Truy phong không hợp lệ.');
 const notices=s.notices.filter(n=>n.posthumous);
 if(notices.length>1||notices.some(n=>!q||n.kind!=='rank-decree'||n.rankTitle!==q.rankTitle||n.posthumousName!==q.posthumousName))throw Error('Chiếu truy phong không hợp lệ.');
}
