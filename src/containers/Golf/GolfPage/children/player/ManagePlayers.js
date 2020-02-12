import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Snackbar } from '@material-ui/core';

import usePlayer from '@golfhooks/usePlayer';
import golf from '@golfutils/golf-namespace';
import saveResource from '@golfservices/saveResource';

import Alert from '@golf/components/Alert';
import ModuleHeader from '@golf/components/ModuleHeader';
import ManageMarkers from '@golf/GolfPage/children/player/ManageMarkers';
import PlayerDetail from '@golf/GolfPage/children/player/PlayerDetail';

import { PageContainer, PageContent } from '@golfstyles/page.style';

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
                <PageContent>
                { 
                    player && <PlayerDetail
                        onSave={ onSavePlayer }
                        showEdit={ true }
                        player={ player }/> 
                }
                {
                    player && <ManageMarkers webId={ webId }/>
                }
                </PageContent>
            </PageContainer>
        </>
    );
};

export default ManagePlayers;
