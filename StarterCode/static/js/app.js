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
    });
}

// takes in the value chosen from dropdown menu
function optionChanged(value) {
    console.log(value);

}

init();
