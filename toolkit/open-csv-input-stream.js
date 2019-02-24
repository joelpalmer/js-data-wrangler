const stream = require("stream");
const fs = require("fs");
const papaparse = require("papaparse");

function openCsvInputStream(inputFilePath) {
	const csvInputStream = new stream.Readable({ objectMode: true });
	csvInputStream._read = () => {};
	const fileInputStream = fs.createReadStream(inputFilePath);
	papaparse.parse(fileInputStream, {
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true,
		step: results => {
			for (let row of results.data) {
				csvInputStream.push(row);
			}
		},
		complete: () => {
			csvInputStream.push(null);
		},

		error: err => {
			csvInputStream.emit("error", err);
		}
	});
	return csvInputStream;
}
module.exports = openCsvInputStream;
