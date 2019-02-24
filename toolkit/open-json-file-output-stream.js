const fs = require('fs');
const stream = require('stream');

function openJsonOutputStream(outputFilePath) {
    const fileOutputStream = fs.createWriteStream(outputFilePath);
    fileOutputStream.write("[");

    let numRecords = 0;

    const jsonOutputStream = new stream.Writable({objectMode: true});
    jsonOutputStream._write = (chunk, encoding, callback) => {
        if (numRecords > 0) {
            fileOutputStream.write(",");
        }
        const jsonData = JSON.stringify(chunk);
        fileOutputStream.write(jsonData);
        numRecords += chunk.length;
        callback();
    };
    jsonOutputStream.on("finish", () => {
        fileOutputStream.write("]");
        fileOutputStream.end();
    });
    return jsonOutputStream;
};
module.exports = openJsonOutputStream;