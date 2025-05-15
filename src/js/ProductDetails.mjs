import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cart = getLocalStorage("so-cart") || [];
    cart.push(this.product);
    setLocalStorage('so-cart', cart);
  }

  renderProductDetails() {
    document.querySelector('.product-detail').innerHTML = `
      <h3>${this.product.Name}</h3>
      <img src="${this.product.Image}" alt="${this.product.Name}">
      <p>${this.product.Description}</p>
      <p>$${this.product.FinalPrice}</p>
      <button id="addToCart">Add to Cart</button>
    `;
  }
}
