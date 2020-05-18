// Initialize subject_id variable to 0.
// This will display data for subject 940.
var subject_id = 0;

function optionChanged(event) {
    // Select dropdown menu
    var dropdown = d3.select("#selDataset");
    // Get value of item selected
    var subject = dropdown.property("value");

    // Find index of that subject within sample.JSON
    // Return that index
    (async function() {
        // Read in data from JSON
        var data = await d3.json("data/samples.json");

        // Set variable to refer to names array
        var names = data.names;

        // Loop through all values in names array
        var i;
        for (i = 0; i<names.length ; i++) {
            // If value of item selected
            // is equal to value of name,
            if (subject === names[i]) {
                // set subject_id to index value of array.
                subject_id = i;

                // update page to show data for subject_id.
                updatePage(subject_id);
            }
        }
    })()
}
// Set function to display data for subject selected
async function updatePage(subject_id){
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

    // Set variables to hold sample values, OTU IDs, and OTU labels
    // for subject selected from dropdown
    sample_values = samples[subject_id].sample_values;
    otu_ids = samples[subject_id].otu_ids;
    otu_labels = samples[subject_id].otu_labels;

    // Select top ten values (already sorted top to bottom in JSON)
    top_ten_values = sample_values.slice(0, 10);
    top_ten_labels = otu_labels.slice(0, 10);
    ten_ids = otu_ids.slice(0, 10);

    // Format ten_ids as strings, append to array top_ten_ids
    top_ten_ids = [];
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
    // Note: Add .reverse() so data displays in descending order.
    bar_trace = {
        x: top_ten_values.reverse(),            
        y: top_ten_ids,
        type: "bar",
        orientation: "h",
        hovertext: top_ten_labels.reverse()
    };

    bar_trace_data = [bar_trace];

    // Set layout
    bar_layout = {
        title: `Top Ten Bacteria in Test Subject`,
        height: 600,
        width: 400,
        labels: top_ten_ids.reverse()
    };

    // Add plot
    Plotly.newPlot("bar", bar_trace_data, bar_layout);


    // Set Bubble Chart for All Samples
    // Set trace
    bubble_trace = {
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids
        },
        text: otu_labels
    };

    bubble_data = [bubble_trace];

    // Set layout
    bubble_layout = {
        title: `All Bacteria Samples in Subject`,
        showlegend: false,
        height: 500,
        width: 1000
    };

    Plotly.newPlot("bubble", bubble_data, bubble_layout);

    //--------------------------------------------------
    // Display Metadata for Subject
    //--------------------------------------------------
    
    // Note: d3.selection.data requires data to be passed as an array, 
    // so we will push our subject's metadata into an array
    // before appending to the web page.

    // Set variable to hold all metadata
    metadata = data.metadata;

    // Set empty array to hold metadata for that specific subject (id)

    selected_metadata = []

    // Append metadata for that subject to array
    selected_metadata.push(metadata[subject_id]);


    // Select Demographics box from web page
    demographics = d3.select("#sample-metadata").selectAll("p")
        .data(selected_metadata);

    // Append metadata to web page.  Set to merge and update when refreshed
    demographics.enter()
        .append("p")
        .merge(demographics)
        .html(function(d, i) {
            return `<p>id: ${d.id}</p>
                    <p>ethnicity: ${d.ethnicity}</p>
                    <p>gender: ${d.gender}</p>
                    <p>age: ${d.age}</p>
                    <p>location: ${d.location}</p>
                    <p>bbtype: ${d.bbtype}</p>
                    <p>wfreq: ${d.wfreq}</p>`;
        });
    demographics.exit().remove();
}


// Set function to initalize page
async function init() {
    subject_id = 0;
    updatePage(subject_id);
}

// Intialize page.
init(subject_id);