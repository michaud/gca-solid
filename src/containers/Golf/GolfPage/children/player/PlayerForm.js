import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import update from 'immutability-helper';
import formStyles from '@golfstyles/form.style';
import getFieldValue from '@golfutils/getFieldValue';
import checkCanSave from '@golfutils/checkCanSave';
import getFieldControl from '@golfutils/getFieldControl';
import playerShape from '@golfcontexts/player-shape';
import setupDataObject from '@golf/utils/setupDataObject';

import {
    FlexContainer,
    FlexItem,
    FlexItemRight,
} from '@golfstyles/layout.style';

const PlayerForm = ({
    player,
    onSave,
    onCancel,
    onDelete,
    title = 'Add player'
}) => {

    const [playerState, setPlayerState] = useState(player);
    const classes = formStyles();

    const saveHandler = () => onSave(playerState);
    const onDeleteHandler = player => () => onDelete(player);

    const onChangeField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, args);

        setPlayerState(state => update(state, {
            [fieldDef.predicate]: { value: { $set: value } }
        }));
    };

    useEffect(() => {

        let currentPlayer = player;
        console.log('player: ', player);
        
        if(!currentPlayer) {

            currentPlayer = setupDataObject(playerShape);
            console.log('currentPlayer: ', currentPlayer);
        }

        setPlayerState(currentPlayer);

    }, [player]);

    const playerFields = [];
    
    let index = 0;

    if(playerState) {
        
        playerShape.shape.forEach(field => {

            const fieldControl = getFieldControl({
                data: playerState[field.predicate],
                styles: classes,
                onChange: onChangeField,
                idx: index++
            });

            playerFields.push(fieldControl);
        });
    }

    const canSave = checkCanSave(playerState, playerShape);
    const handleDelete = typeof(onDelete) === 'function' ? onDeleteHandler : undefined;
    return (
        <div>
            <header className="c-header">{ title }</header>
            { playerFields }
            <FlexContainer>
                <FlexItem>
                    <Button
                        variant="contained"
                        disabled={ !canSave.can }
                        onClick={ saveHandler }
                        className={ classes.button }
                        color="primary">Save</Button>
                </FlexItem>
                {
                    handleDelete ? (
                        <FlexItem>
                            <Button
                                variant="contained"
                                disabled={ !canSave.can }
                                onClick={ handleDelete(player) }
                                className={ classes.button }
                                color="primary">Delete</Button>
                        </FlexItem>
                    ) : null
                }
                <FlexItemRight>
                { onCancel ? (
                    <Button
                        variant="contained"
                        disabled={ !canSave }
                        onClick={ onCancel }
                        className={ classes.button }
                        color="primary">Cancel</Button>
                    ) : null
                }
                </FlexItemRight>
            </FlexContainer>
        </div>
    );
}

export default PlayerForm;
