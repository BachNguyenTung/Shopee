import { getTempItems } from "./product.js";

let cartNumb = 0;
let cartItems = []; // luu cart items vao local storage

function increaseCartNumb() {
  cartNumb++;
  $(".header__cart-numb").innerText = cartNumb;
}

function decreaseCartNumb() {
  cartNumb--;
  $(".header__cart-numb").innerText = cartNumb;
}

export function getCartItems() {
  return cartItems;
}

function getCartItembyID(id) {
  let tempItems = getTempItems();
  let item = tempItems.find((tempItem) => tempItem.id == id);
  cartItems.push(item);
  return item;
}

//render cartItems in cart
export function renderCartItems(item, callback) {
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
              <span class="header__cart-delBtn" data-id=${item.id}>Xóa</span>
            </div>
        `;
    $(".header__cart-list-item").innerHTML += html;
    callback();
  }
}

//Button add cart
export function registerEventsCartBtn() {
  const addCartButtons = [...$$(".app__product-cart-btn")];
  addCartButtons.forEach((addCartButton, index) => {
    addCartButton.addEventListener("click", (e) => {
      let id = addCartButton.dataset.id;
      //set value of CartNumb and render item added
      if (addCartButton.innerText == "Add to cart") {
        increaseCartNumb();
        let item = getCartItembyID(id);
        renderCartItems(item, registerEventsDelCartBtn);
      }
      //css addCart button
      if (addCartButton.innerText == "Add to cart") {
        addCartButton.innerText = "In cart";
        addCartButton.classList.add("app__product-cart-btn--disabled");
      }
    });
  });
}

export function registerEventsDelCartBtn() {
  const delCartItemBtns = [...$$(".header__cart-delBtn")];
  delCartItemBtns.forEach((delCartItemsBtn) => {
    delCartItemsBtn.addEventListener("click", () => {
      let id = delCartItemsBtn.dataset.id;
      cartItems = cartItems.filter(cartItem => cartItem.id != id)
      delCartItemsBtn.parentElement.remove();
      decreaseCartNumb();
      if (cartNumb == 0) {
        $(".header__cart-list").classList.add("header__cart-list--empty");
      }
      //css Incart btn
      const addCartButtons = [...$$(".app__product-cart-btn")];
      addCartButtons.forEach((addCartButton) => {
        if (addCartButton.innerText == "In cart" && addCartButton.dataset.id == id) {
          addCartButton.innerText = "Add to cart";
          addCartButton.classList.remove("app__product-cart-btn--disabled");
        }
      });
    });
  });
}
