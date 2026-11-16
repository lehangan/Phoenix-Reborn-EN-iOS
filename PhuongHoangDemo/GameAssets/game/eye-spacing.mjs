import {LAYER_MANIFEST as manifest} from './layer-assets.mjs';
import {CUTE_EYES,EYE_VARIANTS} from './facial-features.mjs';
import {FACE_ART_V62} from './face-art-v62.mjs';
import {FACE_ART_V68} from './face-art-v68.mjs';
import {FACE_ART_V63} from './face-art-v63.mjs';

// Eyelid corners measured in each source tile (not the lashes/brow alpha bounds).
// left outer, left inner, right inner, right outer, inner-corner baseline.
export const EYE_CORNERS=[
 [48,163,233,347,110], [57,157,229,334,115],
 [53,166,237,350,111], [55,158,234,343,106],
 [48,160,232,343,105], [45,151,225,330,108],
 [285,642,897,1254,600], [291,639,903,1251,606],
 ...Object.values(FACE_ART_V63.eyes).map(e=>e.corners),
 ...Object.values(FACE_ART_V68.eyes).map(e=>e.corners)
];
export const EYE_GAP_RATIO=0.97;
// Round bunny eyes use the closer spacing requested for this specific shape.
export const EYE_GAP_OVERRIDES={7:0.9};

export function eyePlacement(id){
 const index=Math.max(0,Math.min(EYE_VARIANTS-1,Math.floor(Number(id)||0))),cute=CUTE_EYES.find(e=>e.id===index),added=FACE_ART_V68.eyes[index]||FACE_ART_V63.eyes[index]||FACE_ART_V62.eyes[index];
 const file=index<3?'features-v3':'features-v8',cell=index%3;
 const tile=added?{...added,x:0,y:0}:cute?{src:cute.asset,x:0,y:0,w:1536,h:1024}:manifest[file].tiles[cell];
 const r=added?[0,0,added.w,added.h]:cute?[0,0,1536,1024]:manifest[file].rects[cell];
 const [lo,li,ri,ro,baseline]=EYE_CORNERS[index],scale=cute?80/1536:58/r[2];
 const originalWidth=added?(added.width??18.5):((li-lo)+(ro-ri))/2*scale;
 // Shorten only the new VIP-inspired eyes horizontally, keeping their height.
 // The inner-corner gap equals exactly one shortened eye's width.
 const width=originalWidth*(FACE_ART_V68.eyes[index]?0.85:1);
 const gap=width*(FACE_ART_V68.eyes[index]?1:(EYE_GAP_OVERRIDES[index]??EYE_GAP_RATIO));
 const split=tile.x+(li+ri)/2;
 const sourceY=tile.y+baseline,y=added?(added.baseline??121.5):(cute?90:105.5)+(sourceY-r[1])*scale;
 const halves=[
  {rect:[r[0],r[1],split-r[0],r[3]],inner:tile.x+li,scale:width/(li-lo),scaleY:originalWidth/(li-lo),target:160-gap/2},
  {rect:[split,r[1],r[0]+r[2]-split,r[3]],inner:tile.x+ri,scale:width/(ro-ri),scaleY:originalWidth/(ro-ri),target:160+gap/2}
 ].map(h=>({...h,x:h.target-(h.inner-h.rect[0])*h.scale,y:y-(sourceY-h.rect[1])*h.scaleY,w:h.rect[2]*h.scale,h:h.rect[3]*h.scaleY}));
 return {index,cute,tile,width,gap,halves};
}

export function eyeArt(id){
 const {index,cute,tile,width,gap,halves}=eyePlacement(id);
 return `<g data-layer="${cute?'eyes-cute':'eyes-spaced'}" data-eye-variant="${index}" data-eye-width="${width}" data-eye-gap="${gap}"${cute?` aria-label="${cute.name}"`:''}>${halves.map(p=>`<svg x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" viewBox="${p.rect.join(' ')}" preserveAspectRatio="${p.scale===p.scaleY?'xMidYMid meet':'none'}" overflow="hidden"><image href="${tile.src}" x="${tile.x}" y="${tile.y}" width="${tile.w}" height="${tile.h}"/></svg>`).join('')}</g>`;
}
