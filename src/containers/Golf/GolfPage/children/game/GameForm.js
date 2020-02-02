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
import { withClubTypeContext } from '@utils/clubTypeContext';

import {
    FlexContainer,
    FlexItem,
    FlexItemRight,
} from '@styles/layout.style';

const GameForm = ({
    clubTypes,
    clubType,
    game,
    onSave,
    onCancel,
    title ='Add game',
    actionLabel = 'add game'
}) => {

    const classes = formStyles();
    const [reload, setReload] = useState(false);
    const playerData = usePlayer(reload);
    const bagData = useBagClubs(clubTypes, clubType, reload);
    const clubData = useClubs(clubTypes, clubType, reload);
    const courseData = useCourses(reload);
    const markerData = useMarkers(reload);
    const [gameState, setGameState] = useState(game);

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
            gameMarker: markerData.doc
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
                    markers: markerData.list,
                    courses: courseData.list,
                    player: playerData.player
                }
            });

            gameFields.push(fieldControl);
        });
    }

    const canSave = checkCanSave(gameState, gameShape);

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

    return (
        <form noValidate autoComplete="off">
        {
            gameState && <div className="f-form-field">
                <header className="c-header">{ title }</header>
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

export default withClubTypeContext(GameForm);
