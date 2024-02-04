import './App.css';
import { useState } from 'react';

import CandlestickDailyPriceChart from './page/CandlestickDailyPriceChart';
import CompanySelector from './components/CompanySelector';
import RangeDatePicker from './components/RangeDatePicker';

const getDailyPriceUri = (companyCode, startDate, endDate) => {
    return `http://localhost:8000/api/companies/${companyCode}/price/daily?startDate=${startDate}&endDate=${endDate}`;
};

function App() {
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedRangeDate, setSelectedRnageDate] = useState({});

    const onChangeCompany = ({ target }) => {
        setSelectedCompany(target.value);
    };

    const onChangeRangeDate = ({ startDate, endDate }) => {
        setSelectedRnageDate({ startDate, endDate });
    };

    return (
        <div className="App">
            <CompanySelector onChangeCompany={onChangeCompany} />
            <RangeDatePicker onChangeRangeDate={onChangeRangeDate} />
            {!!selectedCompany
                && !!selectedRangeDate?.startDate && !!selectedRangeDate?.endDate
                && (
                    <CandlestickDailyPriceChart uri={getDailyPriceUri(selectedCompany, selectedRangeDate?.startDate, selectedRangeDate?.endDate)} />
                )}
        </div>
    );
}

export default App;
