$('#content_index').css('display', 'show');
$('#table_header').css('display', 'none');
$('#search_data').css('display', 'none');
$('#search_results').css('display', 'none');


$('#form').on('submit', (e) => {
    e.preventDefault()
    $('#search_results').css('display', 'contents');
    $('#content_index').css('display', 'none');
    $('#contents-soccer').css('display', 'none')
    $('#search_data').css('display', 'contents')
    $('#table_header').css('display', 'contents');

    const player = $('#playername').val().trim();
    const package = {
        player
    };
    $('#player_name').text(player)
    $('caption', '#18-19', '#17-18', '#16-17', '#15-16').remove();
    $('.data').remove();
    $.getJSON('/database', package, function (bringer) {
        $('#player_team').text(bringer.package[0].teams)
        let counter = 0;
        console.log('bringer', bringer.package)
        let first = bringer.package[0];
        let second = bringer.package[1];
        let third = bringer.package[2];
        let fourth = bringer.package[3];
        $.each(first, function (i, field) {
            counter++;
            if (counter < 3) {
                console.log("pass")

            } else {
                $("#18-19").append("<td class = 'data'>" + field + "</td>");
            }
        });

        $.each(second, function (i, field) {
            if (second.length === 1) {
                $("#17-18").append("<td class = 'data'> " + field + '' + "</td>");

            }
            $("#17-18").append("<td class = 'data'>" + field + '' + "</td>");

        });
        $.each(third, function (i, field) {
            if (third.length === 1) {
                $("#16-17").append("<td class = 'data'> " + field + '' + "</td>");

            }
            $("#16-17").append("<td class = 'data'> " + field + '' + "</td>");

        });
        $.each(fourth, function (i, field) {
            if (fourth.length === 1) {
                $("#15-16").append("<td class = 'data'> " + field + '' + "</td>");

            }
            $("#15-16").append("<td class = 'data'> " + field + '' + "</td>");

        });
        var ctx = document.getElementById('seasonChart').getContext('2d');

        console.log(ctx)
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [fourth.season, third.season, second.season, first.season],
                datasets: [{
                    label: `Augmented API ${first.name} `,
                    data: [fourth.AugAPM, third.AugAPM, second.AugAPM, first.AugAPM],
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
                defaultFontFamily: "IBM Plex Mono",
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
    })

})