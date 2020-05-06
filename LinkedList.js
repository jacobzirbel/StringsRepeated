function Node(value, n) {
	this.value = value;
	this.next = null;
	this.n = n;
}

function LinkedList() {
	this.first = new Node("^");
	this.latest = this.first;
}
LinkedList.prototype.add = function (value, n) {
	let newest = new Node(value, n);
	this.latest.next = newest;
	this.latest = newest;
};

LinkedList.prototype.rest = function (list) {
	let outer = this;
	list.forEach((e) => {
		outer.add(e);
	});
};

LinkedList.prototype.check = function (fn) {
	let current = this.first.next;
	while (current && !fn(current.value, current, this)) {
		current = current.next;
	}
	return !!current;
};
Node.prototype.makePhrase = function (n) {
	let current = this;
	let phrase = "";
	while (n > 0) {
		if (!current) return false;
		phrase += current.value + " ";
		current = current.next;
		n--;
	}
	return phrase;
};
LinkedList.prototype.forEach = function (fn) {
	let current = this.first.next;
	while (current) {
		fn(current.value, current, this);
		current = current.next;
	}
};

LinkedList.prototype.toArray = function () {
	let current = this.first.next;
	let array = [];
	while (current) {
		array.push(current.value);
		current = current.next;
	}
	return array;
};
LinkedList.prototype.findValue = function (fn) {
	let current = this.first.next;
	while (current && !fn(current.value, current, this)) {
		current = current.next;
	}
	return current ? current.value : undefined;
};

LinkedList.prototype.filterValues = function (fn) {
	let ret = new LinkedList();
	let current = this.first.next;
	while (current) {
		if (fn(current.value, current, this)) ret.add(current.value);
		current = current.next;
	}
	return ret;
};
LinkedList.prototype.slice = function (startNode) {
	// return list includes everything past (not including) start
	let ret = new LinkedList();
	let current = startNode.next;
	while (current) {
		ret.add(current.value);
		current = current.next;
	}
	return ret;
};

function buildInputList(input) {
	let inputList = new LinkedList();
	let str = "";
	for (let char of input.trim() + " ") {
		if (char === " ") {
			inputList.add(str);
			str = "";
		} else {
			str += char;
		}
	}
	return inputList;
}

module.exports = [Node, LinkedList, buildInputList];
// let myList = buildInputList(" 1 2 3 4 5 6 ");
// console.log(myList.slice(myList.first.next.next.next));
