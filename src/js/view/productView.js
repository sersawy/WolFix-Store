const productsContainer = document.getElementById('productsContainer');
const productsCount = document.getElementById('productsCount');

export function detail(product) {
  return `
    <div class="row g-4">
      <div class="col-md-6"><img src="${product.image}" class="img-fluid rounded shadow-sm" alt="${product.name}"></div>
      <div class="col-md-6"><h2>${product.name}</h2><p class="text-muted">${product.category}</p><p>${product.desc}</p><p class="fs-4 fw-bold">$${product.price}</p><button id="addDetail" class="btn btn-primary btn-lg">Add to Cart</button></div>
    </div>
  `;
}

function generateTemplate(product) {
  return `
    <div class="col-sm-6 col-lg-4">
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start">
            <h6 class="text-uppercase text-muted mb-2">${product.category}</h6>
            <span class="badge text-bg-light">${product.brand}</span>
          </div>
          <h5 class="card-title">${product.name}</h5>
          <div class="small mb-2">Rating: <strong>${product.rating}</strong></div>
          <p class="fw-bold mb-3">$${product.price}</p>
          <div class="mt-auto d-flex gap-2">
            <a href="product.html?id=${product.id}" class="btn btn-outline-secondary">Details</a>
            <button class="btn btn-primary add-to-card" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
export function render(products, total) {
  productsContainer.innerHTML = '';
  products.forEach((product) => {
    const template = generateTemplate(product);
    productsContainer.insertAdjacentHTML('afterbegin', template);
  });
  productsCount.innerHTML = `<div class="text-muted small mb-2">${total} result${total !== 1 ? 's' : ''}</div>`;
}
