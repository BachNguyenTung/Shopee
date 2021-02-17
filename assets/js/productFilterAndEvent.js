import {
  pageIndex,
  renderPagingItems,
  renderPageNumber,
  increPageIndex,
  decrePageIndex,
  renderPaginationBar,
  changePageIndex,
  changePageTotal,
} from "./pagination.js";

import { items, state } from "./data.js";

let categoryItems = [];
let sortedItems = [];
let tempItems = [...items];
let today = new Date();
let defaultPageIndex = pageIndex;
const bestSelling = 20;

///Load default
defaultCatefilter();
popularFilter();
changePageIndex(defaultPageIndex);
changePageTotal(sortedItems);
renderPageNumber(sortedItems.length);
renderPaginationBar(sortedItems.length);
renderPagingItems(sortedItems);

///Filter
//Popular Filter
function popularFilter() {
  sortedItems = categoryItems.filter(
    (item) =>
      item.date.getDate() > today.getDate() - 30 ||
      item.soldAmount >= bestSelling
  );
}

// Best Selling Filter
function bestSellingFilter() {
  sortedItems = categoryItems.filter((item) => item.soldAmount >= bestSelling);
}

// Date Filter
function dateFilter() {
  sortedItems = categoryItems.filter(
    (item) => item.date.getDate() > today.getDate() - 30
  );
}

//Price filter
function priceAscFilter() {
  if (sortedItems.length == 1) {
    return;
  }
  sortedItems = sortedItems.sort(
    (a, b) => parseFloat(a.price) - parseFloat(b.price)
  );
}
function priceDescFilter() {
  if (sortedItems.length == 1) {
    return;
  }
  sortedItems = sortedItems.sort(
    (a, b) => parseFloat(b.price) - parseFloat(a.price)
  );
}

//Category filter
function shoeFilter() {
  sortedItems = tempItems.filter((item) => item.type == "shoe");
  categoryItems = [...sortedItems];
}

function shirtFilter() {
  sortedItems = tempItems.filter((item) => item.type == "shirt");
  categoryItems = [...sortedItems];
}

function bagFilter() {
  sortedItems = tempItems.filter((item) => item.type == "bag");
  categoryItems = [...sortedItems];
}

function setFilter() {
  sortedItems = tempItems.filter((item) => item.type == "set");
  categoryItems = [...sortedItems];
}
function discountFilter() {
  sortedItems = tempItems.filter((item) => item.type == "discount");
  categoryItems = [...sortedItems];
}

function newFilter() {
  sortedItems = tempItems.filter((item) => item.type == "new");
  categoryItems = [...sortedItems];
}
function accessoriesFilter() {
  sortedItems = tempItems.filter((item) => item.type == "accessories");
  categoryItems = [...sortedItems];
}

function defaultCatefilter() {
  //sortedItem -> default
  sortedItems = [...tempItems];
  categoryItems = [...sortedItems];
}

///Events
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
  priceAscFilter();
  changePageIndex(defaultPageIndex);
  changePageTotal(sortedItems);
  renderPageNumber(sortedItems.length);
  renderPaginationBar(sortedItems.length);
  renderPagingItems(sortedItems);
});

$(".app__price-desc").addEventListener("click", () => {
  priceDescFilter();
  changePageIndex(defaultPageIndex);
  changePageTotal(sortedItems);
  renderPageNumber(sortedItems.length);
  renderPaginationBar(sortedItems.length);
  renderPagingItems(sortedItems);
});

//Popular+Newest+Date event
const filterButtons = [...$$(".app__filter-item")];
filterButtons.forEach((filterButton, index) => {
  filterButton.addEventListener("click", (e) => {
    $(".app__filter-item.btn--active").classList.remove("btn--active");
    filterButton.classList.add("btn--active");
    if (filterButton.classList.contains("app__filter-popular")) {
      popularFilter();
      changePageIndex(defaultPageIndex);
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPaginationBar(sortedItems.length);

      renderPagingItems(sortedItems);
    }
    if (filterButton.classList.contains("app__filter-newest")) {
      dateFilter();
      changePageIndex(defaultPageIndex);
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPaginationBar(sortedItems.length);

      renderPagingItems(sortedItems);
    }
    if (filterButton.classList.contains("app__filter-bestSell")) {
      bestSellingFilter();
      changePageIndex(defaultPageIndex);
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPaginationBar(sortedItems.length);
      renderPagingItems(sortedItems);
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
      defaultCatefilter();
      changePageIndex(defaultPageIndex);
      changePageTotal(sortedItems);
      popularFilter(sortedItems.length);
      renderPageNumber(sortedItems.length);
      renderPaginationBar(sortedItems.length);
      renderPagingItems(sortedItems);
    }

    if (category.classList.contains("app__category-shirt")) {
      shirtFilter();
      popularFilter();
      changePageIndex(defaultPageIndex);
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPaginationBar(sortedItems.length);
      renderPagingItems(sortedItems);
    }

    if (category.classList.contains("app__category-shoe")) {
      shoeFilter();
      popularFilter();
      changePageIndex(defaultPageIndex);
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPaginationBar(sortedItems.length);
      renderPagingItems(sortedItems);
    }

    if (category.classList.contains("app__category-bag")) {
      bagFilter();
      popularFilter();
      changePageIndex(defaultPageIndex);
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPaginationBar(sortedItems.length);
      renderPagingItems(sortedItems);
    }

    if (category.classList.contains("app__category-set")) {
      setFilter();
      popularFilter();
      changePageIndex(defaultPageIndex);
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPaginationBar(sortedItems.length);
      renderPagingItems(sortedItems);
    }

    if (category.classList.contains("app__category-discount")) {
      discountFilter();
      popularFilter();
      changePageIndex(defaultPageIndex);
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPaginationBar(sortedItems.length);
      renderPagingItems(sortedItems);
    }

    if (category.classList.contains("app__category-new")) {
      newFilter();
      popularFilter();
      changePageIndex(defaultPageIndex);
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPaginationBar(sortedItems.length);
      renderPagingItems(sortedItems);
    }

    if (category.classList.contains("app__category-accessories")) {
      accessoriesFilter();
      popularFilter();
      changePageIndex(defaultPageIndex);
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPaginationBar(sortedItems.length);
      renderPagingItems(sortedItems);
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

///Change Page event
//Button left header
$(".app__pre-page").addEventListener("click", (e) => {
  let pageIndex = decrePageIndex();
  renderPageNumber(sortedItems.length);
  renderPagingItems(sortedItems);
  renderPaginationBar(sortedItems.length);
  // Duyệt dom number mới vừa đc render và đc addEvent
  const paginationNumberItems = [...$$(".pagination-number")];
  paginationNumberItems.forEach((paginationNumberItem, index) => {
    paginationNumberItem.classList.remove("pagination-number--active");
    if (paginationNumberItem.value === pageIndex)
      paginationNumberItem.classList.add("pagination-number--active");
  });
});

//Button right header
$(".app__next-page").addEventListener("click", (e) => {
  let pageIndex = increPageIndex();
  renderPageNumber(sortedItems.length);
  renderPagingItems(sortedItems);
  renderPaginationBar(sortedItems.length);
  const paginationNumberItems = [...$$(".pagination-number")];
  paginationNumberItems.forEach((paginationNumberItem, index) => {
    paginationNumberItem.classList.remove("pagination-number--active");
    if (paginationNumberItem.value === pageIndex)
      paginationNumberItem.classList.add("pagination-number--active");
  });
});

//Button number pagination bar
export default function paginationAddEvent() {
  const paginationNumberItems = [...$$(".pagination-number")];
  paginationNumberItems.forEach((paginationNumberItem) => {
    paginationNumberItem.addEventListener("click", () => {
      console.log(paginationNumberItem);
      let pageIndex = changePageIndex(paginationNumberItem.value);
      renderPagingItems(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPaginationBar(sortedItems.length);
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
    renderPaginationBar(sortedItems.length);
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
    renderPaginationBar(sortedItems.length);
    const paginationNumberItems = [...$$(".pagination-number")];
    paginationNumberItems.forEach((paginationNumberItem, index) => {
      paginationNumberItem.classList.remove("pagination-number--active");
      if (paginationNumberItem.value === pageIndex)
        paginationNumberItem.classList.add("pagination-number--active");
    });
  });
}
