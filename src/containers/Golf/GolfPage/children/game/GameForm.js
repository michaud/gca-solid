import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import formStyles from '@styles/form.style';
import gameShape from '@contexts/game-shape.json';
import playingHandicapShape from '@contexts/playing-handicap-shape.json';
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
import { format } from 'date-fns'
import savePlayer from '@services/savePlayer';
import saveMarker from '@services/saveMarker';
import { putClubsInBag } from '@utils/putClubsInBag';

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

    const classes = formStyles();
    const [reload, setReload] = useState(false);
    const clubTypeDefinitions = useClubDefinitions();
    const playerData = usePlayer(reload);
    const bagData = useBagClubs(clubTypeDefinitions, reload);
    const clubData = useClubs(clubTypeDefinitions, reload);
    const courseData = useCourses(reload);
    const markerData = useMarkers(reload);
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
    
    const saveGameHandler = () => {

        onSave(gameState);
        const newGame = setupDataObject(gameShape);
        setGameState(newGame);
    };

    const onChangeField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, args);

        let fields = {
            ...gameState.fields,
            [fieldDef.fieldName]: {
                ...gameState.fields[fieldDef.fieldName],
                field: {
                    ...gameState.fields[fieldDef.fieldName].field,
                    value
                }
            }
        };

        if(fieldDef.fieldName === 'gameCourse' || fieldDef.fieldName === 'gameDate') {

            fields = {
                ...fields,
                gameName: {
                    ...fields.gameName,
                    field: {
                        ...fields.gameName.field,
                        value: `${ value.fields.courseName.field.value } ${ format(new Date(fields.gameDate.field.value), 'dd-mm-yy hh:mm' ) }`
                    }
                }
            }
        }
        
        const data = {
            ...gameState,
            fields
        };

        setGameState(data);
    };

    useEffect(() => {
        // console.log('bagData: ', bagData);
        // console.log('clubData: ', clubData);
        // console.log('courseData: ', courseData);
        // console.log('markerData: ', markerData);
        // console.log('playerData: ', playerData);
        // console.log('--------------: ');
        if(game) {
            
            setGameState(game);
            
        } else if(
            bagData['doc'] !== undefined &&
            clubData['doc'] !== undefined &&
            courseData['doc'] !== undefined &&
            markerData['doc'] !== undefined &&
            playerData['doc'] !== undefined
        ) {

            const gameBag = putClubsInBag(clubData.list, bagData.list);
            const newGame = setupDataObject(gameShape, {
                gameBag,
                gamePlayer: playerData.player,
                gamePlayingHandicap: setupDataObject(playingHandicapShape),
                gameDate: new Date(Date.now())
            });

            setGameState(newGame);
            setReload(false);
        }

    }, [game, reload, bagData, clubData, courseData, markerData]);

    const gameFields = [];
    
    if(gameState) {

        const doc = {
            gamePlayer: playerData.doc,
            gameMarker: markerData.doc
        };

        let index = 0;

        for (const field in gameState.fields) {

            const callback = saveGamePlayerCallbacks[field];

            const fieldControl = getFieldControl({
                data: gameState.fields[field],
                styles: classes,
                onChange: onChangeField,
                onSave: callback ? callback(doc[field]) : undefined,
                idx: index++,
                dataSource: {
                    markers: markerData.list,
                    courses: courseData.list,
                    player: playerData.player
                }
            });

            gameFields.push(fieldControl);
        }
    }

    const canSave = checkCanSave(gameState);

    return (
        <form noValidate autoComplete="off">
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
                    { onCancel !== undefined && <Button
                        variant="contained"
                        onClick={ onCancel }
                        className={ classes.button }
                        color="primary">Cancel</Button>
                    }
                    </FlexItemRight>
                </FlexContainer>
            </>
        }
        </form>
    );
};

export default GameForm;
