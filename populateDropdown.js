// Function to populate multiple dropdowns with data from Film_Breakdown_Data.json
function populateDropdowns() {
    // Fetch the JSON data
    fetch('Film_Breakdown_Data.json')
        .then(response => response.json())
        .then(data => {
            // List of dropdowns to populate, along with the corresponding data property
            const dropdowns = [
                { id: 'quarterDropdown', property: 'Quarter' },
                { id: 'personnelDropdown', property: 'Personnel' },
                { id: 'runDropdown', property: 'Run' },
                { id: 'downDistanceDropdown', property: 'Down&Distance' },
                { id: 'yardLineDropdown', property: 'Yard Line' },
                { id: 'hashDropdown', property: 'Hash' },
                { id: 'teamDropdown', property: 'Team' },
                { id: 'passDropdown', property: 'Pass' },
                { id: 'screenDropdown', property: 'Screen' },
                { id: 'resultDropdown', property: 'Result' },
                { id: 'penaltyDropdown', property: 'Penalty' },
                { id: 'fieldGoalDropdown', property: 'Field Goal' },
                { id: 'yardageMakeDropdown', property: 'Yardage Make' },
                { id: 'timeDropdown', property: 'Time' }
            ];

            // Populate each dropdown
            dropdowns.forEach(dd => {
                populateDropdown(dd.id, data, dd.property);
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));
}

// Helper function to populate a single dropdown
function populateDropdown(dropdownId, data, dataProperty) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return; // Skip if dropdown is not found

    // Clear existing options
    dropdown.innerHTML = '';

    // Getting unique values for the dropdown
    const uniqueValues = [...new Set(data.map(item => item[dataProperty]))];

    uniqueValues.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = `Label for ${value}`; // Adding label text here
        dropdown.appendChild(option);
    });
}

// Call the function on window load
window.onload = populateDropdowns;
