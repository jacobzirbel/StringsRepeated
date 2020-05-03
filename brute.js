const general = require("./general");
const inputString = general.input;
const inputArray = inputString.split(" ");

const output = getAllMatches(inputArray);
let outputString = JSON.stringify(output, null, 1);

general.write(outputString, "output.txt");

function getAllMatches(inputArray) {
	const matchCounts = {};
	let keepGoing = true;
	let n = 0;

	while (keepGoing) {
		let phrasesOfnLength = getPhrases(++n, inputArray);
		let matchesOfnLength = comparePhrases(phrasesOfnLength);
		if (matchesOfnLength.length > 0) {
			// Count occurrences of each match in array of all phrases
			matchesOfnLength.forEach((match) => {
				let count = 0;
				phrasesOfnLength.forEach((phrase) => {
					if (match === phrase) {
						count++;
					}
				});
				matchCounts[match] = count;
			});
		} else {
			// if there are no matches of n length, do not continue
			keepGoing = false;
		}
	}
	return matchCounts;
}

/*  returns an array of every phrase of n length
    ex: 'there are four words' n = 2,
    ['there are', 'are four', 'four words'] */

function getPhrases(n, array) {
	let phrases = [];
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
			phrases.push(str);
		}
	}

	return phrases;
}

// returns array of phrases that match (of certain length)
function comparePhrases(phrases) {
	let matches = [];
	for (let i = 0; i < phrases.length; i++) {
		if (contains(phrases, phrases[i], i)) {
			matches.push(phrases[i]);
		}
	}

	return matches;
}

// Does array contain element after index
function contains(array, element, index) {
	for (let i = index + 1; i < array.length; i++) {
		// Checks length first to increase efficiency
		if (array[i].length === element.length) {
			if (array[i] === element) {
				return true;
			}
		}
	}
}
