const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');

module.exports.countStudents = function(filePath) {
    try {
        const csvData = fs.readFileSync(filePath, 'utf-8');
        const lines = csvData.trim().split('\n').filter(Boolean);
        const students = [];

        lines.forEach(line => {
            const parts = line.split(/,\s*/).map(part => part.trim());
            if (parts.length === 5 && parts.every(part => part)) {
                const [id, firstname, lastname, age, field] = parts;
                students.push({
                    id: id,
                    firstname: firstname,
                    lastname: lastname,
                    age: parseInt(age, 10),
                    field: field
                });
            }
        });

        console.log(`Number of students: ${students.length}`);

        const fields = {};
        students.forEach(student => {
            if (!fields[student.field]) {
                fields[student.field] = {
                    count: 0,
                    names: []
                };
            }
            fields[student.field].count++;
            fields[student.field].names.push(student.firstname);
        });

        Object.keys(fields).forEach(field => {
            console.log(`Number of students in ${field}: ${fields[field].count}. List: ${fields[field].names.join(', ')}`);
        });
    } catch (error) {
        throw new Error("Cannot load the database");
    }
};
