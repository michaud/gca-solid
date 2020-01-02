import React from 'react';

import formStyles from '@styles/form.style';

import ClubTypeContext from '@utils/clubTypeContext';
import AutoComplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const ClubTypeSelector = ({ label, value, onChange }) => {

    const classes = formStyles();

    const handleOnChange = (event, value) => {

        onChange(value);
    };

    return <ClubTypeContext.Consumer>
    {
        ({ clubTypes }) => {

            if (clubTypes) {

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
            } else {
                return null;
            }
        }
    }</ClubTypeContext.Consumer>
};

export default ClubTypeSelector;
