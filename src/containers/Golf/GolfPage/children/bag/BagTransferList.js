import React, { useState, useEffect, useContext } from 'react';

import ClubTypeContext from '@utils/clubTypeContext';

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
    onAddToBag
}) => {

    const [checked, setChecked] = useState([]);
    const [leftAndRight, setLeftAndRight] = useState({ left: [], right: []})
    const [autoSort, setAutoSort] = useState(true);
    const clubTypeData = useContext(ClubTypeContext);

    const classes = bagTransferListStyles();
    const leftChecked = intersection(checked, leftAndRight.left);
    const rightChecked = intersection(checked, leftAndRight.right);

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
        
        const indexOfa = clubTypeData.clubTypes.findIndex(el => el.iri === a.clubType.value.iri);
        const indexOfb = clubTypeData.clubTypes.findIndex(el => el.iri === b.clubType.value.iri);

        return indexOfa - indexOfb;
    };

    const handleAllRight = () => {
        
        const newRight = leftAndRight.right.concat(leftAndRight.left);
        const right = newRight.sort(sortClubOnType);

        setLeftAndRight(state => ({ left: [],right }));
        onAddToBag(leftAndRight.left);
    };

    const handleCheckedRight = () => {

        onAddToBag(leftChecked);

        const newLeft = not(leftAndRight.left, leftChecked);
        const left = newLeft.sort(sortClubOnType);

        const newRight = leftAndRight.right.concat(leftChecked);
        const right = newRight.sort(sortClubOnType);

        setLeftAndRight({
            left,
            right
        });

        onAddToBag(leftChecked);

        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {

        const newLeft = leftAndRight.left.concat(rightChecked);
        const left = newLeft.sort(sortClubOnType);

        const newRight = not(leftAndRight.right, rightChecked);
        const right = newRight.sort(sortClubOnType);

        setLeftAndRight({
            left,
            right
        });

        onRemoveFromBag(rightChecked)

        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {

        setLeftAndRight(state => ({

            left: state.right,
            right: []
        }));

        onRemoveFromBag(leftAndRight.right);
    };

    const customList = items => (
        <Paper className={ classes.paper }>
            <List dense component="div" role="list">
            {
                items.map((item, index) => {

                    const clubType = item.clubType.value;
                    const brand = item.clubBrand.value;
                    const name = item.clubName.value;
                    const label = clubTypeData.clubTypes.find(type => type.iri === clubType.iri).label;
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

        let didCancel = false;

        if (!didCancel && clubs && bag) {

            const filteredClubs = clubs.reduce((acc, club) => {

                const ref = club.iri.split('#')[1];

                const bagClub = bag.find(obj => obj.ref === ref);

                if(bagClub) {

                    acc.bag.push(club);

                } else {

                    acc.clubs.push(club);
                }

                return acc;

            }, { clubs: [], bag:[]})


            const left = filteredClubs.clubs.sort(sortClubOnType);
            const right = filteredClubs.bag.sort(sortClubOnType);

            setLeftAndRight({
                left,
                right
            });
        }

        return () => { didCancel = true; }

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

    const clubCountString = getClubCountString(leftAndRight.right);

    const disabled = checkDisabled(leftAndRight.left, leftChecked, leftAndRight.right, rightChecked);

    return (
        <div className={ classes.grid }>
            <div className={ classes.gridLeftHeader }>
                <header className="c-header">Clubs</header>
            </div>
            <div className={ classes.gridRightHeader }>
                <header className="c-header">Bag: { clubCountString }</header>
            </div>
            <div className={ classes.gridLeft }>{ customList(leftAndRight.left) }</div>
            <div className={ classes.gridRight }>
                { customList(leftAndRight.right) }
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

export default BagTransferList;
