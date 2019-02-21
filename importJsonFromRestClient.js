const importJsonFromRestApi = require("./toolkit/importJsonFromRestApi");

const url =
	"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

importJsonFromRestApi(url)
	.then(data => {
		const earthquakes = data.features.map(feature => {
			const earthquake = Object.assign({}, feature.properties, {
				id: feature.id
			});
			return earthquake;
		});
		console.log(earthquakes);
	})
	.catch(err => {
		console.error(err);
		console.err(err.stack);
	});
