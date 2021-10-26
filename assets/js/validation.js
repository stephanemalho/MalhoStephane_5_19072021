let form = document.querySelector("#loginForm");
let btnForm = document.querySelector("button");
let regularStringsRegExp =
  "^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._-s]{5,60}$";

//redirect page form
let newLocation = "../assets/dist/confirmation.js";

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
// run checkIfRegExp in these 3 forms
form.city.addEventListener("change", function (element) {
  checkIfRegExp(
    "^(?:[A-Za-z ]{2,}(?:(.s|'ss|s?-s?|s)?(?=[A-Za-z]+))){1,2}(?:[A-Za-z]+)?$",
    element.target,
    "Ville invalide"
  );
});
form.name.addEventListener("change", function (element) {
  checkIfRegExp(regularStringsRegExp, element.target, "Nom invalide");
});
form.firstName.addEventListener("change", function (element) {
  checkIfRegExp(regularStringsRegExp, element.target, "Prénom invalide");
});
//^(?:[A-Za-z]{2,}(?:(\.\s|'s\s|\s?-\s?|\s)?(?=[A-Za-z]+))){1,2}(?:[A-Za-z]+)?$

/***************************************************
 ***************** Send values from ****************
 ************ Formular to local storage ************
 ***************************************************/
const getForm = () => {
  btnForm.addEventListener("click", (e) => {
    e.preventDefault();
    //Check if email and tel are ok before submit
    if (
      validEmail(form.email) &&
      validTel(form.tel) &&
      validPostalCode(form.postalCode)
    ) {
      const newLocal = btnForm.addEventListener.submit;
      newLocal;
      form.submit();
    } else {
      e.preventDefault(); // don't submit the form
    }
    // create object with form values
    const formValues = {
      name: document.querySelector("#name").value,
      firstName: document.querySelector("#firstName").value,
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
    small.style.display = "none";
    return true;
  } else {
    small.style.display = "inline";
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
    msg = "entrez un numéro de 10 chiffres (ou code pays sans 0)";
  }
  let small = inputTel.nextElementSibling;
  if (valid) {
    small.style.display = "none";
    return true;
  } else {
    small.style.display = "inline";
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
    small.style.display = "none";
    return true;
  } else {
    small.style.display = "inline";
    small.innerHTML = msg;
    small.style.color = "red";
    return false;
  }
}
/***********************************************
 ************ validation all *******************
 ************  regexp with   *******************
 ************  only strings  *******************
 ***********************************************/
function checkIfRegExp(regex, input, message) {
  let testRegex = new RegExp(regex).test(input.value);
  let small = input.nextElementSibling;

  if (testRegex) {
    small.innerHTML = " ";
    return true;
  } else {
    small.innerHTML = message;
    small.style.color = "red";
    return false;
  }
}

let defaultForm = true;
function changeDefaultForm(boolean) {
  defaultForm = boolean;
}
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("test1");
  //let btn = document.getElementsByClassName("btn-form-submit");
  changeDefaultForm(true);
  if (
    !checkIfRegExp(
      "^(?:[A-Za-z ]{2,}(?:(.s|'ss|s?-s?|s)?(?=[A-Za-z]+))){1,2}(?:[A-Za-z]+)?$",
      form.city,
      "Ville invalide"
    )
  ) {
    changeDefaultForm = false;
  }
  if (!checkIfRegExp("^[0-9]{5,5}$", form.postalCode, "code postal invalide")) {
    changeDefaultForm(false);
  }
  if (
    !checkIfRegExp(
      "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
      "g",
      form.email,
      "email invalide"
    )
  ) {
    changeDefaultForm(false);
  }
  if (
    !checkIfRegExp("^((+)33|0|0033)[1-9](d{2}){4}$", form.tel, "tel invalide")
  ) {
    changeDefaultForm(false);
  }
  if (changeDefaultForm) {
    //window.location = newLocation;
    document.getElementById("loginForm").onclick = function (e) {
    e.location.href = newLocation;
    };
    // function redirect()
    // {
    // window.location(newLocation);
    // }
    //redirect();
    this.submit();
    
    //Headers.location = newLocation;
    //window.location = newLocation;
  }
});

// function redirect() {
//   window.location(newLocation);
// }