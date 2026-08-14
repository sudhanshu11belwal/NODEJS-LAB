// Lab Assignment - 02: Building Your First Node.js Server
const http = require('http');

// Task 7: Read port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const url = req.url;

    // Task 3: Home Route ( / )
    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>Welcome to My Node.js Server</h1>
            <p><strong>Name:</strong> sudhanshu belwal</p>
            <p><strong>Scholar Number:</strong> 23145024</p>
            <p><strong>Course:</strong> BCA VII</p>
        `);
    } 
    // Task 4: About Route ( /about )
    else if (url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About Me</h1><p>I am a BCA student learning server-side backend programming with Node.js.</p>');
    } 
    // Task 4: College Route ( /college )
    else if (url === '/college') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>College Information</h1><p><strong>College:</strong> Your College Name</p><p><strong>Semester:</strong> BCA VII Semester</p>');
    } 
    // Task 5: Profile Route - Returning JSON ( /profile )
    else if (url === '/profile') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const profileData = {
            name: "sudhanshu belwal",
            scholarNumber: "23145024",
            course: "BCA",
            semester: "VII",
            college: "dev sanskriti vishwavidhyaly"
        };
        res.end(JSON.stringify(profileData));
    } 
    // Task 6: Handle Unknown Routes (404 Not Found)
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1><p>The path you requested does not exist on this server.</p>');
    }
});

// Start listening on dynamic PORT
server.listen(PORT, () => {
    console.log(`Server running successfully on http://localhost:${PORT}`);
});