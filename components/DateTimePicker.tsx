import React, { useState } from 'react';
import { Platform } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

interface DateTimePickerProps {
    onDateSelected: (selectedDate: Date) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ onDateSelected }) => {
    const [date, setDate] = useState<Date>(new Date());
    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        onDateSelected(currentDate);
    };

    return (
        Platform.OS == 'ios' && (
            <RNDateTimePicker
                value={date}
                mode="datetime"
                display="default"
                onChange={onDateChange}
            />
        )
    );
};

export default DateTimePicker;