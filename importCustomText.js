const file = require("./toolkit/file");

function parseCustomData(textFileData) {
	const regex = /(.*)\|(.*)\|(.*)\|(.*)\|(.*)\|(.*)\|(.*)\|(.*)\|(.*)\|(.*)\|(.*)\|(.*)\|(.*)$/gm;

	const rows = [];

	let m;

	while ((m = regex.exec(textFileData)) !== null) {
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}
		m.shift();
		rows.push(m);
	}

	const header = rows.shift();
	const data = rows.map(row => {
		const hash = {};
		for (let i = 0; i < header.length; ++i) {
			hash[header[i]] = row[i];
		}
		return hash;
	});
	return data;
}

file
	.read("./data/earthquakes.txt")
	.then(textFileData => parseCustomData(textFileData))
	.then(data => {
		console.log(data);
	})
	.catch(err => {
		console.error("Error!");
		console.error(err.stack);
	});
