import React from 'react';

import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

const clubFormStyles = makeStyles(theme => ({
    textField: {
        width: '100%',
        '& .MuiAutocomplete-input': {
            borderColor: 'transparent'
        },
        '& .MuiAutocomplete-input:focus': {
            borderColor: 'transparent'
        },
        '& .MuiInput-input:invalid': {
            borderColor: 'transparent'
        },
        '& .MuiInput-input:active': {
            borderColor: 'transparent'
        },

        '& .MuiInput-input:focus': {
            borderColor: 'transparent'
        },
        '& .MuiInput-input': {
            borderColor: 'transparent'
        }
    }
}));

const IDEditor = ({ field, label, value, onChange }) => {

    const classes = clubFormStyles();
    if(value.indexOf('#me') > 0) {
        //TODO implement editor for borrowed Clubs
        return null;

    } else {
        return  (
            <TextField 
                required
                className={ classes.textField }
                size="normal"
                margin="normal"
                label={ label }
                value={ value }
                onChange={ onChange }/>
        );
    }
};

export default IDEditor;
