import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import formStyles from '@styles/form.style';

import gameShape from '@contexts/game-shape.json';
import golf from '@utils/golf-namespace';
import TextField from '@material-ui/core/TextField';
import setupDataObject from '@utils/setupDataObject';

import {
    FlexContainer,
    FlexItem,
    FlexItemRight,
} from '@styles/layout.style';
import getFieldValue from '@utils/getFieldValue';

const checkCanSave = state => state && Object
    .entries(state.fields)
    .every(entry => entry[1].field.value !== '');

const GameForm = ({
    game,
    onSave,
    onCancel,
    title ='Add game',
    actionLabel = 'add game'
}) => {

    const [gameState, setGameState] = useState(game);

    const classes = formStyles();

    const saveHandler = () => {

        onSave(gameState);
        const newGame = setupDataObject(gameShape);
        setGameState(newGame);
    };

    // const onAddHole = (hole) => {
        
    //     const newGame = {
    //         ...gameState,
    //         fields: {
    //             ...gameState.fields,
    //             gameHoles: {
    //                 ...gameState.fields.gameHoles,
    //                 field: {
    //                     ...gameState.fields.gameHoles.field,
    //                     value: [
    //                         ...gameState.fields.gameHoles.field.value,
    //                         hole
    //                     ]
    //                 }
    //             }
    //         }
    //     };

    //     setGameState(newGame);
    // };

    // const onSaveHole = (hole) => {
        
    //     setGameState(state => {

    //         const holes = state.fields.gameHoles.field.value;

    //         const editHoleIndex = holes.findIndex(testHole => {
                
    //             return testHole.fields.holeNumber.field.value === hole.fields.holeNumber.field.value;
    //         });
    //         const startHoles = holes.slice(0, editHoleIndex);
    //         const endHoles = holes.slice(editHoleIndex + 1, holes.length);

    //         const newHoles = [...startHoles, hole, ...endHoles];
            
    //         const newGame = {
    //             ...state,
    //             fields: {
    //                 ...state.fields,
    //                 gameHoles: {
    //                     ...state.fields.gameHoles,
    //                     field: {
    //                         ...state.fields.gameHoles.field,
    //                         value: newHoles
    //                     }
    //                 }
    //             }
    //         };

    //         return newGame;
    //     });
    // };

    useEffect(() => {

        if(game) {
            
            setGameState(game);
            
        } else {
            
            const newGame = setupDataObject(gameShape);

            setGameState(newGame);
        }

    }, [game]);

    const onChangeField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, args);

        const fields = {
            ...gameState.fields,
            [fieldDef.fieldName]: {
                ...gameState.fields[fieldDef.fieldName],
                field: {
                    ...gameState.fields[fieldDef.fieldName].field,
                    value
                }
            }
        };
        
        const data = {
            ...gameState,
            fields
        };

        setGameState(data);
    };

    const getFieldControl = (field, index) => {
        
        // console.log('field.fieldType: ', field.fieldType);
        // console.log('golf.types.string: ', golf.types.string);
        switch(field.fieldType) {
    
            case golf.types.string : {

                return <TextField key={ index }
                    required
                    label={ field.field.label }
                    className={ classes.textField }
                    size="normal"
                    value={ field.field.value }
                    onChange={ onChangeField(field) }
                    variant="outlined"/>
            }

            case golf.types.nonNegativeInteger : {
                
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

    const gameFields = [];
    
    let index = 0;

    if(gameState) {
        
        for (const field in gameState.fields) {

            const fieldControl = getFieldControl(gameState.fields[field], index++);
            gameFields.push(fieldControl);
        }
    }

    const canSave = checkCanSave(gameState);

    return <form noValidate autoComplete="off">
        <header className="c-header">{ title }</header>
        { gameFields }
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
    </form>;
};

export default GameForm;
