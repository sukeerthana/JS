var fs = require("fs");
var file = "Indicators.csv";
var out = "top";
var object = {};
var headers = [];
var array = [];
var jsondata = [];
var flag = 0;
var k = 0;
var reader = function(fileName, output) {
    var inStream = fs.createReadStream(fileName); //createReadStream
    var writeStream = fs.createWriteStream(output + '.json'); //createWriteStream
    writeStream.write("[");
    //createInterface
    var readLine = require("readline").createInterface({
        input: inStream
    });
    readLine.on("line", function(line) {
        var data = line.toString();
        if (flag == 0) {
            headers = data.split(",");
            flag = 1;
        } else {
            var lines;
            if (data.indexOf('\"')) {
                lines = data.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                var str = lines[2].toString();
                lines[2] = str.substring(1, str.length - 1);
            } else {
                lines = data.split(",");
            }

            for (var i = 0; i < lines.length; i++) {
                object[headers[i]] = lines[i];
            }

            array.push(lines[0]);
            for (var i = 0; i < array.length; i++) {
                jsondata[i] = {
                    country: lines[0],
                    total: 0

                }
            }
            for (var j = 0; j < jsondata.length; j++) {
                if (jsondata.country == object["CountryName"]) {
                    if (object.IndicatorName == "Life expectancy at birth, total (years)") {
                        json.value = parseFloat(object[value]) + parseFloat(jsondata.total);
                    }
                }
            }

        }
    });
    //end stream
    inStream.on("end", function() {
        array.sort(function(obj1, obj2) {
            // Ascending: first age less than the previous
            return obj2.total - obj1.total;
        });
        var array1 = [];
        for (var i = 0; i < 5; i++) {
            array1[i] = array[i];
        }
        console.log(array1)
        output1.write(JSON.stringify(array1));


    });
};
reader(file, out);
