const express = require('express');
const fs = require('fs').promises;
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

    return results.join('\n');
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

const app = express();

app.get('/', (req, res) => {
  res.type('text').send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const databasePath = req.query.db; 

  try {
    const studentInfo = await countStudents(databasePath);
    res.type('text').send(`This is the list of our students\n${studentInfo}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});

module.exports = app;
