const file = require("./file");
/**
 * Toolkit function to import JSON file
 */

function importJsonFile(filePath) {
	return file.read(filePath).then(textFileData => {
		return JSON.parse(textFileData);
	});
}

module.exports = importJsonFile;
