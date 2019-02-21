const importCsvFile = require("./toolkit/importCsvFile");

importCsvFile("./data/earthquakes.csv")
	.then(data => {
		console.log(data);
	})
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});
