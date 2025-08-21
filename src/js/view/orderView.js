function generateTemplate(orders) {
  if (!orders.length) return `<div class="alert alert-info">No orders yet.</div>`;
  return orders
    .map((order, index) => {
      const date = new Date(order.createdAt);
      const lines = order.items
        .map(
          (i) =>
            `<li class="list-group-item d-flex justify-content-between"><span>${i.product.name} × ${
              i.qty
            }</span><span>$${(i.product.price * i.qty).toFixed(2)}</span></li>`
        )
        .join('');
      return `
      <div class="col-md-6">
        <div class="card h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0">Order ${index + 1}</h5>
              <span class="badge text-bg-secondary">${order.status}</span>
            </div>
            <small class="text-muted">Placed on ${date.toLocaleString()}</small>
            <ul class="list-group list-group-flush my-3">${lines}</ul>
            <div class="d-flex justify-content-between"><strong>Total</strong><strong>$${order.total.toFixed(
              2
            )}</strong></div>
          </div>
        </div>
      </div>
    `;
    })
    .join('');
}
export function render(orders) {
  const template = generateTemplate(orders);
  document.getElementById('ordersGrid').innerHTML = template;
}
