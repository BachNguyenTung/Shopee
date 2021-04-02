import { getTempItems } from "./index.js";

export let cartNumb = 0;
let cartItems = []; // luu cart items vao local storage

export function setCartNumb() {
  let total = 0;
  cartItems.forEach((cartItem) => {
    total = total + cartItem.amount;
  });
  cartNumb = total;
}

export function getCartNumb() {
  return cartNumb;
}

export function setCartItems(items) {
  if (items != null) {
    cartItems = items;
  }
}

export function getCartItems() {
  return cartItems;
}

export function saveCartItemsToStorage(items) {
  localStorage.setItem("product", JSON.stringify(items));
}

export function getCartItemsFromStorage() {
  let savedCartItems = localStorage.getItem("product");
  return JSON.parse(savedCartItems);
}

function addToCartItembyID(id) {
  let tempItems = getTempItems();
  let item = tempItems.find((tempItem) => tempItem.id == id);
  item = { ...item, amount: 1 };
  cartItems = [...cartItems, item];
}

//render cart numbers
export function renderCartNumbers(cartNumb) {
  $(".header__cart-numb").innerText = cartNumb;
}

//render cartItems in cart
export function renderCartItems(items, ...callbacks) {
  if (cartItems.length == 0) {
    $(".header__cart-list").classList.add("header__cart-list--empty");
  } else {
    if (
      $(".header__cart-list").classList.contains("header__cart-list--empty")
    ) {
      $(".header__cart-list").classList.remove("header__cart-list--empty");
    }
    let html = items
      .map((item) => {
        return `
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
          <span>x</span>
        </a>
        <div class="header__cart-amount">
        <i class="header__cart-incr bi bi-caret-up-fill" data-id=${item.id}></i>
        <span class="header__cart-amount-item" data-id=${item.id}>${item.amount}</span>
        <i class="header__cart-decr bi bi-caret-down-fill" data-id=${item.id}></i>
        </div>
        <span class="header__cart-delBtn" data-id=${item.id}>Xóa</span>
      </div>
      `;
      })
      .join("");

    $(".header__cart-list-item").innerHTML = html;
  }
  callbacks.forEach((callback) => {
    callback();
  });
}

//Button add cart
export function getAndModifyAddCartBtn() {
  const addCartButtons = [...$$(".app__product-cart-btn")];
  addCartButtons.forEach((addCartButton, index) => {
    //Get Add Cart Btn and render by cartItems
    if (cartItems.length > 0) {
      cartItems.forEach((cartItem) => {
        if (addCartButton.dataset.id == cartItem.id) {
          addCartButton.innerText = "In cart";
          addCartButton.classList.add("app__product-cart-btn--disabled");
        }
      });
    }
    addCartButton.addEventListener("click", (e) => {
      //set value of CartNumb and render item added
      let id = addCartButton.dataset.id;

      if (addCartButton.innerText == "Add to cart") {
        addCartButton.innerText = "In cart";
        addCartButton.classList.add("app__product-cart-btn--disabled");
        addToCartItembyID(id);
        renderCartItems(
          cartItems,
          registerEventsDelCartBtn,
          registerEventsChangeItemAmount
        );
        saveCartItemsToStorage(cartItems);
        setCartItems(cartItems);
        setCartNumb();
        renderCartNumbers(cartNumb);
      }
    });
  });
}

export function registerEventsDelCartBtn() {
  const delCartItemBtns = [...$$(".header__cart-delBtn")];
  delCartItemBtns.forEach((delCartItemsBtn) => {
    delCartItemsBtn.addEventListener("click", () => {
      let id = delCartItemsBtn.dataset.id;
      cartItems = cartItems.filter((cartItem) => cartItem.id != id);
      delCartItemsBtn.parentElement.remove();
      saveCartItemsToStorage(cartItems);
      setCartItems(cartItems);
      setCartNumb();
      renderCartNumbers(cartNumb);

      if (cartNumb == 0) {
        $(".header__cart-list").classList.add("header__cart-list--empty");
      }
      //css Incart btn
      const addCartButtons = [...$$(".app__product-cart-btn")];
      addCartButtons.forEach((addCartButton) => {
        if (
          addCartButton.innerText == "In cart" &&
          addCartButton.dataset.id == id
        ) {
          addCartButton.innerText = "Add to cart";
          addCartButton.classList.remove("app__product-cart-btn--disabled");
        }
      });
    });
  });
}

export function registerEventsChangeItemAmount() {
  const incrBtns = [...$$(".header__cart-incr")];
  const decrBtns = [...$$(".header__cart-decr")];
  incrBtns.forEach((incrBtn) => {
    incrBtn.addEventListener("click", () => {
      //TODO:
      //find new item by id in cartItems
      let id = incrBtn.dataset.id;
      let item = cartItems.find((item) => item.id == id);
      //set amount prop of new item
      item.amount++;
      //Save cartItem in storage
      saveCartItemsToStorage(cartItems);
      //render item amount
      incrBtn.nextElementSibling.innerText = item.amount;
      setCartNumb();
      renderCartNumbers(cartNumb);
    });
  });
  decrBtns.forEach((decrBtn) => {
    decrBtn.addEventListener("click", () => {
        //TODO:
        //find new item by id in cartItems
        let id = decrBtn.dataset.id;
        let item = cartItems.find((item) => item.id == id);
        //set amount prop of new item
        item.amount <= 1 ? (item.amount = 1) : item.amount--;
        //Save cartItem in storage
        saveCartItemsToStorage(cartItems);
        //render item amount
        decrBtn.previousElementSibling.innerText = item.amount;
        setCartNumb();
        renderCartNumbers(cartNumb);
    });
  });
}
