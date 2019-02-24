const fs = require("fs");
const stream = require("stream");

const inputFilePath = "./data/weather-stations.csv";

const outPutFilePath = "./output/lower-weather-stations-transformed.csv";

const fileInputStream = fs.createReadStream(inputFilePath);

const fileOutputStream = fs.createWriteStream(outPutFilePath);

function transformStream() {
	const transformStream = new stream.Transform();
	transformStream._transform = (inputChunk, encoding, callback) => {
		const transformedChunk = inputChunk.toString().toLowerCase();
		transformStream.push(transformedChunk);
		callback();
	};
	return transformStream;
}

fileInputStream
	.pipe(transformStream())
	.pipe(fileOutputStream)
	.on("error", err => {
		console.error(err);
	});
