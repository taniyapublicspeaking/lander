const orb = document.getElementById("orb");
const surface = document.querySelector(".orb-surface");
const container = document.querySelector(".orb-background");

/* ========================================
   SETTINGS
   ========================================= */

const settings = {

    /* RANDOM MOVEMENT */
    moveDuration: 5000,

    /* VERTICAL-AXIS SPIN */
    spinSpeed: 45,

    /*
       How strongly the surface shifts.
       Higher = stronger Earth-like rotation.
    */
    surfaceSpeed: 85,

    /* PULSE */
    pulseAmount: 0.10,
    pulseDuration: 3000,

    /* EDGE SPACE */
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
   RANDOM TARGET
   ========================================= */

function chooseRandomTarget(time) {

    const width = container.clientWidth;
    const height = container.clientHeight;

    const orbWidth = orb.offsetWidth;
    const orbHeight = orb.offsetHeight;

    const maxX = Math.max(
        settings.edgePadding,
        width - orbWidth - settings.edgePadding
    );

    const maxY = Math.max(
        settings.edgePadding,
        height - orbHeight - settings.edgePadding
    );

    targetX =
        settings.edgePadding +
        Math.random() *
        Math.max(0, maxX - settings.edgePadding);

    targetY =
        settings.edgePadding +
        Math.random() *
        Math.max(0, maxY - settings.edgePadding);

    moveStartTime = time;
}


/* =========================================
   ANIMATION
   ========================================= */

function animate(time) {

    const delta =
        time - lastTime;

    lastTime = time;


    /* -----------------------------------------
       RANDOM MOVEMENT
       ----------------------------------------- */

    let progress =
        (time - moveStartTime) /
        settings.moveDuration;

    if (progress >= 1) {

        startX = targetX;
        startY = targetY;

        chooseRandomTarget(time);

        progress = 0;
    }

    const eased =
        easeInOut(progress);

    const x =
        startX +
        (targetX - startX) * eased;

    const y =
        startY +
        (targetY - startY) * eased;

    orb.style.left = `${x}px`;
    orb.style.top = `${y}px`;


    /* -----------------------------------------
       VERTICAL-AXIS EARTH ROTATION
       ----------------------------------------- */

    /*
       This is the important part.

       rotateY() rotates the sphere around
       its VERTICAL axis.

                 |
                 |
              -- O --
                 |
                 |

       Unlike rotate(), this does NOT spin
       the orb like a flat wheel.
    */

    const angle =
        (time / 1000) *
        settings.spinSpeed;

    /*
       Move the internal surface at the same
       time to make the rotation visually
       convincing.
    */

    surfacePosition +=
        settings.surfaceSpeed *
        (delta / 1000);

    surface.style.transform =
        `translateX(${-surfacePosition}px)`;


    /* -----------------------------------------
       PULSE
       ----------------------------------------- */

    const pulseProgress =
        (time % settings.pulseDuration) /
        settings.pulseDuration;

    const pulse =
        Math.sin(
            pulseProgress *
            Math.PI * 2
        );

    const scale =
        1 +
        pulse * settings.pulseAmount;


    /* -----------------------------------------
       3D TRANSFORM
       ----------------------------------------- */

    orb.style.transform =
        `perspective(700px)
         rotateY(${angle}deg)
         scale(${scale})`;


    requestAnimationFrame(animate);
}


/* =========================================
   INITIALIZE
   ========================================= */

function initializeOrb() {

    const width = container.clientWidth;
    const height = container.clientHeight;

    const orbWidth = orb.offsetWidth;
    const orbHeight = orb.offsetHeight;

    const x =
        Math.max(
            0,
            (width - orbWidth) / 2
        );

    const y =
        Math.max(
            0,
            (height - orbHeight) / 2
        );

    orb.style.left = `${x}px`;
    orb.style.top = `${y}px`;

    startX = x;
    startY = y;

    targetX = x;
    targetY = y;

    chooseRandomTarget(
        performance.now()
    );
}


/* =========================================
   RESIZE
   ========================================= */

window.addEventListener("resize", () => {

    const maxX =
        Math.max(
            0,
            container.clientWidth -
            orb.offsetWidth -
            settings.edgePadding
        );

    const maxY =
        Math.max(
            0,
            container.clientHeight -
            orb.offsetHeight -
            settings.edgePadding
        );

    targetX =
        Math.min(targetX, maxX);

    targetY =
        Math.min(targetY, maxY);
});


/* =========================================
   START
   ========================================= */

initializeOrb();

requestAnimationFrame(animate);
