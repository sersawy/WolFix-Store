const cartContainer = document.getElementById('cartContainer');
const cartTotal = document.getElementById('cartTotal');
export function setCartCount(number) {
  document.querySelector('#cartCountBadge').textContent = number;
}
export function generateRow(item) {
  const p = item.product;
  return `
    <tr>
      <td><img src="${p.image}" alt="${p.name}" class="rounded" style="width:56px;height:56px;object-fit:cover"></td>
      <td>${p.name}</td>
      <td>$${p.price}</td>
      <td style="max-width:120px"><input class="form-control form-control-sm qty-input" type="number" min="1" value="${
        item.qty
      }" data-id="${p.id}"></td>
      <td class="fw-bold">$${(p.price * item.qty).toFixed(2)}</td>
      <td><button class="btn btn-sm btn-outline-danger btn-remove-product" data-id="${p.id}">&times;</button></td>
    </tr>
  `;
}
export function render(items, total) {
  setCartCount(items.length);
  cartTotal.innerText = total;
  let template = `<div class="alert alert-info">Your cart is empty.</div>`;
  if (items.length)
    template = `<div class="table-responsive"><table class="table align-middle"><thead><tr><th></th><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr></thead><tbody>${items
      .map(generateRow)
      .join('')}</tbody></table></div>`;
  cartContainer.innerHTML = template;
}
