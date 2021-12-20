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
      "http://localhost:3000/api/" + category + "/" + id // return url with "category" value + its id
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
  let content = `
  <div>
  <figure>
    <img
      src="${product.imageUrl}"
      alt="appareil photo ancien avec zoom"
    />
    <span>${index.priceToEuros(product.price)}</span>
    <figcaption>
      <h3>${product.name}</h3>
      <p>
      ${product.description}
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
    .addEventListener("submit", function (e) { });
  container.innerHTML += content; // encrease the content with the current html in the named container section
}

getProduct().then((result) => {
  renderProduct(result);
  document
    .getElementsByTagName("form")[0]
    .addEventListener("submit", function (e) {
      e.preventDefault(); //stop propagation 
      addToCard(result);
    });
});

/****************************************************
 *************** TO ADD TO CARD *********************
 ****************************************************
 ****************************************************/

export const addToCard = (product) => {
  let cart = index.getCart();

  product.optionValue = document.getElementById("choice").value;
  product.qty = Number(document.getElementById("quantity").value);

  // check if product is defind on cart
  const isProduct = cart.find(
    (element) =>
      element._id === product._id && element.optionValue === product.optionValue
  );
  // if undefined add new product on cart
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
  //  else increase the new qty with isProduct.qty
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
  index.updateCartQty(); // RUN IMPORTED FUNCTION FROM index.js
  toggleModal("open");
};
let btn = document.getElementById("close");
btn.addEventListener("click", (event) => {
  // close modal on click
  event.preventDefault();
  toggleModal("close");
});

/****************************************************
 *************** MODAL FUNCTION  ********************
 ****************************************************/
function toggleModal(toDo) {
  let modal = document.getElementById("checkCart");
  if (toDo === "open") {
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", false); // show modal
  }
  if (toDo === "close") {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", true); // hide modal
  }
}

export const getOptionsType = () => {
  const url = new URL(window.location.href);
  let category = url.searchParams.get("category");
  if (category === "cameras") {
    return "lenses"; // return lenses of the category
  }
};
