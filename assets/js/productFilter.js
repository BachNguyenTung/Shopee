let sortedItems = [];
let tempItems = [...items];
var today = new Date();
const bestSelling = 20;
let inputItemIcon = $(".app__input-item-icon");
//Loaded
popularFilter();
render(sortedItems);

//Popular Filter
function popularFilter() {
  sortedItems = tempItems.filter(
    (item) =>
      item.date.getDate() > today.getDate() - 7 &&
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
    (item) => item.date.getDate() > today.getDate() - 7
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
    // if (inputSelect.classList.contains("app__price-asc")) {
    //   inputSelect.innerHTML += `<i class="app__input-item-icon bi bi-check"></i>`;
    //   $(".app__price-desc").removeChild($(".app__input-item-icon"));
    // }
    // if (inputSelect.classList.contains("app__price-desc")) {
    //   inputSelect.innerHTML += `<i class="app__input-item-icon bi bi-check"></i>`;
    //   $(".app__price-asc").removeChild($(".app__input-item-icon"));
    // }
  });
});

$(".app__price-asc").addEventListener("click", () => {
  priceAscFilter();
  render(sortedItems);
});

$(".app__price-desc").addEventListener("click", () => {
  priceDescFilter();
  render(sortedItems);
});

//Popular+Newest+Date event
const filterButtons = [...$$(".app__filter-item")];
filterButtons.forEach((filterButton, index) => {
  filterButton.addEventListener("click", (e) => {
    $(".app__filter-item.btn--active").classList.remove("btn--active");
    filterButton.classList.add("btn--active");
    if (filterButton.classList.contains("app__filter-popular")) {
      popularFilter();
      render(sortedItems);
    }
    if (filterButton.classList.contains("app__filter-newest")) {
      dateFilter();
      render(sortedItems);
    }
    if (filterButton.classList.contains("app__filter-bestSell")) {
      bestSellingFilter();
      render(sortedItems);
    }

    //Set default input label
    $(".app__input-lable").innerHTML = inputDefaultLabel;
    $(".app__input-lable").style.color = inputDefaultColor;
    // if ($(".app__price-desc").hasChildNodes()) {
    //   console.log("2323");
    //   $(".app__price-desc").removeChild($(".app__input-item-icon"));
    // }
    // if ($(".app__price-asc").hasChildNodes()) {
    //   $(".app__price-asc").removeChild($(".app__input-item-icon"));
    // }
  });
});
