import React, {
    useState,
    useContext,
    useEffect
} from 'react';

import { Redirect } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';

import saveGameResourse from '@golfservices/saveGameResourse';
import useGames from '@golfhooks/useGames';
import ClubTypeContext from '@golfutils/clubTypeContext';
import golf from '@golfutils/golf-namespace';

import Alert from '@golf/components/Alert';
import ModuleHeader from '@golf/components/ModuleHeader';
import GameForm from '@golf/GolfPage/children/game/GameForm';

import { PageContainer, PageContent } from '@golfstyles/page.style';

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

    const onCancelHandler = () => { setIsNavigateBack(true) };

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
                <PageContent>
                    <GameForm
                        game={ currentGame }
                        onSave={ onSaveGameHandler }
                        onCancel={ onCancelHandler }/>
                </PageContent>
            </PageContainer>
        </>
    );
};

export default NewGame;
