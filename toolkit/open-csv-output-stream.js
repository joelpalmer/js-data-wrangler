const stream = require('stream');
const fs = require('fs');
const papaparse = require('papaparse');

function openCsvOutputStream(outputFilePath) {
    let firstOutput = true;
    const fileOutputStream = fs.createWriteStream(outputFilePath);
    const csvOutputStream = new stream.Writable({ objectMode: true});

    csvOutputStream._write = (chunk, encoding, callback) => {
        const outputCSV = papaparse.unparse([chunk], {
            header: firstOutput
        });
        fileOutputStream.write(outputCSV + "\n");
        firstOutput = false;
        callback();
    };
    csvOutputStream.on('finish', () => {
        fileOutputStream.end();
    });
    return csvOutputStream;
};

module.exports = openCsvOutputStream;