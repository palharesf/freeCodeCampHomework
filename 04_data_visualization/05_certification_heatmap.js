// Exercise permalink: https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-heat-map
// Codepen link: https://codepen.io/fernandopa/pen/xxvOKqz?editors=0010

//Importing dependencies
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
  .then(response => response.json())
  .then(data => {
    //console.log(data);
  
    // Setup reference values
    const w = 800;
    const h = 400;
    const padding = w/10;
    const yearsRange = d3.extent(data.monthlyVariance.map((d) => d.year));
    const cellsW = w/(yearsRange[1]-yearsRange[0]+1);
    const monthRange = d3.extent(data.monthlyVariance.map((d) => d.month));
    const cellsH = h/(monthRange[1]-monthRange[0]+1);
    const baseTemp = data.baseTemperature;
    const maxVar = d3.max(data.monthlyVariance.map((d) => d.variance));
    
    // I'll use this block to work a little bit around the data. The first thing is to find the  thresholds to be used for the legend and color-coding. The math here is self-explanatory
    const variationExtent = d3.extent(data.monthlyVariance.map((d) => d.variance));
    const varianceRange = variationExtent[1]-variationExtent[0];
    const thresholds = [];
    for (let i = 0; i <= 8; i++) {
      const value = variationExtent[0] + (varianceRange / 8) * i;
      thresholds.push(Number(value.toFixed(3)));
    };  
  
    // Define color scale
    const colorScale = d3.scaleLinear()
    .domain([0, 8])
    .range(["#0ecbf0", "#f00e0e"])
    .interpolate(d3.interpolateRgb);
    const colorArray = d3.range(9).map(i => colorScale(i));
  
   // Here I create a function that translates between a month index and its full string name
    const monthMapping = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    };
    const getMonthName = (number) => monthMapping[Math.round(number)] || '';
  
  // Here I create a function that takes in a d.variance value and finds the corresponding index in the threshold array
    const getColorIndex = (variance) => {
      let colorIndex = 0;
      if (variance == maxVar) {
        return 8;
      }
      while (colorIndex < thresholds.length && variance >= thresholds[colorIndex])
      {
        colorIndex++;
      }
      return colorIndex;
    };
  
    const strippedData = [...data.monthlyVariance];  
    strippedData.forEach((d) => {
      d.month = d.month - 1;
      d.color = colorArray[getColorIndex(d.variance)];
    });

    // Setup the canvas
    const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

    // Setup the title
    svg.append("text")
      .attr("x", w / 2) // Centering the title
      .attr("y", padding / 3) // Padding from the top
      .attr("id","title")
      .attr("text-anchor", "middle")
      .attr("font-size","100%")
      .attr("class", "chart-title")
      .text("Monthly Global Land-Surface Temperature");
  
    // Setup the subtitle
    svg.append("text")
      .attr("x", w / 2) // Centering the title
      .attr("y", padding * 2 / 3) // Padding from the top
      .attr("id","description")
      .attr("text-anchor", "middle")
      .attr("font-size","80%")
      .attr("class", "chart-subtitle")
      .text("vs. 1753-2015 baseline (8.66℃)");
  
    // Setup the scales
    const xScale = d3.scaleLinear()
    .domain([yearsRange[0],yearsRange[1]])
    .range([padding, w - padding]);
      
    const yScale = d3.scaleLinear()
    .domain([11,0])
    .range([h - padding, padding]);

    // Setup the tooltip
    const tooltip = d3.select("body")
    .append("div")
    .attr("id", "tooltip")

    // Plot the data
    svg.selectAll("rect")
      .data(strippedData)
      .enter()
      .append("rect")
      .attr("class","cell")
      .attr("data-year",(d) => d.year)
      .attr("data-month",(d) => d.month)
      .attr("data-temp",(d) => baseTemp + d.variance)
      .attr("x", d => xScale(d.year))
      .attr("y", d => yScale(d.month) - (cellsH/2))
      .attr("width", cellsW)
      .attr("height", cellsH)
      .attr("fill", (d) => d.color)
  
            .on("mouseover", function(event, d) {
              tooltip.style("opacity", 0.9)
                .html(`Temperature: ${Math.round((baseTemp + d.variance) * 100) / 100}<br>Month: ${getMonthName(d.month)}<br>Year: ${d.year}`)
                .attr("data-year", d.year)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
    })
            .on("mouseout", function() {
              tooltip.style("opacity", 0);
            });
  
    // Setup the axes
    svg.append("g")
      .attr("id", "x-axis")
      .attr("class", "tick")
      .attr("transform", `translate(0, ${h - padding + (cellsH/2)})`)
      .call(d3.axisBottom(xScale)
            .ticks(10,"d"));
  
    svg.append("g")
      .attr("id", "y-axis")
      .attr("class", "tick")
      .attr("transform", `translate(${padding}, 0)`)
      .call(d3.axisLeft(yScale)
            .ticks(12)
            .tickFormat(getMonthName));
  
    // Setup the legend
    const legend = svg.append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${(w / 2) - ((9 * cellsW * 5) / 2)}, ${h - padding + 40})`);

    // Create 9 cells
    for (let i = 0; i < 9; i++) {
      legend.append("rect")
        .attr("x", i * 5 * cellsW)
        .attr("y", 0)
        .attr("width", 5 * cellsW)
        .attr("height", cellsH)
        .attr("fill", colorScale(i))
        .attr("stroke", "gray")
        .attr("stroke-width", 2);
    }
  
})
    .catch(error => console.error('Error fetching data:', error));