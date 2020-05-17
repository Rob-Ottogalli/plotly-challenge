(async function(){
    //------------------------------------------------------------------
    // Set Initial Data
    //------------------------------------------------------------------

    // Read in data from JSON
    var data = await d3.json("data/samples.json");

    // Set variable to refer to names array
    var names = data.names;

    // Set variable to refer to sample array
    var samples = data.samples;

    //--------------------------------------------------
    // Populate All Subjects into Dropdown
    //--------------------------------------------------

    // Set variable to select dropdown menu
    var dropdownMenu = d3.select("#selDataset").selectAll("option")
        .data(names);

    // Append an option tag holding a subject name to the dropdown menu
    dropdownMenu.enter()
        .append("option")
        .merge(dropdownMenu)
        .html(function(d) {
            return d;
        });


    //--------------------------------------------------
    // Set Important Variables
    //--------------------------------------------------
    // Set id variable to hold OTU ID selected from dropdown
    var id = 0;

    // Set variables to hold sample values, OTU IDs, and OTU labels
    // for selected subject
    var sample_values = samples[id].sample_values;
    var otu_ids = samples[id].otu_ids;
    var otu_labels = samples[id].otu_labels;
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
    // Set Plots for Subject Selected from Dropdown
    //--------------------------------------------------

    // Set Bar Chart for Top Ten Samples
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


    // Set Bubble Chart for All Samples
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
        height: 500,
        width: 1000
    };

    Plotly.newPlot("bubble", bubble_data, bubble_layout);

    //--------------------------------------------------
    // Display Metadata for Subject
    //--------------------------------------------------
    
    var metadata = data.metadata;
    var selected_metadata = metadata[id];
    // console.log(metadata);
    console.log(selected_metadata);
    console.log(selected_metadata["ethnicity"]);

    // // print all key/value pairs
    // var i;
    // for (i = 0; i<selected_metadata.length; i++) {
    //     console.log(selected_metadata["ethnicity"]);
    // }

    // Select Demographics box from HTML
    var demographics = d3.select("#sample-metadata").selectAll("p")
        .data(metadata);

    demographics.enter()
        .append("p")
        .merge(demographics)
        .html(function(d) {
            return `<p>id: ${d.id}</p>`;
        });
        // <p>id: ${d.id}</p>
        // <p>ethnicity: ${selected_metadata["ethnicity"]}</p>
        // <p>gender: ${selected_metadata["gender"]}</p>
        // <p>age: ${selected_metadata["age"]}</p>
        // <p>location: ${selected_metadata["location"]}</p>
        // <p>bbtype: ${selected_metadata["bbtype"]}</p>
        // <p>wfreq: ${selected_metadata["wfreq"]}</p>
    demographics.exit().remove();
})()

// Dropdown menu
// data.names
