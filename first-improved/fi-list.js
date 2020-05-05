const [Node, LinkedList] = require("../LinkedList");
module.exports = simpleList;

const inputListHead = new Node("^");
const keep = new LinkedList();
const data = {};
const finalData = {};

function simpleList(input) {
	buildInputList(input);

	searchList();

	let current = keep.first.next;
	while (current) {
		finalData[current.value] = data[current.value];
		current = current.next;
	}
	return finalData;
}

function searchList() {
	searchListWord();
	n = 1;
	while (searchListPhrase(++n)) {}
}

function searchListWord() {
	// Initial search of list, separate function so makePhrase(1) isn't called
	let current = inputListHead.next;
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

function searchListPhrase(n) {
	let again = false;
	let more = true;
	let current = inputListHead.next;
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

function buildInputList(input) {
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
