import * as cartView from '../view/cartView.js';
import * as cartModel from '../model/cartModel.js';

import * as userModel from '../model/userModel.js';

import { sendNotification, handelShowLoading } from '../utils/helpers.js';
export function init() {
  const currentUser = userModel.getCurrentUser();
  if (currentUser && cartModel.get()) userModel.addCartToCurrentUser(cartModel.get());
  else if (currentUser && currentUser.cart) cartModel.set(currentUser.cart);
  cartView.setCartCount(cartModel.getTotalQuantity());
}
export function addToCart(product, qty = 1) {
  cartModel.add(product, qty);
  const currentUser = userModel.getCurrentUser();
  if (currentUser) userModel.addCartToCurrentUser(cartModel.get());
  cartView.setCartCount(cartModel.getTotalQuantity());
  sendNotification(`Added ${product.name.length > 60 ? product.name.slice(0, 60) + '...' : product.name} to cart.`);
}

function handelChangeQuantity(e) {
  if (e.target.classList.contains('quantity-btn')) {
    const id = e.target.dataset.id;
    const value = e.target.dataset.quantity;
    changeQuantity(id, +value);
  } else if (e.target.classList.contains('quantity-input')) {
    const id = e.target.dataset.id;
    changeQuantity(id, +e.target.value);
  }
}
function changeQuantity(id, value) {
  if (value <= 0) cartModel.remove(id);
  else cartModel.updateQty(id, +value);
  const currentUser = userModel.getCurrentUser();
  if (currentUser) userModel.addCartToCurrentUser(cartModel.get());
  cartView.render(cartModel.get(), cartModel.total());
}
function handelRemoveProduct(e) {
  const btn = e.target.closest('.cart-item-remove');
  if (!btn) return;
  const id = btn.dataset.id;

  cartModel.remove(id);
  const currentUser = userModel.getCurrentUser();
  if (currentUser) userModel.addCartToCurrentUser(cartModel.get());
  cartView.render(cartModel.get(), cartModel.total());
}
async function handelCheckout() {
  const order = cartModel.get();
  const currentUser = userModel.getCurrentUser();
  if (!currentUser) location.href = './login.html';
  userModel.addOrderToCurrentUser(order, cartModel.total());
  sendNotification('Order placed successfully!', 'success');
  await handelShowLoading();
  cartModel.removeCurrentCart();
  userModel.removeCurrentCart();
  location.href = './checkout.html';
}

export function handelPage() {
  init();
  cartView.render(cartModel.get(), cartModel.total());
  document.getElementById('cartContainer').addEventListener('change', handelChangeQuantity);
  document.getElementById('cartContainer').addEventListener('click', handelChangeQuantity);
  document.getElementById('cartContainer').addEventListener('click', handelRemoveProduct);
  document.getElementById('checkoutBtn')?.addEventListener('click', handelCheckout);
}
