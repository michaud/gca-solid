import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '100%',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        zIndex: 0,
        left: 0,
        height: '4.125rem',
        '& .MuiLinearProgress-bar': {
            top: '3.75rem',
            borderRadius: '1rem',
            backgroundColor: 'rgba(37, 116, 37, 0.5)'
        }
    }
}, { name: 'MuiLinearProgress' });

export default useStyles;
