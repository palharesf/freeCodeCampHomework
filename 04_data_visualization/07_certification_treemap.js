// Exercise permalink: https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-treemap-diagram
// Codepen link: https://codepen.io/fernandopa/pen/wvVJrjE

// Important to-do: configure word wrap

// Importing dependencies
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

fetch(
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"
)
  .then((response) => response.json())
  .then((data) => {
    // Setup reference values
    const w = 960;
    const h = 700;
    const padding = {
        top: 50,    // Space for title and subtitle
        right: 10,
        bottom: 100, // Space for legend
        left: 10
    };
    const legendWidth = w - padding.left - padding.right;
    const legendItemWidth = legendWidth / 18;

    // Setup color reference
    const colorScale = {
      "2600": "rgb(244, 67, 54)",
      "Wii": "rgb(232, 30, 99)",
      "NES": "rgb(156, 39, 176)",
      "GB": "rgb(103, 58, 183)",
      "DS": "rgb(63, 81, 181)",
      "X360": "rgb(33, 150, 243)",
      "PS3": "rgb(3, 169, 244)",
      "PS2": "rgb(0, 188, 212)",
      "SNES": "rgb(0, 150, 136)",
      "GBA": "rgb(76, 175, 80)",
      "PS4": "rgb(139, 195, 74)",
      "3DS": "rgb(205, 220, 57)",
      "N64": "rgb(255, 235, 59)",
      "PS": "rgb(255, 193, 7)",
      "XB": "rgb(255, 152, 0)",
      "PC": "rgb(255, 87, 34)",
      "PSP": "rgb(255, 255, 255)",
      "XOne": "grey"
    };
    const colorIndex = [
      "rgb(244, 67, 54)",
      "rgb(232, 30, 99)",
      "rgb(156, 39, 176)",
      "rgb(103, 58, 183)",
      "rgb(63, 81, 181)",
      "rgb(33, 150, 243)",
      "rgb(3, 169, 244)",
      "rgb(0, 188, 212)",
      "rgb(0, 150, 136)",
      "rgb(76, 175, 80)",
      "rgb(139, 195, 74)",
      "rgb(205, 220, 57)",
      "rgb(255, 235, 59)",
      "rgb(255, 193, 7)",
      "rgb(255, 152, 0)",
      "rgb(255, 87, 34)",
      "rgb(255, 255, 255)",
      "grey"
    ];
    const platformIndex = [
      "2600",
      "Wii",
      "NES",
      "GB",
      "DS",
      "X360",
      "PS3",
      "PS2",
      "SNES",
      "GBA",
      "PS4",
      "3DS",
      "N64",
      "PS",
      "XB",
      "PC",
      "PSP",
      "XOne"
    ];
    function getLuminance(color) {
      const rgb = d3.rgb(color);
      return (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    }

    // Setup the canvas
    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    // Setup the title
    svg.append("text")
      .attr("x", w / 2)
      .attr("y", padding.top / 2)
      .attr("id", "title")
      .attr("text-anchor", "middle")
      .attr("font-size", "24px")
      .attr("class", "chart-title")
      .text("Video Game Sales Data");

    // Setup the subtitle
    svg.append("text")
      .attr("x", w / 2)
      .attr("y", padding.top - 10)
      .attr("id", "description")
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("class", "chart-subtitle")
      .text("Top 100");

    // Setup the tooltip
    const tooltip = d3.select("body")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("font-family", "Helvetica, sans-serif");

    // Give the data to this cluster layout:
    var root = d3.hierarchy(data).sum(function (d) {
      return d.value;
    }); // Here the size of each leave is given in the 'value' field in input data

    // Then d3.treemap computes the position of each element of the hierarchy
    d3.treemap()
    .size([w - padding.left - padding.right, h - padding.top - padding.bottom])
    .padding(2)(root);

    // use this information to add rectangles:
    svg
      .selectAll("rect")
      .data(root.leaves())
      .enter()
      .append("rect")
      .attr("x", d => d.x0 + padding.left)
      .attr("y", d => d.y0 + padding.top)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("class", "tile")
      .attr("data-name", d => d.data.name)
      .attr("data-category", d => d.data.category)
      .attr("data-value", d => d.data.value)
      .style("stroke", "black")
      .style("fill", d => colorScale[d.data.category] || "slateblue")
      .on("mouseover", (event, d) => { 
        tooltip.style("visibility", "visible")
          .html(`Game: ${d.data.name}<br>Platform: ${d.data.category}<br>Sales: ${d.data.value}`)
          .attr("data-value", d.data.value)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px");
      })
      .on("mousemove", (event) => {
        tooltip.style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    // and to add the text labels
    svg.selectAll(".node")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x0 + padding.left},${d.y0 + padding.top})`)
      .append("text")
      .attr("class", "node-label")
      .style("font-family", "Helvetica, sans-serif")
      .style("font-size", "8px")
      .attr("fill", d => {
        const bgColor = colorScale[d.data.category];
        return getLuminance(bgColor) > 0.5 ? "black" : "white";
      })
      .attr("stroke", "none")
      .attr("x", 3)
      .attr("y", 13)
      .text(d => d.data.name)
      .style("display", d => {
        const area = (d.x1 - d.x0) * (d.y1 - d.y0);
        return area < 1000 ? "none" : "block";
      });
  
  // Setup the legend
    const legend = svg.append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${padding.left}, ${h - padding.bottom + 10})`);
    
    for (let i = 0; i < 18; i++) {
      legend.append("rect")
        .attr("x", i * legendItemWidth)
        .attr("y", 0)
        .attr("width", legendItemWidth - 2)
        .attr("height", 20)
        .attr("fill", colorIndex[i])
        .attr('class','legend-item')
        .attr("stroke", "gray")
        .attr("stroke-width", 1);
      
      legend.append("text")
        .attr("x", i * legendItemWidth + legendItemWidth / 2)
        .attr("y", 35)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text(platformIndex[i]);
    }
  
  })
  .catch((error) => console.error("Error fetching data:", error));
