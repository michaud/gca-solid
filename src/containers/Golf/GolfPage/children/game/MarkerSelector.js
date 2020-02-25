import React, { useState } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import formStyles from '@golfstyles/form.style';
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

const MarkerSelector = ({
    markers = [],
    onSelect,
    selected
}) => {

    const classes = formStyles();
    const classesmui = useStyles();

    const [selectedMarker, setSelectedMarker] = useState(selected);

    const handleListItemClick = marker => () => {

        setSelectedMarker(marker);
        onSelect && onSelect(marker);
    };

    return (
        <>
            <header className="c-header nudge">Select marker</header>
            <Grid container className={ classesmui.root }>
                <Grid item className={ classesmui.gridItem }>
                    <Paper className={ classes.listContainer }>
                        <List dense
                            className={ classes.selectorList }
                            component="div"
                            role="list">
                        {
                            markers && markers.map((marker, idx) => {

                                const isSelected = marker !== undefined && selectedMarker !== undefined && (selectedMarker.iri.split("#")[1] === marker.iri.split("#")[1]);

                                return <ListItem
                                    key={ idx }
                                    className={ classes.listItem }
                                    role="listitem"
                                    button
                                    autoFocus={ true }
                                    selected={ isSelected }
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
