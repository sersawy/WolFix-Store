import * as authController from './controller/authController.js';
import * as productController from './controller/productController.js';
import * as cartController from './controller/cartController.js';
import * as contactController from './controller/contactController.js';
import * as orderController from './controller/orderController.js';
import * as checkoutController from './controller/checkoutController.js';
import * as cartModel from './model/cartModel.js';
import * as cartView from './view/cartView.js';
import { handelScrollUp } from './utils/helpers.js';
document.getElementById('year').textContent = new Date().getFullYear();
cartView.setCartCount(cartModel.getTotalQuantity());
handelScrollUp();
const checkLogin = authController.checkLogin();

if (location.pathname.includes('login.html')) {
  if (!checkLogin) authController.login();
  else location.href = 'index.html';
}
if (location.pathname.includes('register.html')) {
  if (!checkLogin) authController.registration();
  else location.href = 'index.html';
}
if (location.pathname.includes('index.html') || location.pathname === '/') {
  productController.init();
}
if (location.pathname.includes('cart.html')) {
  cartController.handelPage();
}
if (location.pathname.includes('orders.html')) {
  if (checkLogin) orderController.init();
  else location.href = 'login.html';
}
if (location.pathname.includes('checkout.html')) {
  if (checkLogin) checkoutController.init();
  else location.href = 'login.html';
}
if (location.pathname.includes('order-confirmation.html')) {
  if (checkLogin) orderController.initOrderConfirmation();
  else location.href = 'login.html';
}
if (location.pathname.includes('account.html')) {
  if (checkLogin) authController.accountSetting();
  else location.href = 'login.html';
}
if (location.pathname.includes('/product.html')) {
  productController.initProductDetails();
}
if (location.pathname.includes('contact.html')) {
  contactController.init();
}
