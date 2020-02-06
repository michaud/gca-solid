import React, { useContext } from 'react';

import formStyles from '@styles/form.style';
import AutoComplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ClubTypeContext from '@utils/clubTypeContext';

const ClubTypeSelector = ({
    label,
    value,
    onChange
}) => {

    const clubTypeData = useContext(ClubTypeContext);

    const classes = formStyles();

    const handleOnChange = (event, value) => {

        onChange(value);
    };

    return (
        <AutoComplete
            options={ clubTypeData.clubTypes }
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

export default ClubTypeSelector;
