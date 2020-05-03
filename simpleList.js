const Node = require("./LinkedList");
simpleList("hello my name is jacob and I am a linked list");

function simpleList(input) {
	const inputListHead = new Node("^");
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

function makeInputList() {}
