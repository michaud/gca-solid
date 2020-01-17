import React, { useState, useEffect } from 'react';

import { withClubTypeContext } from '@utils/clubTypeContext';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: '2rem',
        minHeight: '18rem'
    },
    list: {
    },
    gridItem: {
        flexGrow: 1,
        position: 'relative'
    },
    gridItemTool: {
        flexGrow: 0,
        padding: '4.5rem .5rem 0 .5rem'
    },
    paper: {
        overflowY: 'scroll',
        height: 230,
        position: 'absolute',
        left: 0,
        right: 0,
        top: '3rem',
        bottom: 0
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

function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1);
}

const BagTransferList = ({
    clubs,
    bag,
    onRemoveFromBag,
    onAddToBag,
    clubTypes
}) => {

    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);
    const classes = useStyles();

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = value => () => {

        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
        onAddToBag(left);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
        
        onAddToBag(leftChecked);
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
        onRemoveFromBag(rightChecked)
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
        onRemoveFromBag(right)
    };

    const customList = items => (
        <Paper className={ classes.paper }>
            <List dense component="div" className={ classes.list } role="list">
            {
                items.map((item, index) => {

                    const clubType = item.clubType.value;
                    const brand = item.clubBrand.value;
                    const name = item.clubName.value;
                    const label = clubTypes.find(type => type.iri === clubType.iri).label;
                    const labelId = `transfer-list-item-${index}-label`;

                    return (
                        <ListItem key={ index } className={ classes.listItem } role="listitem" button onClick={handleToggle(item)}>
                            <ListItemIcon className={ classes.listItemIcon }>
                                <Checkbox
                                    checked={checked.indexOf(item) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    size="small"
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                className={ classes.listItemText }
                                primary={ label }
                                secondary={ `${ brand } ${ name }` } />
                        </ListItem>
                    );
                })
                }
                <ListItem className={ classes.listItem }/>
            </List>
        </Paper>
    );

    useEffect(() => {

        if (clubs && bag) {

            const filteredClubs = clubs.reduce((acc, club) => {

                const ref = club.iri.split('#')[1];

                const bagClub = bag.list.find(obj => obj.ref === ref);

                if(bagClub) {

                    acc.bag.push(club);

                } else {

                    acc.clubs.push(club);
                }

                return acc;

            }, { bag:[], clubs: []})

            setLeft(filteredClubs.clubs);
            setRight(filteredClubs.bag);
        }
    }, [clubs, bag]);

    return (
        <Grid container spacing={2} className={ classes.root }>
            <Grid item className={ classes.gridItem }>
                <header className="c-header">Clubs</header>
                {customList(left)}
            </Grid>
            <Grid item>
                <Grid container className={ classes.gridItemTool } direction="column" justify="center" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right">&gt;&gt;</Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right">&gt;</Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left">&lt;</Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left">&lt;&lt;</Button>
                </Grid>
            </Grid>
            <Grid item className={ classes.gridItem }>
                <header className="c-header">Bag</header>
                {customList(right)}
            </Grid>
        </Grid>
    );
};

export default withClubTypeContext(BagTransferList);
