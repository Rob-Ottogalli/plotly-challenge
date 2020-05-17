

//------------------------------------------------------------------
// Set Horizontal Bar Chart
//------------------------------------------------------------------

(async function(){
    // Read in data from JSON
    var data = await d3.json("data/samples.json");

    // Set variable to refer to sample array
    var samples = data.samples;

    // Set variables to hold sample values, OTU IDs, and OTU labels
    var sample_values = samples[0].sample_values;
    var otu_ids = samples[0].otu_ids;
    var otu_labels = samples[0].otu_labels;
    // var sample_values = data.samples.map(row => row.sample_values);
    // var otu_ids = data.samples.map(row => row[0].otu_ids);
    // var otu_labels = data.samples.map(row => row.otu_labels);    

    // Select top ten values (already sorted top to bottom in JSON)
    var top_ten_values = sample_values.slice(0, 10);
    var top_ten_labels = otu_labels.slice(0, 10);
    var ten_ids = otu_ids.slice(0, 10);

    // Format ten_ids as strings, append to array top_ten_ids
    var top_ten_ids = [];
    var i;
    for (i = 0; i < ten_ids.length; i++) {
        var string = String(ten_ids[i]);
        top_ten_ids.push(`OTU ${string}`);
    }

    //--------------------------------------------------
    // Set Plots
    //--------------------------------------------------

    // Set Bar Chart 
    // Set trace
    var bar_trace = {
        x: top_ten_values.reverse(),
        y: top_ten_ids,
        type: "bar",
        orientation: "h",
        hovertext: top_ten_labels.reverse()
    };

    var bar_trace_data = [bar_trace];

    // Set layout
    var bar_layout = {
        title: "Top Ten Bacteria in Test Subject",
        height: 600,
        width: 400,
        labels: top_ten_ids.reverse()
    };

    // Add plot
    Plotly.newPlot("bar", bar_trace_data, bar_layout);


    // Set Bubble Chart
    // Set trace
    var bubble_trace = {
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids
        },
        text: otu_labels
    };

    var bubble_data = [bubble_trace];

    // Set layout
    var bubble_layout = {
        title: "All Bacteria Samples in Subject",
        showlegend: false,
        height: 600,
        width: 1200
    };

    Plotly.newPlot("bubble", bubble_data, bubble_layout);

    //--------------------------------------------------
    // Display Metadata
    //--------------------------------------------------
    
})()

// Dropdown menu
// data.names
