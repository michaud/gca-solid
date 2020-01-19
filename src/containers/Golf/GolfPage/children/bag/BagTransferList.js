import React, { useState, useEffect } from 'react';

import { withClubTypeContext } from '@utils/clubTypeContext';

import { makeStyles } from '@material-ui/core/styles';
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
    grid: {
            display: 'grid',
            gridTemplateColumns: '1fr 4rem 1fr',
            gridTemplateRows: '2rem 1fr',
            gridColumnGap: '1rem',
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
        gridArea: '2 / 2 / 3 / 3'
    },
    gridRight: {
        gridArea: '2 / 3 / 3 / 4',
        position: 'relative'
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
    const [canTransferToBag, setCanTransferToBag] = useState(true);
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

        setCanTransferToBag(leftChecked.length !== 0 && leftChecked.length < 15 && leftChecked.length + right.length < 15);
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

            if(filteredClubs.bag.length > 13) {
                setCanTransferToBag(false);
            } else {
                setCanTransferToBag(true);
            }
        }
    }, [clubs, bag]);

    const getClubCountString = (testClubs) => {

        if(testClubs && testClubs.length === 1) return '1 club';

        if(testClubs && testClubs.length > 1) return `${ testClubs.length } clubs`;

        return '';
    };

    const clubCountString = getClubCountString(right);
    
    return (
        <div className={ classes.grid }>
            <div className={ classes.gridLeftHeader }>
                <header className="c-header">Clubs</header>
            </div>
            <div className={ classes.gridRightHeader }>
                <header className="c-header">Bag: { clubCountString }</header>
            </div>
            <div className={ classes.gridLeft }>{ customList(left) }</div>
            <div className={ classes.gridRight }>{ customList(right) }</div>
            <div className={ classes.gridMid }>
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    onClick={handleAllRight}
                    disabled={ left.length === 0 || left.length > 14 || left.length + right.length > 14 || !canTransferToBag }
                    aria-label="move all right">&gt;&gt;</Button>
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    onClick={handleCheckedRight}
                    disabled={ !canTransferToBag }
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
            </div>
        </div>
    );
};

export default withClubTypeContext(BagTransferList);
