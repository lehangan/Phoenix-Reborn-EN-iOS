import {familyBackground,FAMILY_BACKGROUNDS} from './family-origins.mjs';

export function entryStoryLines(s){
 const p=s.p,f=p.family;
 const occupation=[f.fatherJob,f.fatherGrade].filter(Boolean).join(' ');
 const father=`${f.father} (${occupation})`;
 const family=`Bạn sinh ra là con của ${father}.`;
 const entry=p.role==='maid'?'Ngày hôm nay, bạn tiến cung làm cung nữ. Từ đây, một cuộc đời mới mở ra sau cánh cửa cung son.':'Ngày hôm nay, bạn tiến cung dự kỳ tuyển tú. Mang theo lời dặn của phụ mẫu, bạn bước qua cánh cửa mở đầu một cuộc đời mới.';
 return [family,entry];
}
export function acceptIdentity(s){
 if(!s.intro||!s.p.alive||s.entryStory)return {error:'Thân phận đã được nhận.'};
 s.entryStory={step:0,background:familyBackground(s.p)};return {ok:true};
}
export function advanceEntryStory(s){
 if(!s.entryStory||!s.intro)return {error:'Không có câu chuyện nhập cung đang chờ.'};
 if(s.entryStory.step===0){s.entryStory.step=1;return {ok:true};}
 s.entryStory=null;return {ok:true,finished:true};
}
export function validateEntryStory(s){
 const g=s.entryStory;if(g==null)return;
 if(!s.intro||!s.p.alive||![0,1].includes(g.step)||!Object.hasOwn(FAMILY_BACKGROUNDS,g.background)||g.background!==familyBackground(s.p)||s.exam)throw Error('Câu chuyện nhập cung không hợp lệ.');
}
