// app__filter-list
const filterButtons = [...$$(".app__filter-item")];
filterButtons.forEach((filterButton, index) => {
  filterButton.addEventListener("click", (e) => {
    $(".app__filter-item.btn--active").classList.remove("btn--active");
    filterButton.classList.add("btn--active");
  });
});

// select-input
const inputSelects = [...$$(".app__input-item")];
inputSelects.forEach((inputSelect, index) => {
  inputSelect.addEventListener("click", () => {
    $(".app__input-lable").innerHTML = inputSelect.innerHTML;
    $(".app__input-lable").style.color = "var(--primary-color)";
    $(".app__input-list").style.display = "none";
    $(".select-input").addEventListener("mouseover", () => {
      $(".app__input-list").removeAttribute("style");
    });
  });
});

//app__category-list
const categories = [...$$(".app__category-item")];
categories.forEach((category) => {
  category.addEventListener("click", () => {
      console.log('sdds');
    $(".app__category-item.app__category-item--active").classList.remove(
      "app__category-item--active"
    );
    category.classList.add("app__category-item--active");
  });
});
