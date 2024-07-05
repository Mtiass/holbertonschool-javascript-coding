const http = require('http');
const fs = require('fs');
const path = require('path');
const { countStudents } = require('./3-read_file_async');

const filePath = process.argv[2];

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    countStudents(filePath)
      .then(() => {
      })
      .catch((error) => {
        console.error(error.message);
        res.statusCode = 500;
        res.end('Internal Server Error');
      });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});

const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running and listening on http://localhost:${PORT}`);
});

module.exports = app;
