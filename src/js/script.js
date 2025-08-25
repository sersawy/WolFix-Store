import * as authController from './controller/authController.js';
import * as productController from './controller/productController.js';
import * as cartController from './controller/cartController.js';
import * as orderController from './controller/orderController.js';
import { handelScrollUp } from './utils/helpers.js';
document.getElementById('year').textContent = new Date().getFullYear();
handelScrollUp();
const checkLogin = authController.checkLogin();
let status = false;
if (location.pathname.includes('login.html')) {
  status = true;
  if (!checkLogin) authController.login();
  else location.href = 'index.html';
}
if (location.pathname.includes('register.html')) {
  status = true;
  if (!checkLogin) authController.registration();
  else location.href = 'index.html';
}
if (location.pathname.includes('index.html') || location.pathname === '/') {
  status = true;
  productController.init();
}
if (location.pathname.includes('cart.html')) {
  status = true;
  cartController.handelPage();
}
if (location.pathname.includes('orders.html')) {
  status = true;
  if (checkLogin) orderController.init();
  else location.href = 'login.html';
}
if (location.pathname.includes('order-confirmation.html')) {
  status = true;
  if (checkLogin) orderController.initOrderConfirmation();
  else location.href = 'login.html';
}
if (location.pathname.includes('/product.html')) {
  status = true;
  productController.initProductDetails();
}
