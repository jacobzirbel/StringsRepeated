const fs = require("fs");
const simpleArr = require("./simple/simpleArr");
const simpleObj = require("./simple/simpleObj");
const simpleList = require("./simple/simpleList");
const originalRemove = require("./simple/originalRemove");
const fiList = require("./first-improved/fi-list");
const fiArray = require("./first-improved/fi-array");
const listNoArrays = require("./first-improved/listNoArrays");
const remRed = require("./first-improved/remRed");
let input = fs.readFileSync("samples/medium.txt", "utf8");
input = prepareInput(input);

// console.time("list");
// write(fiList(input), "list");
// console.timeEnd("list");
// console.time("array");
// write(fiArray(input), "array");
// console.timeEnd("array");

getAverageTime(simpleArr);
//getAverageTime(fiArray);
//console.log(compareObjects(fiList(input), fiArray(input)));

//console.log(time(originalRemove), time(remRed));
function getAverageTime(method) {
	let n = 4;
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
		console.log(aKeys.length, bKeys.length);
		return false;
	}
	for (let key of bKeys) {
		if (b[key] !== a[key]) {
			console.log(key);

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
	file = "outputs/output" + file + ".txt";
	fs.writeFile(file, string, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log(`${file} was updated!`);
	});
}
