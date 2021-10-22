let form = document.querySelector("#loginForm");
let btnForm = document.querySelector("button");

// Add event in email form
form.email.addEventListener("change", function () {
  validEmail(this);
});
// Add event in tel form
form.tel.addEventListener("change", function () {
  validTel(this);
});
// Add event in postal-code form
form.postalCode.addEventListener("change", function () {
  validPostalCode(this);
});
form.city.addEventListener("change", function () {
  validCity(this);
});

// export function runRegex(regex){

// }

/***************************************************
 ***************** Send values from ****************
 ************ Formular to local storage ************
 ***************************************************/
const getForm = () => {
  btnForm.addEventListener("click", (e) => {
    e.preventDefault();
    // create object with form values
    if(validEmail(form.email) && validTel(form.tel)) {
      const newLocal = btnForm.addEventListener.submit;
      newLocal;
      form.submit();
    } else {
      e.preventDefault();
    }
    const formValues = {
      name: document.querySelector("#name").value,
      firstName: document.querySelector("#first-name").value,
      PostalAdress: document.querySelector("#postal-adresse").value,
      city: document.querySelector("#city").value,
      PostalCode: document.querySelector("#postalCode").value,
      tel: document.querySelector("#tel").value,
      email: document.querySelector("#email").value,
    };
    localStorage.setItem("formValues", JSON.stringify(formValues));
  });
};
getForm();
/***********************************************
 ************ validation for *******************
 ************  Email regexp  *******************
 ***********************************************/
function validEmail(inputEmail) {
  // create Regexp for email
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  let testEmail = emailRegExp.test(inputEmail.value);
  //console.log(testEmail);
  let small = inputEmail.nextElementSibling;
  if (testEmail) {
    small.innerHTML = "Email valide";
    small.style.color = "green";
    return true;
  } else {
    small.innerHTML = "Email non valide";
    small.style.color = "red";
    return false;
  }
}
/***********************************************
 ************ validation for *******************
 ************   tel regexp   *******************
 ***********************************************/
function validTel(inputTel) {
  // create regexp for tel
  let msg;
  let valid = false;
  if (/[a-zA-Z-_]/.test(inputTel.value)) {
    msg = "Le numéro doit contenir uniquement des chiffres";
  } else if (/^((\+)33|0|0033)[1-9](\d{2}){4}$/.test(inputTel.value)) {
    msg = "Téléphone valide";
    valid = true;
  } else {
    msg = "entrez un numéro de 10 chiffres (ou +33 et 9 chiffres)";
  }
  let small = inputTel.nextElementSibling;
  if (valid) {
    small.innerHTML = msg;
    small.style.color = "green";
    return true;
  } else {
    small.innerHTML = msg;
    small.style.color = "red";
    return false;
  }
}

/***********************************************
 ************ validation for *******************
 ************   postalCode   *******************
 ************     regexp     *******************
 ***********************************************/
function validPostalCode(inputPostalCode) {
  //console.log(telRegExp);
  let msg;
  let valid = false;
  if (/[a-zA-Z-_]/.test(inputPostalCode.value)) {
    msg = "Le code postal doit contenir uniquement des chiffres";
  } else if (/^[0-9]{5,5}$/.test(inputPostalCode.value)) {
    msg = "Code postal valide";
    valid = true;
  } else {
    msg = "Le code postal doit contenir 5 chiffres";
  }
  let small = inputPostalCode.nextElementSibling;
  if (valid) {
    small.innerHTML = msg;
    small.style.color = "green";
    return true;
  } else {
    small.innerHTML = msg;
    small.style.color = "red";
    return false;
  }
}
/***********************************************
 ************ validation for *******************
 ************   City regexp  *******************
 ***********************************************/
function validCity(inputCity) {
  // create Regexp for email
  let cityRegExp = new RegExp(
    "^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$"
  );
  let testCity = cityRegExp.test(inputCity.value);
  //console.log(testEmail);
  let small = inputCity.nextElementSibling;
  if (testCity) {
    small.innerHTML = "Ville valide";
    small.style.color = "green";
    return true;
  } else {
    small.innerHTML = "Ville non valide";
    small.style.color = "red";
    return false;
  }
}
