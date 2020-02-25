import React, { useState, useEffect } from 'react';

import update from 'immutability-helper';
import { format } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import gameShape from '@golfcontexts/game-shape.json';

import { useGameEditData } from '@golfcontexts/dataProvider/AppDataProvider';

import playingHandicapShape from '@golfcontexts/playing-handicap-shape.json';
import setupDataObject from '@golfutils/setupDataObject';
import getFieldValue from '@golfutils/getFieldValue';
import checkCanSave from '@golfutils/checkCanSave';
import getFieldControl from '@golfutils/getFieldControl';
import golf from '@golfutils/golf-namespace';
import saveResource from '@golfservices/saveResource';

import CourseForm from '@golf/GolfPage/children/course/CourseForm';
import PlayerForm from '@golf/GolfPage/children/player/PlayerForm';
import ManageBag from '@golf/GolfPage/children/bag/ManageBag';

import formStyles from '@golfstyles/form.style';

import {
    FlexContainer,
    FlexItem,
    FlexItemRight,
} from '@golfstyles/layout.style';
import { PageContent } from '@containers/Golf/styles/page.style';
import { DialogTitle, DialogContent } from '@material-ui/core';

const dialogStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'rgb(247, 241, 217)'
    }
}));

const GameForm = ({
    game,
    onSave,
    onCancel,
    title = '',
    actionLabel = 'Save game'
}) => {

    const classes = formStyles();
    const dclasses = dialogStyles();
    const [gameState, setGameState] = useState(game);
    const [courseModalOpen, setCourseModalOpen] = useState(false)
    const [markerModalOpen, setMarkerModalOpen] = useState(false)
    const [bagModalOpen, setBagModalOpen] = useState(false)

    const {
        playerData,
        reloadPlayer,
        markerListData,
        reloadMarkers,
        clubListData,
        bagData,
        reloadBag,
        courseListData,
        reloadCourses
    } = useGameEditData();

    useEffect(() => {

        let didCancel = false;

        const update = () => {

            if(game) {
                
                if(!didCancel) setGameState(game);

            } else if(!gameState &&
                bagData['doc'] !== undefined &&
                clubListData['doc'] !== undefined &&
                courseListData['doc'] !== undefined &&
                markerListData['doc'] !== undefined &&
                playerData['doc'] !== undefined
            ) {

                const newGame = setupDataObject(gameShape, {
                    gameBag: bagData.bag,
                    gamePlayer: playerData.player,
                    gamePlayingHandicap: setupDataObject(playingHandicapShape),
                    gameDate: new Date(Date.now())
                });

                if(!didCancel) setGameState(newGame);
            }
        }

        update();

        return () => { didCancel = true; }

    }, [game, bagData.doc, clubListData.doc, courseListData.doc, markerListData.doc]);

    const handleCourseModalClose = () => {

        setCourseModalOpen(false);
    };

    const handleMarkerModalClose = () => {

        setMarkerModalOpen(false);
    };

    const handleBagModalClose = () => {

        setBagModalOpen(false);
    };

    const onSaveCourse = course => {

        saveResource({
            resource: course,
            doc: courseListData.doc,
            type: golf.classes.Course
        });

        setCourseModalOpen(false);

        reloadCourses();
    };
    
    const onSaveBag = () => {

        setBagModalOpen(false);
        reloadBag();
    };

    const saveGamePlayer = doc => async (player) => {
        
        await saveResource({
            resource: player,
            doc: playerData.doc,
            type: golf.classes.Player
        });

        reloadPlayer();
    };

    const onSaveMarker = marker => {

        saveResource({
            resource: marker,
            doc: markerListData.doc,
            type: golf.classes.Marker
        });

        setMarkerModalOpen(false);

        reloadMarkers();
    };

    const addGameCourse = doc => () => {
        setCourseModalOpen(true);
    };

    const addGameMarker = doc => () => {

        setMarkerModalOpen(true);
    };

    const editGameBag = doc => () => {

        setBagModalOpen(true);
    }

    const saveGameHandler = () => {

        onSave(gameState);
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

        const callbacks = {
            gamePlayer: {
                save: saveGamePlayer
            },
            gameMarker: {
                add: addGameMarker
            },
            gameCourse: {
                add: addGameCourse,
            },
            gameBag: {
                edit: editGameBag
            }
        };
    
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
                <DialogTitle className={ dclasses.root } id="scroll-dialog-title">Subscribe</DialogTitle>
                <DialogContent className={ dclasses.root }>
                    <PageContent>
                        <div className="c-box">
                            <CourseForm
                                onSave={ onSaveCourse }
                                onCancel={ handleCourseModalClose }/>
                        </div>
                    </PageContent>
                </DialogContent>
            </Dialog>
            <Dialog fullScreen 
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={ markerModalOpen }
                scroll="paper"
                onClose={ handleMarkerModalClose }>
                <DialogTitle className={ dclasses.root } id="scroll-dialog-title">Subscribe</DialogTitle>
                <DialogContent className={ dclasses.root }>
                    <PageContent>
                        <div className="c-box">
                            <PlayerForm
                                title="Add marker"
                                onSave={ onSaveMarker }
                                onCancel={ handleMarkerModalClose }/>
                        </div>
                    </PageContent>
                </DialogContent>
            </Dialog>
            <Dialog fullScreen 
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={ bagModalOpen }
                scroll="paper"
                onClose={ handleBagModalClose }>
                <DialogTitle className={ dclasses.root } id="scroll-dialog-title">Edit Bag</DialogTitle>
                <DialogContent className={ dclasses.root }>
                    <PageContent>
                        <div className="c-box">
                            <ManageBag
                                onSave={ onSaveBag }
                                onCancel={ handleBagModalClose }/>
                        </div>
                    </PageContent>
                </DialogContent>
            </Dialog>
            {
                gameState && <div className="f-form-field">
                    { title ? <header className="c-header">{ title }</header> : null }
                    { gameFields }
                    <FlexContainer>
                        <FlexItem>
                            { !canSave.can ? <div>{ canSave.reasons }</div> : null }
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
