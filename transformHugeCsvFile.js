const stream = require("stream");
const openCsvInputStream = require("./toolkit/open-csv-input-stream");
const openCsvOutputStream = require("./toolkit/open-csv-output-stream");

const inputFilePath = "./data/weather-stations.csv";
const outputFilePath = "./output/weather-stations-updated-temps.csv";

function transformRow(inputRow) {
	const outputRow = Object.assign({}, inputRow);

	if (typeof outputRow.MinTemp === "number") {
		outputRow.MinTemp /= 10;
	} else {
		outputRow.MinTemp = undefined;
	}

	if (typeof outputRow.MaxTemp === "number") {
		outputRow.MaxTemp /= 10;
	} else {
		outputRow.MaxTemp = undefined;
	}

	return outputRow;
}

function convertTemperatureStream() {
	const transformStream = new stream.Transform({ objectMode: true });
	transformStream._transform = (inputChunk, encoding, callback) => {
		const outputChunk = transformRow(inputChunk);
		transformStream.push(outputChunk);
		callback();
	};
	return transformStream;
}

openCsvInputStream(inputFilePath)
	.pipe(convertTemperatureStream())
	.pipe(openCsvOutputStream(outputFilePath))
	.on("error", err => {
		console.error("ERROR");
		console.error(err);
	});
