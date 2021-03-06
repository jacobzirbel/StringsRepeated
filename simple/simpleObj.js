// Similar to simpleArr, but using objects, which are apparently more efficient
let fs = require("fs");
module.exports = simpleObj;

function simpleObj(input) {
	let inputArray = input.split(" ");
	return getMatchesObject(inputArray);
}
function getMatchesObject(array) {
	let keepGoing = true;
	n = 1;
	let phrases = {};
	while (keepGoing) {
		keepGoing = false;
		for (let i = 0; i < array.length; i++) {
			let add = true;
			let str = "";

			for (let j = 0; j < n; j++) {
				if (array[i + j]) {
					str += array[i + j] + " ";
				} else {
					add = false;
				}
			}

			if (add) {
				if (phrases[str]) {
					phrases[str]++;
					keepGoing = true;
				} else {
					phrases[str] = 1;
				}
			}
		}
		n++;
	}
	for (let item in phrases) {
		if (phrases[item] < 2) {
			delete phrases[item];
		}
	}

	return phrases;
}
