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
    ${product[getOptionsType()].map((element) =>  `<option value="${element}">${element}</option>` )}
  </select>
</fieldset>
</div>
  `;


  document.getElementsByTagName('form')[0].addEventListener('submit', function(e){
    //stop propagation
    e.preventDefault();
    
     //si on a pas de cart dans le local storage alors je crée ma variable cart
    let cart={};
    if (localStorage.getItem('cart')!= null) {
      cart = JSON.parse(localStorage.getItem('cart'));
    } 
    

    //générate key
    
    let key = product.name +'-'+ document.getElementById("choice").value;
    key = key.replace(' ','-');
    console.log(cart);
    cart.forEach(product => {
      console.log(product);
    });

    product = {
      _id: product._id,
      id: key,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      optionValue: document.getElementById("choice").value,
      qty: Number(document.getElementById("quantity").value)
    };
    
    cart[key]=product;
    

    localStorage.setItem('cart', JSON.stringify(cart));
  });
  container.innerHTML += content;
}

getProduct().then((result) => {
  renderProduct(result);
});


function getOptionsType(){
  const url = new URL(window.location.href);
  let category = url.searchParams.get("category");

  if(category === "cameras"){
    return "lenses";
  }

  if(category === "teddies"){
    return "colors";
  }
}

document.addEventListener("DOMContentLoaded", function(event) {



// select number value in the basket
  function howManyArticles() {
    let quantity = document.getElementById("quantity").value;
    localStorage.setItem('number', quantity);
  }
  howManyArticles();

});





