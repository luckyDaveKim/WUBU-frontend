import CandlestickChart from './CandlestickChart';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CandlestickDailyPriceChart({ uri }) {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        axios.get(uri)
            .then(res => {
                const candleData = res.data.map(({ date_timestamp, price }) => {
                    return {
                        x: new Date(date_timestamp),
                        y: price
                    };
                });
                const candleSeries = {
                    name: 'candle',
                    type: 'candlestick',
                    data: candleData
                };

                const ma20Data = res.data.map(({ date_timestamp, ma20 }) => {
                    return {
                        x: new Date(date_timestamp),
                        y: ma20
                    };
                });
                const ma20Series = {
                    name: 'ma20',
                    type: 'line',
                    data: ma20Data
                };

                const bollingerBandData = res.data.map(({ date_timestamp, bollingerBand }) => {
                    return {
                        x: new Date(date_timestamp),
                        y: bollingerBand.map(val => val === null ? undefined : val)
                    };
                });
                const bollingerBandSeries = {
                    name: 'bollingerBand',
                    type: 'rangeArea',
                    data: bollingerBandData
                };

                setSeries([candleSeries, ma20Series, bollingerBandSeries]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [uri]);

    return (
        <CandlestickChart series={series} />
    );
};
