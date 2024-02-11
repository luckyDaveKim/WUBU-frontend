import dayjs from 'dayjs';
import { Link } from 'react-router-dom';


const COMPANY_SEARCH_RANGE_DAYS = 180;
const DATE_FORMAT = 'YYYY-MM-DD';
const makeCompanyLink = (code, endDateText) => {
    const endDate = dayjs(endDateText);
    const startDate = endDate.subtract(COMPANY_SEARCH_RANGE_DAYS, 'day');

    return `/company/${code}?startDate=${startDate.format(DATE_FORMAT)}&endDate=${endDate.format(DATE_FORMAT)}`;
};

export default function AnalysisTableRow({ companyName, code, analysisDate, matched_rule }) {
    return (
        <tr>
            <td>
                <Link to={makeCompanyLink(code, analysisDate)}>{companyName} {(code)}</Link>
            </td>
            <td>{dayjs(analysisDate).format('YYYY-MM-DD')}</td>
            <td>{matched_rule ? '일치' : '불일치'}</td>
        </tr>
    );
}
