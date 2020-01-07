import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import formStyles from '@styles/form.style';
import gameShape from '@contexts/game-shape.json';
import setupDataObject from '@utils/setupDataObject';
import getFieldValue from '@utils/getFieldValue';
import checkCanSave from '@utils/checkCanSave';
import getFieldControl from '@utils/getFieldControl';
import useClubDefinitions from '@hooks/useClubDefinitions';
import useBagClubs from '@hooks/useBagClubs';
import useClubs from '@hooks/useClubs';
import useCourses from '@hooks/useCourses';
import useMarkers from '@hooks/useMarkers';
import usePlayer from '@hooks/usePlayer';

import {
    FlexContainer,
    FlexItem,
    FlexItemRight,
} from '@styles/layout.style';
import { savePlayer } from '@services/';
import { saveMarker } from '@services/';

const putClubsInBag = (clubs, bag) => {

    const filledBag = bag.reduce((acc, clubRef) => {

        const club = clubs.find(clubTest => clubTest.iri.includes(clubRef.ref));

        if(club) acc.push(club);

        return acc;

    }, []);

    return filledBag;
};

const GameForm = ({
    game,
    onSave,
    onCancel,
    title ='Add game',
    actionLabel = 'add game'
}) => {

    const clubTypeDefinitions = useClubDefinitions();
    const [reload, setReload] = useState(false);
    const bagData = useBagClubs(reload);
    const clubData = useClubs(clubTypeDefinitions, reload);
    const courseData = useCourses(reload);
    const markerData = useMarkers(reload);
    const playerData = usePlayer(reload);
    const [gameState, setGameState] = useState(game);

    const saveGamePlayer = doc => player => {

        savePlayer(player, doc);
        setReload(true);
    };
    
    const saveGameMarker = doc => player => {
    
        saveMarker(player, doc);
        setReload(true);
    };
    
    const saveGamePlayerCallbacks = {
        gamePlayer: saveGamePlayer,
        gameMarker: saveGameMarker
    }
    
    const classes = formStyles();

    const saveGameHandler = () => {

        onSave(gameState);
        const newGame = setupDataObject(gameShape);
        setGameState(newGame);
    };

    useEffect(() => {

        if(game) {
            
            setGameState(game);
            
        } else if(
            bagData['doc'] !== undefined &&
            clubData['doc'] !== undefined &&
            courseData['doc'] !== undefined &&
            markerData['doc'] !== undefined &&
            playerData['doc'] !== undefined
        ) {

            const filledBag = putClubsInBag(clubData.list, bagData.list);
            const newGame = setupDataObject(gameShape, {
                gameBag: filledBag,
                gamePlayer: playerData.player,
                gameCourse: courseData.list,
                gameMarker: markerData.list
            });

            setGameState(newGame);
            setReload(false);
        }

    }, [game, reload, bagData, clubData, courseData, markerData]);

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

            const doc = {
                gamePlayer: playerData.doc,
                gameMarker: markerData.doc
            };

            const callback = saveGamePlayerCallbacks[field];

            const fieldControl = getFieldControl({
                field: gameState.fields[field],
                styles: classes,
                onChange: onChangeField,
                onSave: callback ? callback(doc[field]) : undefined,
                idx: index++
            });

            gameFields.push(fieldControl);
        }
    }

    const canSave = checkCanSave(gameState);

    return <form noValidate autoComplete="off">
    {
        gameState && <>
            <header className="c-header">{ title }</header>
            { gameFields }
            <FlexContainer>
                <FlexItem>
                    <Button
                        variant="contained"
                        disabled={ !canSave }
                        onClick={ saveGameHandler }
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
    }
    </form>;
};

export default GameForm;
