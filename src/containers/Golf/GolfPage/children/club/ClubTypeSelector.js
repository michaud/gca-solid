import React from 'react';

import AutoComplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { useClubData } from '@golfcontexts/dataProvider/AppDataProvider';

import formStyles from '@golfstyles/form.style';

const ClubTypeSelector = ({
    label,
    value,
    onChange
}) => {

    const { clubDefinitions } = useClubData();
    const classes = formStyles();

    const handleOnChange = (event, value) => {

        onChange(value);
    };

    return (
        <AutoComplete
            options={ clubDefinitions.clubTypes }
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
