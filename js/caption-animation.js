/* =========================================
   SMART SCREEN TEXT ROTATION
   ========================================= */

const screenPoints = [

    "Speak with confidence",

    "Express your ideas clearly",

    "Build a strong vocabulary",

    "Improve your grammar",

    "Write creative stories",

    "Use confident body language",

    "Project your voice clearly",

    "Think creatively",

    "Communicate with others",

    "Become a confident speaker"

];


const screenText =
    document.getElementById("smartScreenText");


let currentPoint = 0;


function changeScreenText() {

    /* Fade out */
    screenText.classList.add("fade-out");


    setTimeout(() => {

        /* Move to next point */
        currentPoint =
            (currentPoint + 1) % screenPoints.length;


        /* Change text */
        screenText.textContent =
            screenPoints[currentPoint];


        /* Fade in */
        screenText.classList.remove("fade-out");

        screenText.classList.add("fade-in");


        /* Remove fade-in class */
        setTimeout(() => {

            screenText.classList.remove("fade-in");

        }, 800);


    }, 800);
}


/*
   Change text every 4 seconds
*/

setInterval(changeScreenText, 4000);
