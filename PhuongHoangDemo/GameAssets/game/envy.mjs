// Legacy suspicion is absorbed once. Keep the higher threat instead of doubling
// an old save's accumulated penalties; subsequent effects use envy exclusively.
export function migrateEnvy(s){
 const p=s.p;if(!p)return;
 if(p.suspicion!==undefined){if(!Number.isFinite(p.suspicion)||p.suspicion<0||p.suspicion>100)throw Error('Đố kỵ trong bản lưu cũ không hợp lệ.');p.envy=Math.max(p.envy??0,p.suspicion);delete p.suspicion;}
 p.envy??=0;
 const rename=(v,depth=0)=>{if(depth>32)throw Error('Bản lưu lồng quá sâu.');if(!v||typeof v!=='object')return;for(const key of Object.keys(v)){if(key==='suspicion'){v.envy=(v.envy||0)+v[key];delete v[key];}else if(typeof v[key]==='string')v[key]=v[key].replaceAll('Nghi kỵ','Đố kỵ').replaceAll('nghi kỵ','đố kỵ').replaceAll('Nghi kị','Đố kỵ').replaceAll('nghi kị','đố kỵ');else rename(v[key],depth+1);}};
 for(const value of [s.result,s.story,s.notices,s.log,s.legacy?.histories])rename(value);
}
