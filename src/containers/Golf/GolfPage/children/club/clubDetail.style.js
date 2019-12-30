import { makeStyles } from '@material-ui/core/styles';

const clubDetailStyles = makeStyles(theme => ({
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
    },
    button: {
        marginTop: theme.spacing(2),
        '& .MuiButton-label': {
            color: 'white'
        },
        '&:disabled': {
            opacity: 1,
            '& .MuiButton-label': {
                color: 'rgba(0,0,0,.5)'
            }
        }
    }
}));

export default clubDetailStyles;
