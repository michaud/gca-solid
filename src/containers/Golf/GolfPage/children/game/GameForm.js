import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import formStyles from '@styles/form.style';
import gameShape from '@contexts/game-shape.json';
import setupDataObject from '@utils/setupDataObject';
import getFieldValue from '@utils/getFieldValue';
import checkCanSave from '@utils/checkCanSave';
import getFieldControl from '@utils/getFieldControl';

import {
    FlexContainer,
    FlexItem,
    FlexItemRight,
} from '@styles/layout.style';

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

    const gameFields = [];
    
    let index = 0;

    if(gameState) {
        
        for (const field in gameState.fields) {

            const fieldControl = getFieldControl({
                field: gameState.fields[field],
                styles: classes,
                onChange: onChangeField,
                idx: index++
            });
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
