// product.js
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const params = new URLSearchParams(window.location.search);
const productId = params.get("product");

const dataSource = new ProductData("/json/tents.json"); // usa ruta relativa desde la raíz del sitio

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

function renderProductDetails(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("productPrice").textContent = `$${product.FinalPrice}`;
  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}

async function showProduct() {
  const product = await dataSource.findProductById(productId);
  renderProductDetails(product);

  document
    .getElementById("addToCart")
    .addEventListener("click", () => addProductToCart(product));
}

showProduct();
