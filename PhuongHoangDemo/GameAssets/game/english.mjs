import {templateTypes} from './english-template-types.mjs';
import {displayTitles} from './english-titles.mjs';
import {displayNames,personalNamePattern,displayCharacterNames,characterNamePattern} from './english-names.mjs';

import {completeTranslations} from './english-catalog.mjs';
const phrases = new Map();
const cache = new Map();
let inlinePattern, templates, lowerPhrases, sentencePrefixes;
const normalize = value => value.normalize('NFC').trim().replace(/\s+/g,' ');
export function addTranslationPairs(pairs){
 for(const [source,target] of pairs)phrases.set(normalize(source),completeTranslations[normalize(source)]??target);
 inlinePattern=templates=lowerPhrases=undefined;cache.clear();
}

export function addTranslations(source){
 addTranslationPairs(source.trim().split('\n').map(row=>{const index=row.indexOf('|');return index>0?[row.slice(0,index),row.slice(index+1)]:null;}).filter(Boolean));
}
addTranslations(`
Phượng Hoàng Trùng Sinh|Phoenix Reborn
PHƯỢNG HOÀNG|PHOENIX
TRÙNG SINH|REBORN
Mộng giữa hoàng thành|A Dream Within the Imperial City
Đang mở cánh cửa cung…|Opening the palace gates…
Cuộc đời|Life
Hoàng cung|Palace
Tháng mới|Next Month
Túi đồ|Wardrobe
Nhân duyên|Bonds
Điều hướng|Navigation
Qua một tháng|Advance one month
Tháng|Month
Năm|Year
THÁNG|MONTH
KIẾP|LIFE
KIẾP THỨ|LIFE
kiếp|lives
tuổi|years old
tháng|months
điểm|points
bạc|silver
thể lực|stamina
THỂ LỰC|STAMINA
trên 5 thể lực|out of 5 stamina
CHỐN NỘI ĐÌNH|THE INNER COURT
Trường An · Cửa son|Chang'an · Vermilion Gate
Cửa khóa · Viện hoang|Locked gates · Deserted quarters
Nhật ký|Journal
Nhật ký tháng|Monthly Journal
Nhật ký lãnh cung|Cold Palace Journal
Nhật ký sự kiện theo thời gian|Event history
Kéo lên xem lại|Scroll up for earlier entries
Cuộn lên xem sự kiện cũ|Scroll up to earlier events
Những chuyện trong tháng sẽ được ghi lại tại đây.|This month's events will appear here.
Việc trong lãnh cung|Life in Confinement
Việc trong tháng|Monthly Activities
Đố kỵ|Envy
Hồ sơ nhân vật|Character Profile
Luân hồi và thành tựu|Rebirth and Achievements
Sổ luân hồi|Rebirth Journal
Tự phối diện mạo|Customize Appearance
Tự chọn diện mạo|Choose Appearance
Bật hoặc tắt nhạc nền|Toggle background music
Bật nhạc nền|Enable background music
Tắt nhạc nền|Mute background music
Nhạc nền tạm ngừng khi đánh đàn|Background music is paused during guqin play
Menu tài khoản và cộng đồng|Settings and Community
Có cập nhật mới|New update available
Thông tin cuộc đời|Life Details
Đóng bảng|Close panel
Đóng|Close
CẨM ĐIỆN|THE INNER COURT
KẾT CỤC|ENDING
NHÂN DUYÊN|BONDS
ÂN SỦNG|IMPERIAL FAVOR
Xuân|Spring
Hạ|Summer
Thu|Autumn
Đông|Winter
Dung mạo|Beauty
Trí tuệ|Intellect
Tài nghệ|Artistry
Hoạt ngôn|Eloquence
Sức khỏe|Health
Công trạng|Merit
Uy danh|Reputation
Ân điển|Favor
Thiện cảm|Affection
May mắn|Luck
Thiện|Virtue
Ác|Malice
Ngẫu nhiên|Random
Mặt VIP|VIP Faces
Mặt vip|VIP Faces
Mắt|Eyes
Lông mày|Brows
Mũi|Nose
Môi|Lips
Hoa điền|Forehead Mark
Gương mặt|Face
Diện mạo|Appearance
Kiểu tóc|Hairstyles
Y phục|Robes
Trang sức tóc|Hair Ornaments
Trang sức|Ornaments
Đồ vật khác|Other Items
Thú cưng|Companions
Thủ công|Crafting
Cửa tiệm|Shop
Kỳ trân các|Treasures Pavilion
Rương|Chests
Chỉ hiện đồ đã có|Owned items only
Phẩm chất|Rarity
Lọc phẩm chất|Filter by rarity
Tất cả|All
món|items
Đang dùng|Equipped
Đang đi cùng|Accompanying You
Đang mặc|Equipped
Chưa có|Not owned
Chọn kiểu tóc|Select hairstyle
Tóc búi mới|New Updo
Xa xỉ|Luxury
Hồi môn|Dowry
Thường|Common
Tinh xảo|Fine
Quý giá|Rare
Trân bảo|Exquisite
Tệ|Poor
Ưu Tú|Excellent
Tuyệt Tác|Masterpiece
Y quan|Physician
Đọc sách|Study
Nhận việc|Take a Duty
Lễ nghi|Etiquette
Dâng công|Offer Tribute
Đối đáp|Practice Dialogue
Lập danh|Build Reputation
Tĩnh dưỡng|Rest
Dưỡng sức|Recover
Viết kinh|Copy Sutras
Thiền|Meditate
Trồng cây|Garden
May vá|Sew
Cung nhân|Palace Attendant
Cung nữ trưởng|Senior Palace Maid
Cung nữ thường|Palace Maid
Cung nữ|Palace Maid
CUNG NỮ|PALACE MAID
Tổng quản ma ma|Chief Matron
Nữ quan|Court Lady
Tú nữ|Consort Candidate
TÚ NỮ|CONSORT CANDIDATE
Thải nữ|Chosen Lady
Ngự nữ|Imperial Lady
Bảo lâm|Lady of the Court
Tài nhân|Lady of Talent
Mỹ nhân|Lady of Beauty
Tiệp dư|Lady of Grace
Cửu tần|Nine Imperial Concubines
Tứ phi|Four Imperial Consorts
Hoàng Quý Phi|Imperial Noble Consort
Hoàng quý phi|Imperial Noble Consort
Quý Phi|Noble Consort
Quý phi|Noble Consort
Thục phi|Virtuous Consort
Đức phi|Worthy Consort
Hiền phi|Gracious Consort
Hoàng hậu|Empress
Hoàng đế|Emperor
hoàng đế|the Emperor
Thái hậu|Empress Dowager
Thái tử|Crown Prince
Hoàng tử|Prince
Công chúa|Princess
Thân vương|Imperial Prince
Thân Vương|Imperial Prince
Tướng quân|General
Tể tướng|Chancellor
Thần y|Master Physician
Lãnh cung|Cold Palace
CỬA NGỌC · LẦU SON|JADE GATES · VERMILION HALLS
Điện Thừa Thiên|Hall of Heavenly Mandate
Thừa Thiên|Heavenly Mandate
Cung Liên Hoa|Lotus Palace
Liên Hoa|Lotus Palace
Cung Vọng Nguyệt|Moonview Palace
Vọng Nguyệt|Moonview Palace
Cung Ngọc Lan|Magnolia Palace
Ngọc Lan|Magnolia Palace
Cung Phượng Nghi|Phoenix Grace Palace
Phượng Nghi|Phoenix Grace
Ngự hoa viên|Imperial Garden
Thủy Tạ|Lakeside Pavilion
Tàng Thư các|Imperial Library
Tàng Thư|Library
Thái Y viện|Imperial Infirmary
Thượng Phục cục|Wardrobe Bureau
Thượng Phục|Wardrobe Bureau
Cửa Chu Tước|Vermilion Bird Gate
Chu Tước|Vermilion Bird Gate
Ngự Thiện phòng|Imperial Kitchen
Nơi hoàng đế nghỉ ngơi và triệu kiến. Tần trở lên mới được tự do thăm viếng.|The Emperor rests and receives visitors here. Only Imperial Concubines and higher ranks may visit freely.
Sen trắng nở quanh sân ngọc. Cung nữ từ Nữ quan trở lên hoặc người có phẩm vị được vào.|White lotuses bloom around the jade courtyard. Court Ladies and ranked consorts may enter.
Một cung điện thanh tĩnh dưới trăng.|A quiet palace bathed in moonlight.
Hương ngọc lan thoảng qua những hành lang sơn son.|The scent of magnolia drifts through lacquered corridors.
Mái ngói lưu ly và rèm gấm của nội cung.|Glazed tiles and brocade curtains adorn the inner residence.
Nơi thưởng hoa, nghỉ chân và gặp gỡ người trong cung.|Admire the flowers, rest, and meet people from the palace.
Đình ven hồ thường có tiếng đàn và những cuộc gặp tình cờ.|Music and chance encounters await at this lakeside pavilion.
Sảnh sách ngoài mở cho cung nhân đến học lễ và đọc sách.|Palace attendants may study etiquette and read in the outer library.
Y quan lui tới, hương thảo dược vương trên bậc cửa.|Physicians come and go, leaving the scent of herbs at the threshold.
Xưởng thêu và nơi nhận việc của cung nhân.|An embroidery workshop where attendants receive their assignments.
Cổng ngoài, nơi thị vệ và quan lại qua lại.|The outer gate is frequented by guards and officials.
Khói bếp và tiếng chuyện trò lan dưới mái hiên.|Kitchen smoke and voices drift beneath the eaves.
Nam|Men
Nữ|Women
Con cái|Children
Con nuôi|Adopted Child
Con đỡ đầu|Godchild
Xem hồ sơ|View Profile
Chào đời|Birth
Trò chuyện|Talk
Tặng quà|Give Gift
Làm quen|Introduce Yourself
Chưa trò chuyện|Not yet introduced
Chưa gặp người hữu duyên|No acquaintances yet
Ghé Hoàng cung để tìm những cuộc gặp mới.|Visit the palace to meet new people.
Đến Hoàng cung|Visit the Palace
Những người đã trò chuyện, xếp theo chức vị|People you have spoken to, ordered by rank
Những mầm non lớn lên qua từng tháng|Watch your children grow month by month
Nhân duyên và con cái|Relationships and Children
DUYÊN KHỞI GIỮA CỬA SON|BONDS BEHIND VERMILION GATES
CÀNH NGỌC · LÁ VÀNG|JADE BRANCHES · GOLDEN LEAVES
Uy nghiêm|Dignified
Ôn hòa|Gentle
Thẳng thắn|Frank
Khó tính|Exacting
Nhân hậu|Kindhearted
Tiếp tục|Continue
Quay lại|Back
Xác nhận|Confirm
Hủy|Cancel
Thử lại|Try Again
Bỏ qua|Skip
Chọn|Choose
Mặc|Wear
Tháo|Remove
Mở rương|Open Chest
Chiếc hòm còn trống|Your Chest Collection Is Empty
Rương gỗ tích công|Wooden Merit Chest
Rương gấm ban thưởng|Brocade Reward Chest
Rương ngọc quý|Precious Jade Chest
RƯƠNG BÁU ĐÃ MỞ|TREASURE CHEST OPENED
Chưa đạt|Locked
Thành tựu|Achievements
Kết cục|Endings
Tiền kiếp|Past Lives
Chưa mở kết cục|Ending not unlocked
điểm luân hồi|rebirth points
Cưỡng ép luân hồi|Force Rebirth
Luân hồi · Bắt đầu một kiếp mới|Rebirth · Begin a New Life
HOA TÀN RỒI LẠI NỞ|FLOWERS FALL AND BLOOM AGAIN
Một đời mới|A New Life
LUÂN HỒI|REBIRTH
Nhận thân phận kiếp này|Accept Your New Life
Gia đình quý tộc|Noble Family
Gia đình thường dân|Commoner Family
Thân phận|Status
Gia thế|Family Background
Phụ thân|Father
Mẫu thân|Mother
Một kiếp phù sinh|A Fleeting Life
ĐÃ KHÉP LẠI|HAS ENDED
DẤU ẤN MỘT ĐỜI|THE LEGACY OF A LIFE
Dạo chơi|Take a Stroll
Ước nguyện cầu may|Make a Wish
Thi đấu|Compete
Thêu túi hương|Embroider a Sachet
Làm hộp trà|Make a Tea Box
Thêu túi hương hoặc làm hộp trà|Embroider a Sachet or Make a Tea Box
Cách chơi|How to Play
Tài khoản|Account
Thông báo cập nhật|Release Notes
Phiên bản và lần cập nhật gần nhất|Current version and latest changes
Bảng Quyền Lực|Leaderboards
Chọn bảng xếp hạng|Choose a leaderboard
Top Địa Vị|Court Rank
Top Sưu Tầm|Collection
Top Hoa Khôi|Fashion Laurels
Thông số|Player Statistics
lần hoa khôi|fashion wins
Không kết nối được máy chủ.|Could not connect to the server.
Chưa hoàn tất thao tác.|The request could not be completed.
Đang kết nối…|Connecting…
Đang tải từ hoàng thành…|Loading…
Chơi trên thiết bị · Chưa đăng nhập|Playing on this device · Signed out
Chưa kết nối máy chủ · Tiến trình ở thiết bị|Server unavailable · Progress is saved on this device
Đã lưu online|Saved to the cloud
Đang lưu online…|Saving to the cloud…
Chờ đồng bộ…|Waiting to sync…
Đã tải tiến trình online|Cloud progress loaded
Đang lưu kiếp hiện tại…|Saving your current life…
Có bản mới ở thiết bị khác|A newer save exists on another device
Hết phiên · Đăng nhập lại để lưu|Session expired · Sign in again to save
Ngoại tuyến · Đã lưu trên máy|Offline · Saved on this device
Đã đăng xuất · Trở về kiếp chơi vô danh|Signed out · Returned to guest progress
Đã tải bản online mới nhất|Latest cloud save loaded
`);

// Full phrases and interpolated sentences are translated before word-level fallback.
// Stored game values and all comparisons remain in their original language.
addTranslationPairs(Object.entries(completeTranslations));
const remaining = /[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]/u;
const escapeRegex = text => text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
function compile(){
 if(templates)return;
 templates=[];
 for(const [originalSource,originalTarget] of phrases){
  let source=originalSource,target=originalTarget;
  // Consecutive prose slots are one sentence block. Preserve their source
  // order and translate the whole block, never arbitrary one-word captures.
  let ambiguous=false;
  while(true){
   const pair=[...source.matchAll(/(⟦\d+⟧)\s+(?=(⟦\d+⟧))/g)].find(([,a,b])=>templateTypes[originalSource]?.[a]==='narrative'&&templateTypes[originalSource]?.[b]==='narrative');
   if(!pair)break;
   const [,a,b]=pair,sequence=a+' '+b;
   if(!target.includes(sequence)){ambiguous=true;break;}
   source=source.replace(sequence,a);target=target.replace(sequence,a);
  }
  if(ambiguous)continue;
  if(!/⟦\d+⟧|\{(?:friend|rival|office|role|name)\}/.test(source))continue;
  const slots=[],parts=source.split(/(⟦\d+⟧|\{(?:friend|rival|office|role|name)\})/g);
  const fixed=parts.filter(p=>!/^(?:⟦\d+⟧|\{(?:friend|rival|office|role|name)\})$/.test(p)).join('');
  if(!fixed.trim()||/^⟦\d+⟧.*⟦\d+⟧$/.test(source)&&fixed.trim().length<9)continue;
  const longest=parts.filter(p=>!/^(?:⟦\d+⟧|\{(?:friend|rival|office|role|name)\})$/.test(p)).sort((a,b)=>b.length-a.length)[0]||'';
  const pattern=parts.map(part=>{
   if(!/^(?:⟦\d+⟧|\{(?:friend|rival|office|role|name)\})$/.test(part))return escapeRegex(part);
   slots.push(part);
   if(part==='{name}'||templateTypes[originalSource]?.[part]==='person')return '('+characterNamePattern+')';
   return templateTypes[originalSource]?.[part]==='narrative'?'([\\s\\S]*?)':'((?:(?![·→]|[.!?;:](?:\\s|$))[\\s\\S])*?)';
  }).join('');
  templates.push({source:originalSource,target,slots,fixed:fixed.length,longest,pattern:new RegExp('^'+pattern+'$','u'),prefixPattern:/[.!?…”"]$/.test(source)?new RegExp('^'+pattern+'(?=\\s|$)','u'):null});
 }
 sentencePrefixes=[...phrases.keys()].filter(k=>k.length>20&&!k.includes('⟦')&&!k.includes('{')&&/[.!?]$/.test(k)).sort((a,b)=>b.length-a.length);
 templates.sort((a,b)=>b.fixed-a.fixed||a.slots.length-b.slots.length);
 // Some Vietnamese labels (such as Uy danh) contain no accented letters.
 const unaccentedPhrase=/^(?:Phi|Cam|Xanh|Lang trung|Kim [Ll]an|Nghi Lan|Song Loa|Sung dung|Sung nghi|Tham gia|Thanh Quan|Thu [Mm]ua|Thu Phong|Tinh Sa|Tinh anh|Tu dung|Tu nghi|Y quan|Nam|Uy danh|Trang sau|Trung cung|ma ma)$/;
 const keys=[...phrases.keys()].filter(k=>(remaining.test(k)||unaccentedPhrase.test(k))&&!k.includes('⟦')&&!k.includes('{'));
 inlinePattern=new RegExp('(?<![\\p{L}\\p{M}])(?:'+keys.sort((a,b)=>b.length-a.length).map(escapeRegex).join('|')+')(?![\\p{L}\\p{M}])','giu');
}
const folded=()=>new Map([...phrases].map(([k,v])=>[k.toLocaleLowerCase('vi'),v]));
export function english(text,depth=0){
 if(typeof text!=='string'||!text.trim())return text;
 // A nested translation must not reuse or populate a root-level cache entry.
 // Otherwise an early fallback can corrupt a later modal using the same text.
 if(depth===0&&cache.has(text))return cache.get(text);
 const value=normalize(text),exact=phrases.get(value);
 let out;
 const titled=displayTitles(value);
 if(titled!==value&&!remaining.test(titled))out=titled;
 else if(exact!==undefined)out=exact;
 else{
  compile();
  // Quotation marks belong to the presentation, not to the translation key.
  // Translate the complete utterance before attempting sentence/word fallback.
  const quoted=value.match(/^(?:“([^“”]+)”|"([^"]+)"|‘([^‘’]+)’|«([^«»]+)»)$/u);
  if(quoted&&depth<64)out=value[0]+english(quoted.slice(1).find(part=>part!==undefined),depth+1)+value.at(-1);
  const punctuated=value.match(/^([\s\S]*?\S)\s*([.!?…]+)$/u);
  if(out===undefined&&punctuated&&phrases.has(punctuated[1]))out=phrases.get(punctuated[1]).replace(/[.!?…]+$/u,'')+punctuated[2];
  if(out===undefined&&depth<64){const prefix=sentencePrefixes.find(key=>value.startsWith(key+' '));if(prefix)out=phrases.get(prefix)+' '+english(value.slice(prefix.length+1),depth+1);}
  // UI separators must not become part of a rank or age placeholder.
  if(out===undefined&&depth<64&&value.includes(' → ')&&value.split(' → ').every(part=>phrases.has(part)))out=value.split(' → ').map(part=>english(part,depth+1)).join(' → ');
  if(out===undefined&&depth<64&&value.includes(' · ')&&!/[.!?]/.test(value)){
   const parts=value.split(' · '),translated=[];
   for(let i=0;i<parts.length;i++){
    let end=i+1;
    for(let j=parts.length;j>i+1;j--)if(phrases.has(parts.slice(i,j).join(' · '))){end=j;break;}
    translated.push(english(parts.slice(i,end).join(' · '),depth+1));i=end-1;
   }
   const candidate=translated.join(' · ');
   if(!remaining.test(candidate))out=candidate;
  }
  if(out===undefined&&depth<64)for(const template of templates){
   if(template.longest&&!value.includes(template.longest))continue;
   const match=value.match(template.pattern);
   if(match){
    const values=new Map(template.slots.map((slot,i)=>[slot,english(templateTypes[template.source]?.[slot]?.startsWith('person')||slot==='{name}'||slot==='{friend}'||slot==='{rival}'?displayCharacterNames(match[i+1]):match[i+1],depth+1)]));
    out=template.target.replace(/⟦\d+⟧|\{(?:friend|rival|office|role|name)\}/g,slot=>values.get(slot)??slot);break;
   }
   // Keep a specific multi-sentence narrative intact when receipts follow it,
   // before a less specific template can consume the whole paragraph.
   const prefix=template.prefixPattern&&value.match(template.prefixPattern);
   if(prefix&&prefix[0].length<value.length){out=english(prefix[0],depth+1)+english(value.slice(prefix[0].length),depth+1);break;}
  }
  if(out===undefined&&depth<64){
   const quotes=[...value.matchAll(/“[^“”]+”|"[^"]+"|«[^«»]+»/gu)];
   if(quotes.length){
    let position=0;out='';
    for(const quote of quotes){out+=english(value.slice(position,quote.index),depth+1)+english(quote[0],depth+1);position=quote.index+quote[0].length;}
    out+=english(value.slice(position),depth+1);
   }
  }
  if(out===undefined&&depth<64){
   const colon=value.indexOf(': ');
   if(colon>0)out=english(value.slice(0,colon),depth+1)+': '+english(value.slice(colon+2),depth+1);
   else{
    const sentences=value.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ỹ“])/u);
    if(sentences.length>1)out=sentences.map(part=>english(part,depth+1)).join(' ');
   }
  }
  if(out===undefined&&depth<64&&value.includes(' · ')){
   const parts=value.split(' · '),translated=[];
   for(let i=0;i<parts.length;i++){
    let end=i+1;
    for(let j=parts.length;j>i+1;j--)if(phrases.has(parts.slice(i,j).join(' · '))){end=j;break;}
    translated.push(english(parts.slice(i,end).join(' · '),depth+1));i=end-1;
   }
   out=translated.join(' · ');
  }
  if(out===undefined){
   out=displayNames(displayTitles(value));
   // The compiled dictionary already limits replacement to known source phrases.
   // Do not gate it again on accents: effect badges append numbers to labels.
   lowerPhrases??=folded();
   out=out.replace(inlinePattern,part=>phrases.get(part)??lowerPhrases.get(part.toLocaleLowerCase('vi'))??part);
  }
 }
 const singular={figures:'figure',items:'item',months:'month',years:'year',points:'point',times:'time',children:'child',lives:'life',robes:'robe',companions:'companion','Rebirth Points':'Rebirth Point','hair ornaments':'hair ornament'};
 out=out.replace(/(?<![\d.,])1 (Rebirth Points|hair ornaments|figures|items|months|years|points|times|children|lives|robes|companions)\b/g,(_,noun)=>'1 '+singular[noun]);
 // Preserve boundary whitespace when translating an individual DOM text node.
 const result=text.slice(0,text.indexOf(text.trimStart()))+out+text.slice(text.trimEnd().length);
 if(cache.size>12000)cache.clear();
 if(depth===0)cache.set(text,result);return result;
}
export function translationDiagnostics(){return {entries:phrases.size,cached:cache.size,templates:templates?.length||0,localizedTextCount};}
let localizedTextCount=0;
const translatedNodes=new WeakMap();
const translatedAttributes=new WeakMap();
const visibleAttributes=['alt','title','aria-label','placeholder'];
function localizeElement(element){
  let previous=translatedAttributes.get(element);
  if(!previous){previous=new Map();translatedAttributes.set(element,previous);}
  for(const attribute of visibleAttributes){
    if(!element.hasAttribute(attribute)) continue;
    const value=element.getAttribute(attribute);
    if(previous.get(attribute)===value)continue;
    const localized=english(value);
    previous.set(attribute,localized);
    if(value!==localized) element.setAttribute(attribute,localized);
  }
}
function localizeText(node){
 const original=node.nodeValue;
 if(translatedNodes.get(node)===original)return;
 localizedTextCount++;
 const value=english(original);
 if(value!==original)node.nodeValue=value;
 translatedNodes.set(node,value);
}
export function localize(root){
  if(root.nodeType===3){
    localizeText(root);
    return;
  }
  if(root.nodeType===1) localizeElement(root);
  const nodes=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{
    acceptNode(node){
      return node.nodeType===1 && ['SCRIPT','STYLE','TEXTAREA'].includes(node.tagName)
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  while(nodes.nextNode()){
    const node=nodes.currentNode;
    if(node.nodeType===1) localizeElement(node);
    else{
      localizeText(node);
    }
  }
}
export function watchEnglish(root){
  const options={subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:visibleAttributes};
  const observer=new MutationObserver(records=>{
    // Our own translations must not schedule a second translation pass.
    observer.disconnect();
    try{
      const pending=new Set();
      for(const record of records){
        if(record.type==='attributes')localizeElement(record.target);
        else if(record.type==='characterData')pending.add(record.target);
        else for(const node of record.addedNodes)pending.add(node);
      }
      for(const node of pending){
        if(!root.contains(node))continue;
        let parent=node.parentNode,covered=false;
        while(parent&&parent!==root){if(pending.has(parent)){covered=true;break;}parent=parent.parentNode;}
        if(!covered)localize(node);
      }
    }finally{observer.observe(root,options);}
  });
  observer.observe(root,options);
  return ()=>observer.disconnect();
}
