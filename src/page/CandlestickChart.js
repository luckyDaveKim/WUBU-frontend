import ReactApexChart from "react-apexcharts";
import dayjs from 'dayjs';


const CandlestickChart = ({ data }) => {
    var options = {
        series: [{
            name: 'candle',
            data
        }],
        chart: {
            height: 350,
            type: 'candlestick',
        },
        title: {
            text: 'CandleStick Chart - Category X-axis',
            align: 'left'
        },
        annotations: {
            xaxis: [
                {
                    x: 'Oct 06 14:00',
                    borderColor: '#00E396',
                    label: {
                        borderColor: '#00E396',
                        style: {
                            fontSize: '12px',
                            color: '#fff',
                            background: '#00E396'
                        },
                        orientation: 'horizontal',
                        offsetY: 7,
                        text: 'Annotation Test'
                    }
                }
            ]
        },
        tooltip: {
            enabled: true,
        },
        xaxis: {
            type: 'category',
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
            series={options.series}
            type="candlestick"
        />
    );
};

export default CandlestickChart;
