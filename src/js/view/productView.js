const productsContainer = document.getElementById('productsContainer');
const sliderContainer = document.querySelector('.sliderItems');
const productsCount = document.getElementById('productsCount');
const loadingOverlay = document.getElementById('loadingOverlay');

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
      <div class="product-card card h-100">
        <div class="product-image">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          ${product.onSale ? '<span class="product-badge">Sale</span>' : ''}
            ${
              product.newArrival
                ? '<span class="product-badge" style="background: var(--success-color);">New</span>'
                : ''
            }
        </div>
        <div class="card-body d-flex flex-column">
          <div class="product-meta">
            <span class="product-category">${product.category}</span>
            <span class="product-brand">${product.brand}</span>
          </div>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-rating">
            <span class="rating-stars">${generateStars(product.rating)}</span>
            <span class="rating-value">${product.rating}</span>
          </div>
          <div class="product-price">$${product.price}</div>
          <div class="product-actions">
            <a href="product.html?id=${product.id}" class="btn-outline-secondary">Details</a>
            <button class="btn-primary add-to-cart" data-id="${product.id}" ${product.stock <= 0 ? 'disabled' : ''}>
              ${product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
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

export function renderMainSlider(products) {
  sliderContainer.innerHTML = '';
  products.forEach((product) => {
    const template = `<div class="slide">
            <a href="product.html?id=${product.id}"><img src="${product.sliderImage}" alt="${product.name}" /></a>
          </div>`;
    sliderContainer.insertAdjacentHTML('afterbegin', template);
  });
}
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars);
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
