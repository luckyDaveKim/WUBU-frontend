import { useState } from 'react';
import AnalysisTable from '../components/AnalysisTable';
import DatePicker from '../components/DatePicker';

const getCompaniesUri = () => {
    return `http://localhost:8000/api/companies`;
};
const getAnalysisUri = (targetDateText) => {
    return `http://localhost:8000/api/analysis?targetDate=${targetDateText}`;
};
export default function AnalysisPage() {
    const [selectedDateText, setSelectedDateText] = useState('');

    const onChangeDate = (dateText) => {
        setSelectedDateText(dateText);
    };

    return (
        <>
            <DatePicker onChangeDate={onChangeDate} />

            {!!selectedDateText && (<AnalysisTable companiesUri={getCompaniesUri()} analysisUri={getAnalysisUri(selectedDateText)} />)}
        </>
    );
};
