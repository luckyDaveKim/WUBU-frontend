import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import DatePicker from './DatePicker';

const DATE_FORMAT = 'YYYY-MM-DD';
const DEFAULT_DAYS_RANGE = 90;
export default function DateRangePicker({ startDateText: _startDateText, endDateText: _endDateText, daysRange, onChangeRangeDate }) {
    const endDate = !!_endDateText ? dayjs(_endDateText) : dayjs();
    const defaultDaysRange = daysRange || DEFAULT_DAYS_RANGE;
    const startDate = !!_startDateText ? dayjs(_startDateText) : endDate.subtract(defaultDaysRange, 'days');

    const [startDateText, setStartDateText] = useState(startDate.format(DATE_FORMAT));
    const [endDateText, setEndDateText] = useState(endDate.format(DATE_FORMAT));

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

        onChangeRangeDate({ startDateText, endDateText });
    }, [startDateText, endDateText]);

    return (
        <div>
            <DatePicker defaultDateText={startDateText} onChangeDate={onChangeStartDate} />
            ~
            <DatePicker defaultDateText={endDateText} onChangeDate={onChangeEndDate} />
        </div>
    );
};
