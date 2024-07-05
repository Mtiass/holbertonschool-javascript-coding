#!/usr/bin/node
// Script that display the status code of a GET request.
const request = require('request');

if (process.argv.length !== 3) {
  console.error('Usage: ./2-statuscode.js <URL>');
  process.exit(1);
}

const url = process.argv[2];

request(url, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }
  
  console.log(`code: ${response.statusCode}`);
});

