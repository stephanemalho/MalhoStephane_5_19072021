const renderOrder = () => {
  let setOrder = document.getElementById("order");
  let orderStorage = localStorage.getItem("orderId");

  if (orderStorage == null) { // if orderStorage is null run this HTML
    setOrder.innerHTML =
      "Votre commande n'a pas été prise en compte, merci de vérifier a nouveau votre panier.";
  } else { // else run this HTML
    setOrder.innerHTML = `Merci<br>Votre commande N°:<br><span> ${orderStorage} </span><br>à bien été prise en compte !`;
  }
};
renderOrder();

const clearLocalStorage = () => {
  let button = document.querySelector("article a");
  button.addEventListener("click", () => { // function to clear the localStorage with the order id, on click in the <a>
    localStorage.clear();
    window.location = "../index.html";
  })
}
clearLocalStorage();
