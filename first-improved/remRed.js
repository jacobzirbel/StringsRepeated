// Remove redundant

const [Node, LinkedList, buildInputList] = require("../LinkedList");
module.exports = remRed;

function remRed(input) {
	return search(buildInputList(input));
}

function search(inputList) {
	let data = {};
	let again = true;
	let starts = new LinkedList();
	let keep = {};
	keep[1] = new LinkedList();
	inputList.forEach((e, node) => {
		let str = e + " ";
		if (str) {
			if (data[str]) {
				if (isNaN(data[str])) {
					starts.add(data[str]);
					starts.add(node);
					data[str] = 2;
					keep[1].add(str);
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
		keep[n] = new LinkedList();
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
						if (data[str] === 2) keep[n].add(str);
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
	n--;
	let finalData = {};
	let finalKeep = new LinkedList();
	finalKeep.rest(keep[n--]);
	while (n > 0) {
		console.log(n);
		let kn = keep[n].filterValues(
			(value) =>
				!keep[n + 1].check((v) => v.includes(value) && data[v] === data[value])
		);
		n--;
		finalKeep.rest(kn);
	}

	finalKeep.forEach((e) => {
		finalData[e] = data[e];
	});

	return finalData;
}

// start at most n
// check n-1 each if it exists higher up
