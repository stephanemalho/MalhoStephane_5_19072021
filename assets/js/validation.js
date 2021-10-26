export const street = "^([0-9]) ?([a-zA-Z,. ])$";
export const stringWithoutSpecials = "^([a-zA-ZÀ-ÿ-']{1,20})$";
export const email =
  "^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
export const postalCode = "^[0-9]{5}$";
export const phone =
  "^(?:(?:+|00)33[s.-]{0,3}(?:(0)[s.-]{0,3})?|0)[1-9](?:(?:[s.-]?d{2}){4}|d{2}(?:[s.-]?d{3}){2})$";

export function checkIfRegExp(regex, input, message) {
  let testRegex = new RegExp(regex).test(input.value);
  let small = input.nextElementSibling;
   console.log(message);
  if (testRegex) {
    small.innerHTML = "";
    return true;
  } else {
    small.innerHTML = message;
    small.style.color = "red";
    return false;
  }
}

let formStatus = true;
function changeFormStatus (boolean) {
  formStatus = boolean;
}

export function validForm (form) {
  changeFormStatus(true);
  console.log(form);
  checkIfRegExp(email, document.getElementById("email").value, "email invalide" );

}

