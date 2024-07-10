#!/usr/bin/node
// script that prints the number of movies where the character is present.
#!/usr/bin/node
const request = require('request');
const apiUrl = process.argv[2];
const characterId = '18';
const characterCheckUrl = `https://swapi-api.hbtn.io/api/people/${characterId}/`;
request(apiUrl, function (error, response, body) {
  if (error) {
    console.error(error);
    return;
  }
  const films = JSON.parse(body);
  const count = films.results.filter(film => film.characters.some(character => character === characterCheckUrl)).length;
  console.log(count);
});
