const cartItem = document.querySelector(".cart-item");
const purchaseBtn = document.querySelector(".btn.btn-primary.purchase-btn");
const cartContainer = document.querySelector(".cart-container");
const checkAll = document.getElementById("allCheck");
const totalPriceText = document.querySelector(".total-price");
const decreaseBtn = document.querySelector(".decrease-btn");
const increaseBtn = document.querySelector(".increase-btn");
const removeProductBtn = document.querySelector(".btn.btn-success.remove");
const productAmount = document.querySelector(".product-amount");

const menu = JSON.parse(localStorage.getItem("menu"));
let totalPrice = 0;

productAmount.innerText = `일반구매(${menu.length})`;

const paintCart = (item) => {
  const { productName, price, quantity } = item.orderItems;

  const paintProduct = ` <div class="container text-left li"  >
  <div class="row">
  <div class="col">
  <div class="form-check">
  <input class="form-check-input painted" type="checkbox" id="defaultCheck1" data-id='${productName}'>
  <label class="form-check-label" for="defaultCheck1">
  <p class="cart-item">${productName}</p>
  </label>
  </div>
  </div>
  
  <div class="col">
  <div class="item-count">
  <button
  type="button"
  class="btn btn-secondary btn-sm decrease-btn"
  style="height: 1.5rem"
  >
  -
  </button>
  <p class="quantity">${quantity}</p>
  <button
  type="button"
  class="btn btn-secondary btn-sm increase-btn"
  style="height: 1.5rem"
  >
  +
  </button>
  </div>
  </div>
  
  <div class="col">
  <p class="product-price" >${price * quantity}원</p>
  </div>
  </div>
  </div>`;
  totalPrice += price * quantity;
  cartContainer.insertAdjacentHTML("beforeend", paintProduct);
};

menu.forEach(paintCart);
totalPriceText.innerText = `${totalPrice}원`;

const checkBoxs = document.querySelectorAll(".form-check-input.painted");

const checkAllHandler = (e) => {
  if (e.target.checked) {
    checkBoxs.forEach((checkbox) => {
      checkbox.checked = true;
    });
  } else {
    checkBoxs.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
};

const increaseBtnHandler = (el, originPrice) => {
  let quantity = el.querySelector(".quantity");
  let productPrice = el.querySelector(".product-price");

  quantity.innerText = Number(quantity.innerText) + 1;
  productPrice.innerText = originPrice * Number(quantity.innerText) + "원";
  totalPriceText.innerText =
    Number(totalPriceText.innerText.replace(/[^0-9]/g, "")) +
    originPrice +
    "원";
};

const decreaseBtnHandler = (el, originPrice) => {
  let quantity = el.querySelector(".quantity");
  let productPrice = el.querySelector(".product-price");

  if (quantity.innerText > 1) {
    quantity.innerText = Number(quantity.innerText) - 1;
    productPrice.innerText = originPrice * Number(quantity.innerText) + "원";
  }
  totalPriceText.innerText =
    Number(totalPriceText.innerText.replace(/[^0-9]/g, "")) -
    originPrice +
    "원";
};

const productLi = document.querySelectorAll(".container.text-left.li");
const checkedLi = new Set();
checkAll.addEventListener("change", checkAllHandler);

productLi.forEach((el) => {
  const originPrice =
    Number(
      el.querySelector(".product-price").innerText.replace(/[^0-9]/g, "")
    ) / Number(el.querySelector(".quantity").innerText);

  el.addEventListener("click", (e) => {
    if (e.target.classList.contains("increase-btn")) {
      increaseBtnHandler(el, originPrice);
    } else if (e.target.classList.contains("decrease-btn")) {
      decreaseBtnHandler(el, originPrice);
    } else if (e.target.classList.contains("form-check-input")) {
      if (e.target.checked) {
        checkedLi.add(e.target);
      }
    }
  });
});

removeProductBtn.addEventListener("click", () => {
  const nonCheckedProducts = menu.filter(({ orderItems }) => {
    const productName = orderItems.productName;
    return !Array.from(checkedLi).some(
      (input) => input.dataset.id == productName
    );
  });
  if (nonCheckedProducts.length > 0) {
    console.log(nonCheckedProducts);
    localStorage.setItem("menu", JSON.stringify(nonCheckedProducts));
    location.reload();
  }
});
