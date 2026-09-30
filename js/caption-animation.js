const scrollHeadings = document.querySelectorAll('.scroll-heading');

const headingObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    },
    {
        threshold: 0.2
    }
);

scrollHeadings.forEach((heading) => {
    headingObserver.observe(heading);
});

/*
const scrollHeadings = document.querySelectorAll('.scroll-heading');

const headingObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    },
    {
        threshold: 0.2
    }
);

scrollHeadings.forEach((heading) => {
    headingObserver.observe(heading);
});
*/
