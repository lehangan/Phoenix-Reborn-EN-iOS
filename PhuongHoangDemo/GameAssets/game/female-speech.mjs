import {english} from './english.mjs';
import {SERVICE_RANKS} from './life-data.mjs';

export function femaleSpeaker(s,n){
 if(n?.id==='player')return s.p;
 return s.npcs?.find(x=>x.id===(n?.sourceId??n?.id))||n;
}
const service=n=>n?.role==='maid'||n?.roleClass==='service'||!n?.roleClass&&(SERVICE_RANKS.includes(n?.role)||/^(Cung nhân|Nữ quan)\b/u.test(n?.role||''));
const imperial=n=>['candidate','consort'].includes(n?.role)||['candidate','consort'].includes(n?.roleClass);
const months=n=>Number.isFinite(n?.ageMonths)?n.ageMonths:Number.isFinite(n?.age)?n.age*12:null;
const cap=text=>text.charAt(0).toLocaleUpperCase('vi')+text.slice(1);

// Speech only: no random draws, state changes or replacement of narrated prose.
export function femaleSpeechForms(speaker,listener){
 const formal=service(speaker)&&imperial(listener);
 const rank=listener?.courtRank??listener?.rank??-1;
 const a=months(speaker),b=months(listener);
 const superior=imperial(speaker)&&service(listener);
 const you=formal?((listener?.role==='consort'||listener?.roleClass==='consort')&&rank>=6?'nương nương':'tiểu chủ'):superior?'ngươi':a===null||b===null?'nàng':b>a?'tỷ':b<a?'muội':'bạn';
 const self=formal?'nô tỳ':'ta';
 return {formal,you,self,together:formal?`${self} và ${you}`:'chúng ta'};
}
export const femaleSpeech=(s,n)=>femaleSpeechForms(femaleSpeaker(s,n),s.p);
export function femaleLineBetween(speaker,listener,template){
 const forms=femaleSpeechForms(speaker,listener);
 return english(template).replace(/\{(self|Self|you|You|together|Together)\}/g,(_,token)=>{
  const value=forms[token.toLowerCase()];return token[0]===token[0].toUpperCase()?cap(value):value;
 });
}
export const femaleLine=(s,n,template)=>femaleLineBetween(femaleSpeaker(s,n),s.p,template);

// Pending notices from older releases keep their saved effects and narration.
// Only these known utterances are upgraded when shown; names/prose are untouched.
const oldLines=new Map([
 ['Hôm nay được trò chuyện cùng nàng, lòng ta cũng nhẹ nhõm hơn.','Hôm nay được trò chuyện cùng {you}, lòng {self} cũng nhẹ nhõm hơn.'],
 ['Ta nghe hoa trong vườn vừa nở. Mong những ngày tới của chúng ta đều bình an.','{Self} nghe hoa trong vườn vừa nở. Mong những ngày tới của {together} đều bình an.'],
 ['Hương trà thanh nhã thật. Hôm nào chúng ta cùng ngồi uống một chén nhé.','Hương trà thanh nhã thật. Đa tạ {you} đã ban trà cho {self}.'],
 ['Tự tay sao trà, ủ hương, hẳn đã tốn nhiều công sức. Ta sẽ trân trọng.','Đa tạ {you} đã tự tay sao trà, ủ hương. {Self} nhất định sẽ trân trọng.'],
 ['Của cải mất rồi còn có thể làm lại. Chỉ cần người bình an, chúng ta sẽ qua được chuyện này.','Của cải mất rồi còn có thể làm lại. Chỉ cần {you} bình an, {together} sẽ qua được chuyện này.'],
 ['Đêm nay cứ sang chỗ ta nghỉ. Một mình chịu đựng mãi cũng mệt, có ta ở đây rồi.','Đêm nay {you} cứ sang chỗ {self} nghỉ. Một mình chịu đựng mãi cũng mệt, có {self} ở đây rồi.'],
 ['Đừng tự trách nữa. Vật ngoài thân rồi sẽ có, nàng hãy chăm sóc mình trước.','Đừng tự trách nữa. Vật ngoài thân rồi sẽ có, xin {you} chăm sóc mình trước.'],
 ['Ta nghe tin liền đến. Có điều gì cần giúp, nàng cứ nói với ta.','{Self} nghe tin liền đến. Có điều gì cần giúp, {you} cứ nói với {self}.'],
 ['Phía trước còn gian nan, sẽ có lúc dùng đến.','Phía trước còn gian nan, {you} sẽ có lúc dùng đến.'],
 ['Dung mạo có đổi, tình tỷ muội của chúng ta vẫn còn. Hãy giữ lấy 50 bạc này để dưỡng thương.','Dung mạo có đổi, tình tỷ muội giữa {self} và {you} vẫn còn. Xin {you} giữ lấy 50 bạc này để dưỡng thương.']
]);
export function femaleDisplayedLine(s,n,text){
 if(!femaleSpeech(s,n).formal)return text;
 let template=oldLines.get(text);
 if(!template&&/^Ta nhận hộp trà này\. Cảm ơn tâm ý của (tỷ|muội|bạn)\.$/u.test(text))template='{Self} xin nhận hộp trà này. Đa tạ tâm ý của {you}.';
 if(!template&&/^Hôm nay ta không có tâm tình, thứ này (tỷ|muội|bạn) mang về đi$/u.test(text))template='Xin {you} thứ lỗi, hôm nay lòng {self} không yên, đành xin phép gửi lại hộp trà này';
 return template?femaleLine(s,n,template):text;
}
