import { useEffect, useState } from 'react';
import axios from 'axios';
import AnalysisCompanyTableRow from './AnalysisCompanyTableRow';

export default function AnalysisCompanyTable({ code, analysisUri }) {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (!analysisUri) {
            return;
        }

        axios.get(analysisUri)
            .then(({ data }) => setTableData(data));
    }, [analysisUri]);

    return (
        <>
            <div>{code}</div>
            <table>
                <thead>
                <tr>
                    <th>분석일</th>
                    <th>분석 결과</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map(
                    ({ code, analysis_date, rules }) => (
                        <AnalysisCompanyTableRow key={`analysis-company-row-${code}`}
                                                 code={code}
                                                 analysisDate={analysis_date}
                                                 matched_rule={rules?.default?.matched_rule} />
                    )
                )}
                </tbody>
            </table>
        </>
    );
}
