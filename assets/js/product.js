import * as index from "./index";
import { getCartQuantity } from "./index";

async function getProduct() {
  const url = new URL(window.location.href);
  let category = url.searchParams.get("category");
  let id = url.searchParams.get("id");
  try {
    const response = await fetch(
      "http://localhost:3000/api/" + category + "/" + id
    );
    const datas = await response.json();
    return datas;
  } catch (error) {
    return error;
  }
}
function renderProduct(product) {
  let container = document.getElementById("container");
  let content =
    `
  <div>
  <figure>
    <img
      src="` +
    product.imageUrl +
    `"
      alt="appareil photo ancien avec zoom"
    />
    <span>` +
    index.priceToEuros(product.price) +
    `</span>
    <figcaption>
      <h3>` +
    product.name +
    `</h3>
      <p>
      ` +
    product.description +
    `
      </p>
    </figcaption>
  </figure>
</div>
<div>
<fieldset>
  <legend>Caractéristiques du produit :</legend>
  <label for="choice">Faites un choix parmi la sélection</label>
  <select id="choice">
    ${product[getOptionsType()].map(
      (element) => `<option value="${element}">${element}</option>`
    )}
  </select>
</fieldset>
</div>
  `;

  document
    .getElementsByTagName("form")[0]
    .addEventListener("submit", function (e) {});
  container.innerHTML += content;
}

getProduct().then((result) => {
  renderProduct(result);
  document
    .getElementsByTagName("form")[0]
    .addEventListener("submit", function (e) {
      //stop propagation
      e.preventDefault();
      addToCard(result);
    });
});

function addToCard(product) {
  let cart = index.getCart();

  product.optionValue = document.getElementById("choice").value;
  product.qty = Number(document.getElementById("quantity").value);

  const isProduct = cart.find(
    (element) =>
      element._id === product._id && element.optionValue === product.optionValue
  );

  if (isProduct === undefined) {
    let newProduct = {
      _id: product._id,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      optionValue: product.optionValue,
      qty: product.qty,
    };
    cart.push(newProduct);
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    //sinon
    const newCart = cart.map((element) => {
      if (
        element._id === product._id &&
        element.optionValue === product.optionValue
      ) {
        element.qty = product.qty + isProduct.qty;
      }
      return element;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
  }
  document.getElementById("cart-qty").innerHTML = getCartQuantity();

  // Afficher un modal du panier au clic
  let modal = document.getElementById("checkCart");
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", false);
}
// Fermer le modal du panier
let btn = document.getElementById("close");
btn.addEventListener("click", (event) => {
  event.preventDefault();
  let modal = document.getElementById("checkCart");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", true);
});

function getOptionsType() {
  const url = new URL(window.location.href);
  let category = url.searchParams.get("category");

  if (category === "cameras") {
    return "lenses";
  }

  if (category === "teddies") {
    return "colors";
  }
}