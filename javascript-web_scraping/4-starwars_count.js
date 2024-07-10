#!/usr/bin/node
// script that prints the number of movies where the character “Wedge Antilles” is present.
const request = require('request');
const apiUrl = process.argv[2];

request(apiUrl, function (error, response, body) {
  if (error) {
    console.error(error);
    return;
  }

  const films = JSON.parse(body).results;
  const characterId = '18';
  let count = 0;

  films.forEach(film => {
    film.characters.forEach(characterUrl => {
      if (characterUrl.includes(characterId)) {
        count++;
      }
    });
  });

  console.log(count);
});
