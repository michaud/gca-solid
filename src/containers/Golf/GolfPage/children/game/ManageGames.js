import React, { useEffect, useState, useContext } from 'react';

import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import useGames from '@hooks/useGames';
import ModuleHeader from '@containers/Golf/GolfPage/children/ModuleHeader';
import { PageContainer } from '@styles/page.style';
import GameForm from '@containers/Golf/GolfPage/children/game/GameForm';
import GameList from '@containers/Golf/GolfPage/children/game/GameList';
import ClubTypeContext from '@utils/clubTypeContext';
import formStyles from '@styles/form.style';
import golf from '@utils/golf-namespace';
import saveGameResourse from '@services/saveGameResourse';
import { Snackbar } from '@material-ui/core';
import Alert from '@containers/Golf/components/Alert';

const ManageGames = () => {

    const classes = formStyles();
    const [reload, setReload] = useState(false);
    const [currentGame, setCurrentGame] = useState();
    const [games, setGames] = useState([]);
    const [showGameForm, setShowGameForm] = useState(false);
    const [playGame, setPlayGame] = useState();
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

            if(!didCancel) {

                setSnackOpen(gameListDataIsError);
                setGames(gameListData.list);

                if(reload) {

                    setCurrentGame();
                }

                setReload(false);
            }
        }

        init();

    }, [gameListData]);

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackOpen(false);
    };

    const toggleShowGameForm = () => setShowGameForm(state => !state);

    const onSaveGameHandler = game => {

        saveGameResourse({
            resource: game,
            doc: gameListData.doc,
            type: golf.classes.Game
        });

        setReload(true);
    };

    const onCancelHandler = () => setShowGameForm(false);

    const onDeleteGameHandler = (game) => {

//        deleteGame(game, gameData.doc);
        setReload(true);
    };

    const onPlayGameHandler = game => setPlayGame(game.split('#')[1]);
        
    if (playGame) return <Redirect to={ `/golf/game/${ playGame }` } />

    return (
        <>
            <ModuleHeader label="Games" screenheader={ true } loading={ gameListDataIsLoading }/>
            <Snackbar
                open={ snackOpen }
                autoHideDuration={ 4000 }
                onClose={ handleSnackClose }
                anchorOrigin={{ vertical:'top', horizontal: 'center' }}>
                <Alert onClose={ handleSnackClose } severity="error">
                    Courses did not load
                </Alert>
            </Snackbar>
            <PageContainer>
                {
                    showGameForm && <div className="c-box c-box--hold-height">
                        <GameForm
                            game={ currentGame }
                            onSave={ onSaveGameHandler }
                            onCancel={ onCancelHandler }/>
                    </div>
                }
                {
                    !showGameForm && !gameListDataIsLoading && <div className="c-box">
                        <Button
                            variant="contained"
                            onClick={ toggleShowGameForm }
                            className={ classes.button }
                            fullWidth={ true }
                            color="primary">New game</Button>
                    </div>
                }
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
