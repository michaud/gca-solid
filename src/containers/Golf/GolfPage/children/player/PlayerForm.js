import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import golf from '@utils/golf-namespace';

import formStyles from '@styles/form.style';
import {
    FlexContainer,
    FlexItem,
    FlexItemRight,
} from '@styles/layout.style';
import getFieldValue from '@utils/getFieldValue';
import checkCanSave from '@utils/checkCanSave';

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

    const getFieldControl = (field, index) => {
        
        switch(field.fieldType) {
    
            case golf.types.text : {

                return <TextField key={ index }
                    required
                    label={ field.field.label }
                    className={ classes.textField }
                    size="normal"
                    value={ field.field.value }
                    onChange={ onChangeField(field) }
                    variant="outlined"/>
            }

            case golf.types.integer : {
                
                return <TextField key={ index }
                    required
                    type="number"
                    label={ field.field.label }
                    className={ classes.textField }
                    size="normal"
                    value={ field.field.value }
                    onChange={ onChangeField(field) }
                    variant="outlined"/>
            }

            default: {
            
                return <div key={ index }>no field component defined</div>;
            }
        }
    };

    const onChangeField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, args);

        const fields = {
            ...playerState.fields,
            [fieldDef.fieldName]: {
                ...playerState.fields[fieldDef.fieldName],
                field: {
                    ...playerState.fields[fieldDef.fieldName].field,
                    value
                }
            }
        };
        
        const data = {
            ...playerState,
            fields
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

            const fieldControl = getFieldControl(playerState.fields[field], index++);
            playerFields.push(fieldControl);
        }
    }

    const canSave = checkCanSave(playerState);

    return <div>
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
}

export default PlayerForm;
