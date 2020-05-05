const [Node, LinkedList, buildInputList] = require("../LinkedList");
module.exports = simpleList;

function simpleList(input) {
	const keep = new LinkedList();
	const data = {};
	const finalData = {};
	const inputList = buildInputList(input);
	let n = 0;
	while (searchListPhrase(inputList, data, ++n, keep)) {}
	keep.forEach((e) => {
		finalData[e] = data[e];
	});
	return finalData;
}

function searchListPhrase(input, data, n, keep) {
	let again = false;
	input.forEach((e, node) => {
		let str = node.makePhrase(n);
		if (str) {
			if (data[str]) {
				if (data[str] === 1) keep.add(str);
				data[str]++;
				again = true;
			} else {
				data[str] = 1;
			}
		}
	});
	return again;
}
