# Lab Assignment – 02: Building Your First Node.js Server

## Student Information
- **Name:** Your Name
- **Scholar Number:** 23145024
- **Course & Semester:** BCA VII
- **Lab Number:** 02
- **Date:** August 13, 2026

---

## Practical Description
This practical demonstrates building a core HTTP web server using Node.js's built-in `http` module. It covers binding to dynamic environment ports (`process.env.PORT`), managing request routing (`/`, `/about`, `/college`, `/profile`), formatting response headers (`text/html` and `application/json`), handling `404 Not Found` fallback routes, and understanding Node.js architecture (Event Loop, libuv, single-threaded execution).

---

## Server Route Documentation

| Route Path | Response Content-Type | Details / Output Returned |
| :--- | :--- | :--- |
| `/` | `text/html` | Welcome heading displaying Student Name, Scholar Number, and Course |
| `/about` | `text/html` | Brief bio/description of the student |
| `/college` | `text/html` | Information regarding College Name and current Semester |
| `/profile` | `application/json` | JSON object containing `name`, `scholarNumber`, `course`, `semester`, and `college` |
| *Unknown* | `text/html` | HTTP Status 404 with "Page Not Found" message |

---

## Included Screenshots
- `server-running.png`: Terminal output showing server execution on port 3000 and browser rendering `http://localhost:3000`.
- `routes-output.png`: Browser screenshots displaying outputs for `/about`, `/college`, `/profile` JSON response, and 404 page.

---

## Problems Faced
*All tasks executed smoothly without unresolved errors.*