const fs = require("fs");
const simpleArr = require("./simpleArr");
const simpleObj = require("./simpleObj");
const simpleList = require("./simpleList");
let input = fs.readFileSync("samples/small.txt", "utf8");
input = prepareInput(input);

console.log(compareObjects(simpleObj(input), simpleList(input)));
// getAverageTime(simpleArr);
// getAverageTime(simpleObj);
// getAverageTime(simpleList);
function getAverageTime(method) {
	let n = 1;
	let times = [];
	for (let i = 0; i < n; i++) {
		times.push(time(method));
	}
	console.log(times.reduce((e, a) => a + e, 0) / n);
}
function time(method) {
	let s = new Date();
	method(input);
	let e = new Date();
	return e - s;
}

function compareObjects(a, b) {
	let aKeys = Object.keys(a);
	let bKeys = Object.keys(b);

	if (aKeys.length !== bKeys.length) {
		return false;
	}

	for (let key of bKeys) {
		if (a[key] !== b[key]) {
			return false;
		}
	}
	return true;
}

function prepareInput(input) {
	input = input.toUpperCase();
	input = input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"\[\]]/g, "");
	input = input.replace(/[\n]/g, " ");
	input = input.replace(/\d/g, "");
	input = input.replace(/\s{1,}/g, " ");
	return input.trim() + " ";
}

function write(result, file) {
	string = JSON.stringify(result, null, 1);
	file = "output" + file + ".txt";
	fs.writeFile(file, string, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log(`${file} was updated!`);
	});
}
