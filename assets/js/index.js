export let cartPercent = 20; // renderCart percent Option
export let delivery = "Gratuite"; // renderCart delivery Option

export const priceToEuros = (price) => {
  price = price / 100;
  return price + " €"; // TO DIVIDE PRICE AND RETURNED IT TO DECIMAL EURO
}

export const getCart = () => {
  let cart = [];
  if (localStorage.getItem("cart") != null) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  return cart; // TO RETURN CART FROM LOCAL STORAGE
}

export const getCartQuantity = () => {
  let cart = [];
  if (localStorage.getItem("cart") != null) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }

  let totalQty = 0;

  cart.map((element) => {
    totalQty += element.qty;
  });

  return totalQty; // TO RETURN ALL QUANTITY OF THE CART
}

/*******************************************
 *********** TO UPDATE CART ****************
 ***********    QUANTITY    ****************
 *******************************************/
export const updateCartQty = () => {
  let cartQty = document.getElementsByClassName("cart-qty");// TO SELECT EACH ELEMENTS WITH THE CLASS NAMED "cart-qty"
  Array.from(cartQty).forEach((element) => {
    element.innerHTML = getCartQuantity(); // SHOW RESULT OF getCartQuantity IN EACH "cart-qty"
  });
}

updateCartQty(); // RUN THE FUNCTION

/*******************************************
 *********** GET PRICE WITH ****************
 *********** TAX INCLUDED ******************
 *******************************************/
export const getTotalCartTTC = () => {
  let cart = [];
  if (localStorage.getItem("cart") != null) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  let totalAmount = 0;
  cart.map((element) => {
    let calculTotalElement = element.qty * element.price;
    totalAmount += calculTotalElement;
  });
  return totalAmount;
}

/*******************************************
 *********** GET PRICE WITHOUT *************
 *********** TAX ***************************
 *******************************************/
export const getTotalCartHT = () => {
  return getTotalCartTTC() - getTotalCartTTC() * (cartPercent / 100);
}
export const addToCart = () => {
  throw new Error("Function not implemented.");
}

export const updateCartInfo = () => {
  updateCartQty();
  document.getElementById("total-ht").innerHTML = priceToEuros(getTotalCartHT());
  document.getElementById("total-ttc").innerHTML = priceToEuros(getTotalCartTTC());
}