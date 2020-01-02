import { makeStyles } from '@material-ui/core/styles';

const formStyles = makeStyles(theme => ({
    textField: {
        width: '100%',
        marginBottom: '1.5rem',
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
    plainTextField: {
        width: '100%',
        marginBottom: '.5rem',
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
    textFieldNumber: {
        marginBottom: '1rem',
        width: '22.7%',
        marginRight:'3%',
        '&:nth-child(5)': {
            marginRight: '-9%'
        }

    },
    button: {
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

export default formStyles;
