import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import update from 'immutability-helper';
import { format } from 'date-fns'
import formStyles from '@styles/form.style';
import gameShape from '@contexts/game-shape.json';
import playingHandicapShape from '@contexts/playing-handicap-shape.json';
import setupDataObject from '@utils/setupDataObject';
import getFieldValue from '@utils/getFieldValue';
import checkCanSave from '@utils/checkCanSave';
import getFieldControl from '@utils/getFieldControl';
import useBagClubs from '@hooks/useBagClubs';
import useClubs from '@hooks/useClubs';
import useCourses from '@hooks/useCourses';
import useMarkers from '@hooks/useMarkers';
import usePlayer from '@hooks/usePlayer';
import { putClubsInBag } from '@utils/putClubsInBag';
import saveResource from '@services/saveResource';
import golf from '@utils/golf-namespace';
import useClubDefinitions from '@hooks/useClubDefinitions';
import { Snackbar } from '@material-ui/core';
import Alert from '@containers/Golf/components/Alert';


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
    const [gameState, setGameState] = useState(game);
    const [snackOpen, setSnackOpen] = useState(false);
    const clubTypeData = useClubDefinitions();
    const [{
        playerData,
        isError: playerDataIsError
    }] = usePlayer(reload);
    
    const [{
        markerListData,
        isError: markerListDataIsError
    }] = useMarkers(reload);
    
    const [{
        clubListData,
        isError: clubListDataIsError
    }] = useClubs(clubTypeData.clubTypes, clubTypeData.clubType, reload);
    
    const [{
        bagListData,
        isError: bagListDataIsError
    }] = useBagClubs(clubTypeData.clubTypes, clubTypeData.clubType, reload);
    
    const [{
        courseListData,
        courseListDataIsError
    }] = useCourses(reload);
    
    useEffect(() => {

        let didCancel = false;

        const update = () => {

            if(!didCancel) {
                setSnackOpen(
                    playerDataIsError ||
                    bagListDataIsError ||
                    clubListDataIsError ||
                    courseListDataIsError ||
                    markerListDataIsError);
            }

            if(game) {
                
                if(!didCancel) setGameState(game);
                
            } else if(
                bagListData['doc'] !== undefined &&
                clubListData['doc'] !== undefined &&
                courseListData['doc'] !== undefined &&
                markerListData['doc'] !== undefined &&
                playerData['doc'] !== undefined
            ) {

                const gameBag = putClubsInBag(clubListData.list, bagListData.list);
                const newGame = setupDataObject(gameShape, {
                    gameBag,
                    gamePlayer: playerData.player,
                    gamePlayingHandicap: setupDataObject(playingHandicapShape),
                    gameDate: new Date(Date.now())
                });

                if(!didCancel) {

                    setGameState(newGame);
                    setReload(false);
                }
            }
        }

        update();

        return () => { didCancel = true; }

    }, [game, reload, bagListData, clubListData, courseListData, markerListData]);

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackOpen(false);
    };

    const saveGamePlayer = doc => player => {
        
        saveResource({
            resource: player,
            doc,
            type: golf.classes.Player
        });
        setReload(true);
    };
    
    const saveGameMarker = doc => player => {
        
        saveResource({
            resource: player,
            doc,
            type: golf.classes.Player
        });

        setReload(true);
    };
    
    const saveGamePlayerCallbacks = {
        gamePlayer: saveGamePlayer,
        gameMarker: saveGameMarker
    }
    
    const saveGameHandler = () => {

        onSave(gameState);
        setReload(true);
    };

    const onChangeField = fieldDef => (...args)  => {

        let value = getFieldValue(fieldDef, args);

        setGameState(state => {
            
            let newState = update(state, {
                [fieldDef.predicate]: { value: { $set: value }}
            });

            if(
                fieldDef.predicate === 'gameCourse' ||
                fieldDef.predicate === 'gameDate'
            ) {

                value = `${
                    value.courseName ? value.courseName.value : 'game'
                } ${
                    format(new Date(gameState.gameDate.value), 'dd-MM-yy HH:mm') 
                }`;

                newState = update(newState, { gameName: { value: { $set: value }}});
            }
            
            return newState;
        });
    };

    const gameFields = [];
    
    if(gameState) {

        const doc = {
            gamePlayer: playerData.doc,
            gameMarker: markerListData.doc
        };

        let index = 0;

        gameShape.shape.forEach(field => {

            const callback = saveGamePlayerCallbacks[field];

            const fieldControl = getFieldControl({
                data: gameState[field.predicate],
                styles: classes,
                onChange: onChangeField,
                onSave: callback ? callback(doc[field]) : undefined,
                idx: index++,
                dataSource: {
                    markers: markerListData.list,
                    courses: courseListData.list,
                    player: playerData.player
                }
            });

            gameFields.push(fieldControl);
        });
    }

    const canSave = checkCanSave(gameState, gameShape);


    return (
        <form noValidate autoComplete="off">
        {
            gameState && <div className="f-form-field">
                <header className="c-header">{ title }</header>
                <Snackbar
                    open={ snackOpen }
                    autoHideDuration={ 4000 }
                    onClose={ handleSnackClose }
                    anchorOrigin={{ vertical:'top', horizontal: 'center' }}>
                    <Alert onClose={ handleSnackClose } severity="error">
                        Game data did not load
                    </Alert>
                </Snackbar>

                { gameFields }
                <FlexContainer>
                    <FlexItem>
                        <Button
                            variant="contained"
                            disabled={ !canSave.can }
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
            </div>
        }
        </form>
    );
};

export default GameForm;
