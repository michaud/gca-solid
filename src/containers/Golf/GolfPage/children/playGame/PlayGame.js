import React, { useState, useEffect } from 'react';

import { LinearProgress } from '@material-ui/core';

import addStrokeToHole from '@golfutils/addStrokeToHole';
import update from 'immutability-helper';

import HoleNavigator from '@golf/GolfPage/children/playGame/HoleNavigator';
import HoleHistory from '@golf/GolfPage/children/playGame/HoleHistory';
import ClubActionList from '@golf/GolfPage/children/playGame/ClubActionList';

import { FlexContainer } from '@golfstyles/layout.style';
import useStyles from './PlayGame.styles';
import ButtonBar from '@containers/Golf/components/ButtonBar';
import MarkerHoleDisplay from './MarkerHoleDisplay';

import useGameListData from '@golfcontexts/dataProvider/useGameListData';
import saveMarkerScoreToHole from '@containers/Golf/utils/saveMarkerScoreToHole';

const PlayGame = () => {
  
    const [gameState, setGameState] = useState();
    const [currHole, setCurrHole] = useState();
    const {
        gameListData,
        gameListDataIsLoading
    } = useGameListData();

    const classes = useStyles();

    useEffect(() => {

        let didCancel = false;

        const update = () => {

            if (!didCancel && gameListData && gameListData.doc) {

                setGameState(gameListData.list[0]);
            }
        }

        update();

        return () => { didCancel = true }

    }, [gameListData]);

    const onClubActionHandler = club => {

        addStrokeToHole(club, currHole.iri, gameState.game, gameState.doc, setGameState);
    };

    const onChangeHoleHandler = (holeIndex) => {

        gameState && setCurrHole(gameState.game.gameCourse.value.courseHoles.value[holeIndex]);
    };

    const onMarkerScoreChangeHandler = (score) => {

        setCurrHole(state => {
            const newState = update(state, {
                gameMarkerStrokeCount: {
                    value: { $set: score }
                }
            })

            return newState;
        });

        saveMarkerScoreToHole({ currHole, doc: gameState.doc, score });
    };

    const clubs = gameState && gameState.game.gameBag.value.clubs.value;

    return (
        <>
            <FlexContainer style={{ position: 'relative' }} vertical alignitems="stretch" flex="1">
                <FlexContainer vertical flex="1 0 auto" alignitems="stretch">
                    <HoleNavigator holes={ gameState && gameState.game.gameCourse.value.courseHoles.value } onChangeHole={ onChangeHoleHandler } />
                    { gameListDataIsLoading && <LinearProgress classes={ classes } variant="indeterminate" /> }
                    <ClubActionList clubs={ clubs } onAction={ onClubActionHandler }/>
                    <HoleHistory hole={ currHole } />
                </FlexContainer>
                <MarkerHoleDisplay hole={ currHole } onChange={ onMarkerScoreChangeHandler }/>
                <div className="c-btn-bar__container">
                    <ButtonBar bare={ true }/>
                </div>
            </FlexContainer>
        </>
    );
};

export default PlayGame;
