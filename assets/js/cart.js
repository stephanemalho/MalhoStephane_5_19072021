import * as index from "./index"; // IMPORT GLOBAL SYNTAX
import { getCart } from "./index"; // SPECIFIC IMPORT SYNTAX

/****************************************************
 ************* RENDER CART IN HTML ******************
 ****************************************************/
function renderCart() {
  let container = document.getElementById("container");
  let content = "";
  getCart().forEach((element) => {
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
      " €" +
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
  <table>
  <thead>
    <tr>
      <th>Résumé</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Articles</th>
      <td><span class="cart-qty">` +
    index.getCartQuantity() +
    `</span></td>
    </tr>
    <tr>
      <th>Livraison</th>
      <td>` +
    index.delivery +
    `</td>
    </tr>
    <tr>
      <th>TVA:</th>
      <td>` +
    index.cartPourcent +
    `%</td>
    </tr>
    <tr>
      <th>Total HT:</th>
      <td>` +
    index.getTotalCartHT(20) +
    " €" +
    `</td>
    </tr>
    <tr>
      <th>Total TTC:</th>
      <td>` +
    index.getTotalCartTTC() +
    " €" +
    `</td>
    </tr>
  </tbody>
  <tfoot >
    <th colspan="2">
      <img id="logo-table" src="../assets/img/Logo.png" alt="Logo de Orinoco" />
    </th>
  </tfoot>
</table>

    `;
  container.innerHTML += content;
}

renderAmount();
