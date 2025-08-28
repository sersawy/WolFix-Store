# 🛍️ WolFix Store

A modern, responsive **e-commerce website** for electronics and technology products. Built with **HTML, CSS, and Vanilla JavaScript (MVC pattern)**, it provides a clean, user-friendly interface with full shopping functionality.

🌐 **Live Demo:** [WolFix Store](https://wolfixstore.demo.sersawy.com/)

---

## 🚀 Features

### Core Functionality

- **Product Browsing** – Filter by category, price, rating, and brand
- **Search** – Real-time product search with suggestions
- **Shopping Cart** – Add, remove, and update product quantities
- **Authentication** – Login & Register system
- **Order Management** – View past orders & order details
- **Responsive Design** – Optimized for desktop, tablet, and mobile

### Pages

- `index.html` → Home page with product listings + filters
- `product.html` → Product details page
- `cart.html` → Shopping cart management
- `checkout.html` → Checkout process
- `order-confirmation.html` → Success page after order
- `orders.html` → Order history
- `login.html` → User login
- `register.html` → User registration
- `account.html` → Account settings & profile management
- `contact.html` → Contact form

---

## 🛠️ Technologies Used

- **HTML5** – Semantic markup
- **CSS3** – Flexbox, Grid, responsive utilities
- **JavaScript (ES6)** – MVC structure & dynamic features
- **Bootstrap 5** – UI components & responsive grid
- **Bootstrap Icons** – Icon set
- **LocalStorage** – Persist cart & user data

---

## 📁 Project Structure

```bash
src/
├── css/
│   └── style.css           # Main stylesheet
├── imgs/                   # Images (logo + product images)
├── js/
│   ├── controller/         # Handles business logic
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── checkoutController.js
│   │   ├── contactController.js
│   │   ├── filterController.js
│   │   ├── orderController.js
│   │   ├── paginationController.js
│   │   └── productController.js
│   │
│   ├── database/           # Dummy product database
│   │   └── products.js
│   │
│   ├── model/              # Data layer
│   │   ├── cartModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   │
│   ├── utils/              # Reusable helpers
│   │   ├── appError.js
│   │   └── helpers.js
│   │
│   ├── view/               # Handles UI rendering
│   │   ├── authView.js
│   │   ├── cartView.js
│   │   ├── checkoutView.js
│   │   ├── contactView.js
│   │   ├── filterView.js
│   │   ├── orderView.js
│   │   ├── paginationView.js
│   │   └── productView.js
│   │
│   ├── config.js           # Global configuration
│   └── script.js           # Entry point
│
├── index.html              # Home page
├── product.html            # Product detail page
├── cart.html               # Shopping cart page
├── checkout.html           # Checkout page
├── order-confirmation.html # Order success page
├── orders.html             # Orders history
├── login.html              # User login
├── register.html           # User registration
├── account.html            # Profile management
├── contact.html            # Contact form
├── 404.html                # Error page
└── site.webmanifest        # PWA manifest
```

---

## 🎨 Design Features

- **Primary Color:** `#feb451` (Orange)
- **Secondary:** `#262526` (Dark Gray)
- **Background:** White & Light Gray surfaces
- **UI Components:**
  - Responsive product grid
  - Filter sidebar with sliders
  - Product cards with hover effects
  - Toast notifications
  - Custom form elements

---

## 🔑 JavaScript Highlights

### 🛒 Cart Management

- `addToCart(productId, qty)`
- `removeFromCart(productId)`
- `updateCartCount()`
- `getCartTotal()`

### 🔎 Product Features

- `filterProducts()` – Apply filters
- `searchProducts(query)` – Real-time search
- `sortProducts(criteria)` – Sorting

### 👤 User Authentication

- `loginUser(email, password)`
- `registerUser(name, email, password)`
- `logoutUser()`

---

## 📱 Responsive Design

- **Desktop:** ≥ 992px
- **Tablet:** 768px – 991px
- **Mobile:** ≤ 767px

---

## 🔮 Future Enhancements

- Payment gateway integration
- Wishlist & product comparison
- User reviews & ratings
- Admin dashboard
- Email notifications
- Order tracking

---

## 📄 License

This project is for **educational purposes only**. Attribution is appreciated if used as reference.
