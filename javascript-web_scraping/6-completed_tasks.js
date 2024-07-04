#!/usr/bin/node
// Script that computes the number of tasks completed by user id.

const request = require('request');

const apiUrl = process.argv[2];

if (!apiUrl) {
	  console.error('Usage: node script.js <api-url>');
	  process.exit(1);
}

request(apiUrl, function (error, response, body) {
	if (error) {
		console.error('Error fetching tasks:', error);
		process.exit(1);
	}
	const tasks = JSON.parse(body);
	const completedTasks = tasks.filter(task => task.completed);
	const completedTaskCount = {};
	completedTasks.forEach(task => {
		if (completedTaskCount[task.userId]) {
			completedTaskCount[task.userId]++;
		} else {
			completedTaskCount[task.userId] = 1;
		}
	});
	Object.keys(completedTaskCount).forEach(userId => {
		console.log(`User ID ${userId} completed ${completedTaskCount[userId]} tasks`);
	});
});
