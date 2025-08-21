import * as authController from './controller/authController.js';
import * as productController from './controller/productController.js';
import * as cartController from './controller/cartController.js';
import * as orderController from './controller/orderController.js';
document.getElementById('year').textContent = new Date().getFullYear();
const checkLogin = authController.checkLogin();
if (location.pathname.includes('login.html')) {
  if (!checkLogin) authController.login();
}
if (location.pathname.includes('register.html')) {
  if (!checkLogin) authController.registration();
}
if (location.pathname.includes('index.html') || location.pathname === '/') {
  productController.init();
}
if (location.pathname.includes('cart.html')) {
  cartController.handelPage();
}
if (location.pathname.includes('orders.html')) {
  orderController.init();
}
