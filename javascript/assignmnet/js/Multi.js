// set the dimensions and margins of the graph
var margin = {top: 30, right: 40, bottom: 30, left: 20},
   width = 1400 - margin.left - margin.right,
   height = 500 - margin.top - margin.bottom;

// set the ranges
var x=d3.scaleTime().range([0,width]);
var y=d3.scaleLinear().range([height,0]);

// define the 1st line
var valueline = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.birthdate); });

// define the 2nd line
var valueline2 = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.deathrate); });


    // append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    // Get the data
d3.csv("./js/india.json", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.year = +d.year;
      d.birthrate = +d.birthdate;
      d.deathrate = +d.deathrate;
  });

  x.domain(d3.extent(data, function(d) { return d.year; }));
    
    y.domain([0, d3.max(data, function(d) {
    return Math.max(d.birthdate, d.deathrate); })]);
    // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the valueline2 path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "red")
      .attr("d", valueline2);
// Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});
