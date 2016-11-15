/* ----------------------------------------------------------------------------
File: BarGraphSample.js
Contructs the Bar Graph using D3
80 characters perline, avoid tabs. Indet at 4 spaces. See google style guide on
JavaScript if needed.
-----------------------------------------------------------------------------*/ 

// Search "D3 Margin Convention" on Google to understand margins.
// Add comments here in your own words to explain the margins below (.25 point)
var margin = {top: 10, right: 40, bottom: 150, left: 50},
    width = 760 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    

// Define SVG. "g" means group SVG elements together.
// Confused about SVG still, see Chapter 3. 
// Add comments here in your own words to explain this segment of code (.25 point)
var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/* --------------------------------------------------------------------
SCALE and AXIS are two different methods of D3. See D3 API Refrence and 
look up SVG AXIS and SCALES. See D3 API Refrence to understand the 
difference between Ordinal vs Linear scale.
----------------------------------------------------------------------*/ 

// Define X and Y SCALE.
// Add comments in your own words to explain the code below (.25 point)
var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

var yScale = d3.scale.linear()
    .range([height, 0]);

// Define X and Y AXIS
// Define tick marks on the y-axis as shown on the output with an interval of 5 and $ sign(1 point)
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");
    

var yAxis = d3.svg.axis() 
    .scale(yScale)
    .orient("left")
    .ticks(5, "$");
    

/* --------------------------------------------------------------------
To understand how to import data. See D3 API refrence on CSV. Understand
the difference between .csv, .tsv and .json files. To import a .tsv or
.json file use d3.tsv() or d3.json(), respectively.
----------------------------------------------------------------------*/ 



// data.csv contains the country name(key) and its GDP(value)
// 1 point for explaining the code for reading the data
d3.csv("GDP2016TrillionUSDollars.csv",function(error, data){
    data.forEach(function(d) {
        d.key = d.key;
        d.value = +d.value;
    });

    
    // Return X and Y SCALES (domain). See Chapter 7:Scales (Scott M.) 
    // .25 point for explaining the code below
    xScale.domain(data.map(function(d){ return d.key; }));
    yScale.domain([0,d3.max(data, function(d) {return d.value; })]);
    
    // Creating rectangular bars to represent the data. 
    // Add comments to explain the code below (no points but there may be a quiz in future)
    
    //draw the bars
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr("height", 0) 
        .attr("y", height)
        .transition().duration(3000)
        .delay(function(d,i) { return i* 200;})
        .attr({
            "x": function(d) { return xScale(d.key); },
            "y": function(d) { return yScale(d.value); },
            "width": xScale.rangeBand(),
            "height": function(d) { return  height - yScale(d.value); },
            // create increasing to decreasing shade of blue as shown on the output (2 points)
        })
        .style("fill" , function(d,i) {return 'rgb(20,20, ' + ((i*30) +100)+ ')'})
    
    // Label the data values(d.value) (3 points)
  
    svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
	.transition().duration(1000)
        .delay( function(d,i) {
			return i * 200;
		})
    .text(function(d) {return d.value;})
    .attr('x' , function(d) {return xScale(d.key)+ xScale.rangeBand()/2;})
    .attr('y' , function(d) {return yScale(d.value) + 12;})
    .style("fill", "white")
    .style("text-anchor", "middle")
    
    
    
    // Draw xAxis and position the label at -60 degrees as shown on the output (1 point)
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-60)")
        .attr("dx", "-.8em")
        .attr("dy", ".25em")
        .style("text-anchor", "end")
        .attr("font-size", "10px");
        
    
    // Draw yAxis and postion the label (2 points)

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .style("font-size", "10px")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("dy", ".25em")
        .style("text-anchor", "end")
        .text("Trillions of US Dollars ($)");
});

   
    