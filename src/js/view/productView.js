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
  const priceDetails = getPriceDetails(product);

  const discount = priceDetails.sale ? `${priceDetails.sale}% OFF` : '';
  const currentPrice = `$${priceDetails.currentPrice}`;
  const originalPrice = priceDetails.currentPrice == priceDetails.originalPrice ? '' : `$${priceDetails.originalPrice}`;
  return `
    <div class="col-sm-6 col-xl-4 col-xxl-3">
      <div class="product-card card h-100">
        <div class="product-image">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          ${product.sale ? '<span class="product-badge">Sale</span>' : ''}
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
          <div class="product-price">
            <span>${currentPrice}</span>
            <span class="original-current-price">${originalPrice}</span>
            <span class="discount-badge">${discount}</span>
          </div>
          <div class="product-actions">
            <a href="product.html?id=${product.id}" class="btn-outline-secondary">Details</a>
            <button class="btn-primary btn-add-to-cart add-to-cart" data-id="${product.id}">Add to Cart</button>
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
    productsContainer.insertAdjacentHTML('beforeend', template);
  });
  productsCount.textContent = `${total} result${total !== 1 ? 's' : ''}`;
}

export function renderMainSlider(products) {
  sliderContainer.innerHTML = '';
  products.forEach((product) => {
    const template = `<div class="slide">
            <a href="product.html?id=${product.id}"><img src="${product.sliderImage}" alt="${product.name}" /></a>
          </div>`;
    sliderContainer.insertAdjacentHTML('beforeend', template);
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

export function renderDetails(product, relatedProducts) {
  document.title = `${product.name} - WolFix Store`;
  document.querySelectorAll('.product-name').forEach((e) => (e.textContent = product.name));
  document.querySelector('.product-detail-brand').textContent = product.brand;
  document.querySelectorAll('.product-category-name').forEach((e) => (e.textContent = product.category));
  const productMainImg = document.querySelector('.product-main-image');
  productMainImg.src = product.image;
  productMainImg.alt = product.name;
  if (product.sale) document.querySelector('.badge-sale').hidden = false;
  if (product.newArrival) document.querySelector('.product-badge-new').hidden = false;
  const thumbnailsContainer = document.querySelector('.product-thumbnails');
  product.thumbnails.forEach((img, index) => {
    const template = generateImgThumbnailTemplate(img, product.name, index);

    thumbnailsContainer.insertAdjacentHTML('beforeend', template);
  });
  document.querySelector('.rating-detail-stars').textContent = generateStars(product.rating);
  document.querySelector('.rating-detail-value').textContent = product.rating;
  document.querySelector('.rating-detail-count').textContent = `(${product.reviews.length} review${
    product.reviews.length !== 1 ? 's' : ''
  })`;
  const priceDetails = getPriceDetails(product);

  document.querySelector('.discount-badge').textContent = priceDetails.sale ? `${priceDetails.sale}% OFF` : '';
  document.querySelector('.current-price').textContent = `$${priceDetails.currentPrice}`;
  document.querySelector('.original-price').textContent =
    priceDetails.currentPrice == priceDetails.originalPrice ? '' : `$${priceDetails.originalPrice}`;
  document.querySelector('.product-description').textContent = product.desc;
  document.querySelector('.product-detail-meta').innerHTML = Object.entries(product.metaItems)
    .map((o) => generateMetaItemTemplate(o[0], o[1]))
    .join('');
  document.querySelector('.product-tags').innerHTML = product.tags
    .map((tag) => ` <span class="product-tag">${tag}</span>`)
    .join('');
  document.querySelector('.btn-add-cart').dataset.id = product.id;
  document.querySelector('.specs-grid').innerHTML = Object.entries(product.specItems)
    .map((o) => generateSpecItemTemplate(o[0], o[1]))
    .join('');
  document.querySelector('.reviews-container').innerHTML = product.reviews.map(generateReviewTemplate).join('');
  document.querySelector('.related-products').innerHTML = relatedProducts.map(generateRelatedProductTemplate).join('');
  // productsContainer.innerHTML = '';
  // products.forEach((product) => {
  //   const template = generateTemplate(product);
  //   productsContainer.insertAdjacentHTML('beforeend', template);
  // });
}

function getPriceDetails(product) {
  return {
    currentPrice: ((product.price * (100 - product.sale)) / 100).toFixed(2),
    originalPrice: product.price.toFixed(2),
    sale: product.sale,
  };
}

function generateImgThumbnailTemplate(img, name, index) {
  return `<img
              src="${img}"
              alt="${name}"
              class="product-thumbnail ${index === 0 ? 'active' : ''}"
            />`;
}
function generateMetaItemTemplate(key, value) {
  return ` <div class="meta-item">
              <span class="meta-label">${key}</span>
              <span class="meta-value">${value}</span>
            </div>`;
}
function generateSpecItemTemplate(key, value) {
  return ` <div class="spec-item">
              <span class="spec-name">${key}</span>
              <span class="spec-value">${value}</span>
            </div>`;
}
function generateReviewTemplate(review) {
  return `<div class="review-item">
          <div class="review-header">
            <div>
              <div class="reviewer-name">${review.name}</div>
              <div class="review-date">${review.date}</div>
            </div>
            <div class="review-rating">${generateStars(review.rating)}</div>
          </div>
          <p class="review-text">${review.review}</p>
        </div>`;
}
function generateRelatedProductTemplate(product) {
  return `<a class="text-reset text-decoration-none" href="product.html?id=${product.id}"><div class="related-product">
            <img src="${product.image}" alt="${product.name}" class="related-product-image" />
            <div class="related-product-info">
              <div class="related-product-title">${product.name}</div>
              <div class="related-product-price">$${((product.price * (100 - product.sale)) / 100).toFixed(2)}</div>
            </div>
          </div></a>`;
}
