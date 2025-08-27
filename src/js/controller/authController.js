import * as userModel from '../model/userModel.js';
import * as cartModel from '../model/cartModel.js';
import * as authView from '../view/authView.js';
import { handelShowLoading, sendNotification, togglePassword } from '../utils/helpers.js';

function handelLogoutListener() {
  const btn = document.getElementById('logoutBtn');
  btn.addEventListener('click', logout);
}
function validatePassword() {
  const password = document.getElementById('password').value;
  const passwordError = document.getElementById('passwordError');

  // Check individual requirements
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  // Update requirement indicators
  updateRequirement('req-length', hasMinLength);
  updateRequirement('req-uppercase', hasUppercase);
  updateRequirement('req-lowercase', hasLowercase);
  updateRequirement('req-number', hasNumber);
  updateRequirement('req-special', hasSpecial);

  // Calculate password strength
  let strength = 0;
  if (hasMinLength) strength += 20;
  if (hasUppercase) strength += 20;
  if (hasLowercase) strength += 20;
  if (hasNumber) strength += 20;
  if (hasSpecial) strength += 20;

  // Update strength meter
  updateStrengthMeter(strength);

  // Validate confirm password if it has value
  const confirmPassword = document.getElementById('confirmPassword');
  if (confirmPassword && confirmPassword.value) {
    validateConfirmPassword();
  }

  // Set error message if requirements not met
  if (password && !(hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial)) {
    passwordError.textContent = 'Password does not meet all requirements';
  } else {
    passwordError.textContent = '';
  }

  return hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;
}
function updateRequirement(elementId, isValid) {
  const element = document.getElementById(elementId);
  const icon = element.querySelector('i');

  if (isValid) {
    icon.classemail = 'bi bi-check-circle-fill text-success';
    element.classList.add('requirement-met');
  } else {
    icon.className = 'bi bi-x-circle';
    element.classList.remove('requirement-met');
  }
}
function updateStrengthMeter(strength) {
  const progressBar = document.querySelector('.strength-progress');
  const strengthText = document.getElementById('strength-value');

  progressBar.style.width = strength + '%';

  // Update color and text based on strength
  if (strength < 40) {
    progressBar.style.backgroundColor = '#dc3545';
    strengthText.textContent = 'Weak';
  } else if (strength < 80) {
    progressBar.style.backgroundColor = '#ffc107';
    strengthText.textContent = 'Medium';
  } else {
    progressBar.style.backgroundColor = '#28a745';
    strengthText.textContent = 'Strong';
  }
}
function validateConfirmPassword() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword');
  const confirmError = document.getElementById('confirmPasswordError');

  if (confirmPassword.value && password !== confirmPassword.value) {
    confirmError.textContent = 'Passwords do not match';
    confirmPassword.classList.add('error-input');
    return false;
  } else {
    confirmError.textContent = '';
    confirmPassword.classList.remove('error-input');
    return true;
  }
}

export function login() {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handelShowLoading();
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
    return true;
  } catch (err) {
    if (!err.isOperational) return console.error(err.message);
    userModel.removeCurrentUser();
    authView.renderLoginSection();
  }
}

export function registration() {
  togglePassword();
  const form = document.getElementById('registerForm');
  document.getElementById('password').addEventListener('keyup', validatePassword);
  document.getElementById('confirmPassword').addEventListener('keyup', validateConfirmPassword);
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handelShowLoading();
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      userModel.createUser(data);
      location.href = 'login.html';
    } catch (err) {
      authView.resetError();
      if (!err.isOperational) return console.error(err.message);
      authView.renderError(err);
    }
  });
}

export function accountSetting() {
  authView.renderAccountSetting(userModel.getCurrentUser());
  togglePassword();
  document.getElementById('personalInfoForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    await handelShowLoading();
    const name = document.querySelector('#fullName').value;
    const email = document.querySelector('#email').value;
    sendNotification('Your personal information has been updated successfully.', 'success');
    userModel.updateUserData(name, email);
  });
  document.getElementById('password').addEventListener('keyup', validatePassword);
  document.getElementById('confirmPassword').addEventListener('keyup', validateConfirmPassword);
  document.getElementById('passwordForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    await handelShowLoading();

    const oldPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    try {
      userModel.updateUserPassword(oldPassword, newPassword, confirmPassword);
      sendNotification('Your password has been updated successfully.', 'success');
    } catch (err) {
      authView.resetError();
      if (!err.isOperational) return console.error(err);
      authView.renderError(err);
    }
  });
}
