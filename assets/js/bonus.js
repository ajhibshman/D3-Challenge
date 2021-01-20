// bonus Chart
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

var svg1 = d3.select("#scatter2")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup1 = svg1.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//initial axis:
var chosenXAxis = "income";
var chosenYAxis = "obesity";

function xScale(chartData1,chosenXaxis){
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(chartData1, d => d[chosenXaxis])*.9,d3.max(chartData1, d => d[chosenXaxis])*1.1])
      .range([0, width]);
    return xLinearScale;
}

function yScale(chartData1,chosenYaxis){
    var yLinearScale = d3.scaleLinear()
          .domain([d3.min(chartData1, d => d[chosenYaxis])*.9,d3.max(chartData1, d => d[chosenYaxis])*1.1])
          .range([height, 0]);
        return yLinearScale;

}

function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
}

function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
}

function renderCircles(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]))
      
  
    return circlesGroup;
}

function renderCirclesy(circlesGroup, newYScale, chosenYAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cy", d => newYScale(d[chosenYAxis]))
      
  
    return circlesGroup;
}

function renderLables(label, xLinearScale, chosenXAxis) {

     label.transition()
         .duration(1000)
         .attr("x", d => xLinearScale(d[chosenXAxis]))
         
     return label;
}
function renderLablesy(label, yLinearScale, chosenYAxis) {

    label.transition()
        .duration(1000)
        .attr("y", d => yLinearScale(d[chosenYAxis]))
        
    return label;
}
// const label = chartGroup1.append("g")      
//       .selectAll("text")
//       .data(chartData1)
//       .join("text")
//       .classed("stateText",true)
//       .attr("x", d => xLinearScale(d[chosenXAxis]))
//       .attr("y", d => yLinearScale(d[chosenYAxis]))      
//       .text(d => d.abbr);
//}


// function updateToolTip(chosenYAxis, circlesGroup) {

//   var label;

//   if (chosenYAxis === "income") {
//     label = "Income:";
//   }
//   else {
//     label = "AGE:";
//   }

//   var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(d) {
//       return (`${d.state}<br>${label} ${d[chosenXAxis]}`);
//     });

//   circlesGroup.call(toolTip);

//   circlesGroup.on("mouseover", function(data) {
//     toolTip.show(data);
//   })
//     // onmouseout event
//     .on("mouseout", function(data, index) {
//       toolTip.hide(data);
//     });

//   return circlesGroup;
// }



// Import Data
d3.csv("assets/data/data.csv").then(function(chartData1) {
    console.log(chartData1);
    //cast data 
    chartData1.forEach(function(data1) {
        data1.income = +data1.income;
        data1.healthcare = +data1.healthcare;
        data1.obesity =+data1.obesity;
        data1.age=+data1.age;
        
    });

    var xLinearScale=xScale(chartData1, chosenXAxis);
    var yLinearScale=yScale(chartData1, chosenYAxis);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup1.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup1.append("g")
        .call(leftAxis);
    
    var circlesGroup = chartGroup1.selectAll("circle")
    .data(chartData1)
    .enter()
    .append("circle")
    .classed("stateCircle",true)
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", "15")
       
    // Create group for two x-axis labels
    var labelsGroup1 = chartGroup1.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var incomeLabel1 = labelsGroup1.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "income") // value to grab for event listener
        .classed("active", true)
        .text("Income");

    var ageLabel1 = labelsGroup1.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "age") // value to grab for event listener
        .classed("inactive", true)
        .text("Age");

    // Create group for two Y-axis labels
    var labelsGroup2 = chartGroup1.append("g")
        .attr("transform", "rotate(-90)");

    var obesityLabel = labelsGroup2.append("text")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("value", "obesity") // value to grab for event listener
        .classed("active", true)
        .text("Obesity)");

    var healthcareLabel = labelsGroup2.append("text")
        .attr("y", 0 - margin.left + 20)
        .attr("x", 0 - (height / 2))
        .attr("value", "healthcare") // value to grab for event listener
        .classed("inactive", true)
        .text("Lacking Healthcare");

    // updateToolTip function above csv import
    // var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

     
    var label = chartGroup1.append("g")      
      .selectAll("text")
      .data(chartData1)
      .join("text")
      .classed("stateText",true)
      .attr("x", d => xLinearScale(d[chosenXAxis]))
      .attr("y", d => yLinearScale(d[chosenYAxis]))      
      .text(d => d.abbr);

    chartGroup1.append("text")
      .attr("transform", `translate(${width / 2}, ${0-30})`)
      .attr("class", "aText")
      .text("Bonus Chart");

    
    // x axis labels event listener
    labelsGroup1.selectAll("text")
        .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {

            // replaces chosenXAxis with value
            chosenXAxis = value;

            // console.log(chosenXAxis)

            // functions here found above csv import
            // updates x scale for new data
            xLinearScale = xScale(chartData1, chosenXAxis);

            // updates x axis with transition
            xAxis = renderXAxes(xLinearScale, xAxis);

            // updates circles with new x values
            circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

            // updates tooltips with new info
            // circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
            label = renderLables(label, xLinearScale, chosenXAxis);
            // label.selectAll("text")
            //     .transition()
            //     .duration(1000)
            //     .attr ("x", d => xLinearScale(d[chosenXAxis]));
        // changes classes to change bold text
            if (chosenXAxis === "income") {
                incomeLabel1
                .classed("active", true)
                .classed("inactive", false);
                ageLabel1
                .classed("active", false)
                .classed("inactive", true);
            }
            else {
                incomeLabel1
                .classed("active", false)
                .classed("inactive", true);
                ageLabel1
                .classed("active", true)
                .classed("inactive", false);
            }
        }
    });

    // y axis labels event listener
    labelsGroup2.selectAll("text")
        .on("click", function() {
        // get value of selection
        var value1 = d3.select(this).attr("value");
        if (value1 !== chosenYAxis) {

            // replaces chosenXAxis with value
            chosenYAxis = value1;

            // console.log(chosenXAxis)

            // functions here found above csv import
            // updates x scale for new data
            yLinearScale = yScale(chartData1, chosenYAxis);

            // updates x axis with transition
            yAxis = renderYAxes(yLinearScale, yAxis);

            // updates circles with new x values
            circlesGroup = renderCirclesy(circlesGroup, yLinearScale, chosenYAxis);

            // updates tooltips with new info
            // circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
            // label = renderLables(label, ylinearScale, chosenYAxis)
            label = renderLablesy(label, yLinearScale, chosenYAxis);
        // changes classes to change bold text
            if (chosenYAxis === "obesity") {
                obesityLabel
                .classed("active", true)
                .classed("inactive", false);
                healthcareLabel
                .classed("active", false)
                .classed("inactive", true);
            }
            else {
                obesityLabel
                .classed("active", false)
                .classed("inactive", true);
                healthcareLabel
                .classed("active", true)
                .classed("inactive", false);
            }
        }
    });

});