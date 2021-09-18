import DualListBox from 'react-dual-listbox';
import React, { useEffect, useState } from "react";
import axios from "axios";

type SelectedOptions = string[]

type OptionType = {
  value: String;
  label: String;
}

type CompanyType = {
  code: String;
  name: String;
}

type Response = CompanyType[]

function CompanyDualList() {
  const [companies, setCompanies] = useState<OptionType[]>([]);
  const [favoriteCompanies, setFavoriteCompanies] = useState<SelectedOptions>([]);

  const loadCompaniesRes = (companiesRes: Response) => {
    const options: OptionType[] = companiesRes.map(({code, name}) => {
      return {'value': code, 'label': `${name} (${code})`} as OptionType
    })

    setCompanies(options)
  }
  const loadFavoriteCompaniesRes = (favoriteCompaniesRes: Response) => {
    const companyCodes: SelectedOptions = favoriteCompaniesRes.map(({code}) => {
      return code as string
    })

    setFavoriteCompanies(companyCodes)
  }

  useEffect(() => {
    const config = {
      params: {
        'page': 1,
        'pageSize': 100
      }
    };
    const getPrice = axios.get<Response>(`http://localhost:8080/api/companies`, config);
    const getVolume = axios.get<Response>(`http://localhost:8080/api/companies/favorite`, config);

    axios.all([getPrice, getVolume])
      .then(axios.spread(({data: companiesRes}, {data: favoriteCompaniesRes}) => {
        loadCompaniesRes(companiesRes)
        loadFavoriteCompaniesRes(favoriteCompaniesRes)
      }))
      .catch(err => console.error(err))
  }, [])

  const onChange = (selected: any) => {
    setFavoriteCompanies(selected);
  }

  const onClick = () => {
    axios.put(`http://localhost:8080/api/companies/favorite`, {
      'companyCodes': favoriteCompanies
    }).catch(err => console.error(err))
  }

  return (
    <div>
      <DualListBox
        canFilter
        options={companies}
        selected={favoriteCompanies}
        onChange={onChange}
        icons={{
          moveLeft: '<',
          moveAllLeft: '<<',
          moveRight: '>',
          moveAllRight: '>>'
        }}
      />
      <div>
        <button className="btn btn-sm btn-primary float-right m-t-n-xs" type="submit" onClick={onClick}>
          <strong>저장</strong>
        </button>
      </div>
    </div>
  );
}

export default CompanyDualList;
