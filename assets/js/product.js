import * as index from "./index";

/****************************************************
 ****************  GET PRODUCT  *********************
 ****************************************************/

async function getProduct() {
  const url = new URL(window.location.href);
  let category = url.searchParams.get("category");
  let id = url.searchParams.get("id");
  try {
    const response = await fetch(
      "http://localhost:3000/api/" + category + "/" + id // RETURN URL WITH category AND ITS id
    );
    const datas = await response.json();
    return datas;
  } catch (error) {
    return error;
  }
}

/****************************************************
 ********* RENDER PRODUCT IN HTML  ******************
 ****************************************************/

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
  container.innerHTML += content; // ADD CONTENT WITH CONTAINER INNERHTML
}

getProduct().then((result) => {
  renderProduct(result);
  document
    .getElementsByTagName("form")[0]
    .addEventListener("submit", function (e) {
      e.preventDefault(); //STOP PROPAGATION
      addToCard(result);
    });
});

/****************************************************
 *************** TO ADD TO CARD *********************
 ****************************************************
 ****************************************************/

export function addToCard(product) {
  let cart = index.getCart();

  product.optionValue = document.getElementById("choice").value;
  product.qty = Number(document.getElementById("quantity").value);

  // CHECK IF PRODUCT IS DEFIND ON CART
  const isProduct = cart.find(
    (element) =>
      element._id === product._id && element.optionValue === product.optionValue
  );
  // IF UNDEFINED ADD NEW PRODUCT ON CART
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
  }
  // ELSE INCREASE THE NEW QTY WITH isPRODUCT.qty
  else {
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
  // SHOW FUNCTION IN index.js
  index.updateCartQty();
  toggleModal("open");
}
let btn = document.getElementById("close"); // RUN MODAL ON CLIC
btn.addEventListener("click", (event) => {
  event.preventDefault();
  toggleModal("close");
});

/****************************************************
 *************** MODAL FUNCTION  ********************
 ****************************************************/
const toggleModal = (toDo) => {
  let modal = document.getElementById("checkCart");
  if (toDo === "open") {
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", false); // SHOW MODAL
  }
  if (toDo === "close") {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", true); // HIDE MODAL
  }
};

export function getOptionsType() {
  const url = new URL(window.location.href);
  let category = url.searchParams.get("category");
  if (category === "cameras") {
    return "lenses"; // RETURN LENSES OF CATEGORY
  }
}
