

// Dynamic Functionality 1: Service price calculator
function setupPriceCalculator() {
    const service = document.getElementById("service");
    const itemAmount = document.getElementById("item-amount");
    const button = document.getElementById("calculate-price");
    const resetButton = document.getElementById("reset-price");
    const result = document.getElementById("price-result");

    if (
        !service ||
        !itemAmount ||
        !button ||
        !resetButton ||
        !result
    ) {
        return;
    }

    button.addEventListener("click", function () {
        const price = Number(service.value);
        const amount = Number(itemAmount.value);
        const total = price * amount;

        if (service.value === "") {
            result.textContent = "Please choose a service first.";
        } else if (amount < 1) {
            result.textContent =
                "Please enter at least 1 clothing item.";
        } else {
            result.textContent =
                "Estimated price for " +
                amount +
                " item(s): $" +
                total.toFixed(2);
        }
    });

    resetButton.addEventListener("click", function () {
        service.value = "";
        itemAmount.value = "1";
        result.textContent = "";
    });
}

// Dynamic Functionality 2: Contact form confirmation
function setupContactForm() {
    const form = document.getElementById("contact-form");
    const result = document.getElementById("form-result");

    if (!form || !result) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        result.textContent = "Thank you! A Tenacious Octopus team member will reach out soon.";
        form.reset();
    });
}

// Dynamic Functionality 3: Customer review slider
function setupReviewSlider() {
    const reviews = [
        "“The octopus crew folded my towels better than I ever could!”",
        "“Fast service, fresh clothes, and the cutest laundry workers in town.”",
        "“I dropped off three baskets and they handled everything with eight-arm speed!”",
        "“Tenacious Octopus Laundry made laundry day fun for once.”"
    ];

    const reviewText = document.getElementById("review-text");
    const previousButton = document.getElementById("previous-review");
    const nextButton = document.getElementById("next-review");

    if (!reviewText || !previousButton || !nextButton) {
        return;
    }

    let currentReview = 0;

    nextButton.addEventListener("click", function () {
        currentReview++;

        if (currentReview >= reviews.length) {
            currentReview = 0;
        }

        reviewText.textContent = reviews[currentReview];
    });

    previousButton.addEventListener("click", function () {
        currentReview--;

        if (currentReview < 0) {
            currentReview = reviews.length - 1;
        }

        reviewText.textContent = reviews[currentReview];
    });
}
// Dynamic bubble background
function createBubble() {
    const bubbleBackground = document.getElementById("bubble-background");

    if (!bubbleBackground) {
        return;
    }

    const bubbleImages = [
        "images/bubble1.png",
        "images/bubble2.png",
        "images/bubble3.png",
        "images/bubble4.png",
        "images/bubble5.png"
    ];

    const bubble = document.createElement("img");
    const randomImage = bubbleImages[Math.floor(Math.random() * bubbleImages.length)];
    const randomSize = Math.floor(Math.random() * 90) + 30;
    const randomLeft = Math.floor(Math.random() * 100);
    const randomDuration = Math.floor(Math.random() * 8) + 10;

    bubble.src = randomImage;
    bubble.alt = "";
    bubble.className = "floating-bubble";
    bubble.style.width = randomSize + "px";
    bubble.style.left = randomLeft + "%";
    bubble.style.animationDuration = randomDuration + "s";

    bubbleBackground.appendChild(bubble);

    setTimeout(function () {
        bubble.remove();
    }, randomDuration * 1000);
}
// Call createBubble every 700 milliseconds to continuously generate bubbles
setInterval(createBubble, 700);

// Initialize all dynamic functionalities when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    setupPriceCalculator();
    setupContactForm();
    setupReviewSlider();
});