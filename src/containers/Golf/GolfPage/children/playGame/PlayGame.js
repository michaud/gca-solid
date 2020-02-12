import React, { useState, useEffect } from 'react';

import { Snackbar } from '@material-ui/core';
import { LinearProgress } from '@material-ui/core';

import useGames from '@golfhooks/useGames';
import addStrokeToHole from '@golfutils/addStrokeToHole';
import useClubDefinitions from '@golfhooks/useClubDefinitions';

import Alert from '@golf/components/Alert';
import HoleNavigator from '@golf/GolfPage/children/playGame/HoleNavigator';
import HoleHistory from '@golf/GolfPage/children/playGame/HoleHistory';
import ClubActionList from '@golf/GolfPage/children/playGame/ClubActionList';

import { FlexContainer } from '@golfstyles/layout.style';
import useStyles from './PlayGame.styles';

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
    }] = useGames(clubTypeData.clubTypes, clubTypeData.clubType, reload, gameid);

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

    const clubs = gameData && gameData.game.gameBag.value.clubs.value;

    return (
        <div style={{ position: 'relative' }}>
            <FlexContainer vertical flex="1 0 auto" alignitems="stretch">
                <HoleNavigator holes={ gameData && gameData.game.gameCourse.value.courseHoles.value } onChangeHole={ onChangeHoleHandler } />
                { gameListDataIsLoading && <LinearProgress classes={ classes } variant="indeterminate" /> }
                <HoleHistory hole={ currHole } />
                <ClubActionList clubs={ clubs } onAction={ onClubActionHandler }/>
            </FlexContainer>
            <Snackbar
                open={ snackOpen }
                autoHideDuration={ 4000 }
                onClose={ handleSnackClose }
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={ handleSnackClose } severity="error">
                    Game data did not load
                </Alert>
            </Snackbar>
        </div>
    );
};

export default PlayGame;
