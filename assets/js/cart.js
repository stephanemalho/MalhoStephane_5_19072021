import * as index from "./index"; // IMPORT GLOBAL SYNTAX
import { validForm } from "./validation";

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
            <form method="post" class="box">
              <label for="quantity" title="quantité"
                >Quantité: 
                <input
                  type="number"
                  placeholder="1"
                  value="` +
      element.qty +
      `"
                  min="1"
                  max="9"
                  name="quantity"
                  id="quantity"
                />
              </label>
            </form>
          </figcaption>
        </figure>
      </article>

        `;
  });
  container.innerHTML += content;
  // container.insertAdjacentHTML("beforeend", content);
}

renderCart(); // RUN THE FUNCTION

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

function emptyCart() {
  let emptyMessage = `
    <article class="empty-page">
    <a href="../index.html" title="Cliquez pour voir les articles">
    <p><strong>Votre panier est vide.</strong></br>N'oubliez pas de séléctionner un article pour le voir apparaitre ici</p>
    <i class="far fa-sad-cry"></i></a>
    </article>
  `;
  document.querySelector("aside").style.display = "none";
  document.querySelector("h2").style.textAlign = "center";
  //document.querySelector("#container");
  container.insertAdjacentHTML("beforeend", emptyMessage);
}

function submitCart () {
  validForm();
  
}
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  submitCart();
});