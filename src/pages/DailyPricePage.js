import { useState } from 'react';

import CandlestickDailyPriceChart from '../components/CandlestickDailyPriceChart';
import RangeDatePicker from '../components/RangeDatePicker';
import CompanySelector from '../components/CompanySelector';

const getDailyPriceUri = (companyCode, startDate, endDate) => {
    return `http://localhost:8000/api/companies/${companyCode}/price/daily?startDate=${startDate}&endDate=${endDate}&strategyNames=bollingerBand`;
};
export default function DailyPricePage() {
    const [selectedRangeDate, setSelectedRangeDate] = useState({});
    const [selectedCompany, setSelectedCompany] = useState('');

    const onChangeRangeDate = ({ startDate, endDate }) => {
        setSelectedRangeDate({ startDate, endDate });
    };

    const onChangeCompany = ({ target }) => {
        setSelectedCompany(target.value);
    };

    return (
        <>
            <RangeDatePicker onChangeRangeDate={onChangeRangeDate} />
            <CompanySelector onChangeCompany={onChangeCompany} />
            {!!selectedCompany
                && !!selectedRangeDate?.startDate && !!selectedRangeDate?.endDate
                && (
                    <CandlestickDailyPriceChart uri={getDailyPriceUri(selectedCompany, selectedRangeDate?.startDate, selectedRangeDate?.endDate)} />
                )}
        </>
    );
};
