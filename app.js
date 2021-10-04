
//create a function to input plots 
function createPlots(sample) {

// Use D3 to grab plot data
d3.json("samples.json").then((data) => {
  var samples= data.samples;
  var resultsarray= samples.filter(sampleobject => 
      sampleobject.id == sample);
  var result= resultsarray[0]
  var ids = result.otu_ids;
  var labels = result.otu_labels;
  var values = result.sample_values;


  //Create a bar chart with the data from dropdown
  var bar_data =[
    {
      y:ids.slice(0,5).map(otuID => `OTU ${otuID}`).reverse(),
      x:values.slice(0,5).reverse(),
      text:labels.slice(0,5).reverse(),
      type:"bar",
      orientation:"h",
    }
  ];

  var barLayout = {
    title: "Top 5 Bacteria Cultures Found",
    margin: { t: 30, l: 150 }
  };

  Plotly.newPlot("bar", bar_data, barLayout);
});
}

//Create a function for the Dropdown menu
  function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  
  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  
    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    createPlots(firstSample);
    placeData(firstSample);
  });
  }
  
  function newSelection(newSample) {
  // Fetch new data each time a new sample is selected
  createPlots(newSample);
  placeData(newSample);
  }
  
  // Initialize the dashboard
  init();

