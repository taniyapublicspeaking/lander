<script>
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = mainNav.querySelectorAll("a");

menuToggle.addEventListener("click", function () {

    const isOpen = mainNav.classList.toggle("active");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
    );
});


/* Close menu when clicking a link */
navLinks.forEach(link => {

    link.addEventListener("click", function () {

        mainNav.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");

    });

});


/* Close when clicking outside */
document.addEventListener("click", function (event) {

    if (
        !event.target.closest(".header-inner") &&
        mainNav.classList.contains("active")
    ) {
        mainNav.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
    }

});


/* Close mobile menu when resizing back to desktop */
window.addEventListener("resize", function () {

    if (window.innerWidth > 850) {

        mainNav.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
    }

});
</script>
