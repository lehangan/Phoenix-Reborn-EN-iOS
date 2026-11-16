import {ENDINGS as BASE_ENDINGS} from './life-data.mjs';
import {EXTRA_ENDINGS} from './palace-data.mjs';

export const ENDINGS=[...BASE_ENDINGS,...EXTRA_ENDINGS];
const labels=new Map(ENDINGS.map(([id,label])=>[id,label]));
labels.set('imperialSecret','Bí mật dưới hàng liễu');
labels.set('selectionFail','Trượt tuyển tú · Xuất cung');
// Resolve saved IDs at render time, including histories written by older versions.
export const endingLabel=id=>labels.get(id)||'Một kiếp đã khép';
