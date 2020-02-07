$('#table').bootstrapTable({
    url: './cudas/aug-apm/data/epl_2018.json',
    pagination: true,
    search: true,
    columns: [{
            field: 'name',
            title: 'Player Name'
        }, {
            field: ' teams',
            title: 'Team'
        }, {
            field: " minutes",
            title: 'Minutes'
        },
        {
            field: " fifa",
            title: 'Fifa Rating'
        },
        {
            field: " APM",
            title: 'APM'
        },{
            field:' AugAPM',
            title:' Augmented APM'
        },
        {
            field: ' AugAPMSE',
            title: 'Augmented APMSE'
        }
    ]
})

//   "name": "Harry Kane",
//   "teams": " Tottenham Hotspurs",
//   " minutes": 2460,
//   " position": " ",
//   " fifa": 89,
//   " APM": 0.05681012603950455,
//   " AugAPM": 0.21652718783106722,
//   " AugAPMSE": 0.0933972537728067






var ctx = document.getElementById('myChart').getContext('2d');
// ctx.height = 700;                            
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Sergio Agüero', 'Kevin De Bruyne', 'Mohamed Salah', 'Fernandinho', 'Hugo Lloris'],
        datasets: [{
            label: 'Augmented API 2018-2019',
            data: [0.306, 0.303, 0.249, 0.245, 0.231],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        layout: {
            padding: {
                bottom: 0,
                top: 1,
                left: 5,
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }

    }

});

// bottom graph //

var ctx = document.getElementById('second_chart_spot').getContext('2d');
// ctx.height = 700;                            
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Aymeric Laporte', 'Sergio Agüero', 'Ederson', 'Virgil van Dijk', 'Alisson'],
        datasets: [{
            label: 'APM 2018-2019',
            data: [0.184, 0.18, 0.18, 0.165, 0.162],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        layout: {
            padding: {
                bottom: 0,
                top: 1,
                left: 5,
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }

    }

});