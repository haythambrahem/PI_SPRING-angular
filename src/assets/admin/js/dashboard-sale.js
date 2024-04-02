'use strict';

$(document).ready(function(){
    setTimeout(function(){
        floatchart();
    }, 700);

    var scrollbarOptions = {
        wheelSpeed: 0.5,
        swipeEasing: 0,
        wheelPropagation: true,
        minScrollbarLength: 40
    };

    new PerfectScrollbar('.feed-scroll', scrollbarOptions);
    new PerfectScrollbar('.pro-scroll', scrollbarOptions);
});

function floatchart() {
    $(function(){
        var supportChartOptions = {
            chart: {
                type: 'area',
                height: 85,
                sparkline: { enabled: true }
            },
            colors: ["#7267EF"],
            stroke: { curve: 'smooth', width: 2 },
            series: [{ data: [0, 20, 10, 45, 30, 55, 20, 30, 0] }],
            tooltip: { fixed: { enabled: false }, x: { show: false }, y: { title: { formatter: function(seriesName) { return 'Ticket '; } } } },
            marker: { show: false }
        };

        new ApexCharts(document.querySelector("#support-chart"), supportChartOptions).render();

        var supportChart1Options = {
            chart: {
                type: 'bar',
                height: 85,
                sparkline: { enabled: true }
            },
            colors: ["#7267EF"],
            plotOptions: { bar: { columnWidth: '70%' } },
            series: [{ data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54, 44, 12, 36, 9, 54, 25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 25, 44, 12, 36, 9, 54] }],
            xaxis: { crosshairs: { width: 1 } },
            tooltip: { fixed: { enabled: false }, x: { show: false }, y: { title: { formatter: function(seriesName) { return ''; } } } },
            marker: { show: false }
        };

        new ApexCharts(document.querySelector("#support-chart1"), supportChart1Options).render();
    });

    $(function(){
        var accountChartOptions = {
            chart: {
                height: 350,
                type: 'line',
                stacked: false
            },
            stroke: { width: [0, 3], curve: 'smooth' },
            plotOptions: { bar: { columnWidth: '50%' } },
            colors: ['#7267EF', '#c7d9ff'],
            series: [
                { name: 'Total Sales', type: 'column', data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30] },
                { name: 'Average', type: 'column', data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39] }
            ],
            fill: { opacity: [0.85, 1] },
            labels: ['01/01/2024', '02/01/2024', '03/01/2024', '04/01/2024', '05/01/2024', '06/01/2024', '07/01/2024', '08/01/2024', '09/01/2003', '10/01/2003', '11/01/2003'],
            markers: { size: 0 },
            xaxis: { type: 'category' },
            yaxis: { min: 0 },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function(y) {
                        if (typeof y !== "undefined") {
                            return "task " + y.toFixed(0);
                        }
                        return y;
                    }
                }
            },
            legend: { labels: { useSeriesColors: true }, markers: { customHTML: [function() { return ''; }, function() { return ''; }] } }
        };
        

        var token = null;
        var userData = localStorage.getItem('user');
        if (userData) {
            var user = JSON.parse(userData);
            if (user && user.token) {
                token = user.token;
            }
        }

        $.ajax({
            url: 'http://localhost:8089/user/user-task-status',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(data) {
                // Handle successful response
                // Update chart data with fetched data
                /* accountChartOptions.series = data; */
                accountChartOptions.labels = [...data.map(item => item.firstName)]
                accountChartOptions.series = [
                    {name: 'Completed Tasks', type: 'column', data: [...data.map((item => item.completedTasks))]},
                    {name: 'Incompleted Tasks', type: 'column', data: [...data.map((item => item.incompleteTasks))]}
                ];
                var chart = new ApexCharts(document.querySelector("#account-chart"), accountChartOptions);
                chart.render();
            },
            error: function(xhr, status, error) {
                // Handle error
                console.error('Error fetching data:', error);
                // Revert to default data
                accountChartOptions.series = [
                    { name: 'Total Sales', type: 'column', data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30] },
                    { name: 'Average', type: 'line', data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39] }
                ];
                var chart = new ApexCharts(document.querySelector("#account-chart"), accountChartOptions);
                chart.render();
                
            }
        });

        
    });

    $(function(){
        var satisfactionChartOptions = {
            chart: {
                height: 260,
                type: 'pie'
            },
            series: [66, 50, 40, 30],
            labels: ["Extremely Satisfied", "Satisfied", "Poor", "Very Poor"],
            legend: { show: true, offsetY: 50 },
            dataLabels: { enabled: true, dropShadow: { enabled: false } },
            theme: { monochrome: { enabled: true, color: '#7267EF' } },
            responsive: [{
                breakpoint: 768,
                options: {
                    chart: { height: 320 },
                    legend: { position: 'bottom', offsetY: 0 }
                }
            }]
        };

        var chart = new ApexCharts(document.querySelector("#satisfaction-chart"), satisfactionChartOptions);
        chart.render();
    });
}
