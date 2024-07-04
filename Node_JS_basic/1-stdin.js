// Program named 1-stdin.js that will be executed through command line
t readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Welcome to Holberton School, what is your name?\n');

rl.on('line', (input) => {
  console.log(`Your name is: ${Input}`);
});

rl.on('close', () => {
  console.log('This important software is now closing\n');
});
