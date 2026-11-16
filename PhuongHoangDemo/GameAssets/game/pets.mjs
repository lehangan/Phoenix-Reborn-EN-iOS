import {DUNHUANG_PETS} from './pets-v55.mjs';
export const PET_RARITY_WEIGHTS=Object.freeze([35,32,23,10]);
const names=['Bạch Thố','Nâu Hạt Dẻ','Tam Thể','Tuyết Miêu','Quýt Nhỏ','Mặc Miêu','Bông Tuyết','Kim Khuyển','Bạch Hồ','Xích Hồ','Hạt Thông','Nhím Đậu','Tiểu Hùng Miêu','Thủy Ly','Lộc Non','Bạch Khổng Tước','Lam Khổng Tước','Đan Đỉnh Hạc','Kim Trĩ','Huyền Thiên Nga','Tuyết Báo','Bạch Hổ','Kim Sư','Ngân Lang','Kim Lộc','Nguyệt Thố','Cửu Vĩ Hồ','Ngọc Kỳ Lân','Kim Phượng','Bạch Long'];
const keys=['luck','speech','art','beauty','intelligence'];
// Permanent catalogue upgrades apply to existing inventory IDs as well as new drops.
const legacyRarePerks={
 15:{fertility:.08,offspringQuality:20},
 16:{offspringQuality:20},
 17:{lifeGuard:true,fertility:.05},
 18:{fertility:.08,offspringQuality:10},
 19:{coldImmunity:true,offspringQuality:10},
 20:{lifeGuard:true,offspringQuality:10},
 21:{coldImmunity:true},
 22:{lifeGuard:true},
 23:{lifeGuard:true,fertility:.10},
 24:{bondGift:5,offspringQuality:30,fertility:.10},
 25:{fertility:.12,offspringQuality:30},
 26:{fertility:.15,offspringQuality:20},
 27:{lifeGuard:true,bondGift:10,offspringQuality:20},
 28:{coldImmunity:true,offspringQuality:30},
 29:{lifeGuard:true,coldImmunity:true,fertility:.10}
};
export const PETS=names.map((name,index)=>{const rarity=index<8?0:index<15?1:index<23?2:3;return {id:'pet-'+index,type:'pet',index,name,rarity,luxury:[12,36,62,90][rarity],source:'Hiếm gặp trong rương báu',unlock:'chest',asset:`assets/v35/pets/pet-${index}.webp`,bonuses:{[keys[index%keys.length]]:rarity+1,...(rarity>=2?{[keys[(index+2)%keys.length]]:rarity===3?3:2}:{})},perks:{...(legacyRarePerks[index]||{})}};});
PETS.push(...DUNHUANG_PETS);
export const petById=id=>PETS.find(p=>p.id===id);
export const equippedPet=s=>s.p?.inventory?.includes(s.p.pet)?petById(s.p.pet):null;
export function petPerkText(pet){const p=pet?.perks||{};return [p.lifeGuard?'Khi đi cùng: thế mạng cho chủ 1 lần khi gặp cái chết; thú cưng sẽ biến mất. Không hóa giải kết thúc xuất cung hay lãnh cung cả đời.':'',p.fertility?`Khi đi cùng: xác suất thụ thai +${Math.round(p.fertility*100)} điểm phần trăm (từ 18 tuổi).`:'',p.offspringQuality?`Khi đi cùng lúc sinh: tăng cơ hội con có tư chất từ Ưu tú trở lên thêm ${p.offspringQuality} điểm phần trăm.`:'',p.bondGift?`Lần đầu nhận nuôi: thiện cảm với mọi NPC đang sống +${p.bondGift}.`:'',p.coldImmunity?'Khi đi cùng: được miễn án lãnh cung mới. Không gỡ án đang thi hành hoặc án tranh hậu thất bại.':''].filter(Boolean).join(' ');}
export function validatePets(s){const p=s.p;p.pet??=null;p.petBondClaims??=p.inventory.filter(id=>petById(id)?.perks.bondGift);if(!Array.isArray(p.petBondClaims)||new Set(p.petBondClaims).size!==p.petBondClaims.length||p.petBondClaims.some(id=>!petById(id)?.perks.bondGift))throw Error('Quà nhận nuôi không hợp lệ.');if(p.pet!==null&&(!petById(p.pet)||!p.inventory.includes(p.pet)))throw Error('Thú cưng đi cùng không hợp lệ.');for(const n of s.npcs)if(n.petBondGift!==undefined&&(!Number.isInteger(n.petBondGift)||n.petBondGift<0||n.petBondGift>15))throw Error('Ân tình thú cưng không hợp lệ.');}

const lethalCauses=new Set(['imperialSecret','rescueEmperor','childbirth','longevity','accident','assassination','poison','punishment','disease','exhaustion','elopeLost','crownExecution','crownRevenge','funeralSacrifice']);
export function sacrificePet(s,cause){const pet=equippedPet(s);if(!pet?.perks.lifeGuard||!lethalCauses.has(cause))return null;s.p.inventory=s.p.inventory.filter(id=>id!==pet.id);s.legacy.collection=s.legacy.collection.filter(id=>id!==pet.id);s.p.pet=null;s.p.health=Math.max(s.p.health,30);if(cause==='longevity')s.p.lifespan=Math.max(s.p.lifespan,s.p.ageMonths+12);s.p.illness=null;s.p.envy=Math.min(s.p.envy,65);s.p.petSacrifices??=[];s.p.petSacrifices.push({id:pet.id,month:s.p.months,cause});return pet;}
