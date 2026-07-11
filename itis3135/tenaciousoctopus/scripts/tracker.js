
/* Dynamic Order Tracker Script for Tenacious Octopus Laundry Service.
I created its own document to minimize confusion and provide a more organized approach */
function setupOrderTracker() {
    const trackingForm = document.getElementById("tracking-form");
    const trackingInput = document.getElementById("tracking-number");
    const trackerResults = document.getElementById("tracker-results");

    if (!trackingForm || !trackingInput || !trackerResults) {
        return;
    }

    const trackingSteps = document.querySelectorAll(".tracking-step");
    const routeProgress = document.getElementById("route-progress");
    const deliveryTruck = document.getElementById("delivery-truck");

    const trackingNumberDisplay = document.getElementById(
        "display-tracking-number"
    );

    const currentStatusDisplay = document.getElementById("current-status");

    const deliveryEstimateDisplay = document.getElementById(
        "delivery-estimate"
    );

    const statusIcon = document.getElementById("status-icon");
    const statusHeading = document.getElementById("status-heading");
    const statusMessage = document.getElementById("status-message");

    const previousButton = document.getElementById("previous-status");
    const nextButton = document.getElementById("next-status");
    const resetButton = document.getElementById("reset-status");

    const orderStatuses = [
        {
            name: "Order Received",
            heading: "Your order is confirmed!",
            message: "Our crew is preparing to collect your laundry.",
            icon: "🧺",
            estimate: "Pickup scheduled for today"
        },
        {
            name: "Laundry Collected",
            heading: "Your laundry is aboard!",
            message: "Our delivery crew has collected your laundry.",
            icon: "🚚",
            estimate: "Cleaning begins shortly"
        },
        {
            name: "Washing and Folding",
            heading: "Eight arms are hard at work!",
            message:
                "Your items are being washed, dried, steamed, and folded.",
            icon: "🫧",
            estimate: "Delivery expected tomorrow"
        },
        {
            name: "Out for Delivery",
            heading: "Your clean laundry is on the way!",
            message:
                "The Tenacious Octopus Laundry truck is heading to you.",
            icon: "🚚",
            estimate: "Arriving today by 7:00 PM"
        },
        {
            name: "Delivered",
            heading: "Delivery complete!",
            message: "Your fresh and neatly folded laundry has arrived.",
            icon: "✅",
            estimate: "Delivered successfully"
        }
    ];

    const demoOrders = {
        "OCTO-1001": 0,
        "OCTO-1002": 1,
        "OCTO-1003": 2,
        "OCTO-1004": 3,
        "OCTO-1005": 4,
        "OCTO-2026": 2
    };

    let currentStep = 0;

    function updateProgressPosition() {
        const lastStep = orderStatuses.length - 1;
        const progressPercentage = (currentStep / lastStep) * 100;

        const mobileLayout = window.matchMedia(
            "(max-width: 850px)"
        ).matches;

        if (mobileLayout) {
            routeProgress.style.width = "100%";
            routeProgress.style.height = progressPercentage + "%";

            deliveryTruck.style.left = "50%";
            deliveryTruck.style.top = progressPercentage + "%";
        } else {
            routeProgress.style.height = "100%";
            routeProgress.style.width = progressPercentage + "%";

            deliveryTruck.style.top = "50%";
            deliveryTruck.style.left = progressPercentage + "%";
        }
    }

    function updateTracker() {
        const currentOrderStatus = orderStatuses[currentStep];

        trackingSteps.forEach(function (step, index) {
            step.classList.remove("active");
            step.classList.remove("complete");

            if (index < currentStep) {
                step.classList.add("complete");
            }

            if (index === currentStep) {
                step.classList.add("active");
            }
        });

        currentStatusDisplay.textContent = currentOrderStatus.name;

        deliveryEstimateDisplay.textContent =
            currentOrderStatus.estimate;

        statusIcon.textContent = currentOrderStatus.icon;
        statusHeading.textContent = currentOrderStatus.heading;
        statusMessage.textContent = currentOrderStatus.message;

        previousButton.disabled = currentStep === 0;

        nextButton.disabled =
            currentStep === orderStatuses.length - 1;

        if (currentStep === orderStatuses.length - 1) {
            nextButton.textContent = "Order Delivered";
        } else {
            nextButton.textContent = "Advance Order";
        }

        updateProgressPosition();
    }

    trackingForm.addEventListener("submit", function (event) {
        const trackingNumber = trackingInput.value
            .trim()
            .toUpperCase();

        event.preventDefault();

        if (trackingNumber === "") {
            return;
        }

        trackingNumberDisplay.textContent = trackingNumber;
        currentStep = demoOrders[trackingNumber];

        if (typeof currentStep === "undefined") {
            currentStep = 0;
        }

        trackerResults.hidden = false;

        updateTracker();

        trackerResults.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

    previousButton.addEventListener("click", function () {
        if (currentStep > 0) {
            currentStep -= 1;
            updateTracker();
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentStep < orderStatuses.length - 1) {
            currentStep += 1;
            updateTracker();
        }
    });

    resetButton.addEventListener("click", function () {
        currentStep = 0;
        updateTracker();
    });

    window.addEventListener("resize", function () {
        updateProgressPosition();
    });

    updateTracker();
}

document.addEventListener("DOMContentLoaded", function () {
    setupOrderTracker();
});