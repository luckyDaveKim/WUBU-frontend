import dayjs from 'dayjs';
import { Link } from 'react-router-dom';


const STOCK_SEARCH_RANGE_DAYS = 180;
const DATE_FORMAT = 'YYYY-MM-DD';
const makeCompanyLink = (code, endDateText) => {
    const endDate = dayjs(endDateText);
    const startDate = endDate.subtract(STOCK_SEARCH_RANGE_DAYS, 'day');

    return `/company/${code}?startDate=${startDate.format(DATE_FORMAT)}&endDate=${endDate.format(DATE_FORMAT)}`;
};

export default function AnalysisCompanyTableRow({ code, analysisDate, matched_rule }) {
    return (
        <tr>
            <td>{dayjs(analysisDate).format('YYYY-MM-DD')}</td>
            <td>
                <Link to={makeCompanyLink(code, analysisDate)}>{matched_rule ? '일치' : '불일치'}</Link>
            </td>
        </tr>
    );
}
