const fs = require("fs");
const brute = require("./brute");
const obj = require("./obj");
let input = fs.readFileSync("small.txt", "utf8");
input = prepareInput(input);

function compareObjects(a, b) {
	let aKeys = Object.keys(a);
	let bKeys = Object.keys(b);
	if (aKeys.length != bKeys.length) {
		console.log("here");
		return false;
	}
	for (let key in aKeys) {
		if (a[key] !== b[key]) return false;
	}
	return true;
}

function prepareInput(input) {
	input = input.toUpperCase();
	input = input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"\[\]]/g, "");
	input = input.replace(/[\n]/g, " ");
	input = input.replace(/\s{2,}/g, " ");
	return input;
}

function write(result, file) {
	string = JSON.stringify(result, null, 1);
	file = "output" + new Date().getSeconds() + ".txt";
	fs.writeFile(file, string, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log(`${file} was updated!`);
	});
}

module.exports = { input: input, write: write };
