import './App.css';
import CandlestickDailyPriceChart from './page/CandlestickDailyPriceChart';
import CompanySelector from './components/CompanySelector';
import { useState } from 'react';

const getDailyPriceUri = (companyCode) => {
    return `http://localhost:8000/api/companies/${companyCode}/price/daily`;
};

function App() {
    const [selectedCompany, setSelectedCompany] = useState('');

    const onChangeCompany = ({ target }) => {
        setSelectedCompany(target.value);
    };

    return (
        <div className="App">
            <CompanySelector onChangeCompany={onChangeCompany} />
            {!!selectedCompany && (
                <CandlestickDailyPriceChart uri={getDailyPriceUri(selectedCompany)} />
            )}
        </div>
    );
}

export default App;
