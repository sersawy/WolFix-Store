export function list(userId) {
  return getStorage(key(userId), []);
}
export function place(userId, items) {
  const orders = list(userId);
  const order = {
    id: 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
    createdAt: new Date().toISOString(),
    items: items.map((i) => ({ id: i.product.id, name: i.product.name, price: i.product.price, qty: i.qty })),
    total: items.reduce((s, i) => s + i.product.price * i.qty, 0),
    status: 'Processing',
  };
  orders.push(order);
  setStorage(key(userId), orders);
  return order;
}
