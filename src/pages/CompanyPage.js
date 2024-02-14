import { useParams, useSearchParams } from 'react-router-dom';
import Chart from '../components/Chart';

const getDailyPriceUri = (companyCode, startDate, endDate) => {
    return `http://localhost:8000/api/companies/${companyCode}/price/daily?startDate=${startDate}&endDate=${endDate}&strategyNames=bollingerBand`;
};
export default function CompanyPage() {
    const { code } = useParams();
    const [searchParams] = useSearchParams();
    const startDateText = searchParams.get('startDate');
    const endDateText = searchParams.get('endDate');


    return (<Chart uri={getDailyPriceUri(code, startDateText, endDateText)} />);
};
