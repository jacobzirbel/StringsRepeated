const fs = require("fs");
let input = fs.readFileSync("small.txt", "utf8");
input = buildInputArray(input);

module.exports = { input: input, write: write };

function buildInputArray(input) {
	input = input.toUpperCase();
	input = input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"\[\]]/g, "");
	input = input.replace(/[\n]/g, " ");
	input = input.replace(/\s{2,}/g, " ");
	return input;
}

function write(string, file) {
	fs.writeFile(file, string, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log(`${file} was updated!`);
	});
}
