import * as index from "./index";

function getProduct() {
  const url = new URL(window.location.href);
  let category = url.searchParams.get("category");
  let id = url.searchParams.get("id");
  return fetch("http://localhost:3000/api/" + category + "/" + id)
    .then((response) => response.json())
    .then((datas) => {
      return datas;
    })
    .catch((error) => {
      return error;
    });
}
function renderProduct(product) {
  let container = document.getElementById("container");
  let content = `
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
    ${product.lenses.map((element) =>  `<option value="${element}">${element}</option>` )}
  </select>
</fieldset>
</div>
  `;
  container.innerHTML += content;
}

getProduct().then((result) => {
  renderProduct(result);
});

// select number value in the basket
function howManyArticles() {
  let quantity = document.getElementById("quantity").value;
  localStorage.setItem('number', quantity);
}
howManyArticles();







