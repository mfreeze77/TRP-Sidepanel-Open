import { chrome } from 'chrome'; // Import the necessary Chrome API typings
// top level await is available in ES modules loaded from script tags  
document.addEventListener('DOMContentLoaded', async () => {  
    const [tab] = await chrome.tabs.query({  
        active: true,  
        lastFocusedWindow: true  
    });  
  
    const tabId = tab.id;  
    const openSidePanelButton = document.getElementById('openSidePanel');  
  
    if (openSidePanelButton) {  
        openSidePanelButton.addEventListener('click', async () => {  
            // Open the side panel  
            await chrome.sidePanel.open({ tabId });
            await chrome.sidePanel.setOptions({
                tabId,
                path: 'sidepanel-tab.html',
                enabled: true
            });

            // Data collection from dropdowns
            const dropdownIds = [
                'quarterDropdown', 'personnelDropdown', 'runDropdown', 'downDistanceDropdown',
                'yardLineDropdown', 'hashDropdown', 'teamDropdown', 'passDropdown',
                'screenDropdown', 'resultDropdown', 'penaltyDropdown', 'fieldGoalDropdown',
                'yardageMakeDropdown', 'timeDropdown'
                // Add other dropdown IDs as necessary
            ];
  
            const data = {};

            for (const id of dropdownIds) {
              const element = document.getElementById(id);
              if (element instanceof HTMLInputElement) {
                data[id] = element.value;
              } else {
                console.error(`Element with ID ${id} not found.`);
              }
            }

            console.log('Collected data:', data); // Logging the collected data
  
            // Send data to Google Sheets  
            try {  
                const response = await sendDataToGoogleSheets(data);  
                console.log('Data successfully sent to Google Sheets', response);  
            } catch (error) {  
                console.error('Error sending data to Google Sheets:', error);  
            }  
        });  
    } else {  
        console.error('Open side panel button not found.');  
    }  
  
    // Function to send data to Google Sheets  
    async function sendDataToGoogleSheets(data) {  
        // Assuming you have the API key or OAuth token ready  
        const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key  
        const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // Replace with your actual Spreadsheet ID  
        const range = 'Sheet1!A2'; // Replace with your actual range  
  
        // API URL  
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&key=${apiKey}`;  
  
        // Convert data to Sheets format  
        const values = Object.values(data);  
        const body = { values: [values] };  
  
        // Making the API request  
        try {  
            console.log('Sending data to Google Sheets:', body); // Logging the data being sent  
  
            const response = await fetch(url, {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json',  
                },  
                body: JSON.stringify(body)  
            });  
  
            // Check if the request was successful  
            if (response.ok) {  
                const result = await response.json();  
                return result;  
            } else {  
                throw new Error('Failed to send data to Google Sheets');  
            }  
        } catch (error) {  
            console.error('Error:', error);  
            throw error;  
        }  
    }  
});  