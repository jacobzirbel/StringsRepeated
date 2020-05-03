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

module.exports = [Node, LinkedList];
