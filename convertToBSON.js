const fs = require('fs');
const moment = require('moment');
const BSON = require('bson');

const records = JSON.parse(
    fs.readFileSync("./data/earthquakes.json", "utf8")
);

for (let i = 0; i < records.length; ++i) {
    const record = records[i];
    record.Time = moment(record.Time).toDate();
}

const serializedData = BSON.serialize(records);

fs.writeFileSync("./output/earthquakes.bson", serializedData);