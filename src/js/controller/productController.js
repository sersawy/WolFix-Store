import * as productModel from '../model/productModel.js';

import * as productView from '../view/productView.js';

import * as paginationController from './paginationController.js';
import * as filterController from './filterController.js';
import * as cartController from './cartController.js';

import { RES_PER_PAGE } from '../config.js';

export function init() {
  const products = productModel.getAllProducts();
  productView.render(products.slice(0, RES_PER_PAGE), products.length);
  paginationController.init();
  filterController.init();
  cartController.init();
  handelAllListener();
}

export function handelAllListener() {
  document.querySelector('#filterForm').addEventListener('change', handelClickFilter);
  document.querySelector('.paginationContainer').addEventListener('click', handelClickPagination);
  document.querySelector('#searchInput').addEventListener('input', handelSearch);
  document.getElementById('productsContainer').addEventListener('click', handelAddToCart);
}

function handelClickFilter() {
  const filter = filterController.getFilterData();
  productModel.setFilter(filter);
  const allProducts = productModel.getAllProducts();
  productModel.setFilterProducts(filterController.filterProducts(allProducts, filter));
  const productsByPage = paginationController.getProductByPage(productModel.getFilterProducts(), 1);
  productView.render(productsByPage, productModel.getFilterProducts().length);
  filterController.init();
}

function handelClickPagination(e) {
  const btn = e.target.closest('.page-item');
  if (!btn) return;
  const nextPage = +btn.dataset.numPage;
  const products = paginationController.getProductByPage(productModel.getFilterProducts(), nextPage);
  productView.render(products, productModel.getFilterProducts().length);
}

function handelSearch() {
  const search = document.querySelector('#searchInput').value.toLowerCase();
  const filter = productModel.getFilter();
  productModel.setFilterProducts(filterController.filterProducts(productModel.getAllProducts(), filter));
  if (search) {
    const newProducts = productModel.getFilterProducts().filter((p) => p.name.toLowerCase().includes(search));
    productModel.setFilterProducts(newProducts);
  }
  const productsByPage = paginationController.getProductByPage(productModel.getFilterProducts(), 1);
  productView.render(productsByPage, productModel.getFilterProducts().length);
  filterController.init();
}

function handelAddToCart(e) {
  const btn = e.target.closest('.add-to-card');
  if (!btn) return;
  const productId = +btn.dataset.id;
  cartController.addToCart(productModel.getProduct(productId));
}
