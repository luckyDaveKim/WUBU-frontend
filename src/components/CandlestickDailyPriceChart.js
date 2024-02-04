import CandlestickChart from './CandlestickChart';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CandlestickDailyPriceChart({ uri }) {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        axios.get(uri)
            .then(res => {
                const candleData = res.data.map(eachData => {
                    return {
                        x: new Date(eachData.date_timestamp),
                        y: eachData.price
                    };
                });
                const candleSeries = {
                    name: 'candle',
                    type: 'candlestick',
                    data: candleData
                };

                const ma20Data = res.data.map(eachData => {
                    return {
                        x: new Date(eachData.date_timestamp),
                        y: eachData.ma20
                    };
                });
                const ma20Series = {
                    name: 'ma20',
                    type: 'line',
                    data: ma20Data
                };

                const bollingerBandUpperData = res.data.map(eachData => {
                    return {
                        x: new Date(eachData.date_timestamp),
                        y: eachData.bollingerBandUpper
                    };
                });
                const bollingerBandUpperSeries = {
                    name: 'bollingerBandUpper',
                    type: 'line',
                    data: bollingerBandUpperData
                };

                const bollingerBandLowerData = res.data.map(eachData => {
                    return {
                        x: new Date(eachData.date_timestamp),
                        y: eachData.bollingerBandLower
                    };
                });
                const bollingerBandLowerSeries = {
                    name: 'bollingerBandLower',
                    type: 'line',
                    data: bollingerBandLowerData
                };

                setSeries([candleSeries, ma20Series, bollingerBandUpperSeries, bollingerBandLowerSeries]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [uri]);

    return (
        <CandlestickChart series={series} />
    );
};
