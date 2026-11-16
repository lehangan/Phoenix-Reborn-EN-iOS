export const ITEM_PAGE_SIZE=3;
export function itemPage(items,requested=0,size=ITEM_PAGE_SIZE){
 const pages=Math.max(1,Math.ceil(items.length/size));
 const page=Math.max(0,Math.min(pages-1,Number.isFinite(Number(requested))?Math.trunc(Number(requested)):0));
 return {page,pages,total:items.length,items:items.slice(page*size,(page+1)*size)};
}
export function itemPager(p,action){
 return `<nav class="item-pagination" aria-label="Trang danh sách đồ"><button data-action="${action}" data-id="${p.page-1}" aria-label="Trang trước" ${p.page===0?'disabled':''}>‹</button><span role="status">Page <b>${p.page+1} / ${p.pages}</b></span><button data-action="${action}" data-id="${p.page+1}" aria-label="Trang sau" ${p.page===p.pages-1?'disabled':''}>›</button></nav>`;
}
