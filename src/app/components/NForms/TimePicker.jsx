import React from 'react';
import { TimePicker as TP } from '@mui/x-date-pickers';



export const TimePicker = (props) => {
    const { value, onChange, name, label, slotProps, error, helperText } = props;

    // Custom function to extract time from a date object
    const extractTime = (date) => {
        return date.toTimeString().split(' ')[0];
    };

    // Custom onChange function to only pass the time part as a string
    const handleTimeChange = (date) => {
        const timeValue = extractTime(date);
        onChange(timeValue);
    };

    return (

        <TP
            label={label}
            name={name}
            slotProps={slotProps}
            error={error}
            onChange={handleTimeChange}
            renderInput={(props) => (
                // You can customize the input if needed
                <input value={value} {...props} />
            )}
            helperText={helperText}
        />

    );
};
