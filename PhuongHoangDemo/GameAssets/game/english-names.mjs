import {SURNAMES, NAMES, MALE_NAMES} from './names.mjs';

// The game stores its original names. Pinyin is applied only for display.
const families = 'Su Lin Shen Lu Ye Liu Xie Yun Bai Song Xu Tang Li Liu Zhao Zhou Xiao Gu Fu Han Qin Qi Yan Ning Wen Cheng Jiang Xia Meng Wei Yuan Du Xu Liang Luo Pei Sun Lü Luo Yang Wang Chen Jiang Jiang Cui Feng Cao Duan Zhong Ji Murong Shangguan Ouyang Sima Nangong Dongfang Xiahou Duanmu Gongsun Situ'.split(' ');
const surnames = new Map(SURNAMES.map((name,index) => [name,families[index]]));
const syllables = Object.fromEntries(`
Giang Jiang Uyển Wan Nhi Er Ngọc Yu Lan Lan Thanh Qing Chi Zhi Nhược Ruo Y Yi Tử Zi Ninh Ning Mộng Meng Dao Yao Tố Su Cầm Qin An An Nhiên Ran Vân Yun Khê Xi Tuyết Xue Liên Lian Minh Ming Nguyệt Yue Chiêu Zhao Hoa Hua Ánh Ying Cẩm Jin Tâm Xin Hạ Xia Vi Wei Như Ru Ý Yi Dung Rong Nghi Yi Trúc Zhu Khanh Qing Đình Ting Hà He Tú Xiu Châu Zhu Hân Xin Bích Bi Sương Shuang Yên Yan Quỳnh Qiong Oanh Ying Nhã Ya Lê Li La Luo Hoan Huan Hi Xi Thủy Shui Lam Lan Huyên Xuan San Shan Tình Qing Lăng Ling Điệp Die Thi Shi Tuyền Quan Kỳ Qi Nga E Mai Mei Trinh Zhen Hương Xiang Lạc Le Vy Wei Tịch Ji Thường Chang Linh Ling Khuê Gui Anh Ying Tịnh Jing Thiều Shao Sơ Chu Đan Dan Hải Hai Đường Tang Yến Yan Hoài Huai Gia Jia Tuệ Hui Diệu Miao Khuynh Qing Thành Cheng Vũ Yu Quế Gui Thư Shu Nhàn Xian Yểu Yao Hàm Han Vĩnh Yong Văn Wen Chính Zheng Quang Guang Viễn Yuan Khiêm Qian Sơn Shan Thiên Tian Hựu You Thừa Cheng Cảnh Jing Hành Xing Hòa He Thần Chen Mặc Mo Uyên Yuan Dạ Ye Tranh Zheng Tu Xiu Khang Kang Triệt Che Cẩn Jin Dực Yi Dương Yang Du You Hạo Hao Huy Hui Hiên Xuan Nguyên Yuan Lâm Lin Phong Feng Dục Yu Quân Jun Đức De Trạch Ze Chương Zhang Nam Nan Tín Xin Ngôn Yan Nghiêu Yao Sâm Sen Thâm Shen Chu Zhou Hạc He Tiêu Xiao Hàn Han Trần Chen Huyền Xuan Tùng Song Bách Bai Dật Yi Trường Chang Lãng Lang Duy Wei Bá Bo Kính Jing Tĩnh Jing Sở Chu Trọng Zhong Tư Si Phương Fang Đồng Tong Thục Shu Hiền Xian Thiện Shan Tương Xiang Kha Ke Thiệu Shao Thần Chen Tú Xiu Nhung Rong Cố Gu Tú Xiu Yên Yan`.trim().split(/\s+/).reduce((pairs,part,index,all)=>index%2 ? pairs : [...pairs,[part,all[index+1]]],[]));
const fixed = {'Tiêu Ngọc Chương':'Xiao YuZhang','Tiêu Cảnh Hành':'Xiao JingXing','Tiêu Dực':'Xiao Yi','Tô Nhược Lan':'Su RuoLan'};
const given = new Set([...NAMES,...MALE_NAMES,'Ngọc Chương','Cảnh Hành','Hành Chi','Thanh Hòa','Nhược Lan']);
const nameWord = '[\\p{L}\\p{M}]';
const escapeRegex = text => text.replace(/[.*+?^$(){}|[\]\\]/g,'\\$&');
const familyPattern = [...SURNAMES].sort((a,b)=>b.length-a.length).map(escapeRegex).join('|');
const givenPattern = [...given].sort((a,b)=>b.length-a.length).map(escapeRegex).join('|');
const fullName = new RegExp(`(?<!${nameWord})(${familyPattern}) (${givenPattern})(?!${nameWord})`,'gu');
const givenName = new RegExp(`^(?:${givenPattern})$`,'u');
const pinyin = name => name.split(' ').map(part=>syllables[part]||part).join('');
export function displayNames(text){
  text=text.replace(fullName,(_,family,personal)=>surnames.get(family)+' '+pinyin(personal));
  for(const [name,label] of Object.entries(fixed)) text=text.replace(new RegExp('(?<!'+nameWord+')'+escapeRegex(name)+'(?!'+nameWord+')','gu'),label);
  return givenName.test(text) ? pinyin(text) : text;
}

export const personalNamePattern=`(?:${familyPattern}) (?:${givenPattern})`;

const narrativeGivenName = new RegExp(`(?<!${nameWord})(?:${givenPattern})(?!${nameWord})`,'gu');
export function displayCharacterNames(text){return displayNames(String(text)).replace(narrativeGivenName,pinyin);}

export const characterNamePattern=`(?:(?:${familyPattern}) )?(?:${givenPattern})|Tiêu Dực|[A-Z][A-Za-zü]+(?: [A-Z][A-Za-zü]+){0,2}`;
