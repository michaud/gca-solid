import React, { useState, useEffect } from 'react';

import { LinearProgress } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';

import addStrokeToHole from '@golfutils/addStrokeToHole';
import update from 'immutability-helper';

import HoleNavigator from '@golf/GolfPage/children/playGame/HoleNavigator';
import HoleHistory from '@golf/GolfPage/children/playGame/HoleHistory';
import ClubActionList from '@golf/GolfPage/children/playGame/ClubActionList';

import { FlexContainer } from '@golfstyles/layout.style';
import useStyles from './PlayGame.styles';
import ButtonBar from '@golf/components/ButtonBar';
import MarkerHoleDisplay from '@golf/GolfPage/children/playGame/MarkerHoleDisplay';

import useGameListData from '@golfcontexts/dataProvider/useGameListData';
import saveMarkerScoreToHole from '@golfutils/saveMarkerScoreToHole';
import GamePlayDetail from '@golf/GolfPage/children/playGame/GamePlayDetail';
import deleteStrokeFromGameHole from '@golfutils/deleteStrokeFromGameHole';

const PlayGame = ({ match: { params: { gameid } } }) => {

    const [gameState, setGameState] = useState();
    const [currHole, setCurrHole] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const {
        gameListData,
        gameListDataIsLoading,
        reloadGames
    } = useGameListData();

    const classes = useStyles();

    useEffect(() => {

        let didCancel = false;

        const update = () => {

            if (!didCancel && gameListData && gameListData.doc && gameid) {

                const game = gameListData.list.find(gameData => {

                    return gameData.game.iri.includes(gameid);
                });

                setGameState(game);
            }
        }

        update();

        return () => { didCancel = true }

    }, [gameListData]);

    const handleClose = () => {
        setAnchorEl(null);
    };

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

    const showGamePlayDetailHandler = event => {
        setAnchorEl(event.currentTarget);
    };

    const onDeleteStrokeHandler = async (stroke, hole) => {

        await deleteStrokeFromGameHole(gameState.doc, stroke, hole);
        reloadGames(gameid);
    };

    const clubs = gameState && gameState.game.gameBag.value.clubs.value;

    const playingHandicap = gameState && gameState.game.gamePlayingHandicap.value;

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <FlexContainer style={ { position: 'relative' } } vertical alignitems="stretch" flex="1">
                <FlexContainer vertical flex="1 0 auto" alignitems="stretch">
                    <HoleNavigator
                        holes={ gameState && gameState.game.gameCourse.value.courseHoles.value }
                        onChangeHole={ onChangeHoleHandler }
                        playingHandicap={ playingHandicap }
                        onClick={ showGamePlayDetailHandler } />
                    { gameListDataIsLoading && <LinearProgress classes={ classes } variant="indeterminate" /> }
                    <ClubActionList clubs={ clubs } onAction={ onClubActionHandler } />
                    <HoleHistory hole={ currHole } onDeleteStroke={ onDeleteStrokeHandler} />
                    <Popover
                        id={ id }
                        open={ open }
                        anchorEl={ anchorEl }
                        onClose={ handleClose }
                        marginThreshold={ 1 }
                        anchorOrigin={ {
                            vertical: 'bottom',
                            horizontal: 'center',
                        } }
                        transformOrigin={ {
                            vertical: 'top',
                            horizontal: 'center',
                        } }>
                        <GamePlayDetail
                            gameData={ gameState } />
                    </Popover>
                </FlexContainer>
                { gameState ? <MarkerHoleDisplay hole={ currHole } playingHandicap={ playingHandicap } onChange={ onMarkerScoreChangeHandler } /> : null }
                <div className="c-btn-bar__container">
                    <ButtonBar bare={ true } />
                </div>
            </FlexContainer>
        </>
    );
};

export default PlayGame;
