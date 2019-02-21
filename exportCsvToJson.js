const importCsvFile = require("./toolkit/importCsvFile");
const exportJsonFile = require("./toolkit/exportJsonFile");

importCsvFile("./data/earthquakes.csv")
	.then(data => exportJsonFile("./output/earthquakes.json", data))
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});
