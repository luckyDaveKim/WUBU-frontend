import React, { useEffect, useState } from "react";
import Select, { OnChangeValue } from "react-select";
import { FixedSizeList as List } from "react-window";
import axios from "axios";
import useControllerActions from "../../../hooks/controller/userControllerAction";

type OptionType = {
  value: String;
  label: String;
}

type CompanyType = {
  code: String;
  name: String;
}

type Response = CompanyType[]

type MenuListProps = {
  options: any;
  children: any;
  maxHeight: any;
  getValue: any;
}

function MenuList({
                    options,
                    children,
                    maxHeight,
                    getValue
                  }: MenuListProps) {
  const itemHeight = 35
  const height = Math.min(options.length * itemHeight, maxHeight)
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * itemHeight;

  return (
    <List
      height={height}
      width={'100%'}
      itemCount={children.length}
      itemSize={itemHeight}
      initialScrollOffset={initialOffset}
    >
      {({index, style}) => <div style={style}>{children[index]}</div>}
    </List>
  );
}

function CompanySelect() {
  const controllerActions = useControllerActions();
  const [options, setOptions] = useState<OptionType[]>([])

  const loadCompaniesRes = (companiesRes: Response) => {
    const options: OptionType[] = companiesRes.map(({code, name}) => {
      return {'value': code, 'label': `${name} (${code})`} as OptionType
    })

    setOptions(options)
  }

  useEffect(() => {
    axios.get('http://localhost:8080/api/companies/favorite')
      .then(({data: companiesRes}) => loadCompaniesRes(companiesRes))
      .catch(err => console.error(err))
  }, [])

  const onChange = function (value: OnChangeValue<OptionType, false>) {
    controllerActions.setCode(value?.value)
  }

  return (
    <Select options={options}
            components={{MenuList}}
            onChange={onChange}/>
  );
}

export default CompanySelect;
