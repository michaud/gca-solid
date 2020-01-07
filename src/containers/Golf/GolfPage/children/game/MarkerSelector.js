import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        height: '5rem',
        flexGrow: 1,
        marginBottom: '2rem',
        minHeight: '10rem',
        '&.MuiList-padding': {
            paddingTop: 0,
            paddingBottom: 0
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

const MarkerSelector = ({ markers = [], onSelect }) => {

    const classes = useStyles();
    const [selectedMarker, setSelectedMarker] = useState();

    const handleListItemClick = marker => (event) => {

        setSelectedMarker(marker);
        onSelect(marker);
    };

    return <>
        <header className="c-header--sec">Select marker</header>
        <Paper className={ classes.paper }>
            <List className={ classes.root } role="list">
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
                            primary={ `${ marker.fields.givenName.field.value } ${ marker.fields.familyName.field.value }` }
                            secondary={
                                <>
                                    <Typography component="span"
                                        variant="body2"
                                        className={ classes.inline }
                                        color="textPrimary">
                                        { `${ marker.fields.handicap.field.label }: ${ marker.fields.handicap.field.value }` }
                                    </Typography>
                                </>
                            }/>
                    </ListItem>
                })
            }
            </List>
        </Paper>
    </>
};

export default MarkerSelector;
