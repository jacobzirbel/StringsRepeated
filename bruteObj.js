// Similar to brute, but use an object, which is apparently more efficent

module.exports = bruteObject;

function bruteObject(input) {
	let inputArray = input.split(" ");
	return getMatchesObject(inputArray);
}
function getMatchesObject(array) {
	let keepGoing = true;
	n = 1;
	let phrases = {};
	while (keepGoing) {
		keepGoing = false;
		for (let i = 0; i < array.length; i++) {
			let add = true;
			let str = "";

			for (let j = 0; j < n; j++) {
				if (array[i + j]) {
					str += array[i + j] + " ";
				} else {
					add = false;
				}
			}

			if (add) {
				if (phrases[str]) {
					phrases[str]++;
					keepGoing = true;
				} else {
					phrases[str] = 1;
				}
			}
		}
		n++;
	}
	for (let item in phrases) {
		if (phrases[item] < 2) {
			delete phrases[item];
		}
	}

	return phrases;
}
