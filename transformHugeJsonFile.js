const stream = require('stream');
const openJsonInputStream = require('./toolkit/open-json-file-input');
const openJsonOutputStream = require('./toolkit/open-json-file-output-stream');

const inputFilePath = "./data/weather-stations.json";
const outputFilePath = "./output/weather-stations-transformed.json";

// todo