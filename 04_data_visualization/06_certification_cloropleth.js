// Exercise permalink: https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-choropleth-map
// Codepen link: https://codepen.io/fernandopa/pen/oNKYBQK

// Importing dependencies
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as topojson from "https://esm.sh/topojson-client";

// Declare global variables to store the fetched data
let educationData;
let countyData;

// Function to fetch both datasets
function fetchData() {
  const educationPromise = fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json")
    .then(response => response.json());

  const countyPromise = fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json")
    .then(response => response.json());

  // Use Promise.all to fetch both datasets concurrently
  Promise.all([educationPromise, countyPromise])
    .then(([education, counties]) => {
      educationData = education;
      countyData = counties;
      
      // Call a function to process the data or update the UI
      processData();
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Function to process the data or update the UI
function processData() {
  // Converting TopoJSON into geoJSON
  const geoCountyData = topojson.feature(countyData,countyData.objects.counties);
  const {features} = geoCountyData;
  features.forEach((d, educationData) => {
    // Iterate through the features array, adding the bachelorsOrHigher value to it
  });
  //console.log(features);
    
  const w = 800;
  const h = 600;
  const padding = 40;

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

  // Setup the tooltip
  const tooltip = d3.select("body")
  .append("div")
  .attr("id", "tooltip")

  // Plot the data
  svg.append("path")
    .datum({type: "FeatureCollection", features: features})
    .attr("d", d3.geoPath());
}

// Call the fetchData function to start the process
fetchData();

// Finish tomorrow