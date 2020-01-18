import React from 'react';

import { withClubTypeContext } from '@utils/clubTypeContext';

import formStyles from '@styles/form.style';
import AutoComplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const ClubTypeSelector = ({
    label,
    value,
    onChange,
    clubTypes
}) => {

    const classes = formStyles();

    const handleOnChange = (event, value) => {

        onChange(value);
    };

    return (
        <AutoComplete
            options={ clubTypes }
            getOptionLabel={ option => option === "" ? "" : option.label }
            renderInput={ params => (
                <TextField
                    className={ classes.plainTextField }
                    { ...params }
                    label={ label }
                    variant="outlined"
                    fullWidth />
            )}
            value={ value }
            onChange={ handleOnChange }/>
    );
};

export default withClubTypeContext(ClubTypeSelector);
