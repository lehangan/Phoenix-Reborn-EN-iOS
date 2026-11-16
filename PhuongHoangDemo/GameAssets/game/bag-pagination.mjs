export const BAG_PAGE_SIZES={robe:3,hair:3,pet:3,hairstyle:4};

export function bagPage(items,requested=0,type='robe'){
 const size=BAG_PAGE_SIZES[type]||6;
 const pages=Math.max(1,Math.ceil(items.length/size));
 const page=Math.max(0,Math.min(pages-1,Number.isFinite(Number(requested))?Math.trunc(Number(requested)):0));
 return {page,pages,total:items.length,size,items:items.slice(page*size,(page+1)*size)};
}

export function bagPager(paging){
 if(paging.pages<=1)return '';
 return `<nav class="bag-pagination" aria-label="Chuyển trang túi đồ"><button type="button" data-action="bag-page" data-id="${paging.page-1}" aria-label="Trang trước" ${paging.page===0?'disabled':''}>‹</button><span role="status">Page ${paging.page+1} / ${paging.pages}</span><button type="button" data-action="bag-page" data-id="${paging.page+1}" aria-label="Trang sau" ${paging.page===paging.pages-1?'disabled':''}>›</button></nav>`;
}
