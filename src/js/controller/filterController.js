import * as productModel from '../model/productModel.js';

import * as filterView from '../view/filterView.js';

export function init() {
  const state = productModel.getFilter();
  const categories = productModel.getAllCategories();
  const brands = productModel.getAllBrands();
  const bounds = productModel.priceBounds();
  filterView.render({ categories, brands, bounds, state });
  productModel.setFilter(getFilterData());
}

export function getFilterData() {
  const fd = new FormData(document.querySelector('#filterForm'));
  const filter = {
    minPrice: +fd.get('minPrice'),
    maxPrice: +fd.get('maxPrice'),
    minRating: fd.get('minRating'),
    category: fd.getAll('category'),
    brand: fd.getAll('brand'),
    sortBy: fd.get('sortBy'),
  };

  return filter;
}
export function filterProducts(products, state) {
  return products.filter((p) => {
    return (
      p.price >= state.minPrice &&
      p.price <= state.maxPrice &&
      (state.minRating === null || p.rating >= state.minRating) &&
      (state.category.length === 0 || state.category.includes(p.category)) &&
      (state.brand.length === 0 || state.brand.includes(p.brand))
    );
  });
}
