import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './page/HomePage';
import DailyPricePage from "./page/DailyPricePage";
import Layout from "./components/Layout";
import './App.css';

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="daily-price" element={<DailyPricePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
