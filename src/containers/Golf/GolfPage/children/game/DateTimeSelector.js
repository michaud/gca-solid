import React, { useState } from 'react';

import formStyles from '@styles/form.style';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';

const DateTimeSelector = ({ onChange }) => {

    const [selectedDate, setSelectedDate] = useState(Date.now());
    const classes = formStyles();

    const handleDateChange = date => {

        setSelectedDate(date);
        if(onChange) onChange(date);
    };

    return (
        <MuiPickersUtilsProvider utils={ DateFnsUtils }>
            <DateTimePicker
                label="Start time"
                inputVariant="outlined"
                className={ classes.textField }
                value={ selectedDate }
                ampm={ false }
                format="dd-MM-yy HH:mm"
                onChange={ handleDateChange }/>
        </MuiPickersUtilsProvider>
    );
};

export default DateTimeSelector;
