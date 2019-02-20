const fs = require("fs");
// could use util.promisify
function read(fileName) {
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, "utf8", function(err, textFileData) {
			if (err) {
				reject(err);
				return;
			}
			resolve(textFileData);
		});
	});
}

module.exports = {
	read
};
