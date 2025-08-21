import * as authController from './controller/authController.js';
import * as productController from './controller/productController.js';
import * as cartController from './controller/cartController.js';
import * as orderController from './controller/orderController.js';
import { handelScrollUp } from './utils/helpers.js';
document.getElementById('year').textContent = new Date().getFullYear();
handelScrollUp();
const checkLogin = authController.checkLogin();
if (location.pathname.includes('login.html')) {
  if (!checkLogin) authController.login();
}
if (location.pathname.includes('register.html')) {
  if (!checkLogin) authController.registration();
}
if (location.pathname.includes('index.html') || location.pathname === '/') {
  productController.init();
}
if (location.pathname.includes('cart.html')) {
  cartController.handelPage();
}
if (location.pathname.includes('orders.html')) {
  orderController.init();
}

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const maxSlides = slides.length - 1;
const btnSlideRight = document.querySelector('.slider__btn--right');
const btnSlideLeft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');
const createDots = () =>
  slides.forEach((_, i) =>
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  );
createDots();
const dots = document.querySelectorAll('.dots__dot');
const goToSlide = (slide) => {
  dots.forEach((dot) => dot.classList.remove('dots__dot--active'));
  // dots[slide].classList.add('dots__dot--active');

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
btnSlideRight.addEventListener('click', nextSlide);
btnSlideLeft.addEventListener('click', previousSlide);
const btnKeySlideHandelr = function (entries, observe) {
  if (entries[0].isIntersecting) {
    document.addEventListener('keydown', btnKeySlideHandelrForListhener);
  } else document.removeEventListener('keydown', btnKeySlideHandelrForListhener);
};
const btnKeySlideObserver = new IntersectionObserver(btnKeySlideHandelr, {
  root: null,
  threshold: 0,
});
btnKeySlideObserver.observe(slider);
dotContainer.addEventListener('click', (dot) => {
  if (dot.target.classList.contains('dots__dot')) {
    goToSlide(Number(dot.target.dataset.slide));
  }
});
