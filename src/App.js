import { BrowserRouter, Route, Routes } from "react-router-dom";

import AnalysisAllPage from './pages/AnalysisAllPage';
import AnalysisCompanyPage from './pages/AnalysisCompanyPage';
import CompanyPage from './pages/CompanyPage';
import DailyPricePage from "./pages/DailyPricePage";
import Home from './pages/HomePage';

import Layout from "./components/Layout";

import './App.css';

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/daily-price" element={<DailyPricePage />} />
                        <Route path="/company/:code" element={<CompanyPage />} />
                        <Route path="/analysis" element={<AnalysisAllPage />} />
                        <Route path="/analysis/:code" element={<AnalysisCompanyPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
