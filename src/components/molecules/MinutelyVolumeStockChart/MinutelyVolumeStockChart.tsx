import React, { useEffect, useState } from 'react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

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

function MinutelyVolumeStockChart() {
  const code = useSelector((state: RootState) => state.stock.code);
  const [priceData, setPriceData] = useState<Data[]>([]);
  const [volumeData, setVolumeData] = useState<Data[]>([]);

  const loadPriceRes = (priceRes: Response) => {
    setPriceData(priceRes.data)
  }
  const loadVolumeRes = (volumeRes: Response) => {
    setVolumeData(volumeRes.data)
  }

  useEffect(() => {
    if (!code) return

    const config = {
      params: {
        'page': 1,
        'pageSize': 300
      }
    };
    const getPrice = axios.get<Response>(`http://localhost:8080/api/minutely/price/companies/${code}`, config);
    const getVolume = axios.get<Response>(`http://localhost:8080/api/minutely/volume/companies/${code}`, config);

    axios.all([getPrice, getVolume])
      .then(axios.spread(({data: priceRes}, {data: volumeRes}) => {
        loadPriceRes(priceRes)
        loadVolumeRes(volumeRes)
      }))
      .catch(err => console.error(err))
  }, [code])

  const options = {
    chart: {
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
      split: true
    },
    yAxis: [{
      labels: {
        align: 'right',
        x: -3
      },
      title: {
        text: 'OHLC'
      },
      height: '60%',
      lineWidth: 2,
      resize: {
        enabled: true
      }
    }, {
      labels: {
        align: 'right',
        x: -3
      },
      title: {
        text: 'Volume'
      },
      top: '65%',
      height: '35%',
      offset: 0,
      lineWidth: 2
    }],
    series: [{
      type: "candlestick",
      name: 'Price',
      data: priceData
    }, {
      type: "column",
      name: 'Volume',
      yAxis: 1,
      data: volumeData
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

export default MinutelyVolumeStockChart;
