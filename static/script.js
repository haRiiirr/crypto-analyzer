document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('cryptoChart').getContext('2d');
    let cryptoChart;

    // Function to create a gradient for the chart background
    function createGradient(ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(75, 192, 192, 0.4)');
        gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');
        return gradient;
    }

    // Function to fetch data from the API and update the chart
    async function fetchDataAndUpdateChart() {
        try {
            const response = await fetch('/api/crypto');

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

            if (cryptoChart.data.labels.length > 10) {
                cryptoChart.data.labels.shift();
                cryptoChart.data.datasets[0].data.shift();
            }

            cryptoChart.update();
        } else {
            // Create a new chart if it doesn't exist
            const gradient = createGradient(ctx);
            cryptoChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [time],
                    datasets: [{
                        label: 'Bitcoin Price (USD)',
                        data: [price],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: gradient,
                        tension: 0.2,
                        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                        pointRadius: 5,
                        pointHoverRadius: 7,
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                color: '#333',
                                font: {
                                    size: 14,
                                }
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    return `Price: $${context.formattedValue}`;
                                }
                            }
                        },
                        zoom: {
                            pan: {
                                enabled: true,
                                mode: 'x',
                            },
                            zoom: {
                                wheel: {
                                    enabled: true,
                                },
                                pinch: {
                                    enabled: true,
                                },
                                mode: 'x',
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Time',
                                color: '#333',
                                font: {
                                    size: 14,
                                    weight: 'bold',
                                }
                            },
                            ticks: {
                                color: '#555'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Price (USD)',
                                color: '#333',
                                font: {
                                    size: 14,
                                    weight: 'bold',
                                }
                            },
                            ticks: {
                                color: '#555'
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
