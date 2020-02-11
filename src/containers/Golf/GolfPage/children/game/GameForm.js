import React, { useState, useEffect } from 'react';

import update from 'immutability-helper';
import { format } from 'date-fns'

import Button from '@material-ui/core/Button';
import { Snackbar, DialogTitle, DialogContent } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';

import gameShape from '@golfcontexts/game-shape.json';
import useBagClubs from '@golfhooks/useBagClubs';
import useClubs from '@golfhooks/useClubs';
import useCourses from '@golfhooks/useCourses';
import useMarkers from '@golfhooks/useMarkers';
import usePlayer from '@golfhooks/usePlayer';
import useClubDefinitions from '@golfhooks/useClubDefinitions';

import playingHandicapShape from '@golfcontexts/playing-handicap-shape.json';
import setupDataObject from '@golfutils/setupDataObject';
import getFieldValue from '@golfutils/getFieldValue';
import checkCanSave from '@golfutils/checkCanSave';
import getFieldControl from '@golfutils/getFieldControl';
import { putClubsInBag } from '@golfutils/putClubsInBag';
import golf from '@golfutils/golf-namespace';
import saveResource from '@golfservices/saveResource';

import Alert from '@containers/Golf/components/Alert';

import formStyles from '@golfstyles/form.style';

import {
    FlexContainer,
    FlexItem,
    FlexItemRight,
} from '@golfstyles/layout.style';
import CourseForm from '../course/CourseForm';

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
    const [courseModalOpen, setCourseModalOpen] = useState(false)
    const clubTypeData = useClubDefinitions();

    const [{
        playerData,
        isError: playerDataIsError
    }, doPlayerReload] = usePlayer(reload);
    
    const [{
        markerListData,
        isError: markerListDataIsError
    }, doMarkerReload] = useMarkers(reload);
    
    const [{
        clubListData,
        isError: clubListDataIsError
    }, doCLubsReload] = useClubs(clubTypeData.clubTypes, clubTypeData.clubType, reload);
    
    const [{
        bagListData,
        isError: bagListDataIsError
    }, doBagReload] = useBagClubs(clubTypeData.clubTypes, clubTypeData.clubType, reload);
    
    const [{
        courseListData,
        courseListDataIsError
    }, doCourseReload] = useCourses(reload);
    
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

    const handleCourseModalClose = () => {

        setCourseModalOpen(false);
    };

    const onSaveCourse = async (course) => {

        saveResource({
            resource: course,
            doc: courseListData.doc,
            type: golf.classes.Course
        });

        setCourseModalOpen(false);
        doCourseReload(true);
        setReload(true);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackOpen(false);
    };

    const saveGamePlayer = doc => async (player) => {
        
        await saveResource({
            resource: player,
            doc,
            type: golf.classes.Player
        });

        setReload(true);
    };
    
    const saveGameMarker = doc => async (player) => {
        
        await saveResource({
            resource: player,
            doc,
            type: golf.classes.Player
        });

        setReload(true);
    };
    
    const addGameCourse = doc => () => {
        setCourseModalOpen(true);
    };

    const addGameMarker = doc => () => {

        console.log('addGameMarker');
    };

    const editGameBag = doc => () => {

        console.log('editGameBag');
    }

    const callbacks = {
        gamePlayer: {
            save: saveGamePlayer
        },
        gameMarker: {
            save: saveGameMarker,
            add: addGameMarker
        },
        gameCourse: {
            add: addGameCourse,
        },
        gameBag: {
            edit: editGameBag
        }
    };

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

            const saveCallback = callbacks[field.predicate] ? callbacks[field.predicate].save : undefined;
            const addCallback = callbacks[field.predicate] ? callbacks[field.predicate].add : undefined;
            const editCallback = callbacks[field.predicate] ? callbacks[field.predicate].edit : undefined;

            const fieldControl = getFieldControl({
                data: gameState[field.predicate],
                styles: classes,
                onChange: onChangeField,
                onSave: saveCallback ? saveCallback(doc[field]) : undefined,
                onAdd: addCallback ? addCallback(doc[field]) : undefined,
                onEdit: editCallback ? editCallback(doc[field]) : undefined,
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
        <Dialog fullScreen 
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={ courseModalOpen }
            scroll="paper"
            onClose={ handleCourseModalClose }>
            <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
                <CourseForm
                    onSave={ onSaveCourse }
                    onCancel={ handleCourseModalClose }/>
            </DialogContent>
        </Dialog>
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
