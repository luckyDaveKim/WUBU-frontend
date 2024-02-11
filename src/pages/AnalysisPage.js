import AnalysisTable from '../components/AnalysisTable';

const getCompaniesUri = () => {
    return `http://localhost:8000/api/companies`;
};
const getAnalysisUri = () => {
    return `http://localhost:8000/api/analysis`;
};
export default function AnalysisPage() {

    return (
        <AnalysisTable companiesUri={getCompaniesUri()} analysisUri={getAnalysisUri()} />
    );
};
