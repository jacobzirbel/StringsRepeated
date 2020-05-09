console.time("submit");
const fs = require("fs");
function searchArray(array) {
	const data = {};
	let finalData = {};
	array = array.split(" ");
	let again = true;
	let n = 0;
	while (again) {
		n++;
		again = getPhrases(n, array, data);
	}
	for (let phrase in data) {
		const num = data[phrase];
		if (num > 1) {
			finalData[phrase] = num;
		}
	}

	let finalData2 = removeExtras(finalData);
	return finalData2;
	console.log("keys", Object.keys(finalData2).length);
	write(JSON.stringify(finalData2, null, "\t"));
	console.timeEnd("submit");
}

function removeExtras(obj) {
	const filterer = (e, i, a) => {
		return !a.slice(i + 1).find((element) => {
			return element.includes(e) && obj[e] === obj[element];
		});
	};
	let keep = Object.keys(obj).filter(filterer);

	let ret = {};
	for (let k of keep.reverse()) {
		ret[k] = obj[k];
	}
	return ret;
}

function getPhrases(n, array, data) {
	again = false;
	for (let i = 0; i < array.length; i++) {
		let str = "";
		let add = true;
		for (let j = 0; j < n; j++) {
			if (array[i + j]) {
				str += array[i + j] + " ";
			} else {
				add = false;
			}
		}
		if (add) {
			if (data[str]) {
				data[str]++;
				again = true;
			} else {
				data[str] = 1;
			}
		} // keep track of the last match, don't go past it on next check
	}
	return again;
}
function buildInputArray(input) {
	input = input.toUpperCase();
	input = input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"\[\]]/g, "");
	input = input.replace(/[\n]/g, " ");
	input = input.replace(/\s{2,}/g, " ");
	input = input.split(" ");
	input = input.filter((e) => e);
	return input;
}
function write(string) {
	let filename = "output.txt";
	fs.writeFile(filename, string, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log(`${filename} was updated!`);
	});
}
module.exports = searchArray;
