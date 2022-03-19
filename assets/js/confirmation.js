import * as index from "./index";

/************************************************************
 *******  RENDER ORDER STORAGE TO THE PAGE ******************
 ************************************************************/
function renderOrder() {
  let setOrder = document.getElementById("order");
  let orderStorage = localStorage.getItem("orderId");

  if (orderStorage == null) {
    // if orderStorage is null run this HTML
    setOrder.innerHTML =
      "Votre commande n'a pas été prise en compte, merci de vérifier a nouveau votre panier.";
  } else {
    // else run this HTML
    setOrder.innerHTML += `<p>Votre commande  N°:<br><span> ${orderStorage} </span><br>à bien été prise en compte !</p> <p>Prix total: ${index.priceToEuros(localStorage.getItem("totalPrice"))}`;
  }
}
renderOrder();
/************************************************************
 *******  CLEAR THE LOCAL STORAGE ON CLICK ******************
 ************************************************************/
function clearLocalStorage() {
  let button = document.querySelector("article a");
  button.addEventListener("click", () => {
    localStorage.clear(); // to clear the localStorage with the order id, on click in the <a>
    window.location = "../index.html";
  });
}
clearLocalStorage();
