export let cartPercent = 20; // renderCart percent Option
export let delivery = "Gratuite"; // renderCart delivery Option

/****************************************************************
 ******** CONVERT PRICE FROM CENTS TO EURO **********************
 ****************************************************************/
export const priceToEuros = (price) => {
  price = price / 100;
  return price + " €"; // return a decimal number and add euro symbol
};

/*****************************************************************
 ********** GET CART ON LOCAL STORAGE AND RETURN   ***************
 ****************** RETURN THE CONTENT  **************************
 *****************************************************************/
export const getCart = () => {
  let cart = [];
  if (localStorage.getItem("cart") != null) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  return cart; // return cart with its array content
};

/*****************************************************************
 ********** GET SUM OF ALL PRODUCT IN CART QTY  ******************
 *****************************************************************/
export const getCartQuantity = () => {
  let cart = []; // starting with empty array
  if (localStorage.getItem("cart") != null) {
    cart = JSON.parse(localStorage.getItem("cart")); // parse the content of "cart" to the cart array
  }

  let totalQty = 0; // variable start to zero (0)

  cart.map((element) => {
    //  .map to copy the array
    totalQty += element.qty; // encrease the new quantity with "element.qty" in the array
  });

  return totalQty; // to return the total quantities of the cart
};

/*******************************************
 *********** TO SHOW THE QTY  **************
 ***********  IN THE BASKET   **************
 ***********  TO EACH HEADER  **************
 *******************************************/
export const updateCartQty = () => {
  let cartQty = document.getElementsByClassName("cart-qty"); //  to select each elements with the class named "cart-qty"
  Array.from(cartQty).forEach((element) => {
    element.innerHTML = getCartQuantity(); // show result of "getCartQuantity" in each "cart-qty" classes
  });
};

updateCartQty(); // RUN THE FUNCTION

/*******************************************
 *********** GET PRICE WITH ****************
 *********** TAX INCLUDED ******************
 *******************************************/
export const getTotalCartTTC = () => {
  let cart = [];
  if (localStorage.getItem("cart") != null) {
    cart = JSON.parse(localStorage.getItem("cart")); // same method as getCartQantity()
  }
  let totalAmount = 0;
  cart.map((element) => {
    let calculTotalElement = element.qty * element.price; // multiply quantity by its price
    totalAmount += calculTotalElement;
  });
  return totalAmount;
};

/*******************************************
 *********** GET PRICE WITHOUT *************
 *********** TAX ***************************
 *******************************************/
export const getTotalCartHT = () => {
  return getTotalCartTTC() - getTotalCartTTC() * (cartPercent / 100);
};

/*******************************************
 *********** UPDATE THE PRICE IN ***********
 *************    THE RESUME     ***********
 *******************************************/
export const updateCartInfo = () => {
  updateCartQty();
  document.getElementById("total-ht").innerHTML = priceToEuros(
    getTotalCartHT()
  );
  document.getElementById("total-ttc").innerHTML = priceToEuros(
    getTotalCartTTC()
  );
};
