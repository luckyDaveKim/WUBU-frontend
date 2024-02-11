import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/HomePage';
import DailyPricePage from "./pages/DailyPricePage";
import Layout from "./components/Layout";
import './App.css';
import AnalysisPage from './pages/AnalysisPage';

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="daily-price" element={<DailyPricePage />} />
                        <Route path="analysis" element={<AnalysisPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
