module.exports = best;

function best(input) {
	const finalData = {};
	const data = {};

	// Make input an array of single words
	// input already has numbers/symbols/extra spaces removed
	let inputArray = input.split(" ");

	// makes an array of indexes that might start matches
	// if array[x]="hello " and array[y]="hello " x and y will be included in leads
	let leads = getLeads(inputArray, data);

	byLeads(inputArray, leads, data);
	for (let k in data) {
		if (typeof data[k] === "number" && data[k] > 1) {
			finalData[k] = data[k];
		}
	}
	return finalData;
}

function getLeads(inputArray, data) {
	let leads = [];
	inputArray.forEach((e, i) => {
		let str = e + " ";

		if (!data[str]) {
			data[str] = i.toString();
		} else {
			// if entry in hash exists for str, it is either the index of the first time it appears in the array
			// or the count of times it has appeared
			if (typeof data[str] === "string") {
				leads.push(+data[str]);
				leads.push(i);
				data[str] = 2;
			} else {
				leads.push(i);
				data[str]++;
			}
		}
	});
	return leads;
}

function byLeads(array, leads, data) {
	// only check words that have been found twice or more in array
	// add phrases of n length that appear twice or more to check next time
	let n = 1;
	let again = true;
	while (again) {
		n++;
		again = false;
		let nextLeads = [];
		leads.forEach((i) => {
			let str = makePhrase(array, i, n);
			if (str) {
				if (!data[str]) {
					data[str] = i.toString();
				} else {
					if (typeof data[str] === "string") {
						nextLeads.push(+data[str]);
						nextLeads.push(i);
						data[str] = 2;
						again = true;
					} else {
						nextLeads.push(i);
						data[str]++;
					}
				}
			}
		});
		leads = nextLeads;
	}
	return data;
}

function makePhrase(array, i, n) {
	let str = "";
	for (let j = 0; j < n; j++) {
		if (array[i + j]) {
			str += array[i + j] + " ";
		} else {
			return false;
		}
	}
	return str;
}
