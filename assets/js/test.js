let form = document.querySelector("#loginForm");
// Add event on change in email form and run checkIfRegExp 
form.email.addEventListener("change", function (element) {
  checkIfRegExp(
    email,
    element.target,
    "email invalide"
  );
});
// Add event on change in tel form and run checkIfRegExp 
form.tel.addEventListener("change", function (element) {
  checkIfRegExp(
    cellPhone,
    element.target,
    "Téléphone invalide"
  );
});
// Add event in on change postalCode form and run checkIfRegExp 
form.postalCode.addEventListener("change", function (element) {
  checkIfRegExp(
    postalCode,
    element.target,
    "Code postal invalide"
  );
});
// Add event in on change city form and run checkIfRegExp 
form.city.addEventListener("change", function (element) {
  checkIfRegExp(
    stringWithoutSpecials,
    element.target,
    "Ville invalide"
  );
});
// Add event in on change name form and run checkIfRegExp 
form.name.addEventListener("change", function (element) {
  checkIfRegExp(stringWithoutSpecials, element.target, "Nom invalide");
});
// Add event in on change firstName form and run checkIfRegExp 
form.firstName.addEventListener("change", function (element) {
  checkIfRegExp(stringWithoutSpecials, element.target, "Prénom invalide");
});

