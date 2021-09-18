import React, { useEffect, useState } from 'react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import moment from "moment";
import "moment-timezone"

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

function DailyTrendMinutelyChart() {
  const code = useSelector((state: RootState) => state.stock.code);
  const [monPriceData, setMonPriceData] = useState<Data[]>([]);
  const [tuePriceData, setTuePriceData] = useState<Data[]>([]);
  const [wedPriceData, setWedPriceData] = useState<Data[]>([]);
  const [thuPriceData, setThuPriceData] = useState<Data[]>([]);
  const [friPriceData, setFriPriceData] = useState<Data[]>([]);

  const convertData = (res: Response) => {
    const yList = res.data.map(data => data.y)
    const minY = Math.min(...yList)
    const maxY = Math.max(...yList) - minY

    return res.data
      .map((data: Data) => {
        const timestamp = (data.x / 1000)
        const dateOfTimestamp = moment(moment.unix(data.x / 1000).utc().format('YYYY-MM-DD'), 'YYYY-MM-DD').unix()
        return {
          ...data,
          x: timestamp - dateOfTimestamp,
          y: ((data.y - minY) * 100) / maxY
        }
      })
  }

  const loadMonPriceRes = (monPriceRes: Response) => {
    setMonPriceData(convertData(monPriceRes))
  }
  const loadTuePriceRes = (tuePriceRes: Response) => {
    setTuePriceData(convertData(tuePriceRes))
  }
  const loadWedPriceRes = (wedPriceRes: Response) => {
    setWedPriceData(convertData(wedPriceRes))
  }
  const loadThuPriceRes = (thuPriceRes: Response) => {
    setThuPriceData(convertData(thuPriceRes))
  }
  const loadFriPriceRes = (friPriceRes: Response) => {
    setFriPriceData(convertData(friPriceRes))
  }

  useEffect(() => {
    if (!code) return

    const getMon = axios.get<Response>(`http://localhost:8080/api/minutely/price/companies/${code}`, {
      params: {
        'date': moment().subtract(6, 'days').format('YYYY-MM-DD')
      }
    });
    const getTue = axios.get<Response>(`http://localhost:8080/api/minutely/price/companies/${code}`, {
      params: {
        'date': moment().subtract(5, 'days').format('YYYY-MM-DD')
      }
    });
    const getWed = axios.get<Response>(`http://localhost:8080/api/minutely/price/companies/${code}`, {
      params: {
        'date': moment().subtract(4, 'days').format('YYYY-MM-DD')
      }
    });
    const getThu = axios.get<Response>(`http://localhost:8080/api/minutely/price/companies/${code}`, {
      params: {
        'date': moment().subtract(3, 'days').format('YYYY-MM-DD')
      }
    });
    const getFri = axios.get<Response>(`http://localhost:8080/api/minutely/price/companies/${code}`, {
      params: {
        'date': moment().subtract(2, 'days').format('YYYY-MM-DD')
      }
    });

    axios.all([getMon, getTue, getWed, getThu, getFri])
      .then(axios.spread(({data: monPriceRes}, {data: tuePriceRes}, {data: wedPriceRes}, {data: thuPriceRes}, {data: friPriceRes}) => {
        loadMonPriceRes(monPriceRes)
        loadTuePriceRes(tuePriceRes)
        loadWedPriceRes(wedPriceRes)
        loadThuPriceRes(thuPriceRes)
        loadFriPriceRes(friPriceRes)
      }))
      .catch(err => console.error(err))
  }, [code])

  const options = {
    chart: {
      type: "line",
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
    series: [{
      data: monPriceData
    }, {
      data: tuePriceData
    }, {
      data: wedPriceData
    }, {
      data: thuPriceData
    }, {
      data: friPriceData
    }]
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'chart'}
      options={options}
    />
  );
}

export default DailyTrendMinutelyChart;
