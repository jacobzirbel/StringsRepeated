const [Node, LinkedList, buildInputList] = require("../LinkedList");
module.exports = fiList;

function fiList(input) {
	const finalData = {};
	const data = {};
	let inputList = buildInputList(input);
	let starts = getStarts(inputList, data);
	byStarts(inputList, starts, data);
	for (let k in data) {
		if (data[k] > 1) {
			finalData[k] = data[k];
		}
	}
	return finalData;
}

function getStarts(inputList, data) {
	let starts = new LinkedList();
	inputList.forEach((e, node) => {
		let str = e + " ";
		if (!str) return starts;

		if (data[str]) {
			if (isNaN(data[str])) {
				starts.add(data[str]);
				starts.add(node);
				data[str] = 2;
			} else {
				starts.add(node);
				data[str]++;
			}
		} else {
			data[str] = node;
		}
	});
	return starts;
}

function byStarts(inputList, starts, data) {
	let n = 1;
	let again = true;
	while (again) {
		n++;
		again = false;
		nextStarts = new LinkedList();
		starts.forEach((node) => {
			let str = node.makePhrase(n);
			if (str) {
				if (data[str]) {
					if (isNaN(data[str])) {
						nextStarts.add(data[str]);
						nextStarts.add(node);
						data[str] = 2;
						again = true;
					} else {
						nextStarts.add(node);
						data[str]++;
					}
				} else {
					data[str] = node;
				}
			}
		});
		starts = nextStarts;
	}
	return data;
}
