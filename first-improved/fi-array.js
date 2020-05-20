module.exports = fiArray;

function fiArray(input) {
	const finalData = {};
	const data = {};
	let inputArray = input.split(" ");
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
		if (!str) return leads;

		if (data[str]) {
			if (typeof data[str] === "string") {
				leads.push(+data[str]);
				leads.push(i);
				data[str] = 2;
			} else {
				leads.push(i);
				data[str]++;
			}
		} else {
			data[str] = i.toString();
		}
	});
	return leads;
}

function byLeads(array, leads, data) {
	let n = 1;
	let again = true;
	while (again) {
		n++;
		again = false;
		let nextLeads = [];
		leads.forEach((i) => {
			let str = makePhrase(array, i, n);
			if (str) {
				if (data[str]) {
					if (typeof data[str] === "string") {
						nextLeads.push(+data[str]);
						nextLeads.push(i);
						data[str] = 2;
						again = true;
					} else {
						nextLeads.push(i);
						data[str]++;
					}
				} else {
					data[str] = i.toString();
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
