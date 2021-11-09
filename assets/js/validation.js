const city = "^([0-9]) ?([a-zA-Z,. ]{1,30})$";
const stringWithoutSpecials = "^([a-zA-ZÀ-ÿ-']{1,20})$";
const email =
  "^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
const postalCode = "^[0-9]{5}$";
const cellPhone = "^0[1-9]([-. ]?[0-9]{2}){4}$";
/****************************************************
 ************ Check if regExp are *******************
 ************      respected      *******************
 ****************************************************/
export function checkIfRegExp(regex, input, message) {
  let testRegex = new RegExp(regex).test(input.value);
  let small = input.nextElementSibling;
  if (testRegex) {
    small.innerHTML = "";
    input.style.border = "1px solid green";
    return true;
  } else {
    small.innerHTML = message;
    small.style.color = "red";
    input.style.border = "1px solid red";
    changeFormStatus(false);
    return false;
  }
}

let formStatus = true;
function changeFormStatus(boolean) {
  formStatus = boolean;
}
/*******************************************
 ********** valid rexgexp before ***********
 **********  sending formulary   ***********
 **********       values         ***********
 *******************************************/
export function validForm() {
  changeFormStatus(true);
  checkIfRegExp(email, document.getElementById("email"), "Email invalide");
  checkIfRegExp(
    stringWithoutSpecials,
    document.getElementById("city"),
    "ville invalide"
  );
  checkIfRegExp(
    city,
    document.getElementById("postalAddress"),
    "adresse invalide"
  );
  checkIfRegExp(
    postalCode,
    document.getElementById("postalCode"),
    "Code postal invalide"
  );
  checkIfRegExp(
    stringWithoutSpecials,
    document.getElementById("name"),
    "Nom invalide"
  );
  checkIfRegExp(
    stringWithoutSpecials,
    document.getElementById("firstName"),
    "Prénom invalide"
  );
  checkIfRegExp(
    cellPhone,
    document.getElementById("tel"),
    "Téléphone invalide"
  );
  return formStatus;
}
