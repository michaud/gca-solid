import { makeStyles } from '@material-ui/core/styles';

const bagTransferListStyles = makeStyles(theme => ({
    grid: {
            display: 'grid',
            gridTemplateColumns: '1fr 4rem 1fr',
            gridTemplateRows: '2rem 1fr',
            gridColumnGap: '.75rem',
            gridRowGap: '0px'
    },
    gridLeftHeader: {
        gridArea: '1 / 1 / 2 / 2'
    },
    gridRightHeader: {
        gridArea: '1 / 3 / 2 / 4'
    },
    gridLeft: {
        gridArea: '2 / 1 / 3 / 2',
        position: 'relative'
    },
    gridMid: {
        gridArea: '2 / 2 / 3 / 3',
        display: 'flex',
        alignItems: 'center'
    },
    gridRight: {
        gridArea: '2 / 3 / 3 / 4',
        position: 'relative'
    },
    gridLeftBottom: {
        gridArea: '3 / 1 / 3 / 2',
        position: 'relative'
    },
    gridMidBottom: {
        gridArea: '3 / 2 / 3 / 3',
        display: 'flex',
        alignItems: 'center'
    },
    gridRightBottom: {
        gridArea: '3 / 3 / 3 / 4',
        position: 'relative',
        paddingTop: '.5rem',
        textAlign: 'center'
    },
    paper: {
        overflowY: 'scroll',
        height: 230,
    },
    button: {
        margin: theme.spacing(0.5, 0),
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

export default bagTransferListStyles;
