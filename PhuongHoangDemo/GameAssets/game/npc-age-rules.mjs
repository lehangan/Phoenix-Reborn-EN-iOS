export const NPC_EMPEROR_MAX_AGE_GAP=7;

const imperialWoman=n=>n.gender==='female'&&n.alive!==false&&(
 ['candidate','consort'].includes(n.roleClass)||['candidate','consort'].includes(n.role)||
 n.role==='Tú nữ'||n.role?.startsWith('Tú nữ ·')
);

// Adjust age only, without rerolling NPC identities, relationships or world RNG.
export function capImperialNpcAges(s){
 const emperor=s.npcs?.find(n=>n.id==='emperor'&&n.alive!==false);
 if(!Number.isInteger(emperor?.age))return 0;
 const maximum=emperor.age+NPC_EMPEROR_MAX_AGE_GAP;let changed=0;
 for(const n of s.npcs)if(imperialWoman(n)&&Number.isFinite(n.age)&&n.age>maximum){n.age=maximum;changed++;}
 return changed;
}
