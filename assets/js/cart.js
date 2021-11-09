import * as index from "./index"; // IMPORT GLOBAL SYNTAX
import { validForm } from "./validation";

let newLocation = "../pages/confirmation.html";

/****************************************************
 ************* RENDER CART IN HTML ******************
 ****************************************************/
function renderCart() {
  let container = document.getElementById("container");
  let content = "";
  if (index.getCart().length === 0) {
    emptyCart();
  }
  index.getCart().forEach((element) => {
    content +=
      `
        <article>
        <figure>
          <img src="` +
      element.imageUrl +
      `" alt="image 'test' appareil photo">
      <i class="far fa-trash-alt"></i>
          <figcaption>
            <h3>` +
      element.name +
      `</h3>
            <p>` +
      index.priceToEuros(element.price) +
      `</p>
            <p>` +
      element.description +
      `</p>
            <p>Option: ` +
      element.optionValue +
      `</p>
            <p>quantité:
              ` +
      element.qty +
      `
                </p>
              </label>
            </form>
          </figcaption>
        </figure>
      </article>

        `;
  });
  container.innerHTML += content;
}
renderCart(); // RUN THE FUNCTION

/****************************************************
 ************* DELETE CART IN HTML ******************
 ****************************************************/
function DeleteArticle() {
  let trashBtn = document.querySelectorAll(".fa-trash-alt");
  for (let i = 0; i < trashBtn.length; i++) {
    trashBtn[i].addEventListener("click", function () {
      
      
      //localStorage.removeItem("cart");
      //window.location= "../pages/cart.html"
      localStorage.removeItem("cart");
    });
  }
}

DeleteArticle();

/****************************************************
 ************* RENDER AMOUNT IN HTML ****************
 ****************************************************/
function renderAmount() {
  let container = document.getElementById("resume");
  let content =
    `
  
  <thead>
    <tr>
      <th>Résumé</th>
      
    </tr>
  </thead>
  <tbody>
    <tr colspan="2">
      <th>Articles:</th>
      <td><span class="cart-qty">` +
    index.getCartQuantity() +
    `</span></td>
    </tr>
    <tr colspan="2">
      <th>Livraison:</th>
      <td>` +
    index.delivery +
    `</td>
    </tr>
    <tr colspan="2">
      <th>TVA:</th>
      <td>` +
    index.cartPercent +
    `%</td>
    </tr>
    <tr colspan="2">
      <th>Total HT:</th>
      <td>` +
    index.priceToEuros(index.getTotalCartHT()) +
    `</td>
    </tr>
    <tr colspan="2">
      <th>Total TTC:</th>
      <td>` +
    index.priceToEuros(index.getTotalCartTTC()) +
    `</td>
    </tr>
  </tbody>
  <tfoot >
    <th colspan="2">
      <img id="logo-table" src="../assets/img/Logo.png" alt="Logo de Orinoco" />
    </th>
  </tfoot>


    `;
  container.innerHTML += content;
}

renderAmount();

// send this article in cart.html if cart is empty
function emptyCart() {
  let emptyMessage = `
    <article class="empty-page">
    <a href="../index.html" title="Cliquez pour voir les articles">
    <p><strong>Votre panier est vide.</strong></br>N'oubliez pas de séléctionner un article pour le voir apparaitre ici</p>
    <i class="far fa-sad-cry"></i></a>
    </article>
  `;
  document.querySelector("aside").style.display = "none"; // mask article and resume
  document.querySelector("h2").style.textAlign = "center"; // change h2 position
  //document.querySelector("#container");
  container.insertAdjacentHTML("beforeend", emptyMessage); // inser adjacent Html of emptyMessage() in the cart.html page
}

/***************************************************
 ***************** Send values from ****************
 ************ Formular to local storage ************
 ***************************************************/
export function submitCart() {
  if (validForm()) {
    /* if the form is valid */
    // create contact object and save it in local storage
    const formValues = {
      lastName: document.querySelector("#name").value,
      firstName: document.querySelector("#firstName").value,
      address: document.querySelector("#postalAddress").value,
      city: document.querySelector("#city").value,
      postalCode: document.querySelector("#postalCode").value,
      phone: document.querySelector("#tel").value,
      email: document.querySelector("#email").value,
    };
    localStorage.setItem("formValues", JSON.stringify(formValues)); //make object in json format in the local storage
    makeOrder(formValues);
  }
}
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  submitCart();
});

const makeOrder = (formValues) => {
  let cart = index.getCart();
  let productsToSend = [];
  cart.forEach((product) => {
    productsToSend.push(product._id);
  });
  let formatData = {
    contact: formValues,
    products: productsToSend,
  };
  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formatData),
  })
    .then((res) => {
      if (res.ok) {
        console.log(res.json);
        return res.json();
      } else {
        alert("une erreur est survenue");
      }
    })
    .then((value) => {
      localStorage.setItem("orderId", JSON.stringify(value.orderId));
    })
    .then(() => {
      window.location = newLocation; // redirect to the confirmation page
    });
};
