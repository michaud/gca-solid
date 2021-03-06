import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import update from 'immutability-helper';

import playerShape from '@golfcontexts/player-shape';
import getFieldValue from '@golfutils/getFieldValue';
import checkCanSave from '@golfutils/checkCanSave';
import getFieldControl from '@golfutils/getFieldControl';
import setupDataObject from '@golfutils/setupDataObject';

import formStyles from '@golfstyles/form.style';
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
    const [canCancel, setCanCancel] = useState(false);
    const classes = formStyles();

    useEffect(() => {

        let currentPlayer = player;
        
        if(!currentPlayer) currentPlayer = setupDataObject(playerShape);

        setPlayerState(currentPlayer);
        setCanCancel(false);

    }, [player]);

    const saveHandler = () => { 
        
        onSave(playerState);
        setPlayerState(setupDataObject(playerShape));
        setCanCancel(false);
    };
    const onDeleteHandler = player => () => {

        onDelete(player);
        setCanCancel(false);
    };

    const onChangeField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, args);

        setPlayerState(state => update(state, {
            [fieldDef.predicate]: { value: { $set: value } }
        }));

        setCanCancel(true);
    };

    const playerFields = [];
    
    let index = 0;

    if(playerState) {
        
        playerShape.shape.forEach(field => {

            const fieldControl = getFieldControl({
                data: playerState[field.predicate],
                styles: classes,
                onChange: onChangeField,
                idx: `${ field.predicate }${ index++ }`
            });

            playerFields.push(fieldControl);
        });
    }

    const handleDelete = typeof(onDelete) === 'function' ? onDeleteHandler : undefined;

    const canSave = checkCanSave(playerState, playerShape);

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
                        disabled={ !canCancel }
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
