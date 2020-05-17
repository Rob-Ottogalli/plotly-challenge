


(async function(){
    // Read in data from JSON
    var data = await d3.json("data/samples.json");
    var samples = data.samples;
    var sample_values = samples[0].sample_values;
    var otu_ids = samples[0].otu_ids;
    var otu_labels = samples[0].otu_labels;
    // var sample_values = data.samples.map(row => row.sample_values);
    // var otu_ids = data.samples.map(row => row[0].otu_ids);
    // var otu_labels = data.samples.map(row => row.otu_labels);    

    var top_ten_values = sample_values.slice(0, 10);
    var top_ten_labels = otu_labels.slice(0, 10);
    var ten_ids = otu_ids.slice(0, 10);

    // Format ten_ids as strings, append to array top_ten_ids
    var top_ten_ids = [];
    var i;
    for (i = 0; i < ten_ids.length; i++) {
        var string = String(ten_ids[i]);
        top_ten_ids.push(string);
    }

    // console.log(top_ten);
    console.log(top_ten_values);
    console.log(top_ten_ids);
    console.log(top_ten_labels);

    var trace = {
        x: top_ten_values,
        type: "bar",
        orientation: "h",
        hovertext: top_ten_labels
    };

    var trace_data = [trace];

    var layout = {
        title: "Top Ten Bacteria in Test Subject",
        height: 400,
        width: 400,
        labels: top_ten_ids
    };

    Plotly.newPlot("bar", trace_data, layout);
})()

// Dropdown menu
// data.names
