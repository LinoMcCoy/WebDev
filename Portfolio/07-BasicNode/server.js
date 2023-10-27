console.log("hello world");

const fs = require('fs');
const sw = require('star-wars-quotes');
const superheroes = require('superheroes');
const supervillains = require('supervillains');

console.log("Oh no, our beautiful city is being attacked by " + supervillains.random() + ", but we can always count on " + superheroes.random() + " to save us");

console.log(sw());

fs.readFile("input.txt", "utf-8", (err, fd)=>{
	console.log("The secret message is: " + fd);
});