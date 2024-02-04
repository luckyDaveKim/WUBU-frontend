import ReactApexChart from "react-apexcharts";
import dayjs from 'dayjs';


export default function CandlestickChart({ series }) {
    const options = {
        series,
        chart: {
            height: 350,
            type: 'line',
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
        // FIXME : tooltip 설정 필요, OHLC 값만 표현되도록....
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
            series={options.series}
            type="candlestick"
        />
    );
};
