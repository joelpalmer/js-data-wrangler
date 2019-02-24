const bfj = require("bfj");
const fs = require("fs");
const stream = require("stream");

function openJsonInputStream(inputFilePath) {
	const jsonInputStream = new stream.Readable({ objectMode: true });
	jsonInputStream._read = () => {};
	const fileInputStream = fs.createReadStream(inputFilePath);

	let curObject = null;
	let curProperty = null;

	const emitter = bfj.walk(fileInputStream);
	emitter.on(bfj.events.object, () => {
		curObject = {};
	});
	emitter.on(bfj.events.property, name => {
		curProperty = name;
	});
	let onValue = value => {
		curObject[curProperty] = value;
		curProperty = null;
	};
	emitter.on(bfj.events.string, onValue);
	emitter.on(bfj.events.number, onValue);
	emitter.on(bfj.events.literal, onValue);
	emitter.on(bfj.events.endObject, () => {
		jsonInputStream.push(curObject);
		curObject = null;
	});
	emitter.on(bfj.events.endArray, () => {
		jsonInputStream.push(null);
	});
	emitter.on(bfj.events.error, err => {
		jsonInputStream.emit("error", err);
	});
	return jsonInputStream;
}

module.exports = openJsonInputStream;
