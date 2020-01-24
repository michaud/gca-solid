import React, { useState, useEffect } from 'react';

import { withClubTypeContext } from '@utils/clubTypeContext';

import bagTransferListStyles from './bagTransferList.style';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { FormControlLabel, Switch } from '@material-ui/core';

const not = (a, b) => a.filter(value => b.indexOf(value) === -1);
const intersection = (a, b) => a.filter(value => b.indexOf(value) !== -1);

const checkDisabled = (left, leftChecked, right, rightChecked) => ({
    canAllRight: left.length < 15 && right.length + left.length < 15,
    canAllLeft: right.length > 0,
    canSomeRight: leftChecked.length > 0 && leftChecked.length + right.length < 15,
    canSomeLeft: rightChecked.length > 0
});

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
    const [autoSort, setAutoSort] = useState(true);
    const classes = bagTransferListStyles();
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

    const autoSortChangeHandler = () => setAutoSort(state => !state);

    const sortClubOnType = (a ,b) => {
        
        const indexOfa = clubTypes.findIndex(el => el.iri === a.clubType.value.iri);
        const indexOfb = clubTypes.findIndex(el => el.iri === b.clubType.value.iri);

        return indexOfa - indexOfb;
    };

    const handleAllRight = () => {
        
        const newRight = right.concat(left);
        const sortedRight = newRight.sort(sortClubOnType);

        setRight(sortedRight);
        setLeft([]);
        onAddToBag(left);
    };

    const handleCheckedRight = () => {

        onAddToBag(leftChecked);
        const newLeft = not(left, leftChecked);
        const sortedLeft = newLeft.sort(sortClubOnType);
        setLeft(sortedLeft);

        const newRight = right.concat(leftChecked);
        const sortedRight = newRight.sort(sortClubOnType);
        setRight(sortedRight);

        onAddToBag(leftChecked);

        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {

        const newLeft = left.concat(rightChecked);
        const sortedLeft = newLeft.sort(sortClubOnType);
        setLeft(sortedLeft);

        const newRight = not(right, rightChecked);
        const sortedRight = newRight.sort(sortClubOnType);
        setRight(sortedRight);

        onRemoveFromBag(rightChecked)

        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
        onRemoveFromBag(right);
    };

    const customList = items => (
        <Paper className={ classes.paper }>
            <List dense component="div" role="list">
            {
                items.map((item, index) => {

                    const clubType = item.clubType.value;
                    const brand = item.clubBrand.value;
                    const name = item.clubName.value;
                    const label = clubTypes.find(type => type.iri === clubType.iri).label;
                    const labelId = `transfer-list-item-${index}-label`;

                    return (
                        <ListItem key={ index }
                            className={ classes.listItem }
                            role="listitem"
                            button onClick={ handleToggle(item) }>
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
                                id={ labelId }
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

            const sortedClubs = filteredClubs.clubs.sort(sortClubOnType);
            const sortedBag = filteredClubs.bag.sort(sortClubOnType);
         
            setLeft(sortedClubs);
            setRight(sortedBag);
        }
    }, [clubs, bag]);

    const getClubCountString = (testClubs) => {

        if(
            testClubs &&
            testClubs.length === 1
        ) return '1 club';

        if(
            testClubs &&
            testClubs.length > 1
        ) return `${ testClubs.length } clubs`;

        return '';
    };

    const clubCountString = getClubCountString(right);

    const disabled = checkDisabled(left, leftChecked, right, rightChecked);

    return (
        <div className={ classes.grid }>
            <div className={ classes.gridLeftHeader }>
                <header className="c-header">Clubs</header>
            </div>
            <div className={ classes.gridRightHeader }>
                <header className="c-header">Bag: { clubCountString }</header>
            </div>
            <div className={ classes.gridLeft }>{ customList(left) }</div>
            <div className={ classes.gridRight }>
                { customList(right) }
            </div>
            <div className={ classes.gridMid }>
                <div>
                    <Button
                        variant="outlined"
                        size="small"
                        className={ classes.button }
                        onClick={ handleAllRight }
                        disabled={ !disabled.canAllRight }
                        aria-label="move all right">&gt;&gt;</Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={ classes.button }
                        onClick={ handleCheckedRight }
                        disabled={ !disabled.canSomeRight }
                        aria-label="move selected right">&gt;</Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={ classes.button }
                        onClick={ handleCheckedLeft }
                        disabled={ !disabled.canSomeLeft }
                        aria-label="move selected left">&lt;</Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={ classes.button }
                        onClick={ handleAllLeft }
                        disabled={ !disabled.canAllLeft }
                        aria-label="move all left">&lt;&lt;</Button>
                </div>
            </div>
            <div className={ classes.gridRightBottom }>
                <FormControlLabel
                    control={
                        <Switch
                            color="primary"
                            checked={ autoSort }
                            onChange={ autoSortChangeHandler }
                            value="autoSort"/>
                    }
                    label="auto sort"/>
            </div>
        </div>
    );
};

export default withClubTypeContext(BagTransferList);
