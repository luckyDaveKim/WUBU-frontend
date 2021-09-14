import React, { useEffect, useState } from 'react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

type CandlestickProps = {
  url: string
}

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

function ChartDay({url}: CandlestickProps) {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    axios.get<Response>(url, {
      params: {
        'page': 2,
        'pageSize': 100
      }
    })
      .then((res) => res.data)
      .then(({data}) => setData(data))
      .catch(err => console.error(err))
  }, [])

  const options = {
    chart: {
      type: "candlestick",
      zoomType: 'x',
      borderWidth: 0,
      backgroundColor: null,
      skipClone: true
    },
    title: {
      text: null
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      candlestick: {
        color: 'rgba(0, 0, 255, 0.5)',
        upColor: 'rgba(255, 0, 0, 0.5)'
      },
      series: {
        animation: false,
        marker: {
          radius: 1,
          states: {
            hover: {
              radius: 2
            }
          }
        }
      }
    },
    tooltip: {
      split: true,
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
        return `${this.y} 원`
      }
    },
    series: [{
      data: data,
      dataGrouping: {
        enabled: false
      }
    }]
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
  );
}

export default ChartDay;
