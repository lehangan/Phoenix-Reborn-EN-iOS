// A design grid derived from φ, fitted to the three existing head silhouettes.
// These are art-direction proportions, not a biological standard of beauty.
export const PHI=(1+Math.sqrt(5))/2;
export const FACE_SHAPES=[
 {id:0,hairline:98,chin:158.4,width:72,chinSourceX:258,eyeFaceWidth:59.52},
 {id:1,hairline:98,chin:159.3,width:74,chinSourceX:765,eyeFaceWidth:60},
 {id:2,hairline:98,chin:158.8,width:70,chinSourceX:1273,eyeFaceWidth:59.04}
];
export function faceRig(id=0){
 const shape=FACE_SHAPES[id]||FACE_SHAPES[0],height=shape.chin-shape.hairline;
 const eyes=shape.hairline+height/(PHI*PHI);
 const nose=eyes+(shape.chin-eyes)/(PHI*PHI);
 const mouth=nose+(shape.chin-nose)/(PHI*PHI);
 const outerSpan=shape.width/PHI,innerGap=outerSpan/(PHI**3);
 const eyeWidth=(outerSpan-innerGap)/2;
 return {...shape,axis:160,eyes,nose,mouth,pupilOffset:(innerGap+eyeWidth)/2,scale:.18*shape.width/72};
}
export const FEATURE_FRAME={x:108,y:96,w:104,h:65,density:6};
// The three raster heads have different chin offsets. Align the actual chin,
// rather than the bounding box, before positioning any facial features.
export function skinAxisShift(id){return ([257,767,1277][id]-FACE_SHAPES[id].chinSourceX)*.24;}
export function fittedEyes(id=0){
 const r=faceRig(id),eyeWidth=r.eyeFaceWidth/3.65;
 const innerGap=.95*eyeWidth,outerGap=.35*eyeWidth;
 return {axis:r.axis,faceWidth:r.eyeFaceWidth,eyeWidth,innerGap,outerGap,
  leftOuter:r.axis-innerGap/2-eyeWidth,leftInner:r.axis-innerGap/2,
  rightInner:r.axis+innerGap/2,rightOuter:r.axis+innerGap/2+eyeWidth};
}
export function goldenGuide(id){const r=faceRig(id);return `<g data-layer="golden-guides" fill="none" stroke="#8e4658" stroke-width=".25" opacity=".85" pointer-events="none"><path stroke-dasharray="1 1" d="M160 ${r.hairline-2}V${r.chin+2}"/>${[['Chân tóc',r.hairline],['Mắt',r.eyes],['Mũi',r.nose],['Môi',r.mouth],['Cằm',r.chin]].map(([name,y])=>`<path stroke-dasharray="1 1" d="M110 ${y}H210"/><text x="207" y="${y-.5}" fill="#763542" stroke="none" font-family="Arial" font-size="2.7" text-anchor="end">${name}</text>`).join('')}</g>`;}
