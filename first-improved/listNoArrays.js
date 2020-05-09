const [Node, LinkedList, buildInputList] = require("../LinkedList");
module.exports = fiList;

function fiList(input) {
	let finalData = {};
	let inputList = buildInputList(input);
	finalData = search(inputList);
	return finalData;
}

function search(inputList) {
	let data = {};
	let again = true;
	let starts = new LinkedList();
	let keep = new LinkedList();
	let nextStarts;
	inputList.forEach((e, node) => {
		let str = e + " ";
		if (str) {
			if (data[str]) {
				if (isNaN(data[str])) {
					starts.add(data[str]);
					starts.add(node);
					data[str] = 2;
					keep.add(str);
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
						if (data[str] === 2) keep.add(str);
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
	let finalData = {};
	keep.forEach((e) => {
		finalData[e] = data[e];
	});
	return finalData;
}
