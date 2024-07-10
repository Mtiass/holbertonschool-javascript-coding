#!/usr/bin/node
// script that prints the number of movies where the character is present.
const request = require('request');
const api_Url = process.argv[2];
const characterId = '18';

request(api_Url, function (error, response, body) {
  if (error) {
    console.error(error);
  } else {
    const films = JSON.parse(body);
    const count = films.results.filter((film) => film.characters.includes(`https://swapi-api.hbtn.io/api/people/${characterId}/`)).length;
    console.log(count);
  }
});
