import { makeStyles } from '@material-ui/core/styles';

const formStyles = makeStyles(theme => ({
    textField: {
        width: '100%',
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(80, 166, 0)'
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(210, 199, 157)'
        },
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
    SIselect: {
        '&.MuiFormControl-root': {
            margin: '0 0 1.5rem 0',
            width: '22.7%',
            marginRight:'3%'
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '5rem !important'
        },
        '&:nth-child(5)': {
            marginRight: '-9%'
        }
    },

    button: {
        background: 'linear-gradient(171deg, rgb(85, 177, 0) 0%, rgb(55, 116, 0) 100%)',
        '& .MuiButton-label': {
            color: 'white'
        },
        '&.Mui-disabled.Mui-disabled': {
            background: 'linear-gradient(171deg, rgb(241, 234, 208) 0%, rgb(218, 208, 169) 100%)',
        },
        '&:disabled': {
            opacity: 1,
            '& .MuiButton-label': {
                color: 'rgba(0,0,0,.5)'
            }
        }
    },
    expandButton: {
        position: 'absolute',
        right: '-0.2rem',
        bottom: '-0.75rem'
    },
    toolButton: {
        minWidth: '3rem',
        height: '5rem',
        background: 'linear-gradient(171deg, rgb(85, 177, 0) 0%, rgb(55, 116, 0) 100%)',
        color: 'rgba(255, 255, 255, 0.9)',
        '& .MuiButton-root': {
            minWidth: '3rem',
            minHeight: '5rem'
        },
        '& .MuiTouchRipple-root': {
            minWidth: '3rem',
            minHeight: '5rem'
        },
        '& .MuiButton-label': {
            color: 'white'
        },
        '&:disabled': {
            opacity: 1,
            '& .MuiButton-label': {
                color: 'rgba(0,0,0,.5)'
            }
        },
        '& .MuiSvgIcon-root': {
            width: '1.25em',
            height: '1.7rem'
        }
    },
    selectorList: {
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
    },
    listContainer: {
        overflowY: 'scroll',
        height: 230,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
}));

export default formStyles;
