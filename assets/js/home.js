import * as index from "./index";

// HEADER BEHAVIOR
const nav = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 120) {
    nav.style.top = "-100px"; // unshow header
  } else {
    nav.style.top = 0; // show header
  }
});

/****************************************************
 ****************  GET PRODUCT  *********************
 ****************************************************/

async function getProducts(category) {
  try {
    const response = await fetch("http://localhost:3000/api/" + category); // response fetch the category value in localhost 3000 api
    const datas = await response.json(); // datas => makes response in Json format
    return datas; // return url with the category
  } catch (error) {
    return error;
  }
}

/****************************************************
 ********* RENDER PRODUCT IN HTML ******************
 ****************************************************/

function renderProducts(products, category) {
  let container = document.getElementById("container");
  let content = "";
  products.forEach((element) => {
    content +=
      `
        <article>
          <a href="./pages/product.html?category=` +
      category +
      `&id=` +
      element._id +
      `">
            <figure>
              <img
                src="` +
      element.imageUrl +
      `"
                alt="appareil photo ancien avec zoom"
              />
              <span>` +
      index.priceToEuros(element.price) +
      `</span>
              <figcaption>
                <h3>` +
      element.name +
      `</h3>
                <p>
                  ` +
      element.description +
      `
                </p>
              </figcaption>
            </figure>
          </a>
        </article>
        `;
  });
  container.innerHTML += content; // Add content variable with the current html content 
}
getProducts("cameras").then((result) => {
  renderProducts(result, "cameras");
});
