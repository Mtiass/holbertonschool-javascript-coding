#!/usr/bin/node
const request = require('request');

const apiUrl = process.argv[2] || 'https://jsonplaceholder.typicode.com/todos';

request(apiUrl, { json: true }, (err, response, body) => {
  if (err) {
    console.error('Error fetching data:', err);
    return;
  }

  if (response.statusCode !== 200) {
    console.error('Unexpected status code:', response.statusCode);
    return;
  }

  const completedTasks = {};

  body.forEach(task => {
    if (task.completed) {
      if (!completedTasks[task.userId]) {
        completedTasks[task.userId] = 0;
      }
      completedTasks[task.userId]++;
    }
  });

  Object.keys(completedTasks).forEach(userId => {
    console.log(`User ${userId} completed ${completedTasks[userId]} tasks`);
  });
});

