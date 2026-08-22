const API_URL = "http://localhost:3000/students";

const searchInput = document.getElementById("searchInput");
const courseSelect = document.getElementById("courseSelect");
const marksInput = document.getElementById("marksInput");
const sortSelect = document.getElementById("sortSelect");
const orderSelect = document.getElementById("orderSelect");

const tableBody = document.getElementById("studentTableBody");

const loading = document.getElementById("loading");
const tableContainer = document.getElementById("tableContainer");
const emptyState = document.getElementById("emptyState");

const errorBox = document.getElementById("errorBox");
const errorMessage = document.getElementById("errorMessage");

const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");


// ==========================================
// Load Students
// ==========================================

async function loadStudents() {

    showLoading();

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("API returned an error.");
        }

        const data = await response.json();

        hideError();

        updateDashboard(data.students);

        renderStudents(data.students);

        setServerStatus(true);

    } catch (error) {

        console.error(error);

        showError(
            "Unable to connect to Node.js server. Make sure advanced-server.js is running on port 3000."
        );

        setServerStatus(false);

    }

}


// ==========================================
// Apply Filters
// ==========================================

async function applyFilters() {

    showLoading();

    hideError();

    const params = new URLSearchParams();


    // Search

    const search = searchInput.value.trim();

    if (search) {
        params.append("search", search);
    }


    // Course

    const course = courseSelect.value;

    if (course) {
        params.append("course", course);
    }


    // Minimum Marks

    const marks = marksInput.value.trim();

    if (marks !== "") {

        const marksNumber = Number(marks);

        if (isNaN(marksNumber)) {

            showError("Minimum marks must be a valid number.");

            return;
        }

        params.append("minMarks", marks);

    }


    // Sort

    const sort = sortSelect.value;

    if (sort) {

        params.append("sort", sort);

        params.append(
            "order",
            orderSelect.value
        );

    }


    const finalURL =
        `${API_URL}?${params.toString()}`;


    console.log("API Request:", finalURL);


    try {

        const response = await fetch(finalURL);

        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.error || "Something went wrong."
            );

        }


        updateDashboard(data.students);

        renderStudents(data.students);

        setServerStatus(true);


    } catch (error) {

        console.error(error);

        showError(error.message);

        setServerStatus(true);

    }

}


// ==========================================
// Render Students
// ==========================================

function renderStudents(students) {

    tableBody.innerHTML = "";


    if (!students || students.length === 0) {

        tableContainer.style.display = "none";

        emptyState.style.display = "block";

        document.getElementById(
            "recordCount"
        ).textContent = "0";

        document.getElementById(
            "resultText"
        ).textContent = "No matching students found.";

        return;

    }


    tableContainer.style.display = "block";

    emptyState.style.display = "none";


    document.getElementById(
        "recordCount"
    ).textContent = students.length;


    document.getElementById(
        "resultText"
    ).textContent =
        `Showing ${students.length} student${students.length !== 1 ? "s" : ""}`;


    students.forEach((student, index) => {

        const row = document.createElement("tr");


        const performance =
            getPerformance(student.marks);


        const initials =
            student.name
                .split(" ")
                .map(word => word[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();


        row.innerHTML = `

            <td>
                ${index + 1}
            </td>


            <td>

                <div class="student-info">

                    <div class="avatar">
                        ${initials}
                    </div>

                    <div>

                        <div class="student-name">
                            ${student.name}
                        </div>

                        <div class="student-id">
                            ID #${student.id}
                        </div>

                    </div>

                </div>

            </td>


            <td>

                <span class="course-badge">
                    ${student.course}
                </span>

            </td>


            <td>

                <div class="marks">
                    ${student.marks}
                </div>

                <div class="marks-bar">

                    <div
                        class="marks-progress"
                        style="width: ${student.marks}%"
                    ></div>

                </div>

            </td>


            <td>

                <span class="performance ${performance.className}">
                    ${performance.text}
                </span>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


// ==========================================
// Performance
// ==========================================

function getPerformance(marks) {

    if (marks >= 85) {

        return {
            text: "Excellent",
            className: "excellent"
        };

    }


    if (marks >= 70) {

        return {
            text: "Good",
            className: "good"
        };

    }


    if (marks >= 60) {

        return {
            text: "Average",
            className: "average"
        };

    }


    return {
        text: "Needs Improvement",
        className: "low"
    };

}


// ==========================================
// Dashboard Statistics
// ==========================================

function updateDashboard(students) {

    const total =
        students.length;


    const bca =
        students.filter(
            student =>
                student.course.toLowerCase() === "bca"
        ).length;


    const average =
        total > 0
            ? students.reduce(
                (sum, student) =>
                    sum + student.marks,
                0
            ) / total
            : 0;


    const highest =
        total > 0
            ? Math.max(
                ...students.map(
                    student => student.marks
                )
            )
            : 0;


    document.getElementById(
        "totalStudents"
    ).textContent = total;


    document.getElementById(
        "bcaStudents"
    ).textContent = bca;


    document.getElementById(
        "averageMarks"
    ).textContent =
        average.toFixed(1);


    document.getElementById(
        "highestMarks"
    ).textContent =
        highest;

}


// ==========================================
// Reset Filters
// ==========================================

function resetFilters() {

    searchInput.value = "";

    courseSelect.value = "";

    marksInput.value = "";

    sortSelect.value = "";

    orderSelect.value = "asc";


    loadStudents();

}


// ==========================================
// Loading
// ==========================================

function showLoading() {

    loading.style.display = "flex";

    tableContainer.style.display = "none";

    emptyState.style.display = "none";

    errorBox.style.display = "none";

}


function hideLoading() {

    loading.style.display = "none";

}


// ==========================================
// Error
// ==========================================

function showError(message) {

    hideLoading();

    tableContainer.style.display = "none";

    emptyState.style.display = "none";

    errorBox.style.display = "flex";

    errorMessage.textContent = message;

}


function hideError() {

    errorBox.style.display = "none";

}


// ==========================================
// Server Status
// ==========================================

function setServerStatus(online) {

    if (online) {

        statusDot.classList.add("online");

        statusDot.classList.remove("offline");

        statusText.textContent =
            "API Connected";

    } else {

        statusDot.classList.add("offline");

        statusDot.classList.remove("online");

        statusText.textContent =
            "API Offline";

    }

}


// ==========================================
// Search Enter Key
// ==========================================

searchInput.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {

            applyFilters();

        }

    }
);


// ==========================================
// Initial Load
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadStudents();

    }
);