import React, { useState } from 'react';

import formStyles from '@styles/form.style';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';

const DateTimeSelector = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const classes = formStyles();

    const handleDateChange = date => {

        setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={ DateFnsUtils }>
            <DateTimePicker
                label="Start time"
                inputVariant="outlined"
                className={ classes.textField }
                value={ selectedDate }
                onChange={ handleDateChange }/>
        </MuiPickersUtilsProvider>
    );
};

export default DateTimeSelector;
