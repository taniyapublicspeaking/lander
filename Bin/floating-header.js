(function () {
  "use strict";

  const header = document.getElementById("floatingHeader");
  const menu = document.getElementById("floatingMenu");
  const nav = document.getElementById("floatingNav");

  // Stop if the header isn't present
  if (!header) {
    return;
  }


  /* =========================
     Scroll State
     ========================= */

  function handleScroll() {
    if (window.scrollY > 30) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  // Set initial state
  handleScroll();


  /* =========================
     Mobile Menu
     ========================= */

  if (menu && nav) {

    menu.addEventListener("click", function () {

      const isOpen =
        menu.classList.toggle("is-open");

      nav.classList.toggle("is-open", isOpen);

      menu.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menu.setAttribute(
        "aria-label",
        isOpen
          ? "Close menu"
          : "Open menu"
      );
    });


    /* =========================
       Close After Navigation
       ========================= */

    nav.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {

        menu.classList.remove("is-open");

        nav.classList.remove("is-open");

        menu.setAttribute(
          "aria-expanded",
          "false"
        );

        menu.setAttribute(
          "aria-label",
          "Open menu"
        );
      });

    });


    /* =========================
       Close When Clicking Outside
       ========================= */

    document.addEventListener("click", function (event) {

      if (
        !header.contains(event.target) &&
        nav.classList.contains("is-open")
      ) {

        menu.classList.remove("is-open");

        nav.classList.remove("is-open");

        menu.setAttribute(
          "aria-expanded",
          "false"
        );

        menu.setAttribute(
          "aria-label",
          "Open menu"
        );
      }

    });

  }

})();
