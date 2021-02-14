import {
  renderPaging,
  renderPageNumber,
  renderPageIndexIncrement,
  renderPageIndexDecrement,
  renderPageIndexDefault,
} from "./pagination.js";
import { items } from "./data.js";

let sortedItems = [];
let today = new Date();
const bestSelling = 20;
let tempItems = [...items];
let defaultItems = [...tempItems];

///Loaded
renderPageNumber();
defaultCatefilter();
popularFilter();
renderPaging(sortedItems);

///Filter
//Popular Filter
function popularFilter() {
  sortedItems = tempItems.filter(
    (item) =>
      item.date.getDate() > today.getDate() - 30 &&
      item.soldAmount >= bestSelling
  );
}

// Best Selling Filter
function bestSellingFilter() {
  sortedItems = tempItems.filter((item) => item.soldAmount >= bestSelling);
}

// Date Filter
function dateFilter() {
  sortedItems = tempItems.filter(
    (item) => item.date.getDate() > today.getDate() - 30
  );
}

//Price filter
function priceAscFilter() {
  sortedItems = sortedItems.sort(
    (a, b) => parseFloat(a.price) - parseFloat(b.price)
  );
}
function priceDescFilter() {
  sortedItems = sortedItems.sort(
    (a, b) => parseFloat(b.price) - parseFloat(a.price)
  );
}

//Category filter
function shoeFilter() {
  sortedItems = sortedItems.filter((item) => item.type == "shoe");
  tempItems = defaultItems.filter((item) => item.type == "shoe");
}

function shirtFilter() {
  sortedItems = sortedItems.filter((item) => item.type == "shirt");
  tempItems = defaultItems.filter((item) => item.type == "shirt");
}

function bagFilter() {
  sortedItems = sortedItems.filter((item) => item.type == "bag");
  tempItems = defaultItems.filter((item) => item.type == "bag");
}

function setFilter() {
  sortedItems = sortedItems.filter((item) => item.type == "set");
  tempItems = defaultItems.filter((item) => item.type == "set");
}

function discountFilter() {
  sortedItems = sortedItems.filter((item) => item.type == "discount");
  tempItems = defaultItems.filter((item) => item.type == "discount");
}

function newFilter() {
  sortedItems = sortedItems.filter((item) => item.type == "new");
  tempItems = defaultItems.filter((item) => item.type == "new");
}

function accessoriesFilter() {
  sortedItems = sortedItems.filter((item) => item.type == "accessories");
  tempItems = defaultItems.filter((item) => item.type == "accessories");
}

function defaultCatefilter() {
  //sortedItem -> default
  tempItems = [...defaultItems];
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
  renderPageIndexDefault();
  renderPageNumber();
  renderPaging(sortedItems);
});

$(".app__price-desc").addEventListener("click", () => {
  priceDescFilter();
  renderPageIndexDefault();
  renderPageNumber();
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
      renderPageIndexDefault();
      renderPageNumber();
      renderPaging(sortedItems);
    }
    if (filterButton.classList.contains("app__filter-newest")) {
      dateFilter();
      renderPageIndexDefault();
      renderPageNumber();
      renderPaging(sortedItems);
    }
    if (filterButton.classList.contains("app__filter-bestSell")) {
      bestSellingFilter();
      renderPageIndexDefault();
      renderPageNumber();
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
      popularFilter();
      renderPageIndexDefault();
      renderPageNumber();
      renderPaging(sortedItems);
    }

    if (category.classList.contains("app__category-shirt")) {
      shirtFilter();
      popularFilter();
      renderPageIndexDefault();
      renderPageNumber();
      renderPaging(sortedItems);
    }

    if (category.classList.contains("app__category-shoe")) {
      shoeFilter();
      popularFilter();
      renderPageIndexDefault();
      renderPageNumber();
      renderPaging(sortedItems);
    }

    if (category.classList.contains("app__category-bag")) {
      bagFilter();
      popularFilter();
      renderPageIndexDefault();
      renderPageNumber();
      renderPaging(sortedItems);
    }

    if (category.classList.contains("app__category-set")) {
      setFilter();
      popularFilter();
      renderPageIndexDefault();
      renderPageNumber();
      renderPaging(sortedItems);
    }

    if (category.classList.contains("app__category-discount")) {
      discountFilter();
      popularFilter();
      renderPageIndexDefault();
      renderPageNumber();
      renderPaging(sortedItems);
    }

    if (category.classList.contains("app__category-new")) {
      newFilter();
      popularFilter();
      renderPageIndexDefault();
      renderPageNumber();
      renderPaging(sortedItems);
    }

    if (category.classList.contains("app__category-accessories")) {
      accessoriesFilter();
      popularFilter();
      renderPageIndexDefault();
      renderPageNumber();
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
  renderPageIndexDecrement();
  renderPageNumber();
  renderPaging(sortedItems);
});

$(".app__next-page").addEventListener("click", (e) => {
  renderPageIndexIncrement();
  renderPageNumber();
  renderPaging(sortedItems);
});
