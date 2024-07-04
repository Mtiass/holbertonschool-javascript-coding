#!/usr/bin/node
// Script that gets the contents of a webpage and stores it in a file.

const fs = require('fs');
const request = require('request');

const url = process.argv[2];
const filePath = process.argv[3];
if (!url || !filePath) {
	  console.error('Usage: node script.js <url> <file-path>');
	  process.exit(1);
}

request(url, function (error, response, body) {
	if (error) {
		console.error('Error fetching webpage:', error);
		process.exit(1);
	}
	fs.writeFile(filePath, body, 'utf-8', function (err) {
		if (err) {
			console.error('Error writing to file:', err);
			process.exit(1);
		}
		console.log(`Webpage content successfully saved to ${filePath}`);
	});
});
