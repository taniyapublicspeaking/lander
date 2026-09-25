const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("mainNav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");

    const isOpen = nav.classList.contains("active");

    menuBtn.setAttribute("aria-expanded", isOpen);

});
