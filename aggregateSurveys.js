const globby = require("globby");

const importCsvFile = require("./toolkit/importCsvFile");
const exportCsvFile = require("./toolkit/exportCsvFile");

const inputFileSpec = "./data/by-country/*.csv";
const outputFileName = "./output/surveys-aggregated.csv";

globby(inputFileSpec)
	.then(paths => {
		return paths.reduce((prevPromise, path) => {
			return prevPromise.then(workingData => {
				return importCsvFile(path).then(inputData => {
					return workingData.concat(inputData);
				});
			});
		}, Promise.resolve([]));
	})
	.then(aggregatedData => {
		return exportCsvFile(outputFileName, aggregatedData);
	})
	.then(() => {
		console.log("Done!");
	})
	.catch(err => {
		console.error("ERROR");
		console.error(err);
	});
