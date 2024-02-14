import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import DateRangePicker from '../components/DateRangePicker';
import AnalysisCompanyTable from '../components/AnalysisCompanyTable';

const getCompaniesUri = () => {
    return `http://localhost:8000/api/companies`;
};
const getAnalysisUri = (code, startDateText, endDateText) => {
    return `http://localhost:8000/api/analysis?code=${code}&startAnalysisDate=${startDateText}&endAnalysisDate=${endDateText}`;
};
export default function AnalysisCompanyPage() {
    const { code } = useParams();
    const [searchParams] = useSearchParams();
    const startDateText = searchParams.get('startDate');
    const endDateText = searchParams.get('endDate');
    const [selectedRangeDateText, setSelectedRangeDateText] = useState({ startDateText, endDateText });

    const onChangeRangeDate = ({ startDateText, endDateText }) => {
        setSelectedRangeDateText({ startDateText, endDateText });
    };

    return (
        <>
            <DateRangePicker startDateText={startDateText} endDateText={endDateText} onChangeRangeDate={onChangeRangeDate} />

            {!!selectedRangeDateText?.startDateText && !!selectedRangeDateText?.endDateText
                && (<AnalysisCompanyTable code={code} analysisUri={getAnalysisUri(code, selectedRangeDateText?.startDateText, selectedRangeDateText?.endDateText)} />)}
        </>
    );
};
