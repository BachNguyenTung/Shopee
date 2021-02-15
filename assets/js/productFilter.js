import {
  renderPaging,
  renderPageNumber,
  renderPageIndexIncrement,
  renderPageIndexDecrement,
  renderPageIndexDefault,
  renderPagination,
  changePageIndex,
  changePageTotal,
} from "./pagination.js";
import { items, state } from "./data.js";

let sortedItems = [];
let today = new Date();
const bestSelling = 20;
let tempItems = [...items];

///Loaded
defaultCatefilter();
popularFilter();
changePageTotal(sortedItems);
renderPageNumber(sortedItems.length);
renderPagination(sortedItems.length);
renderPaging(sortedItems);

///Filter
//Popular Filter
function popularFilter() {
  sortedItems = sortedItems.filter(
    (item) =>
      item.date.getDate() > today.getDate() - 30 &&
      item.soldAmount >= bestSelling
  );
}

// Best Selling Filter
function bestSellingFilter() {
  sortedItems = sortedItems.filter((item) => item.soldAmount >= bestSelling);
}

// Date Filter
function dateFilter() {
  sortedItems = sortedItems.filter(
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
}

function shirtFilter() {
  sortedItems = tempItems.filter((item) => item.type == "shirt");
}

function bagFilter() {
  sortedItems = tempItems.filter((item) => item.type == "bag");
}

function setFilter() {
  sortedItems = tempItems.filter((item) => item.type == "set");
}
function discountFilter() {
  sortedItems = tempItems.filter((item) => item.type == "discount");
}

function newFilter() {
  sortedItems = tempItems.filter((item) => item.type == "new");
}
function accessoriesFilter() {
  sortedItems = tempItems.filter((item) => item.type == "accessories");
}

function defaultCatefilter() {
  //sortedItem -> default
  sortedItems = [...tempItems];
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
  changePageTotal(sortedItems);
  renderPageNumber(sortedItems.length);
  renderPagination(sortedItems.length);
  renderPageIndexDefault(sortedItems.length);
  renderPaging(sortedItems);
});

$(".app__price-desc").addEventListener("click", () => {
  priceDescFilter();
  changePageTotal(sortedItems);
  renderPageNumber(sortedItems.length);
  renderPagination(sortedItems.length);
  renderPageIndexDefault(sortedItems.length);
  renderPaging(sortedItems);
});

//Popular+Newest+Date event
const filterButtons = [...$$(".app__filter-item")];
filterButtons.forEach((filterButton, index) => {
  filterButton.addEventListener("click", (e) => {
    $(".app__filter-item.btn--active").classList.remove("btn--active");
    filterButton.classList.add("btn--active");
    if (filterButton.classList.contains("app__filter-popular")) {
      popularFilter();
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPagination(sortedItems.length);
      renderPageIndexDefault(sortedItems.length);
      renderPaging(sortedItems);
    }
    if (filterButton.classList.contains("app__filter-newest")) {
      dateFilter();
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPagination(sortedItems.length);
      renderPageIndexDefault(sortedItems.length);
      renderPaging(sortedItems);
    }
    if (filterButton.classList.contains("app__filter-bestSell")) {
      bestSellingFilter();
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPagination(sortedItems.length);
      renderPageIndexDefault(sortedItems.length);
      renderPaging(sortedItems);
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
      changePageTotal(sortedItems);
      popularFilter(sortedItems.length);
      renderPageNumber(sortedItems.length);
      renderPagination(sortedItems.length);
      renderPageIndexDefault(sortedItems.length);
      renderPaging(sortedItems);
    }

    if (category.classList.contains("app__category-shirt")) {
      shirtFilter();
      popularFilter();
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPagination(sortedItems.length);
      renderPageIndexDefault(sortedItems.length);
      renderPaging(sortedItems);
    }

    if (category.classList.contains("app__category-shoe")) {
      shoeFilter();
      popularFilter();
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPagination(sortedItems.length);
      renderPageIndexDefault(sortedItems.length);
      renderPaging(sortedItems);
    }

    if (category.classList.contains("app__category-bag")) {
      bagFilter();
      popularFilter();
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPagination(sortedItems.length);
      renderPageIndexDefault(sortedItems.length);
      renderPaging(sortedItems);
    }

    if (category.classList.contains("app__category-set")) {
      setFilter();
      popularFilter();
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPagination(sortedItems.length);
      renderPageIndexDefault(sortedItems.length);
      renderPaging(sortedItems);
    }

    if (category.classList.contains("app__category-discount")) {
      discountFilter();
      popularFilter();
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPagination(sortedItems.length);
      renderPageIndexDefault(sortedItems.length);
      renderPaging(sortedItems);
    }

    if (category.classList.contains("app__category-new")) {
      newFilter();
      popularFilter();
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPagination(sortedItems.length);
      renderPageIndexDefault(sortedItems.length);
      renderPaging(sortedItems);
    }

    if (category.classList.contains("app__category-accessories")) {
      accessoriesFilter();
      popularFilter();
      changePageTotal(sortedItems);
      renderPageNumber(sortedItems.length);
      renderPagination(sortedItems.length);
      renderPageIndexDefault(sortedItems.length);
      renderPaging(sortedItems);
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

//Change Page event

$(".app__pre-page").addEventListener("click", (e) => {
  let pageIndex = renderPageIndexDecrement();
  renderPageNumber(sortedItems.length);
  renderPaging(sortedItems);
  const paginationNumberItems = [...$$(".pagination-number")];
  paginationNumberItems.forEach((paginationNumberItem, index) => {
    paginationNumberItem.classList.remove("pagination-number--active");
    if (pageIndex == index + 1)
      paginationNumberItem.classList.add("pagination-number--active");
  });
});

$(".app__next-page").addEventListener("click", (e) => {
  let pageIndex = renderPageIndexIncrement();
  renderPageNumber(sortedItems.length);
  renderPaging(sortedItems);
  const paginationNumberItems = [...$$(".pagination-number")];
  paginationNumberItems.forEach((paginationNumberItem, index) => {
    paginationNumberItem.classList.remove("pagination-number--active");
    if (pageIndex == index + 1)
      paginationNumberItem.classList.add("pagination-number--active");
  });
});

export default function paginationAddEvent() {
  const paginationNumberItems = [...$$(".pagination-number")];
  paginationNumberItems.forEach((paginationNumberItem, index) => {
    paginationNumberItem.addEventListener("click", () => {
      changePageIndex(index + 1);
      renderPaging(sortedItems);
      $(".pagination-number.pagination-number--active").classList.remove(
        "pagination-number--active"
      );
      paginationNumberItem.classList.add("pagination-number--active");
      renderPageNumber(sortedItems.length);
    });
  });

  $(".pagination-item__left").addEventListener("click", (e) => {
    let pageIndex = renderPageIndexDecrement();
    renderPageNumber(sortedItems.length);
    changePageIndex(pageIndex);
    renderPaging(sortedItems);
    const paginationNumberItems = [...$$(".pagination-number")];
    paginationNumberItems.forEach((paginationNumberItem, index) => {
      paginationNumberItem.classList.remove("pagination-number--active");
      if (pageIndex == index + 1)
        paginationNumberItem.classList.add("pagination-number--active");
    });
  });
  $(".pagination-item__right").addEventListener("click", (e) => {
    let pageIndex = renderPageIndexIncrement();
    renderPageNumber(sortedItems.length);
    changePageIndex(pageIndex);
    renderPaging(sortedItems);
    const paginationNumberItems = [...$$(".pagination-number")];
    paginationNumberItems.forEach((paginationNumberItem, index) => {
      paginationNumberItem.classList.remove("pagination-number--active");
      if (pageIndex == index + 1)
        paginationNumberItem.classList.add("pagination-number--active");
    });
  });
  
}
