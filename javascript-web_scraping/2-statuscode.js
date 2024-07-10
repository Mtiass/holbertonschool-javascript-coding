#!/usr/bin/node
// Script that display the status code of a GET request.
const request = require('request');

const url = process.argv[2];

function getStatus (url) {
  request.get(url, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`code: ${response.statusCode}`);
  });
}

if (process.argv.length !== 3) {
  console.error('Usage: ./2-statuscode.js <URL>');
  process.exit(1);
}

getStatus(url);
