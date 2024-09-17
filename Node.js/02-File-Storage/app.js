const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'filestorage'));
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Serve static files from the "filestorage" directory
app.use('/uploads', express.static(path.join(__dirname, 'filestorage')));

// Render the home page
app.get('/', (req, res) => {
  res.render('index');
});

// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  res.redirect('/');
});

// Handle file deletions
app.delete('/delete/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, 'filestorage', fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.status(404).send(`File "${fileName}" not found.`);
      } else {
        res.status(500).send('Error deleting the file.');
      }
    } else {
      res.send(`File "${fileName}" has been deleted.`);
    }
  });
});

// List all uploaded files
app.get('/view', (req, res) => {
  const uploadDirectory = path.join(__dirname, 'filestorage');
  fs.readdir(uploadDirectory, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading the upload directory.');
    } else {
      res.json({ files });
    }
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

