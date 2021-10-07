
//Create a function for the Dropdown menu
function init() {

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var testNames = data.names;
   
    // Grab a reference and populate data
    var dropdown = d3.select("#selDataset");
    testNames.forEach((sample) => {
      dropdown
        .append("option")
        .text(sample)
        .attr("value", sample);
    });
  
    // Use the first sample from the list to build the initial plots
    const firstSample = testNames[0];
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

//Create a function to input data from the json
function placeData(sample) {
    d3.json("samples.json").then((data) => {
      var metadata= data.metadata;
      var result= metadata.filter(testobj => testobj.id == sample);
      var panel = d3.select("#sample-metadata").html("");
      Object.entries(result[0]).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
      });
    });
  }

//create a function to input plots 
function createPlots(sample) {

// Use D3 to grab plot data
d3.json("samples.json").then((data) => {
  var barData = data.samples;
  var resultsBar= barData.filter(testobj => testobj.id == sample);
  var result= resultsBar[0]
  var ids = result.otu_ids;
  var labels = result.otu_labels;
  var values = result.sample_values;


  //Create a bar chart with the data from dropdown
  var bar_data =[
    {
      y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x:values.slice(0,10).reverse(),
      text:labels.slice(0,10).reverse(),
      type:"bar",
      orientation:"h",
    }
  ];

  var barLayout = {
    title: "Top 10 Belly Button Bacteria",
    height: 550, 
    width: 850
  };

  Plotly.newPlot("bar", bar_data, barLayout);


  //Create bubble plot
  var Bubble = {
    title: "Bubble Chart Comparison",
    showlegend: false,
    height: 550,
    width: 1300,
    xaxis: {
      title: "OTU ID"
     }
    };

    var DataBubble = [ 
    {
      x: ids,
      y: values,
      text: labels,
      mode: "markers",
      marker: {
        color: ids,
        size: values,
        }
    }
  ];

  Plotly.newPlot("bubble", DataBubble, Bubble);
});
}
