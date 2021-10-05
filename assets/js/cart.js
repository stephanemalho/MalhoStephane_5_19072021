import * as index from "./index";
import { getCart } from "./index";

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
      `</p>
            <p>` +
      element.description +
      `</p>
            <p>lenses</p>
            <form method="post" class="box">
              <label for="quantity" title="quantité"
                >QTÉ
                <input
                  type="number"
                  placeholder="1"
                  value="1"
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

renderCart();
