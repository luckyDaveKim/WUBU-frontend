import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD';
const DEFAULT_MONTH_RANGE = 3;
export default function RangeDatePicker({ onChangeRangeDate }) {
    const today = dayjs();
    const lastMonthDay = today.subtract(DEFAULT_MONTH_RANGE, 'month');

    const [startDate, setStartDate] = useState(lastMonthDay.format(DATE_FORMAT));
    const [endDate, setEndDate] = useState(today.format(DATE_FORMAT));

    const onChangeStartDate = ({ target }) => {
        setStartDate(target.value);
    };
    const onChangeEndDate = ({ target }) => {
        setEndDate(target.value);
    };

    useEffect(() => {
        if (!startDate || !endDate) {
            return;
        }

        if (!dayjs(startDate).isBefore(dayjs(endDate))) {
            throw new Error(`시작 값이 종료 값보다 큽니다!!! startDate: ${startDate}, endDate: ${endDate}`);
        }

        onChangeRangeDate({ startDate, endDate });
    }, [startDate, endDate]);

    return (
        <div>
            <input type="date" value={startDate} onChange={onChangeStartDate} />
            ~
            <input type="date" value={endDate} onChange={onChangeEndDate} />
        </div>
    );
};
