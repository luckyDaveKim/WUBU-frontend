import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FixedSizeList as List } from "react-window";
import axios from "axios";
import { ValueType } from "react-select/src/types";

type OptionType = {
  value: String;
  label: String;
}

type Props = {
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
                  }: Props) {
  const height = 35
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;

  return (
    <List
      height={maxHeight}
      width={'100%'}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}>
      {({index, style}) => <div style={style}>{children[index]}</div>}
    </List>
  );
}

function CompanySelect() {
  const [options, setOptions] = useState<OptionType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    axios.get('http://localhost:8080/api/companies')
      .then(({data}) => {
        setOptions(data)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }, [])

  const onChange = function (value: ValueType<OptionType, false>) {
    console.log(value?.value)
    console.log(value?.label)
  }

  return (
    <Select options={options}
            components={{MenuList}}
            isLoading={loading}
            onChange={onChange}/>
  );
}

export default CompanySelect;
