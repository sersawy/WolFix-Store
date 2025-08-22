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
  handelMainSlider();
}

export function handelAllListener() {
  document.querySelector('#filterForm').addEventListener('change', handelClickFilter);
  document.querySelector('.pagination-container').addEventListener('click', handelClickPagination);
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

function handelMainSlider() {
  const products = productModel.getAllProductsSlider();
  productView.renderMainSlider(products);

  const sliderContainer = document.querySelector('.sliderItems');
  const slides = document.querySelectorAll('.slide');
  const maxSlides = slides.length - 1;
  const dotContainer = document.querySelector('.dots');
  const createDots = () =>
    slides.forEach((_, i) =>
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    );
  createDots();
  const dots = document.querySelectorAll('.dots__dot');
  const goToSlide = (slide) => {
    dots.forEach((dot) => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide='${slide}']`).classList.add('dots__dot--active');
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  goToSlide(0);

  let currentSlide = 0;
  const previousSlide = () => {
    if (currentSlide === 0) currentSlide = maxSlides;
    else currentSlide--;
    goToSlide(currentSlide);
  };
  const nextSlide = () => {
    if (currentSlide === maxSlides) currentSlide = 0;
    else currentSlide++;
    goToSlide(currentSlide);
  };

  const btnKeySlideHandelrForListhener = function (e) {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      previousSlide();
    }
  };

  const btnKeySlideHandelr = function (entries, observe) {
    if (entries[0].isIntersecting) {
      document.addEventListener('keydown', btnKeySlideHandelrForListhener);
    } else document.removeEventListener('keydown', btnKeySlideHandelrForListhener);
  };
  const btnKeySlideObserver = new IntersectionObserver(btnKeySlideHandelr, {
    root: null,
    threshold: 0,
  });
  btnKeySlideObserver.observe(sliderContainer);
  dotContainer.addEventListener('click', (dot) => {
    if (dot.target.classList.contains('dots__dot')) {
      goToSlide(Number(dot.target.dataset.slide));
    }
  });
  setInterval(nextSlide, 5000);
}
