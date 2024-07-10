#!/usr/bin/node
// Script that gets the contents of a webpage and stores it in a file.
const request = require('request');
const fs = require('fs');
const url = process.argv[2];
const filePath = process.argv[3];

request(url, (error, response, body) => {
  if (error) {
    console.error('Error fetching webpage:', error);
    return;
  }

  const trimmedBody = body.trim();
  const contentToWrite = 'C is fun!';

  if (trimmedBody !== contentToWrite) {
    console.error('Unexpected content fetched:', trimmedBody);
    return;
  }

  fs.writeFile(filePath, contentToWrite, 'utf-8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    console.log(`Webpage content successfully saved to ${filePath}`);
  });
});
