import paginationAddEvent from "./productFilterAndEvent.js";

let pageSize = 10;
export let pageIndex = 1;
let pageTotal;
let html = "";

//Render sp theo pagination
export function renderPagingItems(items) {
  items = items.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
  html = items
    .map((item, index) => {
      return `
    <div class="grid__col-2c4x">
    <div class="app__product-item">
      <a href="" class="app__product-link">
        <div class="app__product-top-text">Yêu thích</div>
        <div class="app__product-sale-off">
          <span class="app__product-sale-off-percent">43%</span
          ><span class="app__product-sale-off-label">Giảm</span>
        </div>
        <img
          src=${item.imageUrl}
          alt="app__product-img"
          class="app__product-img"
        />

        <div class="app__product-info">
          <div class="app__product-name">
          ${item.name}
          </div>
          <!-- app__product-discount--disabled -->
          <div class="app__product-discount">Mua 2 giảm 5%</div>
          <div class="app__product-price-wrapper">
            <div class="app__product-price">${item.price}đ</div>
            <!-- empty: app__product-free-ship--empty -->
            <div class="app__product-free-ship">
              <svg
                height="12"
                viewBox="0 0 20 12"
                width="20"
                class="app__free-ship-icon"
              >
                <g fill="none" fill-rule="evenodd" transform="">
                  <rect
                    fill="#00bfa5"
                    fill-rule="evenodd"
                    height="9"
                    rx="1"
                    width="12"
                    x="4"
                  ></rect>
                  <rect
                    height="8"
                    rx="1"
                    stroke="#00bfa5"
                    width="11"
                    x="4.5"
                    y=".5"
                  ></rect>
                  <rect
                    fill="#00bfa5"
                    fill-rule="evenodd"
                    height="7"
                    rx="1"
                    width="7"
                    x="13"
                    y="2"
                  ></rect>
                  <rect
                    height="6"
                    rx="1"
                    stroke="#00bfa5"
                    width="6"
                    x="13.5"
                    y="2.5"
                  ></rect>
                  <circle
                    cx="8"
                    cy="10"
                    fill="#00bfa5"
                    r="2"
                  ></circle>
                  <circle
                    cx="15"
                    cy="10"
                    fill="#00bfa5"
                    r="2"
                  ></circle>
                  <path
                    d="m6.7082481 6.7999878h-.7082481v-4.2275391h2.8488017v.5976563h-2.1405536v1.2978515h1.9603297v.5800782h-1.9603297zm2.6762505 0v-3.1904297h.6544972v.4892578h.0505892c.0980164-.3134765.4774351-.5419922.9264138-.5419922.0980165 0 .2276512.0087891.3003731.0263672v.6210938c-.053751-.0175782-.2624312-.038086-.3762568-.038086-.5122152 0-.8758247.3017578-.8758247.75v1.8837891zm3.608988-2.7158203c-.5027297 0-.8536919.328125-.8916338.8261719h1.7390022c-.0158092-.5009766-.3446386-.8261719-.8473684-.8261719zm.8442065 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187zm2.6224996-1.8544922c-.5027297 0-.853692.328125-.8916339.8261719h1.7390022c-.0158091-.5009766-.3446386-.8261719-.8473683-.8261719zm.8442064 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187z"
                    fill="#fff"
                  ></path>
                  <path
                    d="m .5 8.5h3.5v1h-3.5z"
                    fill="#00bfa5"
                  ></path>
                  <path
                    d="m0 10.15674h3.5v1h-3.5z"
                    fill="#00bfa5"
                  ></path>
                  <circle
                    cx="8"
                    cy="10"
                    fill="#047565"
                    r="1"
                  ></circle>
                  <circle
                    cx="15"
                    cy="10"
                    fill="#047565"
                    r="1"
                  ></circle>
                </g>
              </svg>
            </div>
          </div>
          <div class="app__product-more">
            <div class="app__more-love">
              <i class="app__love-icon-empty bi bi-heart"></i>
              <!-- <i class="app__love-icon-red bi bi-heart-fill"></i> -->
            </div>
            <div class="app__more-rating">
              <!-- app__more-rating-icon--gold -->
              <i
                class="app__more-rating-icon app__more-rating-icon--gold bi bi-star-fill"
              ></i
              ><i
                class="app__more-rating-icon bi bi-star-fill"
              ></i
              ><i
                class="app__more-rating-icon bi bi-star-fill"
              ></i
              ><i
                class="app__more-rating-icon bi bi-star-fill"
              ></i
              ><i
                class="app__more-rating-icon bi bi-star-fill"
              ></i>
            </div>
            <div class="app__more-sold">
              <span>Đã bán ${item.soldAmount}</span>
            </div>
          </div>
          <div class="app__product-location">${item.location}</div>
        </div>
      </a>
    </div>
  </div>
    `;
    })
    .join("");
  $(".grid__row-product").innerHTML = html;
}

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
export function renderPaginationBar(total) {
  if (total <= pageSize) {
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
    //origin
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
  paginationAddEvent();
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
//  only run at start atm , import start end to data render,
