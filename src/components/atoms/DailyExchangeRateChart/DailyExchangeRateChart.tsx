import React, { useEffect, useState } from 'react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

type Data = {
  x: number;
  y: number;
  z: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

type Response = {
  data: Data[]
}

function DailyExchangeRateChart() {
  const [exchangeRateData, setExchangeRateData] = useState<Data[]>([]);

  const loadExchangeRateRes = (priceRes: Response) => {
    setExchangeRateData(priceRes.data)
  }

  useEffect(() => {
    axios.get<Response>(`http://localhost:8080/api/daily/exchange-rate`, {
      params: {
        'page': 1,
        'pageSize': 100
      }
    })
      .then(({data: exchangeRateRes}) => loadExchangeRateRes(exchangeRateRes))
      .catch(err => console.error(err))
  }, [])

  const options = {
    title: {
      text: null
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { // don't display the dummy year
        month: '%e. %b',
        year: '%b'
      },
      title: {
        text: 'Date'
      }
    },
    yAxis: {
      title: {
        text: null
      }
    },

    // Define the data points. All series have a dummy year
    // of 1970/71 in order to be compared on the same x axis. Note
    // that in JavaScript, months start at 0 for January, 1 for February etc.
    series: [{
      data: exchangeRateData
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          plotOptions: {
            series: {
              marker: {
                radius: 2.5
              }
            }
          }
        }
      }]
    }
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'chart'}
      options={options}
    />
  );
}

export default DailyExchangeRateChart;
