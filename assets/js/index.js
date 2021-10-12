export let cartPourcent = 20; // renderCart percent Option
export let delivery = "Gratuite"; // renderCart delivery Option

export function priceToEuros(price) {
  price = price / 100;
  return price; // TO DIVIDE PRICE AND RETURNED IT TO DECIMAL EURO
}

export function getCart() {
  let cart = [];
  if (localStorage.getItem("cart") != null) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  return cart; // TO RETURN CART FROM LOCAL STORAGE
}

export function getCartQuantity() {
  let cart = [];
  if (localStorage.getItem("cart") != null) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }

  let totalQty = 0;

  cart.map((element) => {
    totalQty += element.qty;
  });

  return totalQty; // TO RETURN ALL QUANTITY OF element
}

// TO SELECT EACH ELEMENTS WITH THE CLASS NAMED "cart-qty"
export function updateCartQty() {
  let cartQty = document.getElementsByClassName("cart-qty");
  Array.from(cartQty).forEach((element) => {
    element.innerHTML = getCartQuantity(); // SHOW RESULT OF getCartQuantity IN EACH "cart-qty"
  });
}

updateCartQty(); // RUN THE FUNCTION

/*******************************************
 *********** GET PRICE WITH ****************
 *********** TAX INCLUDED ******************
 *******************************************/
export function getTotalCartTTC() {
  let cart = [];
  if (localStorage.getItem("cart") != null) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  let totalAmount = 0;
  cart.map((element) => {
    let calculElement = element.qty * element.price;
    totalAmount += calculElement;
  });
  return priceToEuros(totalAmount); 
}

/*******************************************
 *********** GET PRICE WITHOUT *************
 *********** TAX ***************************
 *******************************************/
export function getTotalCartHT(e) {
  // console.log(typeof e);
  let HTprice = getTotalCartTTC() * (e);
  let totalHT = getTotalCartTTC() - priceToEuros(HTprice);
  return totalHT;
  // return priceToEuros(HTprice);
}
