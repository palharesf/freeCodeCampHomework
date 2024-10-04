// Exercise permalink: https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-heat-map
// Codepen link: https://codepen.io/fernandopa/pen/xxvOKqz?editors=0010

//Importing dependencies
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
  .then(response => response.json())
  .then(data => {
      //console.log(data.monthlyVariance);
  
    // Setup the reference values for the canvas
    const w = 800;
    const h = 400;
    const padding = 40;
    const cellsW = w/(2015-1753);
    const cellsH = h/12;

    // I'll use this block to work a little bit around the data. The first thing is to find the  thresholds to be used for the legend and color-coding. The math here is self-explanatory
    const variance = data.monthlyVariance.map((d) => d.variance);
      //console.log(variance);
    const variationExtent = d3.extent(variance);
      //console.log("Variation Extent:", variationExtent);
    const varianceRange = variationExtent[1]-variationExtent[0];
    const thresholds = [];
      //console.log(thresholds);

    for (let i = 0; i <= 8; i++) {
      const value = variationExtent[0] + (varianceRange / 8) * i;
      thresholds.push(Number(value.toFixed(2)));
    };  
      //console.log(thresholds);

    // Setup the canvas
    const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

    // Setup the title
    svg.append("text")
      .attr("x", w / 2) // Centering the title
      .attr("y", padding / 2) // Padding from the top
      .attr("id","title")
      .attr("text-anchor", "middle")
      .attr("font-size","100%")
      .attr("class", "chart-title")
      .text("Monthly Global Land-Surface Temperature");
  
    // Setup the subtitle
    svg.append("text")
      .attr("x", w / 2) // Centering the title
      .attr("y", padding) // Padding from the top
      .attr("id","description")
      .attr("text-anchor", "middle")
      .attr("font-size","80%")
      .attr("class", "chart-subtitle")
      .text("vs. 1753-2015 baseline (8.66℃)");

    // Setup the legend
    const legend = svg.append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${w - padding * 5}, ${padding})`);
  
    // Define color scale
    const colorScale = d3.scaleLinear()
    .domain([0, 8])
    .range(["#0ecbf0", "#f0960e"])
    .interpolate(d3.interpolateHcl);

    // Create 9 cells
    for (let i = 0; i < 9; i++) {
      legend.append("rect")
        .attr("x", i * 5 * cellsW)
        .attr("y", 300)
        .attr("width", 5 * cellsW)
        .attr("height", cellsH)
        .attr("fill", colorScale(i))
        .attr("stroke", "gray")
        .attr("stroke-width", 2);
    }
  
    // Setup the scales
    const xScale = d3.scaleLinear()
    .domain([1753,2015])
    .range([padding, w - padding]);
      
    const yScale = d3.scaleLinear()
    .domain([12,1])
    .range([h - padding, padding]);

    // Setup the axes
    svg.append("g")
      .attr("id", "x-axis")
      .attr("class", "tick")
      .attr("transform", `translate(0, ${h - padding})`)
      .call(d3.axisBottom(xScale)
            .ticks(10,"d"));
  
    svg.append("g")
      .attr("id", "y-axis")
      .attr("class", "tick")
      .attr("transform", `translate(${padding}, 0)`)
      .call(d3.axisLeft(yScale)
            .ticks(12));

    // Setup the tooltip
    const tooltip = d3.select("body")
    .append("div")
    .attr("id", "tooltip")

    // Plot the data
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class","cell")
      .attr("data-year",(d) => d.monthlyVariance.year)
      .attr("data-month",(d) => d.monthlyVariance.month)
      .attr("data-temp",(d) => 8.66 + d.monthlyVariance.variance)
      .attr("x", d => xScale(d.monthlyVariance.year))
      .attr("y", d => yScale(d.monthlyVariance.month))
      .attr("width", cellsW)
      .attr("height", cellsH)
      .attr("fill", (d) => {
        const variance = d.monthlyVariance.variance;
        const colorIndex = threshold.findIndex(t => variance < t);
        return colorScale(colorIndex === -1 ? 8 : colorIndex);
      })
            .on("mouseover", function(event, d) {
              tooltip.style("opacity", 0.9)
                .html(`Temperature: ${8.66 + d.monthlyVariance.variance}, Time: ${d.Time}<br><br>${d.Doping}`)
                .attr("data-year", d.monthlyVariance.year)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
    })
            .on("mouseout", function() {
              tooltip.style("opacity", 0);
            });
  
})
    .catch(error => console.error('Error fetching data:', error));