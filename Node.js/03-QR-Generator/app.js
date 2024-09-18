const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const router = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(router);

// Serve static files (like index.html and style.css) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

