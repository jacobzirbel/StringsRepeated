function Node(value) {
	this.value = value;
	this.next = null;
}

function LinkedList() {
	this.first = new Node("^");
	this.latest = this.first;
}
LinkedList.prototype.add = function (value) {
	let newest = new Node(value);
	this.latest.next = newest;
	this.latest = newest;
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

module.exports = [Node, LinkedList];
