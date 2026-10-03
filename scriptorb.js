/* =========================================
   RANDOM MOVING ORB
   ========================================= */

const orb = document.getElementById("orb");
const container = document.querySelector(".orb-background");

/* CUSTOMIZABLE SETTINGS */
const settings = {
    moveDuration: 5000,   // milliseconds
    spinSpeed: 20,        // degrees per second
    pulseAmount: 0.12,    // 0.12 = 12% expansion
    pulseDuration: 3000,  // milliseconds
    edgePadding: 10       // pixels
};

let targetX = 0;
let targetY = 0;
let startX = 0;
let startY = 0;
let moveStartTime = performance.now();
let rotation = 0;
let lastTime = performance.now();

function easeInOut(t) {
    return t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function chooseRandomTarget(currentTime = performance.now()) {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const orbWidth = orb.offsetWidth;
    const orbHeight = orb.offsetHeight;

    const maxX = Math.max(
        settings.edgePadding,
        containerWidth - orbWidth - settings.edgePadding
    );

    const maxY = Math.max(
        settings.edgePadding,
        containerHeight - orbHeight - settings.edgePadding
    );

    targetX =
        settings.edgePadding +
        Math.random() * Math.max(0, maxX - settings.edgePadding);

    targetY =
        settings.edgePadding +
        Math.random() * Math.max(0, maxY - settings.edgePadding);

    startX = parseFloat(orb.style.left) || startX;
    startY = parseFloat(orb.style.top) || startY;

    moveStartTime = currentTime;
}

function animate(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    let progress =
        (currentTime - moveStartTime) / settings.moveDuration;

    if (progress >= 1) {
        startX = targetX;
        startY = targetY;
        orb.style.left = `${startX}px`;
        orb.style.top = `${startY}px`;

        chooseRandomTarget(currentTime);
        progress = 0;
    }

    const eased = easeInOut(progress);

    const currentX =
        startX + (targetX - startX) * eased;

    const currentY =
        startY + (targetY - startY) * eased;

    orb.style.left = `${currentX}px`;
    orb.style.top = `${currentY}px`;

    /* Continuous spin */
    rotation +=
        settings.spinSpeed * (deltaTime / 1000);

    /* Smooth pulse */
    const pulseProgress =
        (currentTime % settings.pulseDuration) /
        settings.pulseDuration;

    const pulse =
        Math.sin(pulseProgress * Math.PI * 2);

    const scale =
        1 + pulse * settings.pulseAmount;

    orb.style.transform =
        `rotate(${rotation}deg) scale(${scale})`;

    requestAnimationFrame(animate);
}

function initializeOrb() {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const orbWidth = orb.offsetWidth;
    const orbHeight = orb.offsetHeight;

    const initialX =
        Math.max(0, (containerWidth - orbWidth) / 2);

    const initialY =
        Math.max(0, (containerHeight - orbHeight) / 2);

    orb.style.left = `${initialX}px`;
    orb.style.top = `${initialY}px`;

    startX = initialX;
    startY = initialY;
    targetX = initialX;
    targetY = initialY;

    chooseRandomTarget();
}

window.addEventListener("resize", () => {
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

    targetX = Math.min(targetX, maxX);
    targetY = Math.min(targetY, maxY);
});

initializeOrb();
requestAnimationFrame(animate);
