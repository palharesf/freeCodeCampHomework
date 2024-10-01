// Exercise permalink: https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-bar-chart
// Codepen link: https://codepen.io/fernandopa/pen/BaXjRgw

//Importing dependencies
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Set-up the DOM Content Loaded event Listener - this ensures the code within just runs once we've resolved the API call
document.addEventListener('DOMContentLoaded', function() {
  fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
    .then(response => response.json())
    .then(data => {
      const rawData = data;
      // Map the rawData, which is an array of arrays, into a dataset array containing one object for each entry in our list with two key pair values, date and gdp
      const dataset = rawData.data.map(d => ({date: new Date(d[0]), gdp: d[1]}));
    
      // Setup the svg canvas reference values that will be used later in the code
      const w = 800;
      const h = 400;
      const padding = 40;
      
      // With the mapped data, build the scales using domain and range
      const xScale = d3.scaleTime()
                       .domain(d3.extent(dataset, d => d.date))
                       .range([padding, w - padding]);
      
      const yScale = d3.scaleLinear()
                       .domain([0, d3.max(dataset, d => d.gdp)])
                       .range([h - padding, padding]);
      
      // Setup the svg canvas with the reference values set previously
      const svg = d3.select("body")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);
    
      // Create the tooltip as a separate entity
      const tooltip = d3.select("body")
                        .append("div")
                        .attr("id", "tooltip")
    
      // Create the actual bars using the gdpData and the scales built previously      
      svg.selectAll("rect")
         .data(dataset)
         .enter()
         .append("rect")
         .attr("class","bar")
         .attr("data-date", d => d.date.toISOString().slice(0,10))
         .attr("data-gdp", d => d.gdp)
         .attr("x", d => xScale(d.date))
         .attr("y", d => yScale(d.gdp))
         .attr("width", (w - 2*padding) / dataset.length)
         .attr("height", d => h - padding - yScale(d.gdp))
         .attr("fill", "steelblue")

         // Setup the tooltip to appear on mouseover and disappear on mouseout          
         .on("mouseover", function(event, d) {
  tooltip.style("opacity", 0.9)
         .html(`Date: ${d.date.toISOString().slice(0,10)}<br/>GDP: $${d.gdp} Billion`)
         .attr("data-date", d.date.toISOString().slice(0,10))
         .style("left", (event.pageX + 10) + "px")
         .style("top", (event.pageY - 28) + "px");
         })
         .on("mouseout", function() {
           tooltip.style("opacity", 0);
         })

      // Add x-axis
      svg.append("g")
         .attr("id", "x-axis")
         .attr("class", "tick")
         .attr("transform", `translate(0, ${h - padding})`)
         .call(d3.axisBottom(xScale));

      // Add y-axis
      svg.append("g")
         .attr("id", "y-axis")
         .attr("class", "tick")
         .attr("transform", `translate(${padding}, 0)`)
         .call(d3.axisLeft(yScale));
    })
    .catch(error => console.error('Error fetching data:', error));
});





// HTML

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="title">Bar Chart</title>
</head>
<body>
    
</body>
</html>




// CSS

.bar:hover {
  fill: brown;
}
