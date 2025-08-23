import * as productModel from '../model/productModel.js';

import * as filterView from '../view/filterView.js';

export function init() {
  const state = productModel.getFilter();
  const categories = productModel.getAllCategories();
  const brands = productModel.getAllBrands();
  const bounds = productModel.priceBounds();
  filterView.render({ categories, brands, bounds, state });
  productModel.setFilter(getFilterData());
  addListenerFilter(bounds);
}

export function getFilterData() {
  const fd = new FormData(document.querySelector('#filterForm'));
  const filter = {
    minPrice: +fd.get('minPrice'),
    maxPrice: +fd.get('maxPrice'),
    minRating: fd.get('rating'),
    category: fd.getAll('category'),
    brand: fd.getAll('brand'),
    availability: fd.get('availability'),
  };
  filter.sort = document.getElementById('sortBy').value;

  return filter;
}
export function clearFilter() {
  document.getElementById('filterForm').reset();
  const state = productModel.getFilter();
  const categories = productModel.getAllCategories();
  const brands = productModel.getAllBrands();
  const bounds = productModel.priceBounds();
  filterView.render({ categories, brands, bounds, state });
  productModel.setFilter(getFilterData());
}
export function filterProducts(products, state) {
  const pro = products
    .filter((p) => {
      return (
        (!state.minPrice || p.price >= state.minPrice) &&
        (!state.maxPrice || p.price <= state.maxPrice) &&
        (!state.minRating || p.rating >= state.minRating) &&
        (!state.category?.length || state.category.includes(p.category)) &&
        (!state.brand?.length || state.brand.includes(p.brand)) &&
        (state.availability == 'all' || !state.availability || p[state.availability])
      );
    })
    .sort((a, b) => {
      if (state.sort === 'price_asc') return a.price - b.price;
      if (state.sort === 'price_desc') return b.price - a.price;
      if (state.sort === 'rating_desc') return b.rating - a.rating;
      if (state.sort === 'name_asc') return a.name.localeCompare(b.name);
      if (state.sort === 'name_desc') return b.name.localeCompare(a.name);
      return 0;
    });

  return pro;
}
function addListenerFilter(bounds) {
  const minSlider = document.getElementById('minPriceSlider');
  const maxSlider = document.getElementById('maxPriceSlider');
  const minInput = document.getElementById('minPrice');
  const maxInput = document.getElementById('maxPrice');
  minSlider.min = minInput.min = maxSlider.min = maxInput.min = bounds.min;
  minSlider.max = minInput.max = maxSlider.max = maxInput.max = bounds.max;
  minSlider.value = minInput.value = bounds.min;
  maxSlider.value = maxInput.value = bounds.max;
  minSlider.addEventListener('input', () => {
    if (+minSlider.value >= +maxSlider.value) maxSlider.value = +minSlider.value + 1;
    minInput.value = minSlider.value;
  });
  maxSlider.addEventListener('input', () => {
    if (+maxSlider.value <= +minSlider.value) minSlider.value = +maxSlider.value + 1;

    maxInput.value = maxSlider.value;
  });
  minInput.addEventListener('change', () => {
    minSlider.value = minInput.value;
  });

  maxInput.addEventListener('change', () => {
    maxSlider.value = maxInput.value;
  });
  document.querySelectorAll('.filter-search-input').forEach((input) => {
    input.addEventListener('input', handleFilterSearch);
  });
}

function handleFilterSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  const filterSection = e.target.closest('.filter-section');
  const filterOptions = filterSection.querySelectorAll('.filter-option');

  filterOptions.forEach((option) => {
    const text = option.querySelector('.option-text').textContent.toLowerCase();
    option.style.display = text.includes(searchTerm) ? 'flex' : 'none';
  });
}
