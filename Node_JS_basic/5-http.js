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
        let response = `This is the list of our students\n`;
        data.forEach((line) => {
          response += `${line}\n`;
});
        res.end(response);
      })
      .catch((error) => {
        res.statusCode = 500;
        res.end(`This is the list of our students\n${error.message}`);
      });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});

app.listen(1245, '127.0.0.1');

module.exports = app;
