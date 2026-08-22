# Lab 04 - Advanced Search, Filter & Sort API

## Objective

This lab implements an advanced REST API using Node.js HTTP module.

The API supports:
- Multiple field filtering
- Minimum marks filtering
- Case-insensitive partial name search
- Sorting by name and marks
- Ascending and descending order
- Input validation
- Route parameters with query parameters

## File

advanced-server.js

## How to Run

Open the terminal inside the NodeJS-Lab folder and run:

node advanced-server.js

Server will start at:

http://localhost:3000

## API Route

GET /students

Returns all students.

Example:

http://localhost:3000/students

## Query Parameters

### 1. course

Filters students according to their course.

Example:

http://localhost:3000/students?course=BCA

### 2. minMarks

Returns students whose marks are greater than or equal to the given value.

Example:

http://localhost:3000/students?minMarks=60

### 3. search

Performs a case-insensitive partial search on student names.

Example:

http://localhost:3000/students?search=an

### 4. sort

Sorts the result by name or marks.

Valid values:
- name
- marks

Example:

http://localhost:3000/students?sort=marks

### 5. order

Controls sorting order.

Valid values:
- asc
- desc

Example:

http://localhost:3000/students?sort=marks&order=desc

## Combining Query Parameters

Multiple query parameters can be used together.

Example:

http://localhost:3000/students?course=BCA&minMarks=60&search=a&sort=marks&order=desc

The API first applies the filters and then sorts the filtered results.

## Bonus Route

The API also supports course filtering through a route parameter.

Example:

http://localhost:3000/students/course/BCA?minMarks=60&sort=marks&order=desc

## Invalid Input Handling

Invalid input is handled using HTTP status code 400. For example, if minMarks is not a number, the API returns an error message instead of crashing. Invalid sort fields and invalid order values are also rejected with a clear JSON error message.

## Problems Faced

No major problems were faced while implementing the API.

All required filtering, searching, sorting and input validation features were implemented and tested successfully.