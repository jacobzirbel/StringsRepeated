const [Node, LinkedList, buildInputList] = require("../LinkedList");
module.exports = fiList;

function fiList(input) {
	const finalData = {};
	let inputList = buildInputList(input);
	let data = byStarts(inputList);
	for (let k in data) {
		if (data[k] > 1) {
			finalData[k] = data[k];
		}
	}
	return finalData;
}

function byStarts(inputList) {
	let data = {};
	let again = true;
	let starts = new LinkedList();
	inputList.forEach((e, node) => {
		let str = e + " ";
		if (str) {
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
		}
	});
	let n = 2;
	while (again) {
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
		n++;
	}
	return data;
}
