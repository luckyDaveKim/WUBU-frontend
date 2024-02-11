import dayjs from 'dayjs';

export default function AnalysisTableRow({ companyName, code, analysisDate, matched_rule }) {
    return (
        <tr>
            <td>{companyName} {(code)}</td>
            <td>{dayjs(analysisDate).format('YYYY-MM-DD')}</td>
            <td>{matched_rule ? '일치' : '불일치'}</td>
        </tr>
    );
}
