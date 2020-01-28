const fs = require("fs");

function ReadAndWrite(filePath) {
    this.filePath = filePath;

    this.readAllRecords = function() {
        const content = fs.readFileSync(this.filePath, "utf-8").split("\n");
        const records = content.slice(0, content.length - 1);
        return records.map(record => JSON.parse(record));
    };

    this.appendRecords = function(records) {
        let recordsString = "";
        for (let record of records) {
            recordsString += `${JSON.stringify(record)}\n`;
        }
        fs.appendFileSync(this.filePath, recordsString);
    };

    this.writeRecords = function(records) {
        let recordsString = "";
        for (let record of records) {
            recordsString += `${JSON.stringify(record)}\n`;
        }
        fs.writeFileSync(this.filePath, recordsString);
    };

    this.deleteRecord = function(id) {
        let recordsString = "";
        const refactoredRecords = this.readAllRecords(this.filePath).filter(record => {
            if (record[id.key] !== id.value) {
                recordsString += `${JSON.stringify(record)}\n`;
            }
            return record[id.key] !== id.value
        });
        fs.writeFileSync(this.filePath, recordsString);
        return refactoredRecords;
    };

    this.editRecord = function(id, recordIdArray) {
        let recordsString = "";
        const refactoredRecords = this.readAllRecords(this.filePath).map(record => {
            if (record[id.key] === id.value) {
                for (let recordId of recordIdArray) {
                    record[recordId.key] = recordId.value;
                }
            }

            recordsString += `${JSON.stringify(record)}\n`;
            return record;
        });
        fs.writeFileSync(this.filePath, recordsString);
        return refactoredRecords;
    };
}

module.exports.ReadAndWrite = ReadAndWrite;