import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ClubTypeContext from '@utils/clubTypeContext';
import AutoComplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    input: {
        '& .MuiAutocomplete-input': {
            borderColor: 'transparent',
        },
        '& .MuiAutocomplete-input:focus': {
            borderColor: 'transparent',
        }
    }
}));

const ClubTypeSelector = ({ label, value, onChange }) => {

    const classes = useStyles();

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
                            <TextField className={ classes.input } { ...params } label={ label } fullWidth />
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
