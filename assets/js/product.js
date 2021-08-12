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
  <article>
  <a href="../pages/cart.html">
    <figure>
      <img
        src="../assets/img/appareil-vintage.jpg"
        alt="appareil photo ancien avec zoom"
      />
      <span>500centimes</span>
      <figcaption>
        <h3>Titre</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
          saepe optio pariatur, ea nemo aperiam.
        </p>
      </figcaption>
    </figure>
  </a>
</article>
<article>
  <fieldset>
    <legend>Caractéristiques du produit :</legend>
    Faites un choix parmi la sélection
    <select>
      <option value="" selected>"3.5mm 1.4"</option>
      <option value="">"50mm 1.6"</option>
    </select>
  </fieldset>
</article>
  `;
}
getProduct().then((result) => {
  renderProduct(result);
});
