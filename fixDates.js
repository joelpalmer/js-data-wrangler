const moment = require("moment");
const importCsvFile = require("./toolkit/importCsvFile");
const exportCsvFile = require("./toolkit/exportCsvFile");

const importDateFormat = "YYYY-MM-DD HH:mm";
const inputFileName = "./data/surveys.csv";
const outputFileName = "./output/surveys-with-fixed-dates.csv";

function parseDate(inputDate, timezoneOffset) {
	return moment(inputDate, importDateFormat)
		.utcOffset(timezoneOffset)
		.toDate();
}

function transformRow(inputRow) {
	const outputRow = Object.assign({}, inputRow);
	outputRow.start_datetime = parseDate(
		inputRow.start_datetime,
		inputRow.timezone
	);
	outputRow.end_datetime = parseDate(inputRow.end_datetime, inputRow.timezone);
	return outputRow;
}

function transformData(inputData) {
	return inputData.map(transformRow);
}

importCsvFile(inputFileName)
	.then(inputData => {
		const outputData = transformData(inputData);
		return exportCsvFile(outputFileName, outputData);
	})
	.then(() => {
		console.log("Done!");
	})
	.catch(err => {
		console.error("Error!");
		console.error((err && err.stack) || err);
	});
