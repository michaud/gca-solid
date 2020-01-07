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
    const handicapChanged = player.fields.handicap.field.value !== state.fields.handicap.field.value;
    const playingHandicapChanged = player.fields.playingHandicap.field.value !== state.fields.playingHandicap.field.value;

    return hasData && (handicapChanged || playingHandicapChanged)
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
            fields: {
                ...state.fields,
                handicap: {
                    ...state.fields.handicap,
                    field: {
                        ...state.fields.handicap.field,
                        value
                    }
                }
            }
        }));
    };

    const onChangePlayingHandicap = player => (event) => {

        const value = parseInt(event.target.value);

        setPlayerState( state => ({
            ...state,
            fields: {
                ...state.fields,
                playingHandicap: {
                    ...state.fields.playingHandicap,
                    field: {
                        ...state.fields.playingHandicap.field,
                        value
                    }
                }
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
        field: playerState.fields.handicap,
        styles: classes,
        onChange: onChangeHandicap,
        idx: 0
    });
    
    const playingHandicapField = getFieldControl({
        field: playerState.fields.playingHandicap,
        styles: classes,
        onChange: onChangePlayingHandicap,
        idx: 1
    });

    return (
        <>
            <header className="c-header--sec">{ title }</header>
            <FlexContainer>
                <FlexItemData>
                    <FlexContainer>
                        <FlexItemLabel>Name</FlexItemLabel>
                        <FlexItemValue>{ `${ player.fields.givenName.field.value } ${ player.fields.familyName.field.value }`}</FlexItemValue>
                    </FlexContainer>
                </FlexItemData>
            </FlexContainer>
            { handicapField }
            { playingHandicapField }
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
