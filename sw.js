self.addEventListener('install', (event) => {
  console.log('serviceWorker is installed');

  event.waitUntil(
    caches
      .open('wolfix_cash')
      .then((cash) =>
        cash.addAll([
          '/',
          './src/css/style.css',
          '/404.html',
          '/account.html',
          '/cart.html',
          '/checkout.html',
          '/contact.html',
          '/login.html',
          '/order-confirmation.html',
          '/orders.html',
          '/product.html',
          '/register.html',
        ])
      )
  );
});
self.addEventListener('active', () => console.log('serviceWorker is activated'));
self.addEventListener('fetch', () => console.log('serviceWorker is fetched'));
