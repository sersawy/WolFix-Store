import * as paginationView from '../view/paginationView.js';
import * as productModel from '../model/productModel.js';

import { RES_PER_PAGE } from '../config.js';

export function init() {
  const numPages = productModel.getNumPages();
  const currentPage = productModel.getCurrentPage();
  paginationView.render(numPages, currentPage);
}

export function getProductByPage(products, pageNum) {
  const numPages = productModel.getNumPages();
  const start = (pageNum - 1) * RES_PER_PAGE;
  const end = pageNum * RES_PER_PAGE;
  productModel.setCurrentPage(pageNum);
  paginationView.render(numPages, pageNum);
  return products.slice(start, end);
}
