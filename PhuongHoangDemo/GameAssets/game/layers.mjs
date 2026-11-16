import {vipFeatureArt} from './vip-feature-review16.mjs';
import {skinAxisShift} from './face-rig16.mjs';
import {MIAO_ROBE_FITS,MIAO_HEAD_FITS} from './miao-art111.mjs';
import {COLOR_GROUPS} from './wearable-colors.mjs';
import {DUNHUANG_FITS,DUNHUANG_ROBE_FITS} from './dunhuang-art.mjs';
import {ROBE_FITS_V75,ORNAMENT_FITS_V75} from './wearable-art-v75.mjs';
const ROBE_FITS={...DUNHUANG_ROBE_FITS,...ROBE_FITS_V75,...MIAO_ROBE_FITS,'robe-56':{necklineY:208,openNeck:true},'robe-70':{necklineY:208,openNeck:true}};
// Move the complete coronation sprite down to the player's marked hair line.
// The 31-unit translation includes the crown, centre pendant and both tassels.
const ORNAMENT_FITS={...DUNHUANG_FITS,...ORNAMENT_FITS_V75,...MIAO_HEAD_FITS,'hair-70':{kind:'crown',width:158,y:28,headRigScale:true}};
import {NEW_ORNAMENT_FITS} from './v30-art.mjs';
import {LAYER_MANIFEST as manifest} from './layer-assets.mjs';
import {ROBE_ART,ORNAMENT_ART} from './appearance-catalog.mjs';
import {itemById} from './inventory.mjs';
import {HUADIAN_NAMES} from './facial-features.mjs';
import {FACE_ART_V62} from './face-art-v62.mjs';
import {vipFaceById} from './vip-faces.mjs';
import {hairstyleById,CENTER_PART_X} from './hairstyles.mjs';

export const RIG={full:'-120 -20 560 740',ensemble:'20 -20 280 740',waist:'45 -20 230 400',head:'78 -20 164 244',avatar:'100 45 120 120',portrait:'100 37 120 132',headLift:-6,faceTop:61,garmentTop:166,garmentHeight:528,eyesY:105.5,noseY:127,mouthY:138.5};
function region(file,index,r,x,y,w,h){const tile=manifest[file].tiles[index];return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${r.join(' ')}" preserveAspectRatio="xMidYMid meet" overflow="hidden"><image href="${tile.src}" x="${tile.x}" y="${tile.y}" width="${tile.w}" height="${tile.h}"/></svg>`;}
export function sprite(file,index,x,y,w,h){const r=manifest[file]?.rects[index];return r?region(file,index,r,x,y,w,h):'';}
function placed(file,index,cx,y,width){const r=manifest[file].rects[index];return sprite(file,index,cx-width/2,y,width,width*r[3]/r[2]);}
// Every VIP face uses the same complete head, neck and shoulder canvas.
// Keep one uniform transform so collars cannot expose a stretched or detached neck.
function vipSkin(vip){
 return `<image data-layer="vip-face" data-vip-face="${vip.id}" href="${vip.src}" x="102" y="60" width="116" height="${116*vip.h/vip.w}" preserveAspectRatio="xMidYMid meet"/>`;
}
function skin(index,fitted=false,vipFace=null){const m=manifest['skin-v4'],r=m.rects[index],a=m.anchors[index],s=m.scale;const vip=vipFaceById(vipFace),art=vip?vipSkin(vip):sprite('skin-v4',index,160+skinAxisShift(index)+(r[0]-a[0])*s,RIG.faceTop+(r[1]-a[1])*s,r[2]*s,r[3]*s);
 if(!fitted)return art;
 // Round, open collars need the original shoulders as well as the neck.
 // Keep the tighter silhouette for fitted, closed collars and crop below the chest.
 const id='robe-body-'+(++featureUid);
 const outline=fitted.openNeck?'M-500 -500H820V156H212V226H108V156H-500Z':'M-500 -500H820V156H182C182 174 190 184 196 190V226H124V190C130 184 138 174 138 156H-500Z';
 return `<defs><clipPath id="${id}"><path d="${outline}"/></clipPath></defs><g data-layer="fitted-neck" clip-path="url(#${id})">${art}</g>`;}
function mirror(left){return `<g data-layer="ornament-symmetry">${left}<g transform="translate(320 0) scale(-1 1)">${left}</g></g>`;}
function paired(file,index,cx,y,width){return mirror(placed(file,index,cx,y,width));}
// Crowns and forehead drapes are complete bilateral designs with central motifs.
// Side appliques alone use an exact reflection to form a pair.
function central(file,index,y,width,cx=160){return `<g data-layer="ornament-central">${placed(file,index,cx,y,width)}</g>`;}
export function robeArt(item){return item.miaoArt?{file:item.id,index:0}:item.serviceGrant!==undefined?{file:'robe-v68-'+item.index,index:0}:item.index>=71?{file:'robe-v55-'+item.index,index:0}:item.index===70?{file:'robe-empress',index:0}:item.index>=50?{file:'robe-v30-'+item.index,index:0}:ROBE_ART[item.id]||{file:'tang-robes-'+Math.floor(item.index/10),index:item.index%10};}
export function ornamentArt(item){return item.miaoArt?{file:item.id,index:0,kind:'miao-central'}:item.index>=71?{file:'hair-v55-'+item.index,index:0,kind:ORNAMENT_FITS[item.id].kind}:item.index===70?{file:'hair-empress',index:0,kind:'crown'}:item.index>=50?{file:'hair-v30-'+item.index,index:0,kind:NEW_ORNAMENT_FITS[item.id]||'flower-crown'}:ORNAMENT_ART[item.id]||{file:'paired-jewels-'+Math.floor(item.index/10),index:item.index%10,kind:'small-pair'};}
const ornamentFits={
 'crown':{width:128,y:10},'flower-crown':{width:120,y:30},
 'forehead-chain':{width:68,y:65},'tassel-tiara':{width:118,y:35},
 'large-pair':{width:41,dx:-2,dy:0},'tassel-pair':{width:29,dx:-1,dy:1},
 'small-pair':{width:29,dx:0,dy:3}
};
export function ornamentPlacement(item,front=0){const a=ornamentArt(item),f=ORNAMENT_FITS[item.id]||ornamentFits[a.kind],hair=hairstyleById(front);if(item.miaoArt)return {width:f.width,y:f.y,anchorX:f.anchorX};const fit=f.headRigScale?1:hair.fit||1,adjust=f.hairstyles?.[hair.id]||{};return a.kind.endsWith('pair')?{width:f.width*fit,cx:160+(hair.pairX+f.dx-160)*fit,y:87+(hair.jewelY+f.dy-87)*fit}:{width:f.width*fit*(adjust.scale||1),y:87+(f.y-87)*fit+(adjust.dy||0),cx:160+(adjust.dx||0)};}
function ornament(item,inventory=false,front=0){const a=ornamentArt(item),r=manifest[a.file]?.rects[a.index];if(!r)return '';const pair=a.kind.endsWith('pair'),f=ornamentPlacement(item,front);if(inventory){const width=pair?Math.min(112,145*r[2]/r[3]):Math.min(280,150*r[2]/r[3]),y=(166-width*r[3]/r[2])/2;return pair?paired(a.file,a.index,79,y,width):central(a.file,a.index,y,width);}if(item.miaoArt)return `<g data-layer="miao-headwear">${sprite(a.file,a.index,160-(f.anchorX??r[2]/2)*f.width/r[2],f.y,f.width,f.width*r[3]/r[2])}</g>`;return pair?paired(a.file,a.index,f.cx,f.y,f.width):central(a.file,a.index,f.y,f.width,f.cx);}
function fittedHair(style){
 const m=manifest[style.file];if(!m)return '';
 const r=[...m.rects[0]],a=m.anchors[0],scale=m.scale*(style.fit||1);
 // Front cap and bun only. Long back hair is rendered below skin and robe.
 return region(style.file,0,r,160+(r[0]-(CENTER_PART_X[style.id]??a[0]))*scale,87+(r[1]-a[1])*scale,r[2]*scale,r[3]*scale);
}
function frontHair(style){
 if(style.file)return fittedHair(style);
 const r=manifest.hair.rects[3+style.id],scale=.31;return sprite('hair',3+style.id,160+(r[0]-(CENTER_PART_X[style.id]??(256+style.id*512)))*scale,87+(r[1]-700)*scale,r[2]*scale,r[3]*scale);
}
export function wearableBadges(item,compact=false){
 return `<span class="wearable-badges ${compact?'is-compact':''}"><span class="wearable-luxury" aria-label="Xa xỉ ${item.luxury} trên 100"><small>Xa xỉ</small><b>${item.luxury}</b></span><span class="wearable-colors" aria-label="Hai màu chính">${(item.colors||[]).map(id=>{const c=COLOR_GROUPS.find(c=>c.id===id);return `<span class="wearable-color" aria-label="${c.name}" title="${c.name}"><i style="--swatch:${c.swatch}" aria-hidden="true"></i>${compact?'':c.name}</span>`;}).join('')}</span></span>`;
}
// Item details are opt-in: only inventory and the fashion festival show badges.
export function itemArt(item,cls='',{showDetails=false}={}){
 if(typeof item==='string')item=itemById(item);if(!item)return '';
 if(item.type==='pet')return `<img class="item-art pet-art ${cls}" src="${item.asset}" alt="${item.name}" loading="lazy" width="320" height="320">`;
 const frame=art=>showDetails?`<span class="wearable-art">${art}${wearableBadges(item,true)}</span>`:art;
 if(item.type==='hair')return frame(`<svg class="item-art ${cls}" viewBox="0 0 320 166" aria-hidden="true">${ornament(item,true)}</svg>`);
 const a=robeArt(item),r=manifest[a.file]?.rects[a.index];if(!r)return '';
 return frame(`<svg class="item-art ${cls}" viewBox="0 0 ${r[2]} ${r[3]}" aria-hidden="true">${sprite(a.file,a.index,0,0,r[2],r[3])}</svg>`);
}
let featureUid=0;
function basicBlush(index){
 const cx=[141,140.8,141.2][index],y=130,r=15;
 const id='blush-'+(++featureUid),clip=id+'-skin';
 return `<g data-layer="basic-blush" style="isolation:isolate" pointer-events="none"><defs><radialGradient id="${id}"><stop offset="0" stop-color="#df7d90" stop-opacity=".30"/><stop offset=".35" stop-color="#df7d90" stop-opacity=".26"/><stop offset=".65" stop-color="#df7d90" stop-opacity=".13"/><stop offset=".85" stop-color="#df7d90" stop-opacity=".035"/><stop offset="1" stop-color="#df7d90" stop-opacity="0"/></radialGradient><clipPath id="${clip}"><path d="M130 116Q126 135 140 149Q151 158 160 158Q169 158 180 149Q194 135 190 116Z"/></clipPath></defs><g clip-path="url(#${clip})">${[cx,320-cx].map(x=>`<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id})"/>`).join('')}</g></g>`;
}
function huadian(id){
 if(!Number.isInteger(id)||id<0||id>=HUADIAN_NAMES.length)return '';
 const added=FACE_ART_V62.huadian[id],width=5.8;
 const art=added?`<image href="${added.src}" x="${160-width/2}" y="103" width="${width}" height="${width*added.h/added.w}" preserveAspectRatio="xMidYMid meet"/>`:placed('huadian-v8',id,160,103,width);
 return `<g data-layer="huadian" aria-label="${HUADIAN_NAMES[id]}">${art}</g>`;
}
export function character(a,mode='full',cls=''){
 const variant=v=>((Number(v)||0)%3+3)%3;
 const robe=itemById(a.robe)||itemById('robe-0'),head=itemById(a.ornament),style=hairstyleById(a.front),art=robeArt(robe);
 const m=manifest[art.file];if(!m)return '';const r=m.rects[art.index],anchor=m.anchors[art.index];
 // Each source has a different collar depth. Fit its actual shoulder line,
 // keep the original body in place, and preserve the robe's aspect ratio.
 const garmentTop=ROBE_FITS[robe.id]?.necklineY??RIG.garmentTop;
 const garmentScale=(RIG.garmentTop+RIG.garmentHeight-garmentTop)/(r[1]+r[3]-anchor[1]),garmentX=160+(r[0]-anchor[0])*garmentScale,garmentY=garmentTop+(r[1]-anchor[1])*garmentScale;
 const fittingLeft=Math.min(20,garmentX-12),fittingRight=Math.max(300,garmentX+r[2]*garmentScale+12);
 // Group scenes share a fixed body scale; wide sleeves and tall ornaments may
 // overflow their cell instead of shrinking the entire person to fit it.
 let viewBox=mode==='fitting'?`${fittingLeft} -20 ${fittingRight-fittingLeft} 740`:RIG[['head','avatar','portrait','waist','ensemble'].includes(mode)?mode:'full'];
 // Tall buns need headroom while face-only avatars retain their familiar crop.
 if(style.file&&!MIAO_HEAD_FITS[head?.id]?.cap&&!['avatar','portrait','ensemble'].includes(mode)){
  const hair=manifest[style.file],scale=hair.scale*(style.fit||1),top=87+(hair.rects[0][1]-hair.anchors[0][1])*scale+RIG.headLift-5;
  const box=viewBox.split(' ').map(Number);
  if(top<box[1]){box[3]+=box[1]-Math.floor(top);box[1]=Math.floor(top);}
  const left=160+(hair.rects[0][0]-(CENTER_PART_X[style.id]??hair.anchors[0][0]))*scale-5,right=left+hair.rects[0][2]*scale+10;
  if(left<box[0]||right>box[0]+box[2]){const half=Math.ceil(Math.max(160-left,right-160,box[2]/2));box[0]=160-half;box[2]=half*2;}
  viewBox=box.join(' ');
 }
 let hairLayer=frontHair(style);
 const hairDome=head?.miaoArt&&MIAO_HEAD_FITS[head.id]?.hairDome;
 if(hairDome){
  const clip='miao-openwork-'+(++featureUid),{left,right,top,base}=hairDome;
  hairLayer=`<defs><clipPath id="${clip}"><path d="M-200 ${base}H${left}C${left} ${top+15} ${left+20} ${top} 160 ${top}C${right-20} ${top} ${right} ${top+15} ${right} ${base}H520V800H-200Z"/></clipPath></defs><g data-layer="hair-under-openwork" clip-path="url(#${clip})">${hairLayer}</g>`;
 }
 if(head?.miaoArt&&MIAO_HEAD_FITS[head.id]?.cap){const clip='miao-cap-'+(++featureUid);hairLayer=`<defs><clipPath id="${clip}"><rect x="-200" y="${MIAO_HEAD_FITS[head.id].hairCutY??66}" width="720" height="700"/></clipPath></defs><g data-layer="hair-under-cap" clip-path="url(#${clip})">${hairLayer}</g>`;}
 if(head?.miaoArt&&!['avatar','portrait','ensemble'].includes(mode)){const f=MIAO_HEAD_FITS[head.id],box=viewBox.split(' ').map(Number),top=f.y+RIG.headLift-5;if(top<box[1]){box[3]+=box[1]-top;box[1]=top;}const half=Math.max(box[2]/2,f.width/2+8);box[0]=160-half;box[2]=half*2;viewBox=box.join(' ');}
 return `<svg class="character ${cls}" data-look="${encodeURIComponent(JSON.stringify([a,mode,cls]))}" viewBox="${viewBox}" role="img" aria-label="Nhân vật với ngoại hình ghép lớp">
 <g data-layer="head-base" transform="translate(0 ${RIG.headLift})">
 ${style.file&&!style.longBack?'':`<svg data-layer="back-hair" x="0" y="93" width="320" height="230" viewBox="0 93 320 230" overflow="hidden">${placed('hair',variant(a.back),160,40,110)}</svg>`}
 ${skin(variant(a.face),ROBE_FITS[robe.id],a.vipFace)}
 </g>
 ${sprite(art.file,art.index,garmentX,garmentY,r[2]*garmentScale,r[3]*garmentScale)}
 <g data-layer="head-details" transform="translate(0 ${RIG.headLift})">
 ${vipFaceById(a.vipFace)?'':vipFeatureArt('eyes',a.eyes,variant(a.face))+vipFeatureArt('nose',a.nose,variant(a.face))+vipFeatureArt('mouth',a.mouth,variant(a.face))+huadian(a.huadian)}
 ${!vipFaceById(a.vipFace)?`<g data-layer="face-makeup-top">${basicBlush(variant(a.face))}</g>`:''}
 ${a.disfigured?`<g data-layer="facial-scars" fill="#b9414b" opacity=".86" aria-label="Ba vết móng vuốt cào"><path d="M153 118C163 122 174 132 181 139C173 134 161 125 153 118Z"/><path d="M147 123C157 128 168 138 175 145C166 139 155 130 147 123Z"/><path d="M142 129C151 133 160 142 167 148C159 144 148 136 142 129Z"/></g>`:''}
 ${hairLayer}
 ${head?ornament(head,false,style.id):''}
 </g>
 </svg>`;
}
