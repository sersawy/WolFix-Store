export function get() {
  return JSON.parse(localStorage.getItem('currentCart'));
}

export function set(items) {
  localStorage.setItem('currentCart', JSON.stringify(items));
}

export function add(product, qty = 1) {
  const cart = get() || [];
  const existing = cart.find((i) => i.product.id === product.id);
  if (existing) existing.qty += qty;
  else cart.push({ product, qty });
  set(cart);
  return cart;
}

export function remove(productId) {
  const cart = get().filter((i) => i.product.id !== +productId);
  set(cart);
  return cart;
}
export function removeCurrentCart() {
  localStorage.removeItem('currentCart');
}
export function updateQty(productId, qty) {
  const cart = get();
  const product = cart.find((p) => p.product.id === +productId);
  if (product) product.qty = qty;
  set(cart);
  return cart;
}
export function total() {
  return get()?.reduce((sum, p) => sum + ((p.product.price * (100 - p.product.sale)) / 100) * p.qty, 0);
}
function key(userId) {
  return `cart_${userId}`;
}
// export function get(userId) {
//   return getStorage(key(userId), []);
// }
// export function set(userId, items) {
//   setStorage(key(userId), items);
// }
// export function add(userId, product, qty = 1) {
//   const items = get(userId);
//   const existing = items.find((i) => i.product.id === product.id);
//   if (existing) existing.qty += qty;
//   else items.push({ product, qty });
//   set(userId, items);
//   return items;
// }
// export function remove(userId, productId) {
//   const items = get(userId).filter((i) => i.product.id !== Number(productId));
//   set(userId, items);
//   return items;
// }
// export function updateQty(userId, productId, qty) {
//   const items = get(userId);
//   const it = items.find((i) => i.product.id === Number(productId));
//   if (it) it.qty = qty;
//   set(userId, items);
//   return items;
// }
// export function clear(userId) {
//   set(userId, []);
// }
// export function count(userId) {
//   return get(userId).reduce((a, b) => a + b.qty, 0);
// }
// export function total(userId) {
//   return get(userId).reduce((sum, i) => sum + i.product.price * i.qty, 0);
// }
