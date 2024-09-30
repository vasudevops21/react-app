import React, { useState } from 'react';

function PerDiemCalculator() {
  const [location, setLocation] = useState('');
  const [perDiemRates, setPerDiemRates] = useState(null);
  const [error, setError] = useState(null);

  const fetchPerDiemRates = async () => {
    try {
      const response = await fetch(`https://api.gsa.gov/travel/perdiem/v2/rates/${location}.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch per diem rates');
      }
      const data = await response.json();
      setPerDiemRates(data.rates);
    } catch (error) {
      setError(error.message);
    }
  };

  // Define the parameters
const city = "Washington"; // Example city
const state = "DC"; // Example state abbreviation
const year = 2024; // Example year

// Construct the API URL
const apiUrl = `https://api.gsa.gov/travel/perdiem/v2/rates/city/${city}/state/${state}/year/${year}`;

// Make the API call using fetch
fetch(apiUrl)
  .then(response => {
    // Check if response is ok
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse response as JSON
    return response.json();
  })
  .then(data => {
    // Process the received data
    console.log("Per diem rates for", city, state, "in", year, ":", data);
    // Further processing of data can be done here
  })
  .catch(error => {
    // Handle errors
    console.error('There was a problem with the fetch operation:', error);
  });


  return (
    <div>
      <h1>Per Diem Calculator</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location (e.g., city, state)"
      />
      <button onClick={fetchPerDiemRates}>Fetch Per Diem Rates</button>
      {error && <p>Error: {error}</p>}
      {perDiemRates && (
        <div>
          <h2>Per Diem Rates for {location}</h2>
          <ul>
            {Object.entries(perDiemRates).map(([type, rate]) => (
              <li key={type}>
                {type}: ${rate.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PerDiemCalculator;
