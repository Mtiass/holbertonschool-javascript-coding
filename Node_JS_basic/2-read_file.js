const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');

function countStudents(filePath) {
	  try {
		  const csvData = fs.readFileSync(filePath, 'utf-8');
		  const students = [];
		  csvData
		  .trim()
		  .split('\n')
	          .forEach(line => {
			  const [id, firstname, lastname, age, field] = line.split(',');
			  if (id && firstname && lastname && age && field) {
				  students.push({
					  id: id.trim(),
					  firstname: firstname.trim(),
					  lastname: lastname.trim(),
		                          age: parseInt(age.trim(), 10),
					  field: field.trim()
				  });
			  }
		  });
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
		  console.log(`Number of students: ${students.length}`);
		  Object.keys(fields).forEach(field => {
			  console.log(`Number of students in ${field}: ${fields[field].count}. List: ${fields[field].names.join(', ')}`);
		  });
	  } catch (error) {
		  console.error(`Cannot load the database: ${error.message}`);
	  }
}
