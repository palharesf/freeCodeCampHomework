// Exercise permalink: https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-choropleth-map
// Codepen link: https://codepen.io/fernandopa/pen/oNKYBQK

// Importing dependencies
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as topojson from "https://esm.sh/topojson-client";

// Function to fetch both datasets
async function fetchData() {
  try {
    const [educationResponse, countyResponse] = await Promise.all([
      fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"),
      fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json")
    ]);
    
    const educationData = await educationResponse.json();
    const countyData = await countyResponse.json();
    
    processData(educationData, countyData);
    }
  catch (error) {
    console.error('Error fetching data:', error);
  }
}      

// Function to process the data or update the UI
function processData(educationData, countyData) {
  
  // Converting TopoJSON into geoJSON
  const geoCountyData = topojson.feature(countyData,countyData.objects.counties);
  const {features} = geoCountyData;
  features.forEach((feat) => {
    const countyData = educationData.find((edu) => feat.id === edu.fips);
    feat.educationLevel = countyData.bachelorsOrHigher;
    feat.countyName = countyData.area_name + ", " + countyData.state;
  });
    
  const w = 1000;
  const h = 600;
  const padding = 40;
  const legendSide = h / 25;
   
  // Setup the color scale
  const colorScale = d3.scaleLinear()
    .domain([0, 3])
    .range(["#c07272", "#72c083"])
    .interpolate(d3.interpolateRgb);
  const colorArray = d3.range(4).map(i => colorScale(i));
  features.forEach((feat) => {
    switch (true) {
      case (feat.educationLevel < 10):
        feat.color = colorArray[0];
        break;
      case (feat.educationLevel < 20):
        feat.color = colorArray[1];
        break;
      case (feat.educationLevel < 30):
        feat.color = colorArray[2];
        break;
      default:
        feat.color = colorArray [3];
    }
  });
  
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
    .attr("font-size","150%")
    .attr("class", "chart-title")
    .text("United States Educational Attainment");

  // Setup the subtitle
  svg.append("text")
    .attr("x", w / 2) // Centering the title
    .attr("y", padding) // Padding from the top
    .attr("id","description")
    .attr("text-anchor", "middle")
    .attr("font-size","80%")
    .attr("class", "chart-subtitle")
    .text("% of adults 25+ with bachelor or higher (2010-2014)");
  
  // Setup the legend
  const legendText = ["<10%","<20%","<30%",">30%"]
  
  const legend = svg.append("g")
  .attr("id", "legend")
  .attr("transform", `translate(${(0.8 * w)}, ${0})`);
  
  for (let i = 0; i < 4; i++) {
      legend.append("rect")
        .attr("x", -legendSide * i)
        .attr("y", 0)
        .attr("width", legendSide)
        .attr("height", legendSide)
        .attr("fill", colorScale(3-i))
        .attr("stroke", "gray")
        .attr("stroke-width", 2);
    
      legend.append("text")
        .attr("x", -legendSide * i)
        .attr("y", 1.5 * legendSide)
        .style("font-size","9px")
        .text(legendText[3-i])
    }
  
  // Setup the tooltip
  const tooltip = d3.select("body")
  .append("div")
  .attr("id", "tooltip")

  // Plot the data
  svg.selectAll("path")
    .data(features)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("fill", d => d.color)
    .attr("data-fips", d => d.id)
    .attr("data-education", d => d.educationLevel)
    .on("mouseover", (event, d) => { 
    tooltip.style("opacity", 0.9)
      .html(`${d.countyName}: ${d.educationLevel}%`)
      .attr("data-education", d.educationLevel)
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY - 28) + "px")
      .style("font-family","Helvetica, sans-serif");
      })
    .on("mouseout", () => {
    tooltip.style("opacity", 0);
      });  
};

// Call the fetchData function to start the process
fetchData();