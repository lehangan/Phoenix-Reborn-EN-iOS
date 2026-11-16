// One catalogue for the bag, reward notices, minigames and annual ceremony.
export const CHEST_ART={
 wood:{name:'Rương gỗ tích công',asset:'assets/fashion32/chest-wood.webp'},
 silk:{name:'Rương gấm ban thưởng',asset:'assets/fashion32/chest-silk.webp'},
 jade:{name:'Rương ngọc quý',asset:'assets/fashion32/chest-jade.webp'}
};
export function chestArt(tier='wood',className='treasure-chest'){
 const chest=CHEST_ART[tier]||CHEST_ART.wood;
 return `<img class="${className}" src="${chest.asset}" alt="${chest.name}" width="240" height="240">`;
}
