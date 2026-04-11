// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=" 
// Your code here!

// Fetch alerts from API
async function fetchWeatherAlerts(stateAbbr) {
  try {
    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${stateAbbr}`
    );

    if (!response.ok) {
      throw new Error(`API request failed`);
    }

    const data = await response.json();

    displayAlerts(data, stateAbbr);

    return data; // for testing
  } catch (error) {
    showError(error.message);
    throw error;
  }
}

// Display alerts on page
function displayAlerts(data, stateAbbr) {
  const container = document.getElementById("alerts-container");
  const errorDiv = document.getElementById("error-message");

  // Clear previous UI
  container.innerHTML = "";

  // Hide and clear error
  errorDiv.textContent = "";
  errorDiv.style.display = "none";

  const alerts = data.features || [];

  // Summary title
  const title = document.createElement("h2");
  title.textContent = `Current watches, warnings, and advisories for ${stateAbbr}: ${alerts.length}`;
  container.appendChild(title);

  // List of alert headlines
  const list = document.createElement("ul");
  alerts.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    list.appendChild(li);
  });
  container.appendChild(list);
}

// Display error messages
function showError(message) {
  const errorDiv = document.getElementById("error-message");
  const container = document.getElementById("alerts-container");

  container.innerHTML = "";
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
}

// Button click handler
document.getElementById("fetch-btn").addEventListener("click", async () => {
  const input = document.getElementById("state-input");
  const state = input.value.trim().toUpperCase();

  if (!/^[A-Z]{2}$/.test(state)) {
    showError("Please enter a valid 2-letter state code (e.g. MN)");
    return;
  }

  try {
    await fetchWeatherAlerts(state);
    input.value = ""; // clear input after successful fetch
  } catch (e) {
    // Error already handled in showError
  }
});

// Export functions for Jest tests (if lab requires)
if (typeof module !== "undefined") {
  module.exports = {
    fetchWeatherAlerts,
    displayAlerts,
    showError
  };
}