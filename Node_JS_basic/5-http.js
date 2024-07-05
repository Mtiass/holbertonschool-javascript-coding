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
        res.write('This is the list of our students\n');
        data.forEach((line) => {
          res.write(`${line}\n`);
        });
        res.end();
      })
      .catch((error) => {
        res.end(`This is the list of our students\n${error.message}`);
      });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});

app.listen(1245, '127.0.0.1');

module.exports = app;
