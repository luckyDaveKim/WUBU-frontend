import CandlestickChart from './CandlestickChart';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CandlestickDailyPriceChart({ uri }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(uri)
            .then(res => {
                setData(res.data.map(eachData => {
                    return {
                        x: new Date(eachData.date_timestamp),
                        y: eachData.price
                    };
                }));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [uri]);

    return (
        <CandlestickChart data={data} />
    );
};
