// Sử dụng class thay cho function

//cart

let cart = [];
//Products
class Products {
  constructor() {
    this.tempItems = []; // tempItems = [...items] tham tri den items
    this.categoryItems = []; // items sort theo danh muc
    this.sortedItems = []; // items sort theo popular, new, price
    this.today = new Date();
    // this.defaultPageIndex = pageIndex;
    this.bestSelling = 20;
  }

  //add id cho item
  async addItemId(items) {
    items.forEach((item, index) => {
      item.id = index;
    });
    return items;
  }

  //ger Products
  async getData() {
    const itemsApi = "http://localhost:3000/items";
    try {
      const response = await fetch(itemsApi); //task 3 fetch sau khi dc xu ly o api, day vao callstack xu ly callback
      const items = await response.json(); //task 4 .json() tuong tu day vao callstack xu ly callback
      const itemsIdAdded = await this.addItemId(items); //Task 6
      return itemsIdAdded;
    } catch (error) {
      console.log(error);
    }
  }

  //Set temp cho products
  setTempItems(items) {
    console.log(items);
    this.tempItems = [...items];
  }

  //Get products temp
  getTempItems() {
    return this.tempItems;
  }

  //Get sorted products
  getSortedProducts() {
    return this.sortedItems;
  }

  ///Filter
  //Popular Filter
  popularFilter() {
    this.sortedItems = this.categoryItems.filter(
      (item) =>
        // item.date.getDate() > today.getDate() - 20 ||
        new Date(item.date).getDate() > this.today.getDate() - 20 ||
        item.soldAmount >= this.bestSelling
    );
  }

  // Best Selling Filter
  bestSellingFilter() {
    this.sortedItems = this.categoryItems.filter(
      (item) => item.soldAmount >= this.bestSelling
    );
  }

  // Date Filter
  dateFilter() {
    this.sortedItems = this.categoryItems.filter(
      (item) => new Date(item.date).getDate() > this.today.getDate() - 20
      // (item) => item.date.getDate() > today.getDate() - 20
    );
  }

  //Price filter
  priceAscFilter() {
    if (this.sortedItems.length == 1) {
      return;
    }
    this.sortedItems = this.sortedItems.sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );
  }
  priceDescFilter() {
    if (this.sortedItems.length == 1) {
      return;
    }
    this.sortedItems = this.sortedItems.sort(
      (a, b) => parseFloat(b.price) - parseFloat(a.price)
    );
  }

  //Category filter
  shoeFilter() {
    this.sortedItems = this.tempItems.filter((item) => item.type == "shoe");
    this.categoryItems = [...this.sortedItems];
  }

  shirtFilter() {
    this.sortedItems = this.tempItems.filter((item) => item.type == "shirt");
    this.categoryItems = [...this.sortedItems];
  }

  bagFilter() {
    this.sortedItems = this.tempItems.filter((item) => item.type == "bag");
    this.categoryItems = [...this.sortedItems];
  }

  setFilter() {
    this.sortedItems = this.tempItems.filter((item) => item.type == "set");
    this.categoryItems = [...this.sortedItems];
  }
  discountFilter() {
    this.sortedItems = this.tempItems.filter((item) => item.type == "discount");
    this.categoryItems = [...this.sortedItems];
  }

  newFilter() {
    this.sortedItems = this.tempItems.filter((item) => item.type == "new");
    this.categoryItems = [...this.sortedItems];
  }
  accessoriesFilter() {
    this.sortedItems = this.tempItems.filter(
      (item) => item.type == "accessories"
    );
    this.categoryItems = [...this.sortedItems];
  }

  defaultCatefilter() {
    //sortedItem -> default
    this.sortedItems = [...this.tempItems];
    this.categoryItems = [...this.sortedItems];
  }

  ///Events
  registerEventsFilterBtn(ui) {
    //Price event
    const inputDefaultLabel = $(".app__input-lable").innerHTML;
    const inputDefaultColor = "var(--text-color)";
    const inputSelects = [...$$(".app__input-item")];
    inputSelects.forEach((inputSelect, index) => {
      inputSelect.addEventListener("click", () => {
        //Change label text+color
        $(".app__input-lable").innerHTML = inputSelect.textContent;
        $(".app__input-lable").style.color = "var(--primary-color)";
        $(".app__input-list").style.display = "none";
        $(".select-input").addEventListener("mouseover", () => {
          $(".app__input-list").removeAttribute("style");
        });
        //Add check icon
        $(".app__input-item.app__input-item--active").removeChild(
          $(".app__input-item-icon")
        );
        $(".app__input-item.app__input-item--active").classList.remove(
          "app__input-item--active"
        );

        inputSelect.classList.add("app__input-item--active");
        inputSelect.innerHTML += `<i class="app__input-item-icon bi bi-check"></i>`;
      });
    });

    $(".app__price-asc").addEventListener("click", () => {
      this.priceAscFilter();
      //   changePageIndex(defaultPageIndex);
      //   changePageTotal(this.sortedItems);
      //   renderPageNumber(this.sortedItems.length);
      //   renderPaginationBar(this.sortedItems.length, paginationBarRegisterEvent);

      ui.renderPagingItems(this.sortedItems);
    });

    $(".app__price-desc").addEventListener("click", () => {
      this.priceDescFilter();
      //   changePageIndex(defaultPageIndex);
      //   changePageTotal(this.sortedItems);
      //   renderPageNumber(this.sortedItems.length);
      //   renderPaginationBar(this.sortedItems.length, paginationBarRegisterEvent);

      ui.renderPagingItems(this.sortedItems);
    });

    //Popular+Newest+Date event
    const filterButtons = [...$$(".app__filter-item")];
    filterButtons.forEach((filterButton, index) => {
      filterButton.addEventListener("click", (e) => {
        $(".app__filter-item.btn--active").classList.remove("btn--active");
        filterButton.classList.add("btn--active");
        if (filterButton.classList.contains("app__filter-popular")) {
          this.popularFilter();
          //   changePageIndex(defaultPageIndex);
          //   changePageTotal(this.sortedItems);
          //   renderPageNumber(this.sortedItems.length);
          //   renderPaginationBar(this.sortedItems.length, paginationBarRegisterEvent);

          ui.renderPagingItems(this.sortedItems);
        }
        if (filterButton.classList.contains("app__filter-newest")) {
          this.dateFilter();
          //   changePageIndex(defaultPageIndex);
          //   changePageTotal(this.sortedItems);
          //   renderPageNumber(this.sortedItems.length);
          //   renderPaginationBar(this.sortedItems.length, paginationBarRegisterEvent);

          ui.renderPagingItems(this.sortedItems);
        }
        if (filterButton.classList.contains("app__filter-bestSell")) {
          this.bestSellingFilter();
          //   changePageIndex(defaultPageIndex);
          //   changePageTotal(this.sortedItems);
          //   renderPageNumber(this.sortedItems.length);
          //   renderPaginationBar(this.sortedItems.length, paginationBarRegisterEvent);

          ui.renderPagingItems(this.sortedItems);
        }

        //Set default input label
        $(".app__input-lable").innerHTML = inputDefaultLabel;
        $(".app__input-lable").style.color = inputDefaultColor;

        //Set Price Default
        $(".app__input-item.app__input-item--active").removeChild(
          $(".app__input-item-icon")
        );
        $(".app__input-item.app__input-item--active").classList.remove(
          "app__input-item--active"
        );
        $(".app__price-default").classList.add("app__input-item--active");
        $(
          ".app__price-default"
        ).innerHTML += `<i class="app__input-item-icon bi bi-check"></i>`;
      });
    });

    //Category event
    const categories = [...$$(".app__category-item")];
    categories.forEach((category, index) => {
      category.addEventListener("click", () => {
        $(".app__category-item.app__category-item--active").removeChild(
          $(".app__item-icon")
        );
        $(".app__category-item.app__category-item--active").classList.remove(
          "app__category-item--active"
        );
        category.classList.add("app__category-item--active");
        category.innerHTML += `<div class="app__item-icon"></div>`;
        if (category.classList.contains("app__category-default")) {
          this.defaultCatefilter();
          //   changePageIndex(defaultPageIndex);
          //   changePageTotal(this.sortedItems);
          this.popularFilter();
          //   renderPageNumber(this.sortedItems.length);
          //   renderPaginationBar(this.sortedItems.length, paginationBarRegisterEvent);

          ui.renderPagingItems(this.sortedItems);
        }

        if (category.classList.contains("app__category-shirt")) {
          this.shirtFilter();
          this.popularFilter();
          //   changePageIndex(defaultPageIndex);
          //   changePageTotal(this.sortedItems);
          //   renderPageNumber(this.sortedItems.length);
          //   renderPaginationBar(this.sortedItems.length, paginationBarRegisterEvent);

          ui.renderPagingItems(this.sortedItems);
        }

        if (category.classList.contains("app__category-shoe")) {
          this.shoeFilter();
          this.popularFilter();
          //   changePageIndex(defaultPageIndex);
          //   changePageTotal(this.sortedItems);
          //   renderPageNumber(this.sortedItems.length);
          //   renderPaginationBar(this.sortedItems.length, paginationBarRegisterEvent);

          ui.renderPagingItems(this.sortedItems);
        }

        if (category.classList.contains("app__category-bag")) {
          this.bagFilter();
          this.popularFilter();
          //   changePageIndex(defaultPageIndex);
          //   changePageTotal(this.sortedItems);
          //   renderPageNumber(this.sortedItems.length);
          //   renderPaginationBar(this.sortedItems.length, paginationBarRegisterEvent);

          ui.renderPagingItems(this.sortedItems);
        }

        if (category.classList.contains("app__category-set")) {
          this.setFilter();
          this.popularFilter();
          //   changePageIndex(defaultPageIndex);
          //   changePageTotal(this.sortedItems);
          //   renderPageNumber(this.sortedItems.length);
          //   renderPaginationBar(this.sortedItems.length, paginationBarRegisterEvent);

          ui.renderPagingItems(this.sortedItems);
        }

        if (category.classList.contains("app__category-discount")) {
          this.discountFilter();
          this.popularFilter();
          //   changePageIndex(defaultPageIndex);
          //   changePageTotal(this.sortedItems);
          //   renderPageNumber(this.sortedItems.length);
          //   renderPaginationBar(this.sortedItems.length, paginationBarRegisterEvent);

          ui.renderPagingItems(this.sortedItems);
        }

        if (category.classList.contains("app__category-new")) {
          this.newFilter();
          this.popularFilter();
          //   changePageIndex(defaultPageIndex);
          //   changePageTotal(this.sortedItems);
          //   renderPageNumber(this.sortedItems.length);
          //   renderPaginationBar(this.sortedItems.length, paginationBarRegisterEvent);

          ui.renderPagingItems(this.sortedItems);
        }

        if (category.classList.contains("app__category-accessories")) {
          this.accessoriesFilter();
          this.popularFilter();
          //   changePageIndex(defaultPageIndex);
          //   changePageTotal(this.sortedItems);
          //   renderPageNumber(this.sortedItems.length);
          //   renderPaginationBar(this.sortedItems.length, paginationBarRegisterEvent);

          ui.renderPagingItems(this.sortedItems);
        }
        //Set default Popular+Newest+Date
        $(".app__filter-item.btn--active").classList.remove("btn--active");
        $(".app__filter-popular").classList.add("btn--active");
        //Set default input label
        $(".app__input-lable").innerHTML = inputDefaultLabel;
        $(".app__input-lable").style.color = inputDefaultColor;

        //Set Price Default
        $(".app__input-item.app__input-item--active").removeChild(
          $(".app__input-item-icon")
        );
        $(".app__input-item.app__input-item--active").classList.remove(
          "app__input-item--active"
        );
        $(".app__price-default").classList.add("app__input-item--active");
        $(
          ".app__price-default"
        ).innerHTML += `<i class="app__input-item-icon bi bi-check"></i>`;
      });
    });
  }
}

//display Products
class UI {
  renderPagingItems(items, callback) {
    // let items = items.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    let html = items
      .map((item, index) => {
        return `
          <div class="grid__col-2c4x">
          <div class="app__product-item">
            <button class="btn app__product-cart-btn" data-id=${item.id}>
              <i class="app__product-cart-btn-icon bi bi-cart"></i>
              Add to cart
            </button>
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
    // callback();
    // render addCartButton

  }
  getCartButton(){
      console.log("get and change cart btn");
    // let cartItems = getCartItems();
    // const addCartButtons = [...$$(".app__product-cart-btn")];
    // addCartButtons.forEach((addCartButton) => {
    //   cartItems.forEach((cartItem) => {
    //     if (addCartButton.dataset.id == cartItem.id) {
    //       addCartButton.innerText = "In cart";
    //       addCartButton.classList.add("app__product-cart-btn--disabled");
    //     }
    //   });
    // });
  }
}

//local storage
class LocalStorage {}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  products.getData().then((items) => {
    //Task 2 .getData() dc xu ly o api roi day vao taskqueue , Task6 callback tu .then dc day vao callstack de xu ly
    products.setTempItems(items);
    products.defaultCatefilter();
    products.popularFilter();
    // changePageIndex(defaultPageIndex);
    // changePageTotal(this.sortedItems);
    // renderPageNumber(this.sortedItems.length);
    // renderPaginationBar(this.this.sortedItems.length, paginationBarRegisterEvent);
    // headerPagingBtnRegisterEvent();
    ui.renderPagingItems(products.getSortedProducts());
    ui.getCartButton();
    // renderCartItems();
    products.registerEventsFilterBtn(ui);
  });
});
