import React, { useState, useEffect } from 'react';
import ManageMarkers from './ManageMarkers';
import ModuleHeader from '@containers/Golf/GolfPage/children/ModuleHeader';
import { useTranslation } from 'react-i18next';
import PlayerDetail from '@containers/Golf/GolfPage/children/player/PlayerDetail';
import usePlayer from '@hooks/usePlayer';
import { PageContainer } from '@styles/page.style';
import golf from '@utils/golf-namespace';
import saveResource from '@services/saveResource';
import { Snackbar } from '@material-ui/core';
import Alert from '@containers/Golf/components/Alert';

const ManagePlayers = ({ webId }) => {

    const [reload, setReload] = useState(false);
    const [player, setPlayer] = useState();
    const [snackOpen, setSnackOpen] = useState(false);

    const [{
        playerData,
        isLoading: playerDataIsLoading,
        isError: playerDataIsError
    }] = usePlayer(reload);
    
    const { t } = useTranslation();

    useEffect(() => {

        let didCancel = false;

        const init = () => {

            if (!didCancel) {
                setSnackOpen(playerDataIsError);
                setPlayer(playerData.player);
                setReload(false)
            }
        }

        init();

        return () => {
            didCancel = true;
        }
       
    }, [playerData, reload]);

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackOpen(false);
    };

    const onSavePlayer = (playerData) => {

        saveResource({
            resource: playerData,
            doc: playerData.doc,
            type: golf.classes.Player
        });
        
        setReload(true);
    };

    return (
        <>
            <ModuleHeader
                label={ t('golf.players') }
                screenheader={ true }
                loading={ playerDataIsLoading }/>
            <Snackbar
                open={ snackOpen }
                autoHideDuration={ 4000 }
                onClose={ handleSnackClose }
                anchorOrigin={{ vertical:'top', horizontal: 'center' }}>
                <Alert onClose={ handleSnackClose } severity="error">
                    Player did not load
                </Alert>
            </Snackbar>

            <PageContainer>
            { 
                player && <PlayerDetail
                    onSave={ onSavePlayer }
                    showEdit={ true }
                    player={ player }/> 
            }
            {
                player && <ManageMarkers webId={ webId }/>
            }
            </PageContainer>
        </>
    );
};

export default ManagePlayers;
