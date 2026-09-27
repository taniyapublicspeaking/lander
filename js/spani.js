const shapes = document.querySelectorAll('.shape');

const colors = [
    '#4facfe',
    '#ff7b54',
    '#9b5de5',
    '#00c9a7',
    '#f15bb5'
];

function moveShape(shape) {

    const x = Math.random() * 300 - 150;
    const y = Math.random() * 300 - 150;

    const scale = 0.7 + Math.random() * 0.8;

    const rotation = Math.random() * 360;

    const color =
        colors[Math.floor(Math.random() * colors.length)];

    const duration = 3000 + Math.random() * 5000;

    shape.style.transitionDuration = `${duration}ms`;

    shape.style.transform =
        `translate(${x}px, ${y}px)
         scale(${scale})
         rotate(${rotation}deg)`;

    shape.style.backgroundColor = color;

    setTimeout(() => {
        moveShape(shape);
    }, duration);
}


/* Start each shape independently */
shapes.forEach((shape, index) => {

    setTimeout(() => {
        moveShape(shape);
    }, index * 1500);

});
