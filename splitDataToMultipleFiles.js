const dataForge = require("data-forge");
require("data-forge-fs");

const inputFileName = "./data/surveys.csv";

function filterRow(inputRow, country) {
	return inputRow.country === country;
}

function transformData(inputDataFrame, country) {
	return inputDataFrame.where(inputRow => {
		return filterRow(inputRow, country);
	});
}

function getCountries(inputDataFrame) {
	return inputDataFrame.getSeries("country").distinct();
}

function splitDataByCountry(inputDataFrame) {
	return getCountries(inputDataFrame).aggregate(
		Promise.resolve(),
		(prevPromise, country) => {
			return prevPromise.then(() => {
				const outputDataFrame = transformData(inputDataFrame, country);
				const outputFileName = `./output/by-country/${country}.csv`;
				return outputDataFrame.asCSV().writeFile(outputFileName);
			});
		}
	);
}

dataForge
	.readFile(inputFileName)
	.parseCSV()
	.then(splitDataByCountry)
	.then(() => {
		console.log("Done!");
	})
	.catch(err => {
		console.error("ERROR!");
		console.error((err && err.stack) || err);
	});
