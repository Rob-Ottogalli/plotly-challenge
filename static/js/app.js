


(async function(){
    // Read in data from JSON
    var data = await d3.json("data/samples.json");
    var samples = data.samples;
    var sample_values = samples[0].sample_values;
    var otu_ids = samples[0].otu_ids;
    var otu_labels = samples[0].otu_labels;
    
    function filterBacteria(data) {
        var sorted = data.sort((first, second) => second - first);
        return sorted.slice(0, 10);
    };

    // var top_ten = filterBacteria(sample_values);

    // console.log(top_ten);
    console.log(otu_ids);
    console.log(samples);

    var trace = {
        x: top_ten,
        y: otu_ids,
        type: "bar",
        orientation: "horizontal",
        text: otu_labels
    };

    var trace_data = [trace];

    var layout = {
        title: "",
        // name: otu_labels,
        xaxis: { title: "Bacteria Count" },
        yaxis: { title: "OTUs" }
    };

    Plotly.newPlot("bar", trace_data, layout);
})()

// Dropdown menu
// data.names
