const fs = require('fs');
const path = require('path');

const countStudents = (filePath) => {
  filePath = path.normalize(filePath);

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    
    const dataArray = data.trim().split('\n').map((line) => line.split(','));

    const numberOfStudents = dataArray.length - 1;

    console.log(`Number of students: ${numberOfStudents}`);

    const fields = {};

    dataArray.slice(1).forEach((line) => {
      const fieldName = line[3];
      const firstName = line[0];

      if (!fields[fieldName]) {
        fields[fieldName] = [];
      }
      fields[fieldName].push(firstName);
    });

    delete fields.field;

    for (const fieldName in fields) {
      if (fieldName) {
        console.log(`Number of students in ${fieldName}: ${fields[fieldName].length}. List: ${fields[fieldName].join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

module.exports = countStudents;
