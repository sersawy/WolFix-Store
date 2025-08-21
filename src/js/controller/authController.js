import * as userModel from '../model/userModel.js';
import * as cartModel from '../model/cartModel.js';
import * as authView from '../view/authView.js';

function handelLogoutListener() {
  const btn = document.getElementById('logoutBtn');
  btn.addEventListener('click', logout);
}
export function login() {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      userModel.authenticate(data);
      location.href = 'index.html';
    } catch (err) {
      authView.resetError();
      if (!err.isOperational) return console.error(err.message);
      authView.renderError(err);
    }
  });
}

function logout() {
  userModel.removeCurrentUser();
  cartModel.removeCurrentCart();
  location.href = 'index.html';
  return true;
}

export function checkLogin() {
  const currentUser = userModel.getCurrentUser();
  try {
    userModel.authenticate(currentUser);
    authView.renderUserSection(currentUser);
    handelLogoutListener();
  } catch (err) {
    if (!err.isOperational) return console.error(err.message);
    userModel.removeCurrentUser();
    authView.renderLoginSection();
  }
}

export function registration() {
  const form = document.getElementById('registerForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      userModel.createUser(data);
      alert('Registered! Please login.');
      location.href = 'login.html';
    } catch (err) {
      authView.resetError();
      if (!err.isOperational) return console.error(err.message);
      authView.renderError(err);
    }
  });
}
