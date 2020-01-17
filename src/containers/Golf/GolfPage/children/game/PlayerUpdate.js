import React, { useState } from 'react';

import getFieldControl from '@utils/getFieldControl';
import formStyles from '@styles/form.style';
import Button from '@material-ui/core/Button';
import {
    FlexContainer,
    FlexItemData,
    FlexItemLabel,
    FlexItemValue,
    FlexItem,
    FlexItemRight
} from '@styles/layout.style';

const checkFieldsChanged = (player, state) => {

    const hasData = player !== undefined && state !== undefined;
    const handicapChanged = player.handicap.value !== state.handicap.value;

    return hasData && handicapChanged;
};

const PlayerUpdate = ({
    player,
    actionLabel = 'Update player',
    title = 'Player update',
    onSave
}) => {

    const [playerState, setPlayerState] = useState(player);

    const classes = formStyles();

    const onChangeHandicap = player => (event) => {

        const value = parseInt(event.target.value);

        setPlayerState( state => ({
            ...state,
            handicap: {
                ...state.handicap,
                value
            }
        }));
    };

    const onCancel = () => {

    };

    const saveHandler = () => {

        onSave(playerState);
    };

    const canSave = checkFieldsChanged(player, playerState);

    const handicapField = getFieldControl({
        data: playerState.handicap,
        styles: classes,
        onChange: onChangeHandicap,
        idx: 0
    });
    
    return (
        <>
            <header className="c-header--sec">{ title }</header>
            <FlexContainer>
                <FlexItemData>
                    <FlexContainer>
                        <FlexItemLabel>Name</FlexItemLabel>
                        <FlexItemValue>{ `${ player.givenName.value } ${ player.familyName.value }`}</FlexItemValue>
                    </FlexContainer>
                </FlexItemData>
            </FlexContainer>
            { handicapField }
            <FlexContainer>
                <FlexItem>
                    <Button
                        variant="contained"
                        disabled={ !canSave }
                        onClick={ saveHandler }
                        className={ classes.button }
                        color="primary">{ actionLabel }</Button>
                </FlexItem>
                <FlexItemRight>
                { onCancel && <Button
                    variant="contained"
                    disabled={ !canSave }
                    onClick={ onCancel }
                    className={ classes.button }
                    color="primary">Cancel</Button>
                }
                </FlexItemRight>
            </FlexContainer>
        </>
    );
};

export default PlayerUpdate;
