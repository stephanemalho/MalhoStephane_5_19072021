export function priceToEuros(price) {
  price = price / 100;
  return price + "€";
}
export function getCart() {
  let cart = [];
  if (localStorage.getItem("cart") != null) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  return cart;
}

// export function getCartQuantity() {
//   let cart = [];
//   if (localStorage.getItem("cart") != null) {
//     cart = JSON.parse(localStorage.getItem("cart"));
//   }
//   let totalQty = 0;
//   for( let e = 0; e < cart.length ; e++ ) {
//     totalQty += cart[e].qty;
//   }
//   // cart.map((element) => {
//   //   totalQty += element.qty;
//   // });
//   return totalQty
// }
export function getCartQuantity() {
  let cart = [];
  if (localStorage.getItem("cart") != null) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }

  let totalQty = 0;

  cart.map((element) => {
    totalQty += element.qty;
  });

  return totalQty;
}

document.getElementById("cart-qty").innerHTML = getCartQuantity();
