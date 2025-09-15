# Shopping Cart App

A simple **React Native** shopping cart application that stores all data locally using `AsyncStorage`. It demonstrates a minimal but complete flow: product management (admin), adding products to a cart, and a cart view showing unit price, shipping, tax and total per item.

---

## Features

* Product listing (user view)
* Add / remove items to cart
* Cart view shows per-item: unit price, shipping price, tax price, total price
* Change item quantity from the cart (increment/decrement)
* Admin screen to add / edit / delete products
* All data persisted locally with `AsyncStorage` (no backend required)

---

## Environment

* Node: **v16**
* Java: **v11**
* React Native CLI (this project is not an Expo project)

---

## Quick start

1. Clone the repository:

```bash
git clone <https://github.com/damruravihara/shopping-cart-app.git>
cd shopping-cart-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the Metro bundler and install the app on an Android emulator / device:

```bash
npx react-native run-android
```

> Make sure you have Android SDK installed, emulator running (or device connected), and `JAVA_HOME` pointing to Java 11.

---
