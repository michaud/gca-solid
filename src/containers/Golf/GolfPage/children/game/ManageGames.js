import React, {
    useEffect,
    useState,
    useContext
} from 'react';

import { Redirect } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import SportsGolfIcon from '@material-ui/icons/SportsGolf';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import useGames from '@golfhooks/useGames';
import ClubTypeContext from '@golfutils/clubTypeContext';
import golf from '@golfutils/golf-namespace';
import saveGameResourse from '@golfservices/saveGameResourse';

import ModuleHeader from '@golf/components/ModuleHeader';
import GameList from '@golf/GolfPage/children/game/GameList';
import Alert from '@golf/components/Alert';
import IntroPanel from '@golf/components/IntroPanel';

import { PageContainer } from '@golfstyles/page.style';
import { FlexContainer, FlexItem } from '@golfstyles/layout.style';

const ManageGames = () => {

    const [reload, setReload] = useState(false);
    const [games, setGames] = useState([]);
    const [playGame, setPlayGame] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const clubTypeData = useContext(ClubTypeContext);
    const [{
        gameListData,
        isLoading: gameListDataIsLoading,
        isError: gameListDataIsError
    }] = useGames(clubTypeData.clubTypes, clubTypeData.clubType, reload);

    useEffect(() => {

        let didCancel = false;

        const init = () => {

            if (!didCancel) {

                setSnackOpen(gameListDataIsError);
                setGames(gameListData.list);
                setReload(false);
            }
        }

        init();

        return () => { didCancel = true }

    }, [gameListData]);

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackOpen(false);
    };

    const onSaveGameHandler = game => {

        saveGameResourse({
            resource: game,
            doc: gameListData.doc,
            type: golf.classes.Game
        });

        setReload(true);
    };

    const onDeleteGameHandler = (game) => {

        //deleteGame(game, gameData.doc);
        setReload(true);
    };

    const onPlayGameHandler = game => setPlayGame(game.split('#')[1]);

    if (playGame) return <Redirect to={`/golf/game/${playGame}`} />

    return (
        <>
            <ModuleHeader label="Games"
                screenheader={ true }
                loading={ gameListDataIsLoading } />
            <Snackbar
                open={ snackOpen }
                autoHideDuration={ 4000 }
                onClose={ handleSnackClose }
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={ handleSnackClose } severity="error">
                    Game data did not load
                </Alert>
            </Snackbar>
            <PageContainer>
                <div className="c-box">
                    <IntroPanel
                        icon={ <SportsGolfIcon className="c-content-icon" /> }>
                        <NavLink className="a-intro-link" to="/golf/settings/games/new">
                            <FlexContainer alignitems="center">
                                <FlexItem>
                                    <h3 className="h-intro">Add a Game</h3>
                                    <p>Do you feel lucky, punk?</p>
                                </FlexItem>
                                <FlexItem narrow>
                                    <ArrowForwardIosIcon className="action-intro" />
                                </FlexItem>
                            </FlexContainer>
                        </NavLink>
                    </IntroPanel>
                </div>
                <GameList
                    games={ games }
                    onDelete={ onDeleteGameHandler }
                    onSave={ onSaveGameHandler }
                    onPlay={ onPlayGameHandler }/>
            </PageContainer>
        </>
    );
};

export default ManageGames;
