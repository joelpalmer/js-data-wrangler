const importCsvFile = require("./toolkit/importCsvFile");
const exportToMongoDB = require("./toolkit/exportToMongoDB");
const mongo = require("promised-mongo");

const db = mongo("localhost:27017/earthquakes", ["largest_earthquakes_export"]);

importCsvFile("./data/earthquakes.csv")
	.then(data => exportToMongoDB(db, "largest_earthquakes_export", data))
	.then(() => db.close())
	.catch(err => {
		console.error("ERROR");
		console.error(err.stack);
	});
