const renderOrder = () => {
  let setOrder = document.getElementById("order");
  let orderStorage = localStorage.getItem("orderId");

  if (orderStorage == null) {
    setOrder.innerHTML =
      "Votre commande n'a pas été prise en compte, merci de vérifier a nouveau votre panier.";
  } else {
    setOrder.innerHTML = `Merci<br>Votre commande N°:<br><span> ${orderStorage} </span><br>à bien été prise en compte !`;
  }
};
renderOrder();

function clearLocalStorage() {
  let button = document.querySelector("article a");
  button.addEventListener("click", () => {
    localStorage.clear();
    window.location = "../index.html";
  })
}
clearLocalStorage();
