import { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import AnalysisTableRow from './AnalysisTableRow';

export default function AnalysisTable({ companiesUri, analysisUri }) {
    const [companies, setCompanies] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (!companiesUri || !analysisUri) {
            return;
        }

        axios.get(companiesUri)
            .then(({ data }) => {
                const _companies = data.reduce((acc, company) => {
                    acc[company.code] = { ...company };
                    return acc;
                }, {});
                setCompanies(_companies);
            });

        axios.get(analysisUri)
            .then(({ data }) => setTableData(data));
    }, [companiesUri, analysisUri]);

    return (
        <table>
            <thead>
            <tr>
                <th>회사</th>
                <th>분석일</th>
                <th>분석 결과</th>
            </tr>
            </thead>
            <tbody>
            {!_.isEmpty(companies) && tableData
                .filter(({ rules }) => rules?.default?.matched_rule)
                .map(
                    ({ code, analysis_date, rules }) => (
                        <AnalysisTableRow key={`analysis-row-${code}`}
                                          companyName={companies[code]?.company}
                                          code={code}
                                          analysisDate={analysis_date}
                                          matched_rule={rules?.default?.matched_rule} />
                    )
                )}
            </tbody>
        </table>
    );
}
