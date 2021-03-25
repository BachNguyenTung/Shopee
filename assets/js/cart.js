import { getTempItems } from "./product.js";

let cartNumb = 0;
let cartItems = []; // luu cart items vao local storage

export function increaseCartNumb() {
  cartNumb++;
  $(".header__cart-numb").innerText = cartNumb;
}

export function decreaseCartNumb() {}
export function getCartItembyID(id) {
  let tempItems = getTempItems();
  let item = tempItems.find((tempItem) => tempItem.id == id);
  return item;
}

//render cartItems in cart
export function renderCartItems(item) {
  if (cartNumb == 0) {
    $(".header__cart-list").classList.add("header__cart-list--empty");
  } else {
    if (
      $(".header__cart-list").classList.contains("header__cart-list--empty")
    ) {
      $(".header__cart-list").classList.remove("header__cart-list--empty");
    }
    let html = `
            <div class="header__cart-item">
              <a href="" class="header__cart-link">
                <img
                  class="header__cart-img"
                  src=${item.imageUrl}
                  alt="item-ao"
                />
                <div class="header__cart-name">
                  ${item.name}
                </div>
                <div class="header__cart-price">${item.price}</div>
              </a>
            </div>
        `;
    $(".header__cart-list-item").innerHTML += html;
  }
}

//Button add cart
export function registerEventsCartBtn() {
  const addCartButtons = [...$$(".app__product-cart-btn")];
  addCartButtons.forEach((addCartButton, index) => {
    addCartButton.addEventListener("click", (e) => {
      //smt changes
      if (addCartButton.innerText == "Add to cart") {
        increaseCartNumb();
        let id = addCartButton.dataset.id;
        let item = getCartItembyID(id);
        renderCartItems(item);
      }
      //css addCart button
      if (addCartButton.innerText == "Add to cart") {
        addCartButton.innerText = "In cart";
        addCartButton.classList.add("app__product-cart-btn--disabled");
      }
    });
  });
}
