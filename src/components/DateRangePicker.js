import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import DatePicker from './DatePicker';

const DATE_FORMAT = 'YYYY-MM-DD';
const DEFAULT_MONTH_RANGE = 3;
export default function DateRangePicker({ onChangeRangeDate }) {
    const today = dayjs();
    const lastMonthDay = today.subtract(DEFAULT_MONTH_RANGE, 'month');

    const [startDateText, setStartDateText] = useState(lastMonthDay.format(DATE_FORMAT));
    const [endDateText, setEndDateText] = useState(today.format(DATE_FORMAT));

    const onChangeStartDate = (dateText) => {
        setStartDateText(dateText);
    };
    const onChangeEndDate = (dateText) => {
        setEndDateText(dateText);
    };

    useEffect(() => {
        if (!startDateText || !endDateText) {
            return;
        }

        if (!dayjs(startDateText).isBefore(dayjs(endDateText))) {
            throw new Error(`시작 값이 종료 값보다 큽니다!!! startDate: ${startDateText}, endDate: ${endDateText}`);
        }

        onChangeRangeDate({ startDate: startDateText, endDate: endDateText });
    }, [startDateText, endDateText]);

    return (
        <div>
            <DatePicker defaultDateText={startDateText} onChangeDate={onChangeStartDate} />
            ~
            <DatePicker defaultDateText={endDateText} onChangeDate={onChangeEndDate} />
        </div>
    );
};
