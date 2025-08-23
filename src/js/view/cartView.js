const cartContainer = document.getElementById('cartContainer');
const loadingOverlay = document.getElementById('loadingOverlay');

export function setCartCount(number) {
  document.querySelector('#cartCountBadge').textContent = number;
}
export function generateRow(item) {
  const p = item.product;

  return `
    <tr>
      <td>
        <div class="d-flex align-items-center">
          <img src="${p.image}" alt="${p.name}" class="cart-item-image me-3" />
          <div>
            <div class="cart-item-name">${p.name}</div>
            <div class="cart-item-category">${p.category} • ${p.brand}</div>
          </div>
        </div>
      </td>
      <td class="cart-item-price">$${(p.price * (100 - p.sale)) / 100}</td>
      <td>
        <div class="cart-item-quantity">
          <div class="quantity-control">
            <button class="quantity-btn" data-quantity="${item.qty - 1}" data-id="${p.id}">-</button>
            <input type="number" class="quantity-input" value="${item.qty}" min="1" data-id="${p.id}" />
            <button class="quantity-btn" data-quantity="${item.qty + 1}" data-id="${p.id}">+</button>
          </div>
        </div>
      </td>
      <td class="cart-item-subtotal">$${(((p.price * (100 - p.sale)) / 100) * item.qty).toFixed(2)}</td>
      <td>
        <button class="cart-item-remove" data-id="${p.id}">
          <i class="bi bi-x-lg"></i>
        </button>
      </td>
    </tr>
  `;
}
export function render(items, total) {
  setCartCount(items?.length);

  let template = `<main class="container my-4">
  <div class="empty-cart-container">
    <div class="empty-cart-icon">
      <i class="bi bi-cart-x"></i>
    </div>
    <h2 class="empty-cart-title">Your cart is empty</h2>
    <p class="empty-cart-message">
      Looks like you haven't added any items to your cart yet. Browse our collection and find something you love!
    </p>
    <div class="empty-cart-actions">
      <a href="index.html" class="btn-shopping">
        <i class="bi bi-arrow-left"></i> Continue Shopping
      </a>
      <a href="index.html#products" class="btn-browse">
        <i class="bi bi-grid"></i> Browse Products
      </a>
    </div>
  </div>
</main>`;
  if (items?.length)
    template = `<div class="cart-container">
        <div class="cart-header">
          <h2><i class="bi bi-cart3"></i> Shopping Cart</h2>
          <span class="text-muted">3 items</span>
        </div>

        <div class="table-responsive">
          <table class="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${items.map(generateRow).join('')}</tbody>
          </table>
        </div>

        <div class="cart-footer">
          <div class="cart-total">
            <span class="cart-total-label">Total:</span>
            <span id="cartTotal"></span>
          </div>

          <div class="cart-actions">
            <a href="index.html" class="btn-continue-shopping"> <i class="bi bi-arrow-left"></i> Continue Shopping </a>
            <button class="btn-checkout" id="checkoutBtn"><i class="bi bi-lock-fill"></i> Checkout</button>
          </div>
        </div>
      </div>`;
  cartContainer.innerHTML = template;
  if (items?.length) document.getElementById('cartTotal').innerText = '$' + total;
}
export function showLoading() {
  if (loadingOverlay) {
    loadingOverlay.classList.add('active');
  }
}

export function hideLoading() {
  if (loadingOverlay) {
    loadingOverlay.classList.remove('active');
  }
}
