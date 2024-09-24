import React, { useState } from 'react';
import { Button, Platform } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

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

    const showAndroidDateTimePicker = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange: (event, selectedDate) => {
                if (selectedDate) {
                    // Update the date and then show the time picker
                    const newDate = new Date(selectedDate);
                    setDate(newDate);

                    DateTimePickerAndroid.open({
                        value: newDate,
                        mode: 'time',
                        is24Hour: true,
                        onChange: (event, selectedTime) => {
                            if (selectedTime) {
                                // Combine date and time
                                const finalDate = new Date(
                                    newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes())
                                );
                                setDate(finalDate);
                                onDateSelected(finalDate);
                            }
                        },
                    });
                }
            },
            mode: 'date',
        });
    };

    return (
        <>
        {Platform.OS == 'ios' ? (
            <RNDateTimePicker
                value={date}
                mode="datetime"
                display="default"
                onChange={onDateChange}
            />
        ) : (
            <Button title="select Date & Time" onPress={showAndroidDateTimePicker} />
        )}  
        </>
    );
};

export default DateTimePicker;