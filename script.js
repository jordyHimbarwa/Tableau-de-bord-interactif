// Language Toggle
        document.getElementById('toggleLanguage').addEventListener('click', function() {
            document.querySelectorAll('.en').forEach(el => el.classList.toggle('hidden'));
            document.querySelectorAll('.fr').forEach(el => el.classList.toggle('hidden'));
        });

        // Theme Toggle
        document.getElementById('toggleTheme').addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });

        // Sample yearly percentage data
        const years = ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
        const sp500Data = [29.6, 11.4, -0.7, 9.5, 19.4, -6.2, 28.9, 16.3, 26.9, -19.4, 24.2];
        const nasdaqData = [38.3, 13.4, 5.7, 7.5, 28.2, -3.9, 35.2, 43.6, 21.4, -33.1, 43.4];
        
        // Create main chart
        const mainCtx = document.getElementById('mainChart').getContext('2d');
        const mainChart = new Chart(mainCtx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'S&P 500',
    data: sp500Data,
    borderColor: '#3B82F6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderWidth: 2,
    tension: 0.5,           // More curve
    pointRadius: 2,         // Smaller dots
    pointHoverRadius: 5,
    fill: true
                    },
                    {
                        label: 'NASDAQ Composite',
    data: nasdaqData,
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 2,
    tension: 0.5,
    pointRadius: 2,
    pointHoverRadius: 5,
    fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '%';
                            }
                        }
                    },
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Yearly Change (%)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });

        // Time range buttons functionality
      
document.querySelectorAll('.range-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active classes from all buttons
        document.querySelectorAll('.range-btn').forEach(b => {
            b.classList.remove('bg-blue-500', 'text-white');
            b.classList.add('bg-gray-200', 'text-gray-700');
        });

        // Highlight clicked button
        this.classList.remove('bg-gray-200', 'text-gray-700');
        this.classList.add('bg-blue-500', 'text-white');

        // Determine time range
        const range = this.getAttribute('data-range');
        let startIndex = 0;

        if (range === '1') {
            startIndex = years.length - 2;
        } else if (range === '5') {
            startIndex = years.length - 5;
        } else if (range === '10') {
            startIndex = years.length - 10;
        } else if (range === 'all') {
            startIndex = 0;
        }

        // Slice data based on range
        const newLabels = years.slice(startIndex);
        const newSP = sp500Data.slice(startIndex);
        const newNASDAQ = nasdaqData.slice(startIndex);

        // Update chart data
        mainChart.data.labels = newLabels;
        mainChart.data.datasets[0].data = newSP;
        mainChart.data.datasets[1].data = newNASDAQ;

        // Force chart to update
        mainChart.update();
    });
});


        // Custom tooltip for main chart
        const tooltip = document.getElementById('chartTooltip');
        const chartCanvas = document.getElementById('mainChart');
        
        chartCanvas.addEventListener('mousemove', function(e) {
            const points = mainChart.getElementsAtEventForMode(e, 'nearest', { intersect: false }, true);
            
            if (points.length) {
                const point = points[0];
                const dataset = mainChart.data.datasets[point.datasetIndex];
                const value = dataset.data[point.index];
                const year = mainChart.data.labels[point.index];
                
                tooltip.innerHTML = `
                    <div class="font-bold">${year}</div>
                    <div>${dataset.label}: <span class="font-semibold">${value.toFixed(1)}%</span></div>
                `;
                
                tooltip.style.opacity = '1';
                tooltip.style.left = (e.pageX + 10) + 'px';
                tooltip.style.top = (e.pageY + 10) + 'px';
            } else {
                tooltip.style.opacity = '0';
            }
        });
        
        chartCanvas.addEventListener('mouseout', function() {
            tooltip.style.opacity = '0';
        });