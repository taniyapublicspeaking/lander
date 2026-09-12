/* ========================================
   FLOATING HEADER
======================================== */

.site-header {
    position: fixed;
    top: 18px;
    left: 0;
    right: 0;
    z-index: 9999;

    padding: 0 20px;
}

.header-inner {
    width: min(1200px, 100%);
    min-height: 70px;

    margin: 0 auto;
    padding: 10px 12px 10px 24px;

    display: flex;
    align-items: center;
    gap: 25px;

    background: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.65);
    border-radius: 18px;

    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.10);

    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);

    box-sizing: border-box;
}


/* ========================================
   LOGO
======================================== */

.logo {
    flex: 0 0 auto;

    color: #111;
    text-decoration: none;

    font-size: 18px;
    font-weight: 800;
    letter-spacing: 1.5px;
    white-space: nowrap;
}

.logo span {
    color: #e45b35;
    margin-left: 3px;
}


/* ========================================
   DESKTOP NAV
======================================== */

.main-nav {
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: clamp(15px, 2vw, 30px);
}

.main-nav a {
    position: relative;

    color: #222;
    text-decoration: none;

    font-size: 14px;
    font-weight: 600;

    white-space: nowrap;

    padding: 8px 0;
}

.main-nav a:not(.mobile-register)::after {
    content: "";

    position: absolute;
    left: 0;
    bottom: 2px;

    width: 0;
    height: 2px;

    background: #e45b35;
    border-radius: 5px;

    transition: width .25s ease;
}

.main-nav a:hover {
    color: #e45b35;
}

.main-nav a:hover::after {
    width: 100%;
}


/* ========================================
   REGISTER BUTTON
======================================== */

.desktop-register {
    flex: 0 0 auto;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-height: 44px;
    padding: 0 20px;

    color: #fff;
    background: #e45b35;

    border-radius: 12px;

    text-decoration: none;

    font-size: 14px;
    font-weight: 700;

    white-space: nowrap;

    transition: .25s ease;
}

.desktop-register:hover {
    background: #cf4825;
    transform: translateY(-2px);
}

.mobile-register {
    display: none !important;
}


/* ========================================
   HAMBURGER
======================================== */

.menu-toggle {
    display: none;

    width: 44px;
    height: 44px;

    flex: 0 0 44px;

    padding: 0;

    border: 0;
    border-radius: 10px;

    background: rgba(0, 0, 0, .06);

    cursor: pointer;

    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
}

.menu-toggle span {
    width: 21px;
    height: 2px;

    display: block;

    background: #222;
    border-radius: 5px;

    transition: .3s ease;
}


/* Hamburger → X */

.menu-toggle.active span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
}

.menu-toggle.active span:nth-child(2) {
    opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
}


/* ========================================
   TABLET / SMALL LAPTOP
======================================== */

@media (max-width: 1050px) {

    .header-inner {
        gap: 15px;
    }

    .main-nav {
        gap: 12px;
    }

    .main-nav a {
        font-size: 12px;
    }

    .desktop-register {
        padding: 0 14px;
        font-size: 13px;
    }
}


/* ========================================
   MOBILE
======================================== */

@media (max-width: 850px) {

    .site-header {
        top: 12px;
        padding: 0 12px;
    }

    .header-inner {
        position: relative;

        min-height: 64px;

        padding: 9px 10px 9px 18px;

        border-radius: 16px;
    }

    /* Logo */
    .logo {
        font-size: 16px;
    }

    /* Hide desktop button */
    .desktop-register {
        display: none;
    }

    /* Show hamburger */
    .menu-toggle {
        display: flex;
        margin-left: auto;
    }

    /* Mobile dropdown */
    .main-nav {
        position: absolute;

        top: calc(100% + 10px);
        left: 0;
        right: 0;

        width: 100%;

        padding: 10px;

        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;

        gap: 3px;

        background: rgba(255, 255, 255, .95);

        border: 1px solid rgba(255, 255, 255, .7);
        border-radius: 16px;

        box-shadow: 0 15px 40px rgba(0, 0, 0, .13);

        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);

        /* Closed state */
        opacity: 0;
        visibility: hidden;
        pointer-events: none;

        transform: translateY(-10px);

        transition:
            opacity .25s ease,
            transform .25s ease,
            visibility .25s ease;

        box-sizing: border-box;
    }

    /* Open state */
    .main-nav.active {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;

        transform: translateY(0);
    }

    /* Menu links */
    .main-nav a {
        display: flex;

        width: 100%;
        min-height: 48px;

        padding: 12px 14px;

        align-items: center;

        box-sizing: border-box;

        border-radius: 10px;

        font-size: 14px;
        font-weight: 600;

        white-space: normal;
    }

    .main-nav a:hover {
        background: rgba(228, 91, 53, .08);
        color: #e45b35;
    }

    .main-nav a::after {
        display: none !important;
    }

    /* Mobile register */
    .mobile-register {
        display: flex !important;

        justify-content: center;

        margin-top: 7px;

        color: #fff !important;
        background: #e45b35;

        font-weight: 700 !important;

        box-shadow: 0 5px 15px rgba(228, 91, 53, .2);
    }

    .mobile-register:hover {
        color: #fff !important;
        background: #cf4825 !important;
    }
}


/* ========================================
   VERY SMALL PHONES
======================================== */

@media (max-width: 400px) {

    .site-header {
        padding: 0 8px;
    }

    .header-inner {
        padding-left: 14px;
    }

    .logo {
        font-size: 14px;
        letter-spacing: 1px;
    }

    .menu-toggle {
        width: 42px;
        height: 42px;
        flex-basis: 42px;
    }

    .main-nav a {
        min-height: 46px;
        font-size: 13px;
    }
}


/* ========================================
   REDUCED MOTION
======================================== */

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        transition: none !important;
    }
}
