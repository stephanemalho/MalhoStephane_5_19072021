// header behavior
const nav = document.querySelector("header"); 

window.addEventListener('scroll', (e) => {
    
  if (window.scrollY > 120 ) {
    nav.style.top = "-100px";
  } else {
    nav.style.top = 0;
  }
});
