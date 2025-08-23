function generateTemplate(order, index) {
  const date = new Date(order.createdAt);
  const templateItems = generateTemplateItems(order.items);
  return `<div class="order-card">
            <div class="order-card-header">
              <h3 class="order-card-title">Order #${index + 1}</h3>
              <span class="order-status status-processing">${order.status}</span>
            </div>
            <div class="order-card-body">
              <div class="order-date">
                <i class="bi bi-calendar"></i>
                Placed on ${date}
              </div>
              ${templateItems}
              <div class="order-total">
                <span>Total</span>
                <span>$${order.total}</span>
              </div>

              <div class="order-actions">
                <a href="#" class="btn-view-order"> <i class="bi bi-eye"></i> View Details </a>
                <a href="#" class="btn-track-order"> <i class="bi bi-geo-alt"></i> Track Order </a>
              </div>
            </div>
          </div>`;
}
function generateTemplateItems(items) {
  return items
    .map(
      (i) => `<div class="order-item">
                  <div>
                    <span class="order-item-name">${i.product.name}</span>
                    <span class="order-item-quantity">× ${i.qty}</span>
                  </div>
                  <span class="order-item-price">$${(i.product.price * i.qty).toFixed(2)}</span>
                </div>`
    )
    .join('');
}
export function render(orders) {
  let template = `<div class="orders-empty">
      <div class="orders-empty-icon">
        <i class="bi bi-bag-x"></i>
      </div>
      <h2 class="orders-empty-title">No orders yet</h2>
      <p class="orders-empty-message">
        You haven't placed any orders yet. Start shopping to discover our products and make your first purchase!
      </p>
      <div class="orders-empty-actions">
        <a href="index.html" class="btn-shopping">
          <i class="bi bi-arrow-left"></i> Continue Shopping
        </a>
        <a href="index.html#products" class="btn-browse">
          <i class="bi bi-grid"></i> Browse Products
        </a>
      </div>
    </div>`;
  if (orders?.length) template = orders.map(generateTemplate).join('');
  document.querySelector('.orders-grid').innerHTML = template;
}

function generateTemplateItemsConfirmation(items) {
  return items
    .map(
      (i) => `<div class="order-item">
                  <img src="${i.product.image}" alt="${i.product.name}" class="item-image" />
                  <div class="item-details">
                  <div class="item-name">${i.product.name}</div>
                  <div class="item-category">${i.product.category} • ${i.product.brand}</div>
                  <div class="item-price">$${(((i.product.price * (100 - i.product.sale)) / 100) * i.qty).toFixed(
                    2
                  )}</div>
                  </div>
                  <span class="item-quantity">Qty: ${i.qty}</span>
                </div>`
    )
    .join('');
}

export function renderOrderConfirmation(order) {
  const date = new Date(order.createdAt);
  document.querySelector('.order-date').textContent = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  document.querySelector('.order-status').textContent = order.status;
  document.querySelectorAll('.order-total').forEach((e) => (e.textContent = `$${order.total.toFixed(2)}`));
  document.querySelectorAll('.order-items-count').forEach((e) => (e.textContent = order.items.length));
  document.querySelector('.order-items-container').innerHTML = generateTemplateItemsConfirmation(order.items);
}
