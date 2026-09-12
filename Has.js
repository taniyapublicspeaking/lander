<script>
document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    // Mobile menu toggle
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.classList.toggle("active");

        mainNav.classList.toggle("active", isOpen);

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });


    // Close menu when a navigation link is clicked
    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");
            mainNav.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });
    });


    // Add scrolled state
    const updateHeader = () => {
        header.classList.toggle("scrolled", window.scrollY > 20);
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    // Close menu if screen becomes desktop-sized
    window.addEventListener("resize", () => {

        if (window.innerWidth > 800) {
            menuToggle.classList.remove("active");
            mainNav.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }

    });

});
</script>
