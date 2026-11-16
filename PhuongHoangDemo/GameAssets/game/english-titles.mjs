import {PRINCE_HONORIFICS,PRINCESS_HONORIFICS} from './child-titles.mjs';
// Display-only honorifics: original save values and rank rules remain unchanged.
export const honorificEnglish = Object.fromEntries(`An|Peace
Ninh|Serenity
Chiêu|Radiance
Tĩnh|Tranquility
Uyển|Grace
Ngọc|Jade
Dung|Elegance
Hòa|Harmony
Lệ|Beauty
Gia|Excellence
Huệ|Benevolence
Thuần|Purity
Hi|Hope
Hy|Splendor
Nghi|Dignity
Hân|Joy
Hàm|Forbearance
Di|Delight
Du|Serene Grace
Dụ|Abundance
Đoan|Nobility
Kính|Reverence
Cẩn|Prudence
Từ|Compassion
Trinh|Constancy
Trân|Treasure
Thục|Gentleness
Hiền|Virtuous
Đức|Virtue
Ý|Concord
Tuệ|Wisdom
Minh|Clarity
Diệu|Wonder
Thanh|Clarity
Nhã|Refinement
Tú|Distinction
Cẩm|Brocade
Tố|Innocence
Lan|Orchid
Mai|Plum Blossom
Liên|Lotus
Đào|Peach Blossom
Hạnh|Felicity
Chi|Fragrance
Quỳnh|Precious Bloom
Dao|Precious Jade
Châu|Pearl
Bích|Emerald
Vân|Cloud
Hà|Dawn
Nguyệt|Moonlight
Ánh|Brilliance
Xuân|Spring
Yên|Peaceful Grace
Linh|Spirit
Anh|Brilliance
Phương|Fragrance
Thiều|Spring Grace
Thiện|Kindness
Phúc|Blessing
Khánh|Felicity
Tường|Good Fortune
Thụy|Auspice
Vinh|Glory
Thuận|Concord
Ôn|Warmth
Mẫn|Discernment
Huy|Luster
Huyền|Mystique
Hương|Sweet Fragrance
Diễm|Resplendence
Tuyết|Snow
Hoa|Blossom`.split('\n').map(s=>s.split('|')));
export const posthumousEnglish=Object.fromEntries(`Ôn Hiền|Gentle Grace
Đoan Huệ|Noble Benevolence
Tĩnh An|Tranquil Peace
Thuần Ý|Pure Concord
Nhu Gia|Gentle Excellence
Minh Đức|Radiant Virtue
Từ Ninh|Compassionate Serenity
Huệ Tâm|Benevolent Heart
Ôn Nghi|Gentle Dignity
Tĩnh Uyển|Tranquil Grace
Nhu Thuận|Gentle Concord
Đoan Ninh|Noble Serenity
Thục Hòa|Gentle Harmony
Trang Kính|Solemn Reverence
Huệ Nghi|Benevolent Dignity
Uyển Dung|Graceful Elegance
An Trinh|Peaceful Constancy
Ôn Tĩnh|Gentle Tranquility
Từ Uyển|Compassionate Grace
Thuần Hòa|Pure Harmony
Chiêu Hòa|Radiant Harmony
Hiền Thuận|Virtuous Concord
Đoan Trang|Noble Dignity
Minh Nhu|Radiant Gentleness
Kính Thận|Reverent Prudence
Thục Ninh|Gentle Serenity
Ý Thuận|Perfect Concord
Hoài Cẩn|Enduring Prudence
Tĩnh Dung|Tranquil Elegance
Huệ Lan|Benevolent Orchid
Trinh Nhu|Steadfast Gentleness
Ôn Từ|Gentle Compassion
Hiếu Hiền|Devoted Virtue
Hiếu Đoan|Devoted Nobility
Hiếu Trang|Devoted Dignity
Hiếu Huệ|Devoted Benevolence
Hiếu Kính|Devoted Reverence
Hiếu Từ|Devoted Compassion
Hiếu Hòa|Devoted Harmony
Hiếu Nghi|Devoted Grace
Hiếu An|Devoted Peace
Hiếu Thuần|Devoted Purity
Chiêu Đức|Radiant Virtue
Chiêu Hiến|Radiant Excellence
Trang Hiến|Dignified Excellence
Đoan Hiến|Noble Excellence
Thục Đức|Gentle Virtue
Thánh Từ|Sacred Compassion
Ý Đức|Harmonious Virtue
Thuần Đức|Pure Virtue
Kính Hiền|Reverent Virtue
Nhân Hiếu|Devoted Kindness
Minh Ý|Radiant Concord
An Đức|Peaceful Virtue
Trinh Hiến|Steadfast Excellence
Ôn Thành|Gentle Sincerity
Đoan Kính|Noble Reverence
Ôn Cung|Gentle Humility
Thuần Huệ|Pure Benevolence
Hiền Ninh|Virtuous Serenity
Trang Thuận|Dignified Concord
Kính Ý|Reverent Concord
Thục Gia|Gentle Excellence
Minh Cẩn|Radiant Prudence
Nhu Kính|Gentle Reverence
Chiêu Nhu|Radiant Gentleness
Tĩnh Huệ|Tranquil Benevolence
Tuệ An|Wise Serenity
Từ An|Compassionate Peace
Từ Huệ|Compassionate Benevolence
Từ Hòa|Compassionate Harmony
Từ Khánh|Compassionate Felicity
Đoan Ý|Noble Concord
Chiêu Ý|Radiant Concord
Ôn Huệ|Gentle Benevolence
Khánh An|Joyful Peace
Từ Minh|Compassionate Clarity`.split('\n').map(s=>s.split('|')));
const ranks={'Hoàng Quý Phi':'Imperial Noble Consort','Quý Phi':'Noble Consort','Hoàng hậu':'Empress','Hoàng Thái Hậu':'Empress Dowager','Phi':'Consort','Tần':'Concubine'};
const titles=new Map();
for(const [name,meaning] of Object.entries({...honorificEnglish,...posthumousEnglish}))for(const [rank,label] of Object.entries(ranks))titles.set((name+' '+rank).toLocaleLowerCase('vi'),label+' '+meaning);
export const princeEpithets={...honorificEnglish,Bình:'Peace',Cảnh:'Radiance',Dự:'Renown',Duệ:'Wisdom',Duy:'Resolve',Định:'Constancy',Hằng:'Perseverance',Hiển:'Eminence',Hoài:'Devotion',Hoằng:'Magnanimity',Hưng:'Prosperity',Khang:'Wellbeing',Khiêm:'Humility',Kiến:'Achievement',Lâm:'Nobility',Lễ:'Courtesy',Liêm:'Integrity',Lương:'Goodness',Mục:'Harmony',Quảng:'Generosity',Quang:'Brilliance',Sùng:'Reverence',Thái:'Great Peace',Thành:'Sincerity',Thiệu:'Continuity',Thịnh:'Abundance',Trạch:'Benevolence',Triệu:'Promise',Túc:'Solemnity',Tuyên:'Renown',Uy:'Majesty',Vĩnh:'Eternity',Vũ:'Valor'};
const princessFirst={An:'Peaceful',Trường:'Enduring',Chiêu:'Radiant',Hoài:'Cherished',Vĩnh:'Eternal',Đoan:'Noble',Phúc:'Blessed',Nhạc:'Joyful',Thanh:'Pure',Thuận:'Harmonious',Gia:'Gracious',Ngọc:'Precious'};
const princessLast={Ninh:'Serenity',An:'Peace',Hòa:'Harmony',Lạc:'Joy',Nghi:'Grace',Khang:'Wellbeing',Bình:'Tranquility',Hoa:'Blossom',Dung:'Elegance'};
export const princessEpithets=Object.fromEntries(PRINCESS_HONORIFICS.map(name=>{const [a,b]=name.split(' ');return [name,princessFirst[a]+' '+princessLast[b]];}));
for(const name of PRINCE_HONORIFICS)for(const [rank,label] of [['Vương','Prince'],['Thân Vương','Imperial Prince']])titles.set((name+' '+rank).toLocaleLowerCase('vi'),label+' '+princeEpithets[name]);
for(const [name,meaning] of Object.entries(princessEpithets))titles.set((name+' Công chúa').toLocaleLowerCase('vi'),'Princess '+meaning);
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const pattern=new RegExp('(?<![\\p{L}\\p{M}])(?:'+[...titles.keys()].sort((a,b)=>b.length-a.length).map(escape).join('|')+')(?![\\p{L}\\p{M}])','giu');
export function displayTitles(text){return text.replace(pattern,m=>titles.get(m.toLocaleLowerCase('vi')));}
export function displayPosthumous(name){return posthumousEnglish[name]||honorificEnglish[name]||name;}
