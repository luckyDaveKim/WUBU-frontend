import ReactApexChart from "react-apexcharts";
import dayjs from 'dayjs';


export default function CandlestickChart({ series }) {
    const options = {
        chart: {
            height: 350,
        },
        colors: ['#d4526e', '#33b2df', '#d4526e', '#33b2df'],
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: [1, 1, 0.24]
        },
        forecastDataPoints: {
            count: 2
        },
        stroke: {
            curve: 'straight',
            width: [0.25, 1, 0]
        },
        tooltip: {
            enabled: true,
        },
        xaxis: {
            type: 'date',
            labels: {
                formatter: function (val) {
                    return dayjs(val).format('YYYY-MM-DD HH:mm');
                }
            }
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    };

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="candlestick"
        />
    );
};
