function generateTemplate(items) {
  return items
    .map(
      (i) => `<div class="checkout-item">
                <img src="${i.product.image}" alt="${i.product.name}" class="checkout-item-image" />
                <div class="checkout-item-details">
                  <div class="checkout-item-name">${i.product.name}</div>
                  <div class="checkout-item-category">${i.product.category} • ${i.product.brand}</div>
                  <div class="checkout-item-price">$${(
                    ((i.product.price * (100 - i.product.sale)) / 100) *
                    i.qty
                  ).toFixed(2)}</div>
                </div>
                <div class="checkout-item-quantity">Qty: ${i.qty}</div>
              </div>`
    )
    .join('');
}
export function render(order, total) {
  console.log(order);

  document.querySelectorAll('.order-total').forEach((e) => (e.textContent = `$${total.toFixed(2)}`));
  document.querySelector('.checkout-items').innerHTML = generateTemplate(order);
}
