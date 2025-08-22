import { products } from '../database/products.js';
import { RES_PER_PAGE } from '../config.js';

const state = {
  products,
  filterProducts: products,
  numPages: Math.ceil(products.length / RES_PER_PAGE),
  currentPage: 1,
  search: '',
  filter: {
    min: undefined,
    max: undefined,
    rating: 0,
    category: [],
    brand: [],
    availability: '',
    sort: '',
  },
};
export function getAllProducts() {
  return products;
}
export function getAllProductsSlider() {
  return products.filter((p) => p.sliderImage);
}
export function getProduct(id) {
  return products.find((p) => p.id === +id);
}
export function getAllCategories() {
  return [...new Set(products.map((p) => p.category))].sort();
}
export function getAllBrands() {
  return [...new Set(products.map((p) => p.brand))].sort();
}
export function priceBounds() {
  return { min: Math.min(...products.map((p) => p.price)), max: Math.max(...products.map((p) => p.price)) };
}
export function setFilterProducts(products) {
  state.filterProducts = products;
  state.numPages = Math.ceil(state.filterProducts.length / RES_PER_PAGE);
}
export function getFilter() {
  return state.filter;
}
export function getFilterProducts() {
  return state.filterProducts;
}

export function setFilter(newFilter) {
  state.filter = newFilter;
}
export function getCurrentPage() {
  return state.currentPage;
}
export function setCurrentPage(pageNum) {
  state.currentPage = pageNum;
}
export function getNumPages() {
  return state.numPages;
}
export function getSearch() {
  return state.search;
}
export function setSearch(search) {
  state.search = search;
}
