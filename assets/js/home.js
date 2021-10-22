import * as index from "./index";

// HEADER BEHAVIOR
const nav = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 120) {
    nav.style.top = "-100px"; // UNSHOW HEADER
  } else {
    nav.style.top = 0; // SHOW HEADER
  }
});

/****************************************************
 ****************  GET PRODUCT  *********************
 ****************************************************/

async function getProducts(category) {
  try {
    const response = await fetch("http://localhost:3000/api/" + category); // RESPONSE => FETCH THE CATEGORY IN API LOCALHOST 3000
    const datas = await response.json(); // DATAS => MAKE RESPONSE IN json FORMAT
    console.log(datas);
    return datas;
  } catch (error) {
    console.log(error);
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
  container.innerHTML += content; // ADD CONTENT WITH ITS CONTAINER INNERHTML
}
getProducts("cameras").then((result) => {
  renderProducts(result, "cameras");
});
