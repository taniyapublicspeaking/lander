async function loadIncludes() {

    const elements = document.querySelectorAll("[data-include]");

    for (const element of elements) {

        const file = element.getAttribute("data-include");

        try {

            const response = await fetch(file);

            if (!response.ok) {
                throw new Error(
                    `HTTP error: ${response.status}`
                );
            }

            const html = await response.text();

            element.innerHTML = html;

        } catch (error) {

            console.error(
                `Could not load ${file}:`,
                error
            );

            element.innerHTML = `
                <p class="include-error">
                    Could not load ${file}
                </p>
            `;
        }
    }
}

document.addEventListener("DOMContentLoaded", loadIncludes);
