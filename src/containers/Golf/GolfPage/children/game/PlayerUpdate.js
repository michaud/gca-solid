import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import getFieldControl from '@golfutils/getFieldControl';
import formStyles from '@golfstyles/form.style';
import {
    FlexContainer,
    FlexItemLabel,
    FlexItemValue,
    FlexItem,
    FlexItemRight
} from '@golfstyles/layout.style';

const checkFieldsChanged = (player, state) => {


    const hasData = player !== undefined && state !== undefined;
    const handicapChanged = hasData && player.handicap.value !== state.handicap.value;

    return handicapChanged;
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

    const handicapField = playerState && getFieldControl({
        data: playerState.handicap,
        styles: classes,
        onChange: onChangeHandicap,
        idx: 0
    });
    
    return player ? (
        <div className="c-box">
            <header className="c-header nudge">{ title }</header>
            <div className="c-box">
                <FlexContainer>
                    <FlexItemLabel>Name</FlexItemLabel>
                    <FlexItemValue>{ `${ player.givenName.value } ${ player.familyName.value }`}</FlexItemValue>
                </FlexContainer>
            </div>
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
        </div>
    ) : null;
};

export default PlayerUpdate;
