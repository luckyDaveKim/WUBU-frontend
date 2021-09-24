import React, { useCallback, useEffect, useState } from 'react';
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

function DailyMinutelyVolumeChart() {
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

  const loadMonPriceRes = useCallback((monPriceRes: Response) => {
    setMonPriceData(convertData(monPriceRes))
  }, [])
  const loadTuePriceRes = useCallback((tuePriceRes: Response) => {
    setTuePriceData(convertData(tuePriceRes))
  }, [])
  const loadWedPriceRes = useCallback((wedPriceRes: Response) => {
    setWedPriceData(convertData(wedPriceRes))
  }, [])
  const loadThuPriceRes = useCallback((thuPriceRes: Response) => {
    setThuPriceData(convertData(thuPriceRes))
  }, [])
  const loadFriPriceRes = useCallback((friPriceRes: Response) => {
    setFriPriceData(convertData(friPriceRes))
  }, [])

  useEffect(() => {
    if (!code) return

    const monDate = moment().subtract(6, 'days').format('YYYY-MM-DD')
    const getMon = axios.get<Response>(`http://localhost:8080/api/minutely/volume/${monDate}/companies/${code}`);
    const tueDate = moment().subtract(5, 'days').format('YYYY-MM-DD')
    const getTue = axios.get<Response>(`http://localhost:8080/api/minutely/volume/${tueDate}/companies/${code}`);
    const wedDate = moment().subtract(4, 'days').format('YYYY-MM-DD')
    const getWed = axios.get<Response>(`http://localhost:8080/api/minutely/volume/${wedDate}/companies/${code}`);
    const thuDate = moment().subtract(3, 'days').format('YYYY-MM-DD')
    const getThu = axios.get<Response>(`http://localhost:8080/api/minutely/volume/${thuDate}/companies/${code}`);
    const friDate = moment().subtract(2, 'days').format('YYYY-MM-DD')
    const getFri = axios.get<Response>(`http://localhost:8080/api/minutely/volume/${friDate}/companies/${code}`);

    axios.all([getMon, getTue, getWed, getThu, getFri])
      .then(axios.spread(({data: monPriceRes}, {data: tuePriceRes}, {data: wedPriceRes}, {data: thuPriceRes}, {data: friPriceRes}) => {
        loadMonPriceRes(monPriceRes)
        loadTuePriceRes(tuePriceRes)
        loadWedPriceRes(wedPriceRes)
        loadThuPriceRes(thuPriceRes)
        loadFriPriceRes(friPriceRes)
      }))
      .catch(err => console.error(err))
  }, [code, loadMonPriceRes, loadTuePriceRes, loadWedPriceRes, loadThuPriceRes, loadFriPriceRes])

  const options = {
    chart: {
      type: "spline",
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

export default DailyMinutelyVolumeChart;
