# NodeJS Lab 06 – File System Module

## Lab Number
06

## Date
26 September 2026

## Objective

This lab demonstrates file handling operations using the Node.js File System (fs) module. It covers asynchronous and synchronous file reading, writing, appending, deleting files, async/await, and a command-line notes application.

## Files and Their Purpose

### sample.txt
Contains sample text used for file reading and copying operations.

### read-async.js
Demonstrates asynchronous file reading using fs.readFile().

### read-sync.js
Demonstrates synchronous file reading using fs.readFileSync().

### write-file.js
Demonstrates writing and overwriting content using fs.writeFile().

### append-file.js
Demonstrates adding new content to an existing file using fs.appendFile().

### delete-file.js
Demonstrates deleting a file using fs.unlink().

### async-await-version.js
Demonstrates reading and writing files using fs.promises with async/await and try/catch.

### add-note.js
Adds a timestamped note to notes.txt using a command-line argument.

### read-notes.js
Reads and displays all saved notes from notes.txt.

### reflection-notes.txt
Contains reflections about asynchronous/synchronous file operations and simultaneous file access.

### README.md
Contains the lab information, file descriptions, and problems faced during the lab.

## Tasks Completed

- Task 1 – Project Setup
- Task 2 – Asynchronous File Reading
- Task 3 – Synchronous File Reading
- Task 4 – Writing to a File
- Task 5 – Appending to a File
- Task 6 – Deleting a File
- Task 7 – Async/Await File Operations
- Task 8 – Command-Line Notes App
- Task 9 – Reflection Notes

## Screenshots

- read-comparison.png – Comparison between asynchronous and synchronous file reading.
- notes-app-output.png – Output of the command-line Notes App.

## Problems Faced

No major problems were faced during the lab.

### Task 6 Observation

When delete-file.js was executed for the second time, an ENOENT error occurred because output.txt had already been deleted during the first execution. The error indicates that the file or directory could not be found.

## GitHub Submission

The completed Lab-06 folder will be committed and pushed to the existing GitHub repository.