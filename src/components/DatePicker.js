import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD';
export default function DatePicker({ defaultDateText, onChangeDate }) {
    const defaultDate = defaultDateText ? dayjs(defaultDateText) : dayjs();
    const [dateText, setDateText] = useState(defaultDate.format(DATE_FORMAT));

    useEffect(() => {
        onChangeDate(dateText);
    }, [dateText, onChangeDate]);

    const _onChangeDate = ({ target }) => {
        setDateText(target.value);
    };

    return (
        <input type="date" value={dateText} onChange={_onChangeDate} />
    );
};
