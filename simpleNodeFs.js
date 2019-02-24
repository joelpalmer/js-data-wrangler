const fs = require("fs");

const inputFilePath = "./data/weather-stations.csv";

const outPutFilePath = "./output/weather-stations-transformed.csv";

const fileInputStream = fs.createReadStream(inputFilePath);

const fileOutputStream = fs.createWriteStream(outPutFilePath);

fileInputStream.pipe(fileOutputStream);
