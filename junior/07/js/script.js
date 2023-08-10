const hamburger = document.querySelectorAll(".menu-hamburger");
const menuSidebar = document.querySelector(".sidebar");

function toggleActiveClass() {
  menuSidebar.classList.toggle("active");
  document.body.classList.toggle("active");
}

hamburger.forEach(element => element.addEventListener("click", toggleActiveClass));