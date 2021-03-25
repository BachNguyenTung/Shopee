import { getSortedProducts, renderPagingItems } from "./product.js";
import { registerEventsCartBtn } from "./cart.js";

export let pageSize = 10;
export let pageIndex = 1;
let pageTotal;
let html = "";

//Render số trang trên tổng số ex: 1/10
export function renderPageNumber(total) {
  if (total <= pageSize) {
    $(".app__page-number").innerHTML = ``;
    $(".app__pre-page").style.display = "none";
    $(".app__next-page").style.display = "none";
    return;
  }
  $(".app__pre-page").style.display = "block";
  $(".app__next-page").style.display = "block";
  html = `
        <span class="app__page-index">${pageIndex}</span>/<span
                        class="app__page-page-total"
                        >${pageTotal}</span>       
        `;
  $(".app__page-number").innerHTML = html;
}

//Tăng trang hiện tại
export function increPageIndex() {
  pageIndex++;
  $(".app__pre-page").classList.remove("app__pre-page--disabled");
  if (pageIndex >= pageTotal) {
    pageIndex = pageTotal;
    $(".app__next-page").classList.add("app__next-page--disabled");
  }
  return pageIndex;
}

//Giảm trang hiện tại
export function decrePageIndex() {
  pageIndex--;
  $(".app__next-page").classList.remove("app__next-page--disabled");
  if (pageIndex <= 1) {
    pageIndex = 1;
    $(".app__pre-page").classList.add("app__pre-page--disabled");
  }
  return pageIndex;
}

//render thanh pagination
export function renderPaginationBar(totalItems, callback) {
  if (totalItems <= pageSize) {
    $(".pagination").innerHTML = ``;
    return;
  }
  let paginationPageIndex = `
    <li value="1" class="pagination-number pagination-number--active">
      <div class="pagination-item__link">1</div>
    </li>
    <li value="2" class="pagination-number">
      <div class="pagination-item__link">2</div>
    </li>
  `;
  //Hiện ... khi quá 5 trnag đầu
  if (pageIndex >= 6) {
    paginationPageIndex += `
      <li class="pagination-item pagination-item--non-click">
                      <div class="pagination-item__link">...</div>
                    </li>
      `;
  }
  for (let index = 3; index <= pageTotal; index++) {
    //phan trang mac dinh
    // paginationPageIndex += `
    //   <li value="${index}" class="pagination-number">
    //                   <div class="pagination-item__link">${index}</div>
    //                 </li>
    //   `;

    //Hiện 5 trang đầu
    if (pageIndex <= 5 && index <= 5) {
      paginationPageIndex += `
      <li value="${index}" class="pagination-number">
                      <div class="pagination-item__link">${index}</div>
                    </li>
      `;
    }
    //Hiện 5 trang giữa
    else if (
      pageIndex >= 5 &&
      index <= pageIndex + 2 &&
      index >= pageIndex - 2
    ) {
      paginationPageIndex += `
      <li  value="${index}" class="pagination-number">
                      <div class="pagination-item__link">${index}</div>
                    </li>
      `;
    }
    //Hiện 5 trang cuối
    else if (pageIndex >= pageTotal - 2 && index > pageTotal - 5) {
      paginationPageIndex += `
      <li value="${index}" class="pagination-number">
                      <div class="pagination-item__link">${index}</div>
                    </li>
      `;
    }
  }
  //Hiện ... khi quá 5 trang cuối
  if (pageTotal > 5 && pageIndex <= pageTotal - 3) {
    paginationPageIndex += `
      <li class="pagination-item pagination-item--non-click">
                      <div class="pagination-item__link">...</div>
                    </li>
      `;
  }

  html = `
    <li class="pagination-item pagination-item__left">
      <div class="pagination-item__link">
        <i class="pagination-item__icon bi bi-chevron-left"></i>
      </div>
    </li>
    ${paginationPageIndex}
    <li class="pagination-item pagination-item__right">
      <div class="pagination-item__link">
        <i class="pagination-item__icon bi bi-chevron-right"></i
      ></div>
    </li>
        `;
  $(".pagination").innerHTML = html;
  if (pageIndex == 1) {
    $(".app__next-page").classList.remove("app__next-page--disabled");
    $(".app__pre-page").classList.add("app__pre-page--disabled");
    $(".pagination-number.pagination-number--active").classList.remove(
      "pagination-number--active"
    );
    $(".pagination-number").classList.add("pagination-number--active");
  }
  //Add lai event click khi render
  callback();
}

//Thay đổi số trang hiện tại
export function changePageIndex(value) {
  pageIndex = value;
  if (pageIndex > 1 && pageIndex < pageTotal) {
    $(".app__pre-page").classList.remove("app__pre-page--disabled");
    $(".app__next-page").classList.remove("app__next-page--disabled");
  } else if (pageIndex == 1) {
    $(".app__next-page").classList.remove("app__next-page--disabled");
    $(".app__pre-page").classList.add("app__pre-page--disabled");
  } else if (pageIndex == pageTotal) {
    $(".app__pre-page").classList.remove("app__pre-page--disabled");
    $(".app__next-page").classList.add("app__next-page--disabled");
  }
  return pageIndex;
}

//Thay đổi tổng số trang
export function changePageTotal(value) {
  pageTotal =
    Math.ceil(value.length / pageSize) < 1
      ? 1
      : Math.ceil(value.length / pageSize);
}

//RegisterEvent for pagination bar after render
export function paginationBarRegisterEvent() {
  let sortedItems = getSortedProducts();
  const paginationNumberItems = [...$$(".pagination-number")];
  paginationNumberItems.forEach((paginationNumberItem) => {
    paginationNumberItem.addEventListener("click", () => {
      console.log(paginationNumberItem);
      let pageIndex = changePageIndex(paginationNumberItem.value);
      renderPagingItems(sortedItems);
      registerEventsCartBtn();
      renderPageNumber(sortedItems.length);
      renderPaginationBar(sortedItems.length, paginationBarRegisterEvent);
      $(".pagination-number.pagination-number--active").classList.remove(
        "pagination-number--active"
      );
      // paginationNumberItem.classList.add("pagination-number--active"); // K sd dc khi render lai pagination
      const paginationNumberItems = [...$$(".pagination-number")];
      paginationNumberItems.forEach((paginationNumberItem, index) => {
        if (paginationNumberItem.value === pageIndex)
          paginationNumberItem.classList.add("pagination-number--active");
      });
    });
  });

  //Button left pagination bar
  $(".pagination-item__left").addEventListener("click", (e) => {
    let pageIndex = decrePageIndex();
    renderPageNumber(sortedItems.length);
    changePageIndex(pageIndex);
    renderPagingItems(sortedItems);
    registerEventsCartBtn();
    renderPaginationBar(sortedItems.length, paginationBarRegisterEvent);
    const paginationNumberItems = [...$$(".pagination-number")];
    paginationNumberItems.forEach((paginationNumberItem, index) => {
      paginationNumberItem.classList.remove("pagination-number--active");
      if (paginationNumberItem.value === pageIndex)
        paginationNumberItem.classList.add("pagination-number--active");
    });
  });

  //Button right pagination bar
  $(".pagination-item__right").addEventListener("click", (e) => {
    let pageIndex = increPageIndex();
    renderPageNumber(sortedItems.length);
    changePageIndex(pageIndex);
    renderPagingItems(sortedItems);
    registerEventsCartBtn();
    renderPaginationBar(sortedItems.length, paginationBarRegisterEvent);
    const paginationNumberItems = [...$$(".pagination-number")];
    paginationNumberItems.forEach((paginationNumberItem, index) => {
      paginationNumberItem.classList.remove("pagination-number--active");
      if (paginationNumberItem.value === pageIndex)
        paginationNumberItem.classList.add("pagination-number--active");
    });
  });
}
