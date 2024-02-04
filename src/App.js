import './App.css';
import CandlestickDailyPriceChart from './page/CandlestickDailyPriceChart';

function App() {
    const dailyPriceUri = 'http://localhost:8000/api/companies/000020/price/daily';

    return (
        <div className="App">
            <CandlestickDailyPriceChart uri={dailyPriceUri} />
        </div>
    );
}

export default App;
