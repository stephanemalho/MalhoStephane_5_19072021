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
  index.getCart().forEach((element, i) => {
    console.log(i);
    content +=
      `
        <article>
        <figure>
          <img src="` +
      element.imageUrl +
      `" alt="image 'test' appareil photo">
      <i data-id="` +
      i +
      `" class="far fa-trash-alt delete-item"></i>
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
            <p>Option de lentille: ` +
      element.optionValue +
      `</p>
            <form  class="box">
              <label for="quantity" title="quantité"
                >QTÉ
                <input
                  type="number"
                  placeholder="1"
                  value="` +
      element.qty +
      `"
                  min="1"
                  data-id= "` +
      i +
      `"
                  name="quantity"
                  id="quantity"
                />
              </label>
            </form>
        </figure>
      </article>

        `;
  });
  container.innerHTML += content;
}
renderCart(); // RUN THE FUNCTION

/****************************************************
 *************   MODIFY CART QTY   ******************
 *************     IN INPUT        ******************
 ****************************************************/

function changeInputQty(id, qty) {
  let cart = index.getCart();
  
  if (qty >= 1) {
    cart[id].qty = Number(qty);
    localStorage.setItem("cart", JSON.stringify(cart));
    
  }
  
  index.updateCartQty();
  
}

let input = document.querySelectorAll("#quantity");


input.forEach((element) => {
  element.addEventListener("change", (event) => {
    changeInputQty(event.target.dataset.id, event.target.value);
    setTimeout(() => {
      location.reload();
    }, 2000);
  });
  
});

changeInputQty();

/****************************************************
 ************* DELETE ONE ARTICLE *******************
 ****************************************************/
function deleteArticle() {
  let trashBtn = document.querySelectorAll(".delete-item");
  trashBtn.forEach((element) => {
    element.addEventListener("click", function () {
      let id = element.dataset.id;
      let cart = index.getCart();
      cart.splice(id, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    });
  });
}
deleteArticle();



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
      <td><span class="cart-qty">${index.getCartQuantity()}</span></td>
    </tr>
    <tr colspan="2">
      <th>Livraison:</th>
      <td>${index.delivery}</td>
    </tr>
    <tr colspan="2">
      <th>TVA:</th>
      <td>${index.cartPercent}%</td>
    </tr>
    <tr colspan="2">
      <th>Total HT:</th>
      <td>${index.priceToEuros(index.getTotalCartHT())}</td>
    </tr>
    <tr colspan="2">
      <th>Total TTC:</th>
      <td>${index.priceToEuros(index.getTotalCartTTC())}</td>
    </tr>
  </tbody>
  <tfoot>
      <tr>
        <th>
          <button class="clear" type="submit">Tout supprimer <i class="far fa-trash-alt delete-item"></i></button>
        </th>
      </tr>
  </tfoot>

    `;
  container.innerHTML += content;

  const clearBtn = document.querySelector(".clear");
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    location.reload();
  })
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
    //localStorage.setItem("formValues", JSON.stringify(formValues)); //make object in json format in the local storage
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
        throw new Error("Error with API. order not sent");
        //alert("une erreur est survenue");
      }
    })
    .then((value) => {
      localStorage.clear();
      localStorage.setItem("orderId", JSON.stringify(value.orderId));
    })
    .then(() => {
      window.location = newLocation; // redirect to the confirmation page
    })
    .catch(() => {
      alert("une erreur est survenue");
    });
};
