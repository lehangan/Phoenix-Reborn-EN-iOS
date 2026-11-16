export const MALE_PORTRAIT_VARIANTS=Object.freeze(Array.from({length:10},(_,i)=>i));
export const newMalePortrait=n=>Number.isInteger(n.portraitVariant)&&n.portraitVariant>=5&&n.portraitVariant<10&&['emperor','prince','general','chancellor','physician'].includes(n.id)?`assets/npcs/v78/${n.id}-v${n.portraitVariant}.webp`:null;
