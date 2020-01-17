import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import formStyles from '@styles/form.style';
import getFieldValue from '@utils/getFieldValue';
import checkCanSave from '@utils/checkCanSave';
import getFieldControl from '@utils/getFieldControl';

import {
    FlexContainer,
    FlexItem,
    FlexItemRight,
} from '@styles/layout.style';

const PlayerForm = ({
    player,
    onSave,
    onCancel,
    title = 'Add player',
    actionLabel = 'Save player'
}) => {

    const [playerState, setPlayerState] = useState(player);
    const classes = formStyles();

    const saveHandler = () => {

        onSave(playerState);
    };

    const onChangeField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, args);

        const data = {
            ...playerState,
            [fieldDef.fieldName]: {
                ...playerState[fieldDef.fieldName],
                value
            }
        };

        setPlayerState(data);
    };

    useEffect(() => {

        if(player) {
            
            setPlayerState(player);
        }

    }, [player]);

    const playerFields = [];
    
    let index = 0;

    if(playerState) {
        
        for (const field in playerState.fields) {

            const fieldControl = getFieldControl({
                data: playerState.fields[field],
                styles: classes,
                onChange: onChangeField,
                idx: index++
            });

            playerFields.push(fieldControl);
        }
    }

    const canSave = checkCanSave(playerState);

    return (
        <div>
            <header className="c-header">{ title }</header>
            { playerFields }
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
    );
}

export default PlayerForm;
