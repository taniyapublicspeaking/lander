const orb = document.getElementById("orb");
const surface = document.querySelector(".orb-surface");
const container = document.querySelector(".orb-background");

/* ========================================
   SETTINGS
   ========================================= */

const settings = {

    /* Random movement */
    moveDuration: 5000,

    /* Earth-like axial rotation */
    spinSpeed: 35,

    /* Surface movement speed */
    surfaceSpeed: 55,

    /* Pulse / expansion */
    pulseAmount: 0.10,
    pulseDuration: 3000,

    /* Distance from container edge */
    edgePadding: 10
};


/* =========================================
   MOVEMENT VARIABLES
   ========================================= */

let targetX = 0;
let targetY = 0;

let startX = 0;
let startY = 0;

let moveStartTime = performance.now();

let surfacePosition = 0;

let lastTime = performance.now();


/* =========================================
   EASING
   ========================================= */

function easeInOut(t) {

    return t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
}


/* =========================================
   RANDOM DESTINATION
   ========================================= */

function chooseRandomTarget(currentTime) {

    const containerWidth =
        container.clientWidth;

    const containerHeight =
        container.clientHeight;

    const orbWidth =
        orb.offsetWidth;

    const orbHeight =
        orb.offsetHeight;


    const maxX = Math.max(
        settings.edgePadding,
        containerWidth -
        orbWidth -
        settings.edgePadding
    );

    const maxY = Math.max(
        settings.edgePadding,
        containerHeight -
        orbHeight -
        settings.edgePadding
    );


    targetX =
        settings.edgePadding +
        Math.random() *
        Math.max(
            0,
            maxX - settings.edgePadding
        );


    targetY =
        settings.edgePadding +
        Math.random() *
        Math.max(
            0,
            maxY - settings.edgePadding
        );


    moveStartTime = currentTime;
}


/* =========================================
   MAIN ANIMATION
   ========================================= */

function animate(currentTime) {

    const deltaTime =
        currentTime - lastTime;

    lastTime = currentTime;


    /* =====================================
       RANDOM MOVEMENT
       ===================================== */

    let progress =
        (currentTime - moveStartTime) /
        settings.moveDuration;


    if (progress >= 1) {

        startX = targetX;
        startY = targetY;

        orb.style.left =
            `${startX}px`;

        orb.style.top =
            `${startY}px`;

        chooseRandomTarget(currentTime);

        progress = 0;
    }


    const easedProgress =
        easeInOut(progress);


    const currentX =
        startX +
        (targetX - startX) *
        easedProgress;


    const currentY =
        startY +
        (targetY - startY) *
        easedProgress;


    orb.style.left =
        `${currentX}px`;

    orb.style.top =
        `${currentY}px`;


    /* =====================================
       EARTH-LIKE AXIAL ROTATION
       ===================================== */

    surfacePosition +=
        settings.surfaceSpeed *
        (deltaTime / 1000);


    /*
       Move the internal surface horizontally.

       The repeating pattern means the surface
       appears to continuously travel around
       the sphere.
    */

    surface.style.transform =
        `translateX(${-surfacePosition}px)`;


    /* =====================================
       PULSE / EXPANSION
       ===================================== */

    const pulseProgress =
        (currentTime %
        settings.pulseDuration) /
        settings.pulseDuration;


    const pulse =
        Math.sin(
            pulseProgress *
            Math.PI *
            2
        );


    const scale =
        1 +
        pulse *
        settings.pulseAmount;


    /*
       Slight rotation around the Y axis gives
       the sphere an additional 3D feeling.
    */

    const rotation =
        (currentTime / 1000) *
        settings.spinSpeed;


    orb.style.transform =
        `perspective(500px)
         rotateY(${rotation}deg)
         scale(${scale})`;


    requestAnimationFrame(animate);
}


/* =========================================
   INITIALIZE
   ========================================= */

function initializeOrb() {

    const containerWidth =
        container.clientWidth;

    const containerHeight =
        container.clientHeight;

    const orbWidth =
        orb.offsetWidth;

    const orbHeight =
        orb.offsetHeight;


    const initialX =
        Math.max(
            0,
            (containerWidth - orbWidth) / 2
        );


    const initialY =
        Math.max(
            0,
            (containerHeight - orbHeight) / 2
        );


    orb.style.left =
        `${initialX}px`;

    orb.style.top =
        `${initialY}px`;


    startX = initialX;
    startY = initialY;

    targetX = initialX;
    targetY = initialY;


    chooseRandomTarget(
        performance.now()
    );
}


/* =========================================
   RESPONSIVE RESIZE
   ========================================= */

window.addEventListener(
    "resize",
    () => {

        const maxX = Math.max(
            0,
            container.clientWidth -
            orb.offsetWidth -
            settings.edgePadding
        );


        const maxY = Math.max(
            0,
            container.clientHeight -
            orb.offsetHeight -
            settings.edgePadding
        );


        targetX =
            Math.min(targetX, maxX);

        targetY =
            Math.min(targetY, maxY);
    }
);


/* =========================================
   START
   ========================================= */

initializeOrb();

requestAnimationFrame(animate);
