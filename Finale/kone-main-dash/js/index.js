/*
var lineChartData = {
    labels: ["Floor 1", "Floor 2", "Floor 3", "Floor 4", "Floor 5", "Floor 6", "Floor 7","Floor 8", "Floor 9", "Floor 10", "Floor 11", "Floor 12", "Floor 13", "Floor 14","Floor 15", "Floor 16"],
    datasets: [{
        fillColor: "rgba(220,220,220,0)",
        strokeColor: "rgba(220,180,0,1)",
        pointColor: "rgba(220,180,0,1)",
        data: [ 1.0, 0.2, 0.25,1.0,1.0,0.35, 0.45,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0]
    }]

}

Chart.defaults.global.animationSteps = 50;
Chart.defaults.global.tooltipYPadding = 16;
Chart.defaults.global.tooltipCornerRadius = 0;
Chart.defaults.global.tooltipTitleFontStyle = "normal";
Chart.defaults.global.tooltipFillColor = "rgba(0,160,0,0.8)";
Chart.defaults.global.animationEasing = "easeOutBounce";
Chart.defaults.global.responsive = true;
Chart.defaults.global.scaleLineColor = "black";
Chart.defaults.global.scaleFontSize = 16;

var ctx = document.getElementById("canvas").getContext("2d");
var LineChartDemo = new Chart(ctx).Line(lineChartData, {
    pointDotRadius: 10,
    bezierCurve: false,
    scaleShowVerticalLines: false,
    scaleGridLineColor: "Blue"
});
*/

var data = {
    labels: ["Floor 1", "Floor 2", "Floor 3", "Floor 4", "Floor 5", "Floor 6", "Floor 7","Floor 8", "Floor 9", "Floor 10", "Floor 11", "Floor 12", "Floor 13", "Floor 14","Floor 15", "Floor 16"],
    datasets: [
        {
            label: "Fingerprint Match",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
        data: [ 1.0, 0.2, 0.25,1.0,1.0,0.35, 0.45,1.0,1.0,1.0,1.0,0.85,1.0,0.75,1.0,1.0],
            spanGaps: false,
        }
    ]
};

var ctx = document.getElementById("canvas").getContext("2d");

var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data
});
