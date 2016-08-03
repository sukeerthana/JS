var fs = require("fs");
var inputfile = "Indicators.csv";
var array = [];
var isHeader = true;
var object = {};
var headers = [];
var reader = function(fileName) {
    for (var d = 0; d <= 55; d++) {
        array[d] = {
            year: parseInt(d) + 1960,
            birthrate: 0,
            deathrate: 0
        };
    }
    var inStream = fs.createReadStream(fileName);
    /*---------------------------creating json file------------------------------*/
    var writeStream = fs.createWriteStream('Indiadata.json');
    var readLine = require("readline").createInterface({
        input: inStream
    });
    /*---------------------------function for reading line by line------------------------------*/
    readLine.on("line", function(line) {
        var data = line.toString();
        if (isHeader) {
            headers = data.split(",");
            isHeader = false;
        } else {
             /*---------------------------for rest of the lines in the file------------------------------*/
            var lines;
            if (data.indexOf("\"")) {
                lines = data.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                var str = lines[2].toString();
                lines[2] = str.substring(1, str.length - 1);
            } else {
                lines = data.split(",");
            }
            for (var i = 0; i < lines.length; i++) {
                object[headers[i]] = lines[i];
            }
             /*---------------------------main logic for conditions------------------------------*/
            if (object["CountryName"].indexOf("India") != -1) {
                for (var j = 0; j <= 55; j++) {
                    if (array[j].year == object["Year"]) {
                        if (object["IndicatorName"] == "Birth rate, crude (per 1,000 people)") {
                            array[j].birthrate += parseFloat(object["Value"]);

                        }
                    }
                }
            }

            if (object["CountryName"].indexOf("India") != -1) {
                for (var j = 0; j <= 55; j++) {
                    if (array[j].year == object["Year"]) {
                        if (object["IndicatorName"] == "Death rate, crude (per 1,000 people)") {
                            array[j].deathrate += parseFloat(object["Value"]);

                        }
                    }
                }
            }
        }
    });
    inStream.on("end", function() {
        writeStream.write(JSON.stringify(array));
        console.log(array);
    });
};
reader(inputfile);
