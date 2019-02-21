const importJsonFile = require("./toolkit/importJsonFile");

importJsonFile("./data/earthquakes.json")
	.then(data => {
		console.log(data);
	})
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});
