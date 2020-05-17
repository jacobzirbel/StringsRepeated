const [Node, LinkedList, buildInputList] = require("../LinkedList");
module.exports = fiArray;

function fiArray(input) {
	const finalData = {};
	let inputArray = input.split(" ");
	let data = byStarts(inputArray);
	for (let k in data) {
		if (typeof data[k] === "number" && data[k] > 1) {
			finalData[k] = data[k];
		}
	}
	return finalData;
}

function byStarts(inputArray) {
	let data = {};
	let again = true;
	let starts = [];
	inputArray.forEach((e, i) => {
		let str = e + " ";
		if (str) {
			if (data[str]) {
				if (typeof data[str] === "object") {
					starts.push(...data[str]);
					starts.push(i);
					data[str] = 2;
				} else {
					starts.push(i);
					data[str]++;
				}
			} else {
				data[str] = [i];
			}
		}
	});
	let n = 2;
	while (again) {
		again = false;
		nextStarts = [];
		starts.forEach((i) => {
			let str = makePhrase(inputArray, i, n);
			if (str) {
				if (data[str]) {
					if (typeof data[str] === "object") {
						nextStarts.push(...data[str]);
						nextStarts.push(i);
						data[str] = 2;
						again = true;
					} else {
						nextStarts.push(i);
						data[str]++;
					}
				} else {
					data[str] = [i];
				}
			}
		});
		starts = nextStarts;
		n++;
	}
	return data;
}

function makePhrase(array, i, n) {
	let add = true;
	let str = "";
	for (let j = 0; j < n; j++) {
		if (array[i + j]) {
			str += array[i + j] + " ";
		} else {
			add = false;
		}
	}
	return add && str;
}
