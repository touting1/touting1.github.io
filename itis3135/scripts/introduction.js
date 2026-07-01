const form = document.getElementById("intro-form");
const result = document.getElementById("result");
const courses = document.getElementById("courses");
const addCourseButton = document.getElementById("add-course");
const clearButton = document.getElementById("clear-form");

const generateHtmlButton = document.getElementById("generate-html");
const generateJsonButton = document.getElementById("generate-json");
const generateXmlButton = document.getElementById("generate-xml");
const codeOutput = document.getElementById("code-output");

const defaultImage = "images/IMG_0301.jpg";

function getValue(id) {
    const element = document.getElementById(id);

    if (element) {
        return element.value;
    }

    return "";
}

function getInitials(firstName, middleName, lastName) {
    return `${firstName.charAt(0)}${middleName ? middleName.charAt(0) : ""}${lastName.charAt(0)}`;
}

function addDeleteFunctionality() {
    document.querySelectorAll(".delete-course").forEach((button) => {
        button.onclick = function () {
            button.parentElement.remove();
        };
    });
}

function addOptionalDeleteFunctionality() {
    document.querySelectorAll(".delete-optional").forEach((button) => {
        button.onclick = function () {
            button.parentElement.remove();
        };
    });
}

function collectCourses() {
    const courseList = [];

    document.querySelectorAll(".course").forEach((course) => {
        courseList.push({
            department: course.querySelector(".department").value,
            number: course.querySelector(".number").value,
            name: course.querySelector(".course-name").value,
            reason: course.querySelector(".reason").value
        });
    });

    return courseList;
}

function collectFormData() {
    return {
        firstName: getValue("first-name"),
        middleName: getValue("middle-name"),
        lastName: getValue("last-name"),
        mascotAdjective: getValue("mascot-adjective"),
        mascotAnimal: getValue("mascot-animal"),
        divider: getValue("divider"),
        caption: getValue("caption"),
        personalStatement: getValue("personal-statement"),
        personalBackground: getValue("personal-background"),
        professionalBackground: getValue("professional-background"),
        academicBackground: getValue("academic-background"),
        primaryComputer: getValue("primary-computer"),
        quote: getValue("quote"),
        quoteAuthor: getValue("quote-author"),
        funnyThing: getValue("funny-thing"),
        share: getValue("share"),
        acknowledgment: getValue("acknowledgment"),
        acknowledgmentDate: getValue("ack-date"),
        github: getValue("github"),
        githubio: getValue("githubio"),
        freeCodeCamp: getValue("fcc"),
        codecademy: getValue("codecademy"),
        linkedin: getValue("linkedin"),
        courses: collectCourses()
    };
}

function showCodeOutput(code) {
    codeOutput.innerHTML = `
        <h3>Generated Code</h3>
        <textarea rows="20" cols="100">${code}</textarea>
    `;
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
    setTimeout(function () {
        addDeleteFunctionality();
        addOptionalDeleteFunctionality();
    }, 0);
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const data = collectFormData();
    const pictureInput = document.getElementById("picture");
    const initials = getInitials(data.firstName, data.middleName, data.lastName);

    let imageSource = defaultImage;

    if (pictureInput.files && pictureInput.files[0]) {
        imageSource = URL.createObjectURL(pictureInput.files[0]);
    }

    let courseHTML = "";

    data.courses.forEach((course) => {
        courseHTML += `
            <li>
                <b>${course.department}${course.number} - ${course.name}:</b>
                ${course.reason}
            </li>
        `;
    });

    form.style.display = "none";

    result.innerHTML = `
        <h2 class="intro-name">
            ${data.firstName}
            ${data.middleName ? data.middleName + " " : ""}
            ${data.lastName}'s
            ${data.divider ? " " + data.divider + " " : " "}
            ${data.mascotAdjective}
            ${data.mascotAnimal}
        </h2>

        <figure>
            <img src="${imageSource}" alt="${data.firstName} ${data.middleName} ${data.lastName}" width="300">

            <figcaption>
                ${data.caption}
            </figcaption>
        </figure>

        <ul>
            ${data.acknowledgment ? `
            <li class="no-bullet acknowledgment">
                ${data.acknowledgment} - ${initials} - ${data.acknowledgmentDate}
            </li>
            ` : ""}

            <li>
                <strong>Personal Statement:</strong>
                ${data.personalStatement}
            </li>

            <li>
                <strong>Personal Background:</strong>
                ${data.personalBackground}
            </li>

            <li>
                <strong>Professional Background:</strong>
                ${data.professionalBackground}
            </li>

            <li>
                <strong>Academic Background:</strong>
                ${data.academicBackground}
            </li>

            <li>
                <strong>Primary Computer:</strong>
                ${data.primaryComputer}
            </li>

            <li>
                <strong>Courses I'm Taking:</strong>
                <ul>
                    ${courseHTML}
                </ul>
            </li>

            ${data.funnyThing ? `
            <li>
                <strong>Funny Thing:</strong>
                ${data.funnyThing}
            </li>
            ` : ""}

            ${data.share ? `
            <li>
                <strong>Something I Would Like to Share:</strong>
                ${data.share}
            </li>
            ` : ""}

            <li class="no-bullet">
                <blockquote>
                    "${data.quote}"
                </blockquote>
                <cite>- ${data.quoteAuthor}</cite>
            </li>
        </ul>

        <p class="submitted-links">
            <a href="${data.github}" target="_blank">GitHub</a>
            |
            <a href="${data.githubio}" target="_blank">ITIS3135.io</a>
            |
            <a href="${data.freeCodeCamp}" target="_blank">freeCodeCamp</a>
            |
            <a href="${data.codecademy}" target="_blank">Codecademy</a>
            |
            <a href="${data.linkedin}" target="_blank">LinkedIn</a>
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

generateJsonButton.addEventListener("click", function () {
    const data = collectFormData();
    showCodeOutput(JSON.stringify(data, null, 4));
});

generateHtmlButton.addEventListener("click", function () {
    const data = collectFormData();
    const initials = getInitials(data.firstName, data.middleName, data.lastName);

    let coursesHtml = "";

    data.courses.forEach((course) => {
        coursesHtml += `
            <li>
                <b>${course.department}${course.number} - ${course.name}:</b>
                ${course.reason}
            </li>`;
    });

    const htmlCode = `
<h2 class="intro-name">
    ${data.firstName} ${data.middleName ? data.middleName + " " : ""}${data.lastName}'s ${data.divider} ${data.mascotAdjective} ${data.mascotAnimal}
</h2>

<figure>
    <img src="images/IMG_0301.jpg" alt="${data.firstName} ${data.lastName}" width="300">

    <figcaption>
        ${data.caption}
    </figcaption>
</figure>

<ul>
    <li class="no-bullet acknowledgment">
        ${data.acknowledgment} - ${initials} - ${data.acknowledgmentDate}
    </li>

    <li>
        <strong>Personal Statement:</strong>
        ${data.personalStatement}
    </li>

    <li>
        <strong>Personal Background:</strong>
        ${data.personalBackground}
    </li>

    <li>
        <strong>Professional Background:</strong>
        ${data.professionalBackground}
    </li>

    <li>
        <strong>Academic Background:</strong>
        ${data.academicBackground}
    </li>

    <li>
        <strong>Primary Computer:</strong>
        ${data.primaryComputer}
    </li>

    <li>
        <strong>Courses I'm Taking:</strong>
        <ul>
            ${coursesHtml}
        </ul>
    </li>

    ${data.funnyThing ? `<li><strong>Funny Thing:</strong> ${data.funnyThing}</li>` : ""}

    ${data.share ? `<li><strong>Something I Would Like to Share:</strong> ${data.share}</li>` : ""}

    <li class="no-bullet">
        <blockquote>
            "${data.quote}"
        </blockquote>
        <cite>- ${data.quoteAuthor}</cite>
    </li>
</ul>

<p class="submitted-links">
    <a href="${data.github}">GitHub</a> |
    <a href="${data.githubio}">ITIS3135.io</a> |
    <a href="${data.freeCodeCamp}">freeCodeCamp</a> |
    <a href="${data.codecademy}">Codecademy</a> |
    <a href="${data.linkedin}">LinkedIn</a>
</p>`;

    showCodeOutput(htmlCode.trim());
});

generateXmlButton.addEventListener("click", function () {
    const data = collectFormData();
    const initials = getInitials(data.firstName, data.middleName, data.lastName);

    let coursesXml = "";

    data.courses.forEach((course) => {
        coursesXml += `
        <course>
            <department>${course.department}</department>
            <number>${course.number}</number>
            <name>${course.name}</name>
            <reason>${course.reason}</reason>
        </course>`;
    });

    const xmlCode = `
<introduction>
    <name>
        <first>${data.firstName}</first>
        <middle>${data.middleName}</middle>
        <last>${data.lastName}</last>
        <initials>${initials}</initials>
    </name>

    <mascot>
        <adjective>${data.mascotAdjective}</adjective>
        <animal>${data.mascotAnimal}</animal>
        <divider>${data.divider}</divider>
    </mascot>

    <caption>${data.caption}</caption>

    <acknowledgment>
        <statement>${data.acknowledgment}</statement>
        <initials>${initials}</initials>
        <date>${data.acknowledgmentDate}</date>
    </acknowledgment>

    <personalStatement>${data.personalStatement}</personalStatement>
    <personalBackground>${data.personalBackground}</personalBackground>
    <professionalBackground>${data.professionalBackground}</professionalBackground>
    <academicBackground>${data.academicBackground}</academicBackground>
    <primaryComputer>${data.primaryComputer}</primaryComputer>

    <courses>
        ${coursesXml}
    </courses>

    <funnyThing>${data.funnyThing}</funnyThing>
    <share>${data.share}</share>

    <quote>
        <text>${data.quote}</text>
        <author>${data.quoteAuthor}</author>
    </quote>

    <links>
        <github>${data.github}</github>
        <githubio>${data.githubio}</githubio>
        <freeCodeCamp>${data.freeCodeCamp}</freeCodeCamp>
        <codecademy>${data.codecademy}</codecademy>
        <linkedin>${data.linkedin}</linkedin>
    </links>
</introduction>`;

    showCodeOutput(xmlCode.trim());
});

addDeleteFunctionality();
addOptionalDeleteFunctionality();