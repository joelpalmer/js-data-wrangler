const file = require("./toolkit/file");

file
	.read("./data/earthquakes.csv")
	.then(textFileData => {
		console.log(textFileData);
	})
	.catch(err => {
		console.log(`Error: ${err}`);
	});
