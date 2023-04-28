import * as Api from "../api.js";

const hotItems = document.querySelectorAll("#hotItems > li");
const discountItems = document.querySelectorAll("#discountItems > li");
const categoryItem = document.getElementById("categoryItem");
const categoryTitle = document.querySelector(".text-start.fs-3.mt-5");

// await getData("/api/products/popular", hotItems);
// await getData("/api/products/discount", discountItems);
const paintCategory = (productList) => {
  productList.forEach((product) => {
    categoryItem.innerHTML += `
    <li class="card col-md-3 col-6 pt-2" data-id=${product._id}>
    <img
      src=../${product.imagePaths[0]}
      class="card-img-top"
      alt=${product.productName}
    />
    <div class="card-body">
      <h5 class="card-title">${product.productName}</h5>
      <p class="card-text">${product.price}원</p>
    </div>
  </li>`;
  });
};

async function getCategoryData() {
  const url = new URL(window.location.href);
  const categoryId = url.searchParams.get("categoryId");
  categoryTitle.innerHTML = categoryId;
  console.log(categoryId);
  // element.querySelector("ul") =

  const categoryData = await getData(`/api/products/category/${categoryId}`);
}

async function getData(apiUrl, element) {
  try {
    const data = await Api.get(apiUrl);
    console.log(data);

    paintCategory(data);
    // const { imagePaths, productName, price } = data[i];
    // element.querySelector("img").src = imagePaths;
    // element.querySelector("div > h5").innerText = productName;
    // element.querySelector("div > p").innerText = price;
  } catch (err) {
    alert(err.message);
  }
}

await getCategoryData();

categoryItem.addEventListener("click", (e) => {
  const clickedElement = e.target;
  const parentLiElement = clickedElement.parentNode;

  if (parentLiElement.tagName === "LI") {
    const productId = parentLiElement.dataset.id;
    location.href = `/product/?productId=${productId}`;
  }
});
