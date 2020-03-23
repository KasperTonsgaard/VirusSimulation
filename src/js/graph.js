offsetTimer = 0;
var ctx = document.getElementById('graph-canvas');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [
            {
            label: 'Infected',
            data: [],
            backgroundColor: ['rgba(158, 56, 86, 0.5)'],
            borderColor: ['rgba(158, 56, 86, 1)'],
            pointRadius: 1,
            fill: "start",
        },   {
            label: 'Healthy',
            data: [],
            backgroundColor: ['rgba(134, 142, 150, 0.5)'],
            borderColor: ['rgba(134, 142, 150, 1)'],
            pointRadius: 1,
            fill: "-1",
        },   {
            label: 'Dead',
            data: [],
            backgroundColor: ['rgba(33, 37, 41, 0.8)'],
            borderColor: ['rgba(33, 37, 41, 1)'],
            pointRadius: 1,
            fill: "-1",
        },   {
            label: 'Cured',
            data: [],
            backgroundColor: ['rgba(57, 166, 56, 0.5)'],
            borderColor: ['rgba(57, 166, 56, 1)'],
            pointRadius: 1,
            fill: "-1",
        } 
        ]
    },
    options: {
        spanGaps: false,
        plugins: {
            filler: {
                propagate: true
            }
        },
        scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true,
                }
            }],

        }
    }
});

function resetGraph() {
    for (let set of myChart.data.datasets) {
        set.data = [];
    }
    myChart.data.labels = [];
    offsetTimer = millis();
}

function updateGraph() {
    myChart.data.labels.push(round(time));
    
    let datasets = myChart.data.datasets;

    datasets[0].data.push(amountInfected);
    datasets[1].data.push(amountHealthy);
    datasets[2].data.push(amountDead);
    datasets[3].data.push(amountCured);

    myChart.update();
}