const bestSelling = 20;
var today = new Date();
//Home Filter
const result = popularFilter();
render(result);

//Popular Filter
function popularFilter() {
  const popularItems = items.filter(
    (item) =>
      item.date.getDate() > today.getDate() - 2 &&
      item.soldAmount >= bestSelling
  );
  return popularItems;
}

// Best Selling Filter
function bestSellingFilter() {
  const bestSellingItems = items.filter(
    (item) => item.soldAmount >= bestSelling
  );
  return bestSellingItems;
}

// Date Filter
function dateFilter() {
  const dateItems = items.filter(
    (item) => item.date.getDate() > today.getDate() - 1
  );
  console.log(dateItems);
  return dateItems;
}

// app__filter-list
const filterButtons = [...$$(".app__filter-item")];
filterButtons.forEach((filterButton, index) => {
  filterButton.addEventListener("click", (e) => {
    $(".app__filter-item.btn--active").classList.remove("btn--active");
    filterButton.classList.add("btn--active");
    let result = [];
    if (filterButton.classList.contains("app__filter-popular")) {
      result = popularFilter();
      render(result);
    }
    if (filterButton.classList.contains("app__filter-newest")) {
      result = dateFilter();
      render(result);
    }
    if (filterButton.classList.contains("app__filter-bestSell")) {
      result = bestSellingFilter();
      render(result);
    }
  });
});
