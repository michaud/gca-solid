import React, { useState, useEffect } from 'react';

import { Snackbar } from '@material-ui/core';
import { LinearProgress } from '@material-ui/core';

import useGames from '@golfhooks/useGames';
import addStrokeToHole from '@golfutils/addStrokeToHole';
import useClubDefinitions from '@golfhooks/useClubDefinitions';
import saveHoleToGame from '@containers/Golf/utils/saveHoleToGame';

import Alert from '@golf/components/Alert';
import HoleNavigator from '@golf/GolfPage/children/playGame/HoleNavigator';
import HoleHistory from '@golf/GolfPage/children/playGame/HoleHistory';
import ClubActionList from '@golf/GolfPage/children/playGame/ClubActionList';

import { FlexContainer } from '@golfstyles/layout.style';
import useStyles from './PlayGame.styles';
import ButtonBar from '@containers/Golf/components/ButtonBar';
import MarkerHoleDisplay from './MarkerHoleDisplay';

const PlayGame = ({
    match
}) => {

    const { params: { gameid } } = match;
   
    const [reload, setReload] = useState(false);
    const [gameData, setGameData] = useState();
    const [currHole, setCurrHole] = useState();
    const [snackOpen, setSnackOpen] = useState(false);
    const classes = useStyles();
   
    const clubTypeData = useClubDefinitions();

    const [{
        gameListData,
        isLoading: gameListDataIsLoading,
        isError: gameListDataIsError
    }, doGameReload] = useGames(clubTypeData.clubTypes, clubTypeData.clubType, reload, gameid);

    useEffect(() => {

        let didCancel = false;

        const update = () => {

            if (!didCancel && gameListData.doc) {

                setSnackOpen(gameListDataIsError);
                setGameData(gameListData.list[0]);
                setReload(false);
            }
        }

        update();

        return () => { didCancel = true }

    }, [gameListData]);

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackOpen(false);
    };

    const onClubActionHandler = club => {

        addStrokeToHole(club, currHole.iri, gameData.game, gameData.doc, setGameData);
    };

    const onChangeHoleHandler = (holeIndex) => {

        gameData && setCurrHole(gameData.game.gameCourse.value.courseHoles.value[holeIndex]);
    };

    const onMarkerScoreChangeHandler = (hole) => {

        setCurrHole(state => ({
            ...state,
            ...hole
        }));

        saveHoleToGame({hole, doc: gameData.doc });
        doGameReload(true);
    }

    const clubs = gameData && gameData.game.gameBag.value.clubs.value;

    return (
        <>
            <FlexContainer style={{ position: 'relative' }} vertical alignitems="stretch" flex="1">
                <FlexContainer vertical flex="1 0 auto" alignitems="stretch">
                    <HoleNavigator holes={ gameData && gameData.game.gameCourse.value.courseHoles.value } onChangeHole={ onChangeHoleHandler } />
                    { gameListDataIsLoading && <LinearProgress classes={ classes } variant="indeterminate" /> }
                    <ClubActionList clubs={ clubs } onAction={ onClubActionHandler }/>
                    <HoleHistory hole={ currHole } />
                </FlexContainer>
                <MarkerHoleDisplay hole={ currHole } onChange={ onMarkerScoreChangeHandler }/>
                <div className="c-btn-bar__container">
                    <ButtonBar bare={ true }/>
                </div>
            </FlexContainer>
            <Snackbar
                open={ snackOpen }
                autoHideDuration={ 4000 }
                onClose={ handleSnackClose }
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={ handleSnackClose } severity="error">
                    Play Game data did not load
                </Alert>
            </Snackbar>
        </>
    );
};

export default PlayGame;
