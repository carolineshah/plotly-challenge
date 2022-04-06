let samples = [];
let names = [];
let metadata = [];

// read in the json and retrieve info
function init() {
    d3.json("../samples.json").then(data => {
        console.log("read samples");
        samples = data.samples;
        names = data.names;
        metadata = data.metadata;
        console.log(data);

        // add sample ids to drop down menu
        for (let sample of samples) {
            let id = sample['id'];
            var option = document.createElement("option");
            option.text = `${id}`;
            option.value = id;
            var select = document.getElementById("selDataset");
            select.appendChild(option);
        };
        makePlot(samples, names, metadata);
    });
};
let sample_values = [];
let otu_ids = [];
let otu_labels = [];
function makePlot(samples, names, metadata) {
    console.log("samples, names, metadata");
    console.log(samples);
    console.log(names);
    console.log(metadata);

    // break down samples into top 10s and individual arrays
    for (let i = 0; i < samples.length; i++) {
        let topSamples = samples[i]['sample_values'].slice(0,10);
        let topOtuIds = samples[i]['otu_ids'].slice(0,10);
        let topOtuLabels = samples[i]['otu_labels'].slice(0,10);
        topSamples.reverse();
        topOtuIds.reverse();
        topOtuLabels.reverse();

        sample_values.push(topSamples);
        otu_ids.push(topOtuIds);
        otu_labels.push(topOtuLabels);
    };
    // made trace for first sample
    let trace =  {
        x: sample_values[0],
        // cant figure out how to get OTU in front without messing it up
        y: otu_ids[0],
        text: otu_labels[0],
        type: 'bar',
        orientation: 'h'
    };
    var layout = {
        yaxis: { type: 'category' },
        title: `Sample #`
     };
    let traces = [trace];
    Plotly.newPlot('plot', traces, layout);
};


// takes in the value chosen from dropdown menu
function optionChanged(value) {
    console.log(value);

}

init();
