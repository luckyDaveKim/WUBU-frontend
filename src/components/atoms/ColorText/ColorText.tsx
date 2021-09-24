import React from "react";
import { faCaretDown, faCaretUp, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  comparisonRate: number;
  percentage: number;
  balance: Balance;
}

type Balance = 'UP' | 'EQUAL' | 'DOWN'

function ColorText({
                     comparisonRate,
                     percentage,
                     balance,
                   }: Props) {
  let labelColor = '';
  let icon = faMinus;
  let sign = ''

  switch (balance) {
    case "UP":
      labelColor = 'text-danger'
      icon = faCaretUp
      sign = '+'
      break;
    case "EQUAL":
      labelColor = 'text-white'
      icon = faMinus
      sign = ''
      break;
    case "DOWN":
      labelColor = 'text-success'
      icon = faCaretDown
      sign = '-'
      break;
  }

  return (
    <div className={`stat-percent font-bold ${labelColor}`}>
      <FontAwesomeIcon icon={icon} size={"lg"}/> {`${comparisonRate} (${sign}${percentage}%)`}
    </div>
  );
}

export default ColorText;
