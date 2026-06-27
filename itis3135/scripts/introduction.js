const form = document.getElementById("intro-form");
const result = document.getElementById("result");
const courses = document.getElementById("courses");
const addCourseButton = document.getElementById("add-course");
const clearButton = document.getElementById("clear-form");

const defaultImage = "images/IMG_0301.jpg";

function addDeleteFunctionality() {
    document.querySelectorAll(".delete-course").forEach((button) => {
        button.onclick = function () {
            button.parentElement.remove();
        };
    });
}

addCourseButton.addEventListener("click", function () {
    const courseDiv = document.createElement("div");
    courseDiv.className = "course";

    courseDiv.innerHTML = `
        <input type="text" class="department" placeholder="Department" required>
        <input type="text" class="number" placeholder="Number" required>
        <input type="text" class="course-name" placeholder="Course name" required>
        <input type="text" class="reason" placeholder="Reason" required>
        <button type="button" class="delete-course">Delete</button>
    `;

    courses.appendChild(courseDiv);
    addDeleteFunctionality();
});

clearButton.addEventListener("click", function () {
    form.querySelectorAll("input, textarea").forEach((field) => {
        field.value = "";
    });
});

form.addEventListener("reset", function () {
    setTimeout(addDeleteFunctionality, 0);
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const firstName = document.getElementById("first-name").value;
    const middleName = document.getElementById("middle-name").value;
    const lastName = document.getElementById("last-name").value;
    const caption = document.getElementById("caption").value;
    const personalBackground = document.getElementById("personal-background").value;
    const professionalBackground = document.getElementById("professional-background").value;
    const academicBackground = document.getElementById("academic-background").value;
    const primaryComputer = document.getElementById("primary-computer").value;
    const quote = document.getElementById("quote").value;
    const quoteAuthor = document.getElementById("quote-author").value;
    const pictureInput = document.getElementById("picture");
    const github = document.getElementById("github").value;
    const githubio = document.getElementById("githubio").value;
    const fcc = document.getElementById("fcc").value;
    const codecademy = document.getElementById("codecademy").value;
    const linkedin = document.getElementById("linkedin").value;

    let imageSource = defaultImage;

    if (pictureInput.files && pictureInput.files[0]) {
        imageSource = URL.createObjectURL(pictureInput.files[0]);
    }

    let courseHTML = "";

    document.querySelectorAll(".course").forEach((course) => {
        const department = course.querySelector(".department").value;
        const number = course.querySelector(".number").value;
        const courseName = course.querySelector(".course-name").value;
        const reason = course.querySelector(".reason").value;

        courseHTML += `
            <li>
                <b>${department}${number} - ${courseName}:</b>
                ${reason}
            </li>
        `;
    });

    form.style.display = "none";

    result.innerHTML = `
        <figure>
            <img src="${imageSource}" alt="${firstName} ${lastName}" width="300">

            <figcaption>
                ${caption}
            </figcaption>
        </figure>

        <ul>
            <li>
                <strong>Personal Background:</strong>
                ${personalBackground}
            </li>

            <li>
                <strong>Professional Background:</strong>
                ${professionalBackground}
            </li>

            <li>
                <strong>Academic Background:</strong>
                ${academicBackground}
            </li>

            <li>
                <strong>Primary Computer:</strong>
                ${primaryComputer}
            </li>

            <li>
                <strong>Courses I’m Taking:</strong>

                <ul>
                    ${courseHTML}
                </ul>
            </li>

            <li class="no-bullet">
                <blockquote>
                    “${quote}”
                </blockquote>
                <cite>- ${quoteAuthor}</cite>
            </li>
        </ul>
        <p class="submitted-links">
            <a href="${github}" target="_blank">GitHub</a>
            |
            <a href="${githubio}" target="_blank">ITIS3135.io</a>
            |
            <a href="${fcc}" target="_blank">freeCodeCamp</a>
            |
            <a href="${codecademy}" target="_blank">Codecademy</a>
            |
            <a href="${linkedin}" target="_blank">LinkedIn</a>
        </p>

        <p>
            <button type="button" id="start-over">Reset Form</button>
        </p>
    `;

    document.getElementById("start-over").addEventListener("click", function () {
        result.innerHTML = "";
        form.style.display = "block";
        form.reset();
    });
});

addDeleteFunctionality();