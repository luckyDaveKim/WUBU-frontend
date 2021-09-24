import React from "react";

type Props = {
  balance: Balance;
  children?: React.ReactNode;
}

type Balance = 'UP' | 'EQUAL' | 'DOWN'

function ColorLabel({balance, children}: Props) {
  let labelColor = '';

  switch (balance) {
    case "UP":
      labelColor = 'label-danger'
      break;
    case "EQUAL":
      labelColor = 'label-white'
      break;
    case "DOWN":
      labelColor = 'label-success'
      break;
  }

  return (
    <span className={`label ${labelColor} float-right`}>
      {children}
    </span>
  );
}

export default ColorLabel;
