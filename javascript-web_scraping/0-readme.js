#!/usr/bin/node
// Script to read and print the content of a file
const fs = require('fs');

function readFile(filePath) {
try {
	const content = fs.readFileSync(filePath, 'utf-8');
	console.log(content);
} catch (error) {
	console.error(error);
}

}
if (process.argv.length > 2) {
	const filePath = process.argv[2];
	readFile(filePath);
} else {
	console.error('Please provide a file path as an argument.');
}
