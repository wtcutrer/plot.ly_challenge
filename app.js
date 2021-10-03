    
function init() {
// Grab a reference to the dropdown select element
var identifiers = d3.select("#selDataset");

// Use the list of sample names to populate the select options
d3.json("samples.json").then((data) => {
var dropDownMenu = data.names;
dropDownMenu.forEach((sample) => {
    identifiers
    .append("option")
    .text(sample)
    .property("value", sample);
});

// Create initial plot with first dataset
const firstSample = sampleNames[0];
createPlots(firstSample);
placeData(firstSample);
});
}

// Get new data on new selections
function newSelection(newSample) {
createPlots(newSample);
placeData(newSample);
}

// Initialize
init();