const file = require("./file");

function exportJsonFile(fileName, data) {
	const json = JSON.stringify(data, null, 4);
	return file.write(fileName, json);
}

module.exports = exportJsonFile;
