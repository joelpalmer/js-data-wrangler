const importCsvFile = require("./toolkit/importCsvFile");
const exportCsvFile = require("./toolkit/exportCsvFile");

importCsvFile("./data/earthquakes.csv")
	.then(data => exportCsvFile("./output/earthquakes-export.csv", data))
	.catch(err => {
		console.error("ERROR");
		console.error(err.stack);
	});
