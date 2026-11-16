// One shared, lightweight soundtrack. It never changes or replaces the game save.
export const MUSIC_KEY='phuong-hoang-trung-sinh-music-v1';
export function createPalaceMusic({makeAudio=()=>new Audio('assets/audio/ho-trang-nguyet-v33.mp3'),storage=globalThis.localStorage,onChange=()=>{}}={}){
  let enabled=true,unlocked=false,blocked=false,hidden=false,audio=null,playing=false,disposed=false;
  try{enabled=storage.getItem(MUSIC_KEY)!=='off';}catch{}
  const status=()=>({enabled,playing,blocked,hidden});
  const notify=()=>onChange(status());
  function sync(){
    if(disposed)return;
    if(!enabled||!unlocked||blocked||hidden){audio?.pause();playing=false;notify();return;}
    try{
      if(!audio){audio=makeAudio();audio.loop=true;audio.preload='none';audio.volume=.45;}
      if(!audio.paused){playing=true;notify();return;}
      Promise.resolve(audio.play()).then(()=>{
        if(disposed||!enabled||blocked||hidden){audio.pause();playing=false;}else playing=true;
        notify();
      }).catch(()=>{playing=false;notify();});
    }catch{playing=false;notify();}
  }
  return {
    status,
    unlock(){if(disposed)return;unlocked=true;sync();},
    toggle(){enabled=!enabled;unlocked=true;try{storage.setItem(MUSIC_KEY,enabled?'on':'off');}catch{}sync();return enabled;},
    setBlocked(value){const next=!!value;if(blocked===next)return;blocked=next;sync();},
    setHidden(value){const next=!!value;if(hidden===next)return;hidden=next;sync();},
    dispose(){disposed=true;audio?.pause();if(audio){audio.removeAttribute('src');audio.load();}playing=false;}
  };
}
