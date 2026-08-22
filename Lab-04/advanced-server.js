const http = require('http');
const url = require('url');

const students = [
    { id: 1, name: "Aman", course: "BCA", marks: 72 },
    { id: 2, name: "Chandan", course: "BBA", marks: 55 },
    { id: 3, name: "Sanya", course: "BCA", marks: 88 },
    { id: 4, name: "Rohan", course: "BCA", marks: 64 },
    { id: 5, name: "Priya", course: "BBA", marks: 91 },
    { id: 6, name: "Ankit", course: "BCA", marks: 45 },
    { id: 7, name: "Neha", course: "BBA", marks: 78 },
    { id: 8, name: "Karan", course: "BCA", marks: 60 }
];

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET');


    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;
    const query = parsedUrl.query;

    // Only GET requests are supported
    if (req.method !== 'GET') {
        res.statusCode = 405;
        return res.end(JSON.stringify({
            error: "Only GET requests are allowed"
        }));
    }

    // Route validation
    let courseFromPath = null;

    // /students
    if (pathName === '/students') {
        courseFromPath = null;
    }

    // /students/course/BCA
    else if (pathName.startsWith('/students/course/')) {
        const parts = pathName.split('/');

        if (parts.length !== 4 || !parts[3]) {
            res.statusCode = 400;
            return res.end(JSON.stringify({
                error: "Invalid course route"
            }));
        }

        courseFromPath = decodeURIComponent(parts[3]);
    }

    // Invalid route
    else {
        res.statusCode = 404;
        return res.end(JSON.stringify({
            error: "Route not found"
        }));
    }

    // Validate minMarks
    let minMarks = null;

    if (query.minMarks !== undefined) {
        minMarks = Number(query.minMarks);

        if (query.minMarks.trim() === '' || !Number.isFinite(minMarks)) {
            res.statusCode = 400;
            return res.end(JSON.stringify({
                error: "minMarks must be a number"
            }));
        }
    }

    // Validate sort
    const validSortFields = ['name', 'marks'];

    if (query.sort !== undefined) {
        if (!validSortFields.includes(query.sort)) {
            res.statusCode = 400;
            return res.end(JSON.stringify({
                error: "sort must be either 'name' or 'marks'"
            }));
        }
    }

    // Validate order
    let order = query.order || 'asc';

    if (order !== 'asc' && order !== 'desc') {
        res.statusCode = 400;
        return res.end(JSON.stringify({
            error: "order must be either 'asc' or 'desc'"
        }));
    }

    // Start with complete student list
    let result = [...students];

    // Course filtering
    if (courseFromPath !== null) {
        result = result.filter(student =>
            student.course.toLowerCase() === courseFromPath.toLowerCase()
        );
    }

    // Course query parameter
    if (query.course !== undefined) {
        result = result.filter(student =>
            student.course.toLowerCase() === query.course.toLowerCase()
        );
    }

    // Minimum marks filtering
    if (minMarks !== null) {
        result = result.filter(student =>
            student.marks >= minMarks
        );
    }

    // Partial and case-insensitive name search
    if (query.search !== undefined) {
        const searchText = query.search.toLowerCase();

        result = result.filter(student =>
            student.name.toLowerCase().includes(searchText)
        );
    }

    // Sorting
    if (query.sort !== undefined) {
        const sortField = query.sort;

        result.sort((a, b) => {
            let comparison;

            if (sortField === 'name') {
                comparison = a.name.toLowerCase()
                    .localeCompare(b.name.toLowerCase());
            } else {
                comparison = a.marks - b.marks;
            }

            return order === 'asc' ? comparison : -comparison;
        });
    }

    // Send final response
    res.statusCode = 200;

    res.end(JSON.stringify({
        count: result.length,
        students: result
    }, null, 2));
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
