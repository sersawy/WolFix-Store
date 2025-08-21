import { AppError } from '../utils/appError.js';
const validation = function (user) {
  // Name
  const nameRegex = new RegExp('^[A-Za-z]{3,}$');
  const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
  const users = getAllUsers();

  if (!user.name) {
    throw new AppError('registration', 'name', 'Name is Required');
  } else if (!nameRegex.test(user.name.trim())) {
    throw new AppError('registration', 'name', 'Name Length Must be greater than 3 (letters only)');
  }

  if (!user.email) {
    throw new AppError('registration', 'email', 'Email is Required');
  } else if (!emailRegex.test(user.email)) {
    throw new AppError('registration', 'email', 'Email is not valid');
  } else if (users.some((val) => val.email === user.email)) {
    throw new AppError('registration', 'email', 'Email already registered');
  }

  if (!user.password) {
    throw new AppError('registration', 'password', 'password is Required');
  } else if (!user.confirmPassword) {
    throw new AppError('registration', 'confirmPassword', 'Confirm Password is Required');
  } else if (user.confirmPassword !== user.password) {
    throw new AppError('registration', 'confirmPassword', 'Password and Confirm Password do not match!');
  } else if (user.password.length < 8) {
    throw new AppError('registration', 'Password', 'Password must be 8 chars at least');
  }
  return true;
};

function getAllUsers() {
  return JSON.parse(localStorage.getItem('users')) ?? [];
}
function getUser(email) {
  return getAllUsers().find((user) => user.email === email) ?? false;
}
function addUser(user) {
  const users = getAllUsers();
  users.push({ name: user.name, email: user.email, password: user.password });
  localStorage.setItem('users', JSON.stringify(users));
  return users;
}
export function createUser(data) {
  const user = {
    name: data.name,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
    orders: [],
  };
  validation(user);
  addUser(user);
  return user;
}
export function authenticate(data) {
  if (!data) throw new AppError('login', '', 'Login failed! Invalid username or password.');
  const currentUser = { email: data.email, password: data.password };
  const user = getUser(currentUser.email);

  if (!user || user.password !== currentUser.password)
    throw new AppError('login', 'error', 'Login failed! Invalid username or password.');

  localStorage.setItem('currentUser', JSON.stringify(user));
  return true;
}
export function removeCurrentUser() {
  localStorage.removeItem('currentUser');
  return true;
}

export function logout() {
  localStorage.removeItem('currentUser');
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}
function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}
export function addCartToCurrentUser(cart) {
  const currentUser = getCurrentUser();
  currentUser.cart = cart;
  setCurrentUser(currentUser);
  const users = getAllUsers();
  const user = users.find((u) => u.email === currentUser.email);
  user.cart = cart;
  localStorage.setItem('users', JSON.stringify(users));
  return users;
}
export function addOrderToCurrentUser(items, total) {
  const currentUser = getCurrentUser();
  if (!currentUser.orders) currentUser.orders = [];
  currentUser.orders.push({ createdAt: new Date(), items, total });
  setCurrentUser(currentUser);
  const users = getAllUsers();
  const user = users.find((u) => u.email === currentUser.email);
  user.orders = currentUser.orders;
  localStorage.setItem('users', JSON.stringify(users));
  return users;
}
