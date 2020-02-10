import React, { useState, useEffect } from 'react';

import { Snackbar } from '@material-ui/core';
import { LinearProgress } from '@material-ui/core';

import useGames from '@golfhooks/useGames';
import addStrokeToHole from '@golfutils/addStrokeToHole';
import useClubDefinitions from '@golfhooks/useClubDefinitions';

import Alert from '@containers/Golf/components/Alert';
import HoleNavigator from '@containers/Golf/GolfPage/children/playGame/HoleNavigator';
import HoleHistory from '@containers/Golf/GolfPage/children/playGame/HoleHistory';
import ClubActionList from '@containers/Golf/GolfPage/children/playGame/ClubActionList';

import { FlexContainer } from '@golfstyles/layout.style';
import useStyles from './PlayGame.styles';

const PlayGame = ({
    match
}) => {

    const { params: { gameid } } = match;
   
    const [reload, setReload] = useState(false);
    const [game, setGame] = useState();
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

            if (!didCancel) {

                setSnackOpen(gameListDataIsError);
                setGame(gameListData.list.find(game => game.iri.includes(gameid)));
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

        addStrokeToHole(club, currHole.iri, game, gameListData.doc, setGame);
    };

    const onChangeHoleHandler = (holeIndex) => {

        game && setCurrHole(game.gameCourse.value.courseHoles.value[holeIndex]);
    };

    const clubs = game && game.gameBag.value.clubs.value;

    return (
        <div style={{ position: 'relative'}}>
            <FlexContainer vertical flex="1 0 auto" alignitems="stretch">
                <HoleNavigator holes={ game && game.gameCourse.value.courseHoles.value } onChangeHole={ onChangeHoleHandler } />
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
