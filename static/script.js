// Get references to HTML elements
const ctx = document.getElementById('cryptoChart').getContext('2d');
const refreshBtn = document.getElementById('refreshBtn');

// Initial empty chart configuration
let cryptoChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],    // Time labels (will be updated dynamically)
        datasets: [{
            label: 'Bitcoin Price (USD)',
            data: [],  // Price data (will be updated dynamically)
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1
        }]
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Price (USD)' } }
        }
    }
});

// Function to fetch real-time Bitcoin price data
async function fetchCryptoData() {
    try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const data = await response.json();

        // Extract price and time data
        const currentTime = new Date().toLocaleTimeString();
        const currentPrice = data.bpi.USD.rate_float;

        // Update the chart with new data
        updateChart(currentTime, currentPrice);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to update the chart with new data
function updateChart(time, price) {
    cryptoChart.data.labels.push(time);
    cryptoChart.data.datasets[0].data.push(price);

    // Keep only the last 10 data points
    if (cryptoChart.data.labels.length > 10) {
        cryptoChart.data.labels.shift();
        cryptoChart.data.datasets[0].data.shift();
    }

    // Refresh the chart to display new data
    cryptoChart.update();
}

// Fetch data initially and set up button to refresh data
fetchCryptoData();
refreshBtn.addEventListener('click', fetchCryptoData);
