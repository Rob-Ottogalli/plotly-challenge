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

        // Loop through
        var i;
        for (i = 0; i<names.length ; i++) {
            if (subject === names[i]) {
                subject_id = i;
                console.log(`subject ID: ${subject_id}`);
                return subject_id;   
            }
        }
        
    })()
    // console.log(`subject ID: ${subject_id}`);

}

// Set id variable to hold Subject ID selected from dropdown
// subject_id = optionChanged();
// console.log(`subject ID: ${subject_id}`);

async function renderPage(subject_id){
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
    var sample_values = samples[subject_id].sample_values;
    var otu_ids = samples[subject_id].otu_ids;
    var otu_labels = samples[subject_id].otu_labels;
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
    // Note: Add .reverse() so data displays in descending order.
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
        title: `Top Ten Bacteria in Test Subject`,
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
    var metadata = data.metadata;

    // Set empty array to hold metadata for that specific subject (id)

    var selected_metadata = []

    // Append metadata for that subject to array
    selected_metadata.push(metadata[subject_id]);


    // Select Demographics box from web page
    var demographics = d3.select("#sample-metadata").selectAll("p")
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

renderPage(subject_id);