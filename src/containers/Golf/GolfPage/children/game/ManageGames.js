import React, {
    useEffect,
    useState
} from 'react';

import { Redirect } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import SportsGolfIcon from '@material-ui/icons/SportsGolf';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import golf from '@golfutils/golf-namespace';
import saveGameResourse from '@golfservices/saveGameResourse';

import ModuleHeader from '@golf/components/ModuleHeader';
import GameList from '@golf/GolfPage/children/game/GameList';
import Alert from '@golf/components/Alert';
import IntroPanel from '@golf/components/IntroPanel';

import { PageContainer, PageContent } from '@golfstyles/page.style';
import { FlexContainer, FlexItem } from '@golfstyles/layout.style';
import { useGameListData } from '@golfcontexts/dataProvider/AppDataProvider';

const ManageGames = () => {

    const [reload, setReload] = useState(false);
    const [games, setGames] = useState([]);
    const [playGame, setPlayGame] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);

    const {
        progress,
        count,
        hasError,
        clubDefinitions,
        gameListData,
        hasGameListData,
        gameListDataIsError,
        gameListDataIsLoading,
        doGameListDataReload
    } = useGameListData()

    useEffect(() => {

        let didCancel = false;

        const init = () => {

            if (!didCancel) {

                setSnackOpen(gameListDataIsError !== undefined);
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
            list: gameListData.doc,
            type: golf.classes.Game
        });

        setReload(true);
        doGameListDataReload(true);
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
                    Game List data did not load
                </Alert>
            </Snackbar>
            <PageContainer>
                <PageContent>
                    <div className="c-box">
                        <IntroPanel
                            icon={ <SportsGolfIcon className="c-content-icon plain" /> }>
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
                </PageContent>
            </PageContainer>
        </>
    );
};

export default ManageGames;
