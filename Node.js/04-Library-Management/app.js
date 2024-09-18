const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // Import Morgan for logging
const fs = require('fs');
const path = require('path');

const app = express();

// Books data
const books = [{
        bookName: "Rudest Book Ever",
        bookAuthor: "Shwetabh Gangwar",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    },
    {
        bookName: "Do Epic Shit",
        bookAuthor: "Ankur Wariko",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    }
];

// Set view engine to EJS
app.set('view engine', 'ejs');

// Middleware for parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Create a write stream for logging requests
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Use Morgan middleware to log HTTP requests
app.use(morgan('combined', { stream: accessLogStream })); // Logs all HTTP requests to access.log file

// Home route to display books
app.get("/", (req, res) => {
    console.log("GET request received at '/'"); // Log the GET request
    res.render("home", {
        data: books
    });
});

// Add new book
app.post("/", (req, res) => {
    const { bookName, bookAuthor, bookPages, bookPrice } = req.body;
    console.log("POST request received to add a new book:", req.body); // Log POST request

    books.push({
        bookName,
        bookAuthor,
        bookPages: Number(bookPages),
        bookPrice: Number(bookPrice),
        bookState: "Available"
    });

    res.render("home", {
        data: books
    });
});

// Issue a book
app.post('/issue', (req, res) => {
    const requestedBookName = req.body.bookName;
    console.log(`Issue request for book: ${requestedBookName}`); // Log book issue request

    books.forEach(book => {
        if (book.bookName === requestedBookName) {
            book.bookState = "Issued";
        }
    });

    res.render("home", {
        data: books
    });
});

// Return a book
app.post('/return', (req, res) => {
    const requestedBookName = req.body.bookName;
    console.log(`Return request for book: ${requestedBookName}`); // Log book return request

    books.forEach(book => {
        if (book.bookName === requestedBookName) {
            book.bookState = "Available";
        }
    });

    res.render("home", {
        data: books
    });
});

// Delete a book
app.post('/delete', (req, res) => {
    const requestedBookName = req.body.bookName;
    console.log(`Delete request for book: ${requestedBookName}`); // Log book delete request

    const index = books.findIndex(book => book.bookName === requestedBookName);
    if (index !== -1) {
        books.splice(index, 1);
    }

    res.render("home", {
        data: books
    });
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log("App is running on port 3000");
});

