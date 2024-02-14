import { useState } from 'react';
import DateRangePicker from '../components/DateRangePicker';
import CompanySelector from '../components/CompanySelector';
import Chart from '../components/Chart';
import ChartD3 from '../components/ChartD3';
import ChartD32 from '../components/ChartD32';

const getDailyPriceUri = (companyCode, startDate, endDate) => {
    return `http://localhost:8000/api/companies/${companyCode}/price/daily?startDate=${startDate}&endDate=${endDate}&strategyNames=bollingerBand`;
};
export default function DailyPricePage() {
    const [selectedRangeDateText, setSelectedRangeDateText] = useState({});
    const [selectedCompany, setSelectedCompany] = useState('');

    const onChangeRangeDate = ({ startDateText, endDateText }) => {
        setSelectedRangeDateText({ startDateText, endDateText });
    };

    const onChangeCompany = ({ target }) => {
        setSelectedCompany(target.value);
    };

    return (
        <>
            <DateRangePicker onChangeRangeDate={onChangeRangeDate} />
            <CompanySelector onChangeCompany={onChangeCompany} />
            {/*{!!selectedCompany*/}
            {/*    && !!selectedRangeDate?.startDate && !!selectedRangeDate?.endDate*/}
            {/*    && (*/}
            {/*        <CandlestickDailyPriceChart uri={getDailyPriceUri(selectedCompany, selectedRangeDate?.startDate, selectedRangeDate?.endDate)} />*/}
            {/*    )}*/}

            {!!selectedCompany
                && !!selectedRangeDateText?.startDateText && !!selectedRangeDateText?.endDateText
                && (
                    <Chart uri={getDailyPriceUri(selectedCompany, selectedRangeDateText?.startDate, selectedRangeDateText?.endDate)} />
                )}

            {/*{!!selectedCompany
                && !!selectedRangeDate?.startDate && !!selectedRangeDate?.endDate
                && (
                    <ChartD3 uri={getDailyPriceUri(selectedCompany, selectedRangeDate?.startDate, selectedRangeDate?.endDate)} />
                )}*/}

            {/*{!!selectedCompany
                && !!selectedRangeDate?.startDate && !!selectedRangeDate?.endDate
                && (
                    <ChartD32 uri={getDailyPriceUri(selectedCompany, selectedRangeDate?.startDate, selectedRangeDate?.endDate)} />
                )}*/}
        </>
    );
};
