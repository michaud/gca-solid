import React, { useState } from 'react';

import formStyles from '@styles/form.style';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: '1rem',
        minHeight: '14.5rem'
    },
    gridItem: {
        flexGrow: 1,
        position: 'relative'
    }
}));

const MarkerSelector = ({ markers = [], onSelect }) => {

    const classes = formStyles();
    const classesmui = useStyles();

    const [selectedMarker, setSelectedMarker] = useState();

    const handleListItemClick = marker => () => {

        setSelectedMarker(marker);
        onSelect && onSelect(marker);
    };

    return (
        <>
            <header className="c-header--sec">Select marker</header>
            <Grid container spacing={2} className={ classesmui.root }>
                <Grid item className={ classesmui.gridItem }>
                    <Paper className={ classes.listContainer }>
                        <List dense component="div" className={ classes.selectorList } role="list">
                        {
                            markers && markers.map((marker, idx) => {

                                return <ListItem
                                    key={ idx }
                                    className={ classes.listItem }
                                    role="listitem"
                                    button
                                    selected={ selectedMarker === marker }
                                    onClick={ handleListItemClick(marker) }>
                                    <ListItemText
                                        primary={ `${ marker.givenName.value } ${ marker.familyName.value }` }
                                        secondary={
                                            <>
                                                <Typography component="span"
                                                    variant="body2"
                                                    className={ classes.inline }
                                                    color="textPrimary">
                                                    { `${ marker.handicap.label }: ${ marker.handicap.value }` }
                                                </Typography>
                                            </>
                                        }/>
                                </ListItem>
                            })
                        }
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default MarkerSelector;
