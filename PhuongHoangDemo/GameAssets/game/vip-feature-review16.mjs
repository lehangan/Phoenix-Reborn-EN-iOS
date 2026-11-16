import{VIP_FACES}from'./vip-faces.mjs';
import{FEATURE_ASSETS}from'./feature-assets16.mjs';
import{FEATURE_FRAME as F}from'./face-rig16.mjs';
export const VIP_FEATURE_FACES=VIP_FACES;
export const FEATURE_TYPES=['eyes','nose','mouth'];
export const featureFace=id=>Number.isInteger(id)?VIP_FEATURE_FACES.find(f=>f.id===id):undefined;
export function vipFeatureArt(type,id,shape=0){
 if(!featureFace(id)||!FEATURE_TYPES.includes(type))return '';
 const base=[0,1,2].includes(shape)?shape:0,src=FEATURE_ASSETS[id][base][type];
 return `<g data-layer="vip-feature-${type}" data-source-face="${id}" data-base-shape="${base}"><image href="${src}" x="${F.x}" y="${F.y}" width="${F.w}" height="${F.h}"/></g>`;
}
export function featureThumbnail(type,id,shape=0){
 const face=featureFace(id);if(!face)return '';
 const bounds={eyes:'124 102 72 29',nose:'146 120 28 24',mouth:'142 136 36 18'};
 return `<svg viewBox="${bounds[type]}" role="img" aria-label="${face.name}">${vipFeatureArt(type,id,shape)}</svg>`;
}
