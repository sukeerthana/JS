var fs = require("fs");
var inputfile = "Indicators.csv";
var object = {};
var headers = [];
var array = [];
var isHeader = true;

var reader = function(fileName) {
    for (var d = 0; d <= 55; d++) {
        array[d] = {
            year: parseInt(d) + 1960,
            male: 0,
            female: 0
        };

    }
    var inStream = fs.createReadStream(fileName);
    /*---------------------------creating json file------------------------------*/
    var writeStream = fs.createWriteStream('Allasia.json');

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
            if ((object["CountryName"].indexOf("Asia")) || (object["CountryName"].equals("India")) || (object["CountryName"].equals("Iceland")) || (object["CountryName"].equals("Afghanistan")) ||
                (object["CountryName"].equals("Armenia")) || (object["CountryName"].equals("Azerbaijan")) || (object["CountryName"].equals("Bangladeesh")) || (object["CountryName"].equals(" Bhutan")) || (object["CountryName"].equals("Cambodia")) || (object["CountryName"].equals(" China")) || (object["CountryName"].equals("Georgia")) || (object["CountryName"].equals("Indonesia")) || (object["CountryName"].equals("Iran")) || (object["CountryName"].equals("Iraq")) || (object["CountryName"].equals("Israel")) || (object["CountryName"].equals("Japan")) || (object["CountryName"].equals("Kazakhstan")) || (object["CountryName"].equals("Kuwait")) ||
                (object["CountryName"].equals("Maldives")) || (object["CountryName"].equals("Mongolia")) || (object["CountryName"].equalsIgnorase("North Korea")) || (object["CountryName"].equals("Israel")) != -1) {
                // console.log(true);
                for (var j = 0; j <= 55; j++) {
                    if (array[j].year == object["Year"]) {
                        if (object["IndicatorName"] == "Life expectancy at birth, female (years)") {
                            array[j].female += parseFloat(object["Value"]);

                        }
                    }
                }
            }

            if ((object["CountryName"].indexOf("Asia")) || (object["CountryName"].equals("India")) || (object["CountryName"].equals("Iceland")) || (object["CountryName"].equals("Afghanistan")) ||
                (object["CountryName"].equals("Armenia")) || (object["CountryName"].equals("Azerbaijan")) || (object["CountryName"].equals("Bangladeesh")) || (object["CountryName"].equals(" Bhutan")) || (object["CountryName"].equals("Cambodia")) || (object["CountryName"].equals(" China")) || (object["CountryName"].equals("Georgia")) || (object["CountryName"].equals("Indonesia")) || (object["CountryName"].equals("Iran")) || (object["CountryName"].equals("Iraq")) || (object["CountryName"].equals("Israel")) || (object["CountryName"].equals("Japan")) || (object["CountryName"].equals("Kazakhstan")) || (object["CountryName"].equals("Kuwait")) ||
                (object["CountryName"].equals("Maldives")) || (object["CountryName"].equals("Mongolia")) || (object["CountryName"].equalsIgnorase("North Korea")) || (object["CountryName"].equals("Israel")) != -1) {
                // console.log(true);
                for (var j = 0; j <= 55; j++) {
                    if (array[j].year == object["Year"]) {
                        if (object["IndicatorName"] == "Life expectancy at birth, male (years)") {
                            array[j].male += parseFloat(object["Value"]);

                        }
                    }
                }
            }

        }
    });
    inStream.on("end", function() {
        for (var k = 0; k <= 55; k++) {
            writeStream.write(JSON.stringify(array[k]));

        }

    });
};
reader(inputfile);
