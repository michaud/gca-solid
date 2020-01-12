import React, { useState } from 'react';

import formStyles from '@styles/form.style';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const MarkerSelector = ({ markers = [], onSelect }) => {

    const classes = formStyles();
    const [selectedMarker, setSelectedMarker] = useState();

    const handleListItemClick = marker => () => {

        setSelectedMarker(marker);
        onSelect && onSelect(marker);
    };

    return <>
        <header className="c-header--sec">Select marker</header>
        <Paper className={ classes.paper }>
            <List className={ classes.selectorList } role="list">
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
