let samples = [];
let names = [];
let metadata = [];

// read in the json and retrieve info
function init() {
    d3.json("../samples.json").then(data => {
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
        // Pass off info to next function (could've just done this all together but I like to make things harder)
        makePlot(samples, names, metadata);
    });
};

let sample_values = [];
let otu_ids = [];
let otu_labels = [];
let all_sample_values = [];
let all_otu_ids = [];
let all_otu_labels = [];
// Initializes bar chart, bubble chart, and demo info to the first sample
function makePlot(samples, names, metadata) {

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


    // make bar trace for first sample
    let barTrace =  {
        x: sample_values[0],
        y: otu_ids[0],
        text: otu_labels[0],
        type: 'bar',
        orientation: 'h'
    };
    var barLayout = {
        yaxis: { 
            tickprefix: 'OTU ',
            type: 'category' 
        },
        xaxis: {
            title: 'Sample Values'
        },
        title: `Sample ${samples[0]['id']}`,
        width: 700,
        height: 500
     };
    let barTraces = [barTrace];
    Plotly.newPlot('bar', barTraces, barLayout);


    // make bubble chart for first sample
    let bubbleTrace = {
        x: otu_ids[0],
        y: sample_values[0],
        text: otu_labels[0],
        mode: 'markers',
        marker: {
            size: sample_values[0], 
            color: otu_ids[0]
        }
    };
    let bubbleTraces = [bubbleTrace];
    let bubbleLayout = {
        title: `Sample ${samples[0]['id']}`,
        yaxis: { 
            automargin: true,
            title: 'Sample Values', 
            type: 'category' 
        },
        xaxis: { 
            automargin: true,
            title: 'OTU ID',
            type: 'category'
        },
        width: 1000,
        height: 650
    };
    Plotly.newPlot('bubble', bubbleTraces, bubbleLayout);
    
    // Demographic information section
    let metadataInfo = d3.select("#sample-metadata");
    metadataInfo.html("");
    // loop through indv dictionaries of metadata
    for (let k = 0; k < Object.keys(metadata[0]).length; k++) {
        metadataInfo.append('p').text(`${Object.keys(metadata[0])[k]}: ${Object.values(metadata[0])[k]}`);
    };


};


// takes in the value chosen from dropdown menu
// will update bar chart, bubble chart, and demo info to the value
function optionChanged(value) {
    console.log(value);
    for (let j = 0; j < samples.length; j++) {
        // if value chosen is the current sample then update all the plots
        if (value == samples[j]['id']) {
            // update bar chart
            let barTraceValue =  {
                x: sample_values[j],
                y: otu_ids[j],
                text: otu_labels[j],
                type: 'bar',
                orientation: 'h'
            };
            var barLayoutValue = {
                yaxis: { 
                    tickprefix: 'OTU ',
                    type: 'category' 
                },
                xaxis: {
                    title: 'Sample Values'
                },
                title: `Sample ${samples[j]['id']}`,
                width: 700,
                height: 500
             };
            let barTracesValue = [barTraceValue];
            Plotly.newPlot('bar', barTracesValue, barLayoutValue);

            // update bubble chart
            let bubbleTraceValue = {
                x: otu_ids[j],
                y: sample_values[j],
                text: otu_labels[j],
                mode: 'markers',
                marker: {
                    size: sample_values[j], 
                    color: otu_ids[j]
                }
            };
            let bubbleTracesValue = [bubbleTraceValue];
            let bubbleLayoutValue = {
                title: `Sample ${samples[j]['id']}`,
                yaxis: { 
                    automargin: true,
                    title: 'Sample Values', 
                    type: 'category' 
                },
                xaxis: { 
                    automargin: true,
                    title: 'OTU ID',
                    type: 'category'
                },
                width: 1000,
                height: 650
            };
            Plotly.newPlot('bubble', bubbleTracesValue, bubbleLayoutValue);

            // update demographic info
            let metadataInfo = d3.select("#sample-metadata");
            metadataInfo.html("");
            // loop through indv dictionaries of metadata
            for (let k = 0; k < Object.keys(metadata[j]).length; k++) {
                // append new demo info
                metadataInfo.append('p').text(`${Object.keys(metadata[j])[k]}: ${Object.values(metadata[j])[k]}`);
            };
        };
    };
};

init();
