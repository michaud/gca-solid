import { makeStyles } from '@material-ui/core/styles';

const formStyles = makeStyles(theme => ({
    textField: {
        width: '100%',
        '&.MuiFormControl-root': {
            margin: '0 0 1.5rem 0'
        },
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
        '&.MuiFormControl-root': {
            margin: '0 0 1.5rem 0'
        },
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
        '&.MuiFormControl-root': {
            margin: '0 0 1.5rem 0',
            width: '22.7%',
            marginRight:'3%'
        },
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
    },
    selectorList: {
        height: '5rem',
        flexGrow: 1,

        minHeight: '10rem',
        '&.MuiList-padding': {
            paddingTop: 0,
            paddingBottom: 0
        },
        '&.MuiList-root': {
            marginBottom: '1rem'
        }
    },
    listItem: {
        paddingLeft: '.5rem',
        paddingRight: '.5rem'
    },
    listItemIcon: {
        minWidth: '2.5rem'
    },
    listItemText: {
        margin: '.125rem 0'
    }
}));

export default formStyles;
