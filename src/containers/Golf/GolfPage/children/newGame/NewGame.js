import React, {
    useState,
    useContext,
    useEffect
} from 'react';

import { Redirect } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import Alert from '@containers/Golf/components/Alert';
import ModuleHeader from '@containers/Golf/GolfPage/children/ModuleHeader';
import GameForm from '@containers/Golf/GolfPage/children/game/GameForm';
import saveGameResourse from '@services/saveGameResourse';
import useGames from '@hooks/useGames';
import ClubTypeContext from '@utils/clubTypeContext';
import golf from '@utils/golf-namespace';
import { PageContainer } from '@styles/page.style';

const NewGame = () => {

    const [currentGame, setCurrentGame] = useState();
    const [reload, setReload] = useState(false);
    const clubTypeData = useContext(ClubTypeContext);
    const [snackOpen, setSnackOpen] = useState(false);
    const [isNavigateBack, setIsNavigateBack] = useState(false);
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

                if(reload) {

                    setCurrentGame();
                }

                setReload(false);
            }
        }

        init();

        return () => { didCancel = true }

    }, [gameListData, reload]);

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackOpen(false);
    };

    const onSaveGameHandler = async (game) => {

        await saveGameResourse({
            resource: game,
            doc: gameListData.doc,
            type: golf.classes.Game
        });

        setIsNavigateBack(true);
    };

    const onCancelHandler = () => {};

    if(isNavigateBack) return <Redirect to="/golf/settings/games"/>;

    return (
        <>
            <ModuleHeader label="New game" screenheader={ true } loading={ gameListDataIsLoading }/>
            <Snackbar
                open={ snackOpen }
                autoHideDuration={ 4000 }
                onClose={ handleSnackClose }
                anchorOrigin={{ vertical:'top', horizontal: 'center' }}>
                <Alert onClose={ handleSnackClose } severity="error">
                    Game data did not load
                </Alert>
            </Snackbar>
            <PageContainer>
                <GameForm
                    game={ currentGame }
                    onSave={ onSaveGameHandler }
                    onCancel={ onCancelHandler }/>
            </PageContainer>
        </>
    );
};

export default NewGame;
