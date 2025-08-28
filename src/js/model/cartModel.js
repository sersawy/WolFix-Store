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
export function getTotalQuantity() {
  return get()?.reduce((sum, p) => sum + p.qty, 0);
}
function key(userId) {
  return `cart_${userId}`;
}
