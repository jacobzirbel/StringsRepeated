function Node(value) {
	this.value = value;
	this.next = null;
}

Node.prototype.makePhrase = function (n) {
	let current = this;
	let phrase = "";
	while (n > 0 && current.value) {
		phrase += current.value + " ";
		current = current.next;
		n--;
	}
	return phrase;
};

module.exports = Node;
