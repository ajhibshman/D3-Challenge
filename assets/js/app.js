// Basic Chart
// create SVG element and group
var svgWidth = 960;
var svgHeight = 800;

var margin = {
  top: 50,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(chartData) {
    console.log(chartData);
    //cast data 
    chartData.forEach(function(data) {
        data.income = +data.income;
        data.healthcare = +data.healthcare;
        
      });
    //check data 
    var income = chartData.map(d=>d.income);
    var healthcare = chartData.map(d=>d.healthcare);
    console.log(income);
    console.log(healthcare);

    //create scale and axis functions, append to chart 
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(chartData, d => d.income)-2000,d3.max(chartData, d => d.income)+2000])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(chartData, d => d.healthcare)-1,d3.max(chartData, d => d.healthcare)+1])
      .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    //create scatter plot (circles)
    var circlesGroup = chartGroup.selectAll("circle")
    .data(chartData)
    .enter()
    .append("circle")
    .classed("stateCircle",true)
    .attr("cx", d => xLinearScale(d.income))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    
    
    // add name labels
    // console.log(chartData.map(d=>d.abbr))
    // var textGroup = chartGroup.selectAll("text")
    //   .data(chartData)
    //   .enter()
    //   .append("text")
    //   .classed("stateText",true)
    //   .text(d=>d.abbr)
    //   .attr("x", d => xLinearScale(d.income))
    //   .attr("y", d => yLinearScale(d.healthcare)+6);
    const label = chartGroup.append("g")      
      .selectAll("text")
      .data(chartData)
      .join("text")
      .classed("stateText",true)
      .attr("x", d => xLinearScale(d.income))
      .attr("y", d => yLinearScale(d.healthcare)+6)      
      .text(d => d.abbr);

    // add axis and chart titles
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "aText")
      .text("Lacking Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 0})`)
      .attr("class", "aText")
      .text("Income (USD)");

      chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${0-30})`)
      .attr("class", "aText")
      .text("Basic Chart");




});