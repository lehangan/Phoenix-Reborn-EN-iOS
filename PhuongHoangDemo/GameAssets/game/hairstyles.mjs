import {TANG_HAIRSTYLES} from './tang-hairstyles-v105.mjs';
// Stable numeric IDs: 0–2 preserve hairstyles in existing V2 saves.
export const HAIRSTYLES=[
 {id:0,name:'Song Kế',pairX:124,jewelY:61},
 {id:1,name:'Vân Hoàn',pairX:127,jewelY:59},
 {id:2,name:'Cao Kế',pairX:126,jewelY:59},
 {id:3,fit:0.82,name:'Vân Cao',file:'hair-van-cao-v5',pairX:125,jewelY:59},
 {id:4,fit:0.78,name:'Song Hoàn',file:'hair-song-hoan-v5',pairX:126,jewelY:59},
 {id:5,fit:0.68,name:'Phiến Vân',file:'hair-phien-van-v5',pairX:124,jewelY:59},
 {id:6,fit:0.76,name:'Nghiêng Nguyệt',file:'hair-nghien-nguyet-v5',pairX:126,jewelY:59},
 ...TANG_HAIRSTYLES
];
export const hairstyleById=id=>HAIRSTYLES.find(h=>h.id===id)||HAIRSTYLES[0];

// NPC ornaments are their own wardrobe; this never grants player inventory.
export const NPC_ORNAMENT_POOLS={
 'Cùng viện':[0,3,5],
 'Cung nữ trưởng':[0,3,5,14,17],
 'Nữ quan':[2,5,17,23],
 'Tài nhân':[1,4,6,12,18],
 'Mỹ nhân':[9,13,15,16,38],
 'Thượng cung':[2,5,17,23],
 'Chưởng sự':[0,3,17]
};
export function npcOrnamentPool(role){return NPC_ORNAMENT_POOLS[role]||NPC_ORNAMENT_POOLS['Cùng viện'];}
export function restoreNpcOrnaments(npcs){
 for(const npc of npcs){
  if(npc.gender==='male'||npc.appearance.ornament)continue;
  const pool=npcOrnamentPool(npc.role);
  let hash=2166136261;
  for(const c of String(npc.id)+'|'+String(npc.name))hash=Math.imul(hash^c.charCodeAt(0),16777619)>>>0;
  npc.appearance.ornament='hair-'+pool[hash%pool.length];
 }
}

// Measured part lines align with the character's nose axis.
export const CENTER_PART_X={0:264,1:773,2:1283,3:638,4:634,5:627,6:632,8:628,9:635,11:627};
