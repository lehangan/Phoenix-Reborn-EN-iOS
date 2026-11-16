import {RELEASE_INFO} from './release-info.mjs';

export const RELEASE_SEEN_KEY='palace:last-seen-release';
export const releaseIdentity=release=>release.version+'@'+release.updatedAt;
export const updateDot='<i class="update-dot" aria-hidden="true"></i>';

// Older releases stored 111; dotted releases display the same sequence as 1.11.
const versionParts=version=>{
 if(typeof version!=='string'||!/^\d+(?:\.\d+)?$/.test(version))return null;
 const parts=version.includes('.')?version.split('.').map(Number):[Math.floor(Number(version)/100),Number(version)%100];
 return parts.every(Number.isSafeInteger)?parts:null;
};
const compareVersions=(a,b)=>{
 const left=versionParts(a),right=versionParts(b);
 if(!left||!right)return null;
 return Math.sign(left[0]-right[0]||left[1]-right[1]);
};

export function createReleaseTracker({storage,release=RELEASE_INFO}={}){
 let current=release,seen=null;
 try{seen=storage?.getItem(RELEASE_SEEN_KEY)||null;}catch{}
 return {
  current:()=>current,
  unread(){
   if(seen===releaseIdentity(current))return false;
   const [version,updatedAt]=String(seen||'').split('@');
   const order=compareVersions(version,current.version);
   return !(order===1||order===0&&Date.parse(updatedAt)>=Date.parse(current.updatedAt));
  },
  markSeen(){if(!this.unread())return;seen=releaseIdentity(current);try{storage?.setItem(RELEASE_SEEN_KEY,seen);}catch{}},
  syncSeen(){try{seen=storage?.getItem(RELEASE_SEEN_KEY)||seen;}catch{}},
  accept(next){
   if(!next||!versionParts(next.version)||typeof next.updatedAt!=='string'||!Number.isFinite(Date.parse(next.updatedAt)))return false;
   if(compareVersions(next.version,current.version)===-1||Date.parse(next.updatedAt)<Date.parse(current.updatedAt)||releaseIdentity(next)===releaseIdentity(current))return false;
   current={version:next.version,updatedAt:next.updatedAt,...(Array.isArray(next.notes)?{notes:next.notes.filter(n=>typeof n==='string').slice(0,20)}:{})};return true;
  }
 };
}
