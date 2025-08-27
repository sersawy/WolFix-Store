import * as cartModel from '../model/cartModel.js';

import * as checkoutView from '../view/checkoutView.js';

export function init() {
  checkoutView.render(cartModel.get(), cartModel.total());
  addListener();
}

function addListener() {
  document.querySelectorAll('.payment-method').forEach((method) => {
    method.addEventListener('click', function () {
      document.querySelectorAll('.payment-method').forEach((m) => {
        m.classList.remove('selected');
      });
      this.classList.add('selected');
    });
  });
  document.getElementById('placeOrderBtn').addEventListener('click', function () {
    const shippingForm = document.getElementById('shippingForm');
    const shippingInputs = shippingForm.querySelectorAll('input, select');
    let isValid = true;
    shippingInputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add('error-input');
        isValid = false;
      }
    });
    if (!cardNumber.value.trim()) {
      cardNumber.classList.add('error-input');
      isValid = false;
    }
    if (!expiryDate.value.trim()) {
      expiryDate.classList.add('error-input');
      isValid = false;
    }
    if (!cvv.value.trim()) {
      cvv.classList.add('error-input');
      isValid = false;
    }
    if (isValid) {
      this.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Processing...';
      this.disabled = true;

      setTimeout(() => {
        window.location.href = 'order-confirmation.html';
      }, 2000);
    }
  });
}
