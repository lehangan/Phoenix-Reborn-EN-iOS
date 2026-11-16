import {VIP_FACES} from './vip-faces.mjs';
// Every active eye, nose and mouth comes from the approved 32 VIP sources.
export const FACIAL_VARIANTS=VIP_FACES.length;
export const MOUTH_VARIANTS=VIP_FACES.length;
export const EYE_VARIANTS=VIP_FACES.length;
export const CUTE_EYES=[];
export const EYE_NAMES=Object.fromEntries(VIP_FACES.map(f=>[f.id,f.name]));
export const MOUTH_NAMES={...EYE_NAMES};
export const NOSE_NAMES={...EYE_NAMES};
export const HUADIAN_NAMES=['Mai Điền','Liên Điền','Diễm Diệp','Nguyệt Lệ','Hoa Ngọc','Hải Đường','Phượng Vũ','Băng Liên','Lưu Vân','Tinh Sa'];
