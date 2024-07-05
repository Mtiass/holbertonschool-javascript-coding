const http = require('http');
const countStudents = require('./3-read_file_async');

const databasePath = process.argv[2];

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    countStudents(databasePath)
      .then((data) => {
        res.end(`This is the list of our students\n${data.join('\n')}`);
      })
      .catch((error) => {
        res.end(`This is the list of our students\n${error.message}`);
      });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});

const PORT = 1245;
const HOSTNAME = 'localhost';

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running and listening on http://${HOSTNAME}:${PORT}`);
});

module.exports = app;
