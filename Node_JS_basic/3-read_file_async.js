const fs = require('fs');
const path = require('path');

const countStudents = (filePath) => {
  /* eslint-disable no-param-reassign */
  filePath = path.normalize(filePath);

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const dataArray = data.trim().split('\n').map((line) => line.split(','));

      const validDataArray = dataArray.filter(line => line.length > 1);

      const numberOfStudents = validDataArray.length - 1;
      console.log(`Number of students: ${numberOfStudents}`);

      const fields = {};

      validDataArray.slice(1).forEach((line) => {
        const fieldName = line[3];
        const firstName = line[0].trim();
        if (!fields[fieldName]) {
          fields[fieldName] = [];
        }
        fields[fieldName].push(firstName);
      });

      delete fields.field;

      for (const fieldName in fields) {
        if (Object.prototype.hasOwnProperty.call(fields, fieldName)) {
          console.log(`Number of students in ${fieldName}: ${fields[fieldName].length}. List: ${fields[fieldName].join(', ')}`);
        }
      }

      resolve();
    });
  });
};

module.exports = countStudents;
