import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("/json/tents.json"); 

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();