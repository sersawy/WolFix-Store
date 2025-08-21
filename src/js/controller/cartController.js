import * as cartView from '../view/cartView.js';
import * as cartModel from '../model/cartModel.js';

import * as userModel from '../model/userModel.js';

import { sendNotification } from '../utils/helpers.js';
export function init() {
  const currentUser = userModel.getCurrentUser();
  if (currentUser && cartModel.get()) userModel.addCartToCurrentUser(cartModel.get());
  else if (currentUser && currentUser.cart) cartModel.set(currentUser.cart);
  cartView.setCartCount(cartModel.get()?.length);
}
export function addToCart(product) {
  cartModel.add(product);
  const currentUser = userModel.getCurrentUser();
  if (currentUser) userModel.addCartToCurrentUser(cartModel.get());
  cartView.setCartCount(cartModel.get().length);
  sendNotification(`Added ${product.name} to cart.`);
}

function handelChangeQuantity(e) {
  if (!e.target.classList.contains('qty-input')) return;
  const id = e.target.dataset.id;
  cartModel.updateQty(id, +e.target.value);
  const currentUser = userModel.getCurrentUser();
  if (currentUser) userModel.addCartToCurrentUser(cartModel.get());
  cartView.render(cartModel.get(), cartModel.total());
}
function handelRemoveProduct(e) {
  if (!e.target.classList.contains('btn-remove-product')) return;
  const id = e.target.dataset.id;
  cartModel.remove(id);
  const currentUser = userModel.getCurrentUser();
  if (currentUser) userModel.addCartToCurrentUser(cartModel.get());
  cartView.render(cartModel.get(), cartModel.total());
}
function handelCheckout() {
  const order = cartModel.get();

  userModel.addOrderToCurrentUser(order, cartModel.total());
  sendNotification('order is created!');
}

export function handelPage() {
  init();
  cartView.render(cartModel.get(), cartModel.total());
  document.getElementById('cartContainer').addEventListener('change', handelChangeQuantity);
  document.getElementById('cartContainer').addEventListener('click', handelRemoveProduct);
  document.getElementById('checkoutBtn').addEventListener('click', handelCheckout);
}
