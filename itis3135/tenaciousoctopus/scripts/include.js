/* This is my include script component for my header and footer content */
document.addEventListener("DOMContentLoaded", function () {
    const includes = document.querySelectorAll("[data-include]");

    includes.forEach(function (element) {
        const file = element.getAttribute("data-include");

        fetch(file)
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                element.innerHTML = data;
            })
            .catch(function () {
                element.innerHTML = "Component could not be loaded.";
            });
    });
});