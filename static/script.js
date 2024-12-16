document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('cryptoChart').getContext('2d');
    let cryptoChart;

    // Function to fetch data from the API and update the chart
    async function fetchDataAndUpdateChart() {
        try {
            const response = await fetch('/api/crypto');

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            updateChart(data.time, data.price);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Please try again later.');
        }
    }

    // Function to initialize or update the chart
    function updateChart(time, price) {
        if (cryptoChart) {
            // Update existing chart with new data
            cryptoChart.data.labels.push(time);
            cryptoChart.data.datasets[0].data.push(price);

            // Keep only the latest 10 data points
            if (cryptoChart.data.labels.length > 10) {
                cryptoChart.data.labels.shift();
                cryptoChart.data.datasets[0].data.shift();
            }

            cryptoChart.update();
        } else {
            // Create a new chart if it doesn't exist
            cryptoChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [time],
                    datasets: [{
                        label: 'Bitcoin Price (USD)',
                        data: [price],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Time'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Price (USD)'
                            },
                            beginAtZero: false
                        }
                    }
                }
            });
        }
    }

    // Add click event listener to the refresh button
    document.getElementById('refreshBtn').addEventListener('click', fetchDataAndUpdateChart);

    // Fetch initial data when the page loads
    fetchDataAndUpdateChart();
});
