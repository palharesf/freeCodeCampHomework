// Exercise permalink: https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-scatterplot-graph
// Codepen link: https://codepen.io/fernandopa/pen/OJKMKpd

//Importing dependencies
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Set-up the DOM Content Loaded event Listener - this ensures the code within just runs once we've resolved the API call
document.addEventListener('DOMContentLoaded', function() {
  fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
    .then(response => response.json())
    .then(data => {
    // The data already comes as an array filled with objects, so we can access its keys directly
    
    //console.log(data[0]);
          
    // Setup the svg canvas reference values that will be used later in the code
      const w = 800;
      const h = 400;
      const padding = 40;
    
    // Create a time formatter function that will be used in the y-axis
    const formatTime = d3.timeFormat("%M:%S");
    function formatMinutes(minutes) {
      const mins = Math.floor(minutes);
      const secs = Math.round((minutes - mins) * 60);
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
      
    // Build the scales using domain and range. Remember to set scaleTime and scaleLinear accordingly. I chose a manual domain that fits all the data points instead of relying on automatic calculations. For the y-axis, thou, I built in a 10% padding automatically
    const xScale = d3.scaleLinear()
                     .domain([1993,2015])
                     .range([padding, w - padding]);
      
    const yExtent = d3.extent(data, d => (d.Seconds/60));
    const yPadding = (yExtent[1] - yExtent[0]) * 0.05; // 5% padding
    const yScale = d3.scaleLinear()
                     .domain([Math.ceil(yExtent[1] + yPadding), Math.floor(yExtent[0] - yPadding)])
                     .range([h - padding, padding]);
      
    // Setup the svg canvas with the reference values set previously
    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

    // Create a title
    svg.append("text")
       .attr("x", w / 2) // Centering the title
       .attr("y", padding / 2) // Padding from the top
       .attr("text-anchor", "middle")
       .attr("class", "chart-title")
       .text("Cyclist Performance Over Time");
    
    // Create a legend
    const legend = svg.append("g")
                  .attr("id", "legend")
                  .attr("transform", `translate(${w - padding * 5}, ${padding})`);
    
          legend.append("circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", 5)
                .attr("fill", "steelblue");

          legend.append("text")
                .attr("x", 10)
                .attr("y", 5)
                .text("No doping allegations");

          legend.append("circle")
                .attr("cx", 0)
                .attr("cy", 20)
                .attr("r", 5)
                .attr("fill", "orange");

          legend.append("text")
                .attr("x", 10)
                .attr("y", 25)
                .text("Doping allegations");

    // Add x-axis
    svg.append("g")
        .attr("id", "x-axis")
        .attr("class", "tick")
        .attr("transform", `translate(0, ${h - padding})`)
        .call(d3.axisBottom(xScale)
            .ticks(10,"d"));

    // Add y-axis
    svg.append("g")
        .attr("id", "y-axis")
        .attr("class", "tick")
        .attr("transform", `translate(${padding}, 0)`)
        .call(d3.axisLeft(yScale)
            .ticks(8)
            .tickFormat(formatMinutes));

    // Create the tooltip as a separate entity
      const tooltip = d3.select("body")
                        .append("div")
                        .attr("id", "tooltip")
      
    // Create the actual dots using the Year, TimeSeconds and the scales built previously      
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class","dot")
        .attr("data-xvalue",(d) => d.Year)
        .attr("data-yvalue",(d) => Date(d.Seconds/60))
        .attr("cx", d => xScale(d.Year))
        .attr("cy", d => yScale(d.Seconds/60))
        .attr("r", 5)
        .attr("fill", (d) => d.Doping === "" ? "steelblue" : "orange")
    
    // Setup the tooltip to appear on mouseover and disappear on mouseout
         .on("mouseover", function(event, d) {
            tooltip.style("opacity", 0.9)
            .html(`${d.Name}, ${d.Nationality}<br/>Year: ${d.Year}, Time: ${d.Time}<br><br>${d.Doping}`)
            .attr("data-year", d.Year)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
         .on("mouseout", function() {
            tooltip.style("opacity", 0);
         });
    })
    .catch(error => console.error('Error fetching data:', error));
});
