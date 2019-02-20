const fs = require("fs");

fs.readFile("./data/earthquakes.csv", "utf8", (err, textFileData) => {
	if (err) {
		console.log("An error occured");
		return;
	}
	console.log(textFileData);
});
