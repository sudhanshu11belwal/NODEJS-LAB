const http = require('http');

const students = [
    { id: 1, name: "Aman", course: "BCA" },
    { id: 2, name: "Nandani", course: "BCA" },
    { id: 3, name: "Abhishek", course: "BIT" }
];

const items = [
    { id: 1, name: "3 Idiots", genre: "Comedy-Drama", year: 2009 },
    { id: 2, name: "Dangal", genre: "Sports-Drama", year: 2016 },
    { id: 3, name: "Lagaan", genre: "Sports-Drama", year: 2001 },
    { id: 4, name: "RRR", genre: "Action-Drama", year: 2022 },
    { id: 5, name: "Chhichhore", genre: "Comedy-Drama", year: 2019 }
];

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    // Task 2: Return all students
    if (req.url === '/students') {
        res.end(JSON.stringify(students));
    }

    // Bonus: Return students from BCA course
    else if (req.url === '/students/course/BCA') {
        const bcaStudents = students.filter(s => s.course === 'BCA');
        res.end(JSON.stringify(bcaStudents));
    }

    // Task 2 + Bonus: Return student by ID
    else if (req.url.startsWith('/students/')) {

        const idText = req.url.split('/')[2];

        // Handle non-numeric ID
        if (isNaN(Number(idText))) {
            res.writeHead(400);
            res.end(JSON.stringify({
                error: "Invalid student ID. ID must be a number."
            }));
            return;
        }

        const id = Number(idText);
        const student = students.find(s => s.id === id);

        if (student) {
            res.end(JSON.stringify(student));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({
                error: "Student not found"
            }));
        }
    }

    // Task 3: Return all items
    else if (req.url === '/items') {
        res.end(JSON.stringify(items));
    }

    // Task 3: Return item by ID
    else if (req.url.startsWith('/items/')) {

        const idText = req.url.split('/')[2];

        // Handle non-numeric ID
        if (isNaN(Number(idText))) {
            res.writeHead(400);
            res.end(JSON.stringify({
                error: "Invalid item ID. ID must be a number."
            }));
            return;
        }

        const id = Number(idText);
        const item = items.find(i => i.id === id);

        if (item) {
            res.end(JSON.stringify(item));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({
                error: "Item not found"
            }));
        }
    }

    // Route not found
    else {
        res.writeHead(404);
        res.end(JSON.stringify({
            error: "Route not found"
        }));
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});