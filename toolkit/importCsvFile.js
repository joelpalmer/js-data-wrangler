const papa = require("papaparse");
const file = require("./file");

function importCsvFile(filePath) {
	return file.read(filePath).then(textFileData => {
		const result = papa.parse(textFileData, {
			header: true,
			dynamicTyping: true
		});
		return result.data;
	});
}

module.exports = importCsvFile;
