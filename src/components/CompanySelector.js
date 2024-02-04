import { useEffect, useState } from 'react';
import axios from 'axios';

const COMPANY_URI = 'http://localhost:8000/api/companies';

const CompanySelector = ({ onChangeCompany }) => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        axios.get(COMPANY_URI)
            .then(res => {
                setCompanies(res.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <select onChange={onChangeCompany}>
                <option key={'company-option-none'} value={''}>회사를 선택해주세요.</option>
                {companies.map(({ code, company: companyName }) => {
                    return (<option key={`company-option-${code}`} value={code}>{companyName}</option>);
                })}
            </select>
        </>
    );
};

export default CompanySelector;
