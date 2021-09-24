import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import ColorLabel from "../../atoms/ColorLabel/ColorLabel";
import ColorText from "../../atoms/ColorText/ColorText";

type Data = {
  curRate: number;
  beforeRate: number;
  comparisonRate: number;
  percentage: number;
  balance: Balance
}

type Balance = 'UP' | 'EQUAL' | 'DOWN'

type Response = Data

function TodayExchangeRateStatus() {
  const [exchangeRateStatusData, setExchangeRateStatusData] = useState<Data>({
    curRate: 0,
    beforeRate: 0,
    comparisonRate: 0,
    percentage: 0,
    balance: "EQUAL"
  });

  const loadExchangeRateStatusRes = (res: Response) => {
    setExchangeRateStatusData(res)
  }

  useEffect(() => {
    const date = moment().format('YYYY-MM-DD')

    axios.get<Response>(`http://localhost:8080/api/status/exchange-rate/${date}`)
      .then(({data: exchangeRateRes}) => loadExchangeRateStatusRes(exchangeRateRes))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="ibox ">
      <div className="ibox-title">
        <div className="ibox-tools">
          <ColorLabel balance={exchangeRateStatusData.balance}>
            today
          </ColorLabel>
        </div>
        <h5>환율</h5>
      </div>
      <div className="ibox-content">
        <h1 className="no-margins">{exchangeRateStatusData.curRate}</h1>

        <ColorText
          comparisonRate={exchangeRateStatusData.comparisonRate}
          percentage={exchangeRateStatusData.percentage}
          balance={exchangeRateStatusData.balance}/>
        <small>원달러</small>
      </div>
    </div>
  );
}

export default TodayExchangeRateStatus;
