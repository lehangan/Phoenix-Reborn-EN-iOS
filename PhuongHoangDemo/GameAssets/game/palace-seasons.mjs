const SEASONS=[{id:'spring',label:'Xuân'},{id:'summer',label:'Hạ'},{id:'autumn',label:'Thu'},{id:'winter',label:'Đông'}];
export function palaceSeason(months=0){
 const month=((Math.floor(Number(months)||0)%12)+12)%12;
 return SEASONS[Math.floor(month/3)];
}
export function seasonParticles(months,cold=false){
 if(cold)return '';
 const season=palaceSeason(months),count=season.id==='summer'?6:8;
 return `<div class="palace-particles" aria-hidden="true">${Array.from({length:count},(_,i)=>`<i style="--x:${(i*37+11)%100}%;--y:${38+(i*17)%40}%;--delay:${-i*1.3}s;--duration:${10+i%7}s;--size:${2+i%3}px;--sway:${12+i%5*12}px"></i>`).join('')}</div>`;
}
