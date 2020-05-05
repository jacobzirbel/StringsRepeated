const [Node, LinkedList] = require("../LinkedList");
module.exports = simpleList;

function simpleList(input) {
	const inputListHead = new Node("^");
	const keep = new LinkedList();
	const data = {};
	const finalData = {};
	buildInputList(input, inputListHead);
	searchList(inputListHead, data, keep);
	let current = keep.first.next;
	while (current) {
		finalData[current.value] = data[current.value];
		current = current.next;
	}
	return finalData;
}

function searchList(input, data, keep) {
	searchListWord(input, data, keep);
	n = 1;
	while (searchListPhrase(input, data, ++n, keep)) {}
}

function searchListWord(input, data, keep) {
	// Initial search of list, separate function so makePhrase(1) isn't called
	let current = input.next;
	while (current) {
		let val = current.value + " ";
		if (data[val]) {
			if (data[val] === 1) keep.add(val);
			data[val]++;
		} else {
			data[val] = 1;
		}
		current = current.next;
	}
}

function searchListPhrase(head, data, n, keep) {
	let again = false;
	let more = true;
	let current = head.next;
	while (more) {
		let str = current.makePhrase(n);
		if (str) {
			if (data[str]) {
				if (data[str] === 1) keep.add(str);
				data[str]++;
				again = true;
			} else {
				data[str] = 1;
			}
			current = current.next;
		} else {
			more = false;
		}
	}

	return again;
}

function buildInputList(input, inputListHead) {
	let current = inputListHead;
	let str = "";

	for (let char of input) {
		if (char === " ") {
			current.next = new Node(str);
			current = current.next;
			str = "";
		} else {
			str += char;
		}
	}
}

function listToArray(head) {
	let current = head.next;
	let array = [];
	while (current) {
		array.push(current.value);
		current = current.next;
	}
	return array;
}
