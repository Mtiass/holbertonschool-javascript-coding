t http = require('http');
const fs = require('fs').promises;
const url = require('url');
const csvParse = require('csv-parse');

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const records = await csvParse(data, { columns: true, skip_empty_lines: true });

    let totalStudents = 0;
    let fields = {};

    records.forEach(record => {
      if (record.firstName && record.field) {
        totalStudents++;
        if (!fields[record.field]) {
          fields[record.field] = [];
        }
        fields[record.field].push(record.firstName);
      }
    });

    let results = [`Number of students: ${totalStudents}`];
    Object.keys(fields).forEach(field => {
      results.push(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
    });

    return results;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

const app = http.createServer(async (req, res) => {
  const reqUrl = url.parse(req.url).pathname;
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (reqUrl === '/') {
    res.end('Hello Holberton School!');
  } else if (reqUrl === '/students') {
    const path = process.argv[2];
    res.write('This is the list of our students\n');
    try {
      const data = await countStudents(path);
      res.end(data.join('\n'));
    } catch (err) {
      res.end(err.message);
    }
  }
});

app.listen(1245, () => {
  console.log('Server is running and listening on port 1245');
});

module.exports = app;
