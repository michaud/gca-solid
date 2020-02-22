import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Snackbar } from '@material-ui/core';

import golf from '@golfutils/golf-namespace';
import saveResource from '@golfservices/saveResource';

import Alert from '@golf/components/Alert';
import ModuleHeader from '@golf/components/ModuleHeader';
import ManageMarkers from '@golf/GolfPage/children/player/ManageMarkers';
import PlayerDetail from '@golf/GolfPage/children/player/PlayerDetail';

import { usePlayerData } from '@containers/Golf/contexts/dataProvider/AppDataProvider';

import {
    PageContainer,
    PageContent
} from '@golfstyles/page.style';

const ManagePlayers = () => {

    const [reload, setReload] = useState(false);
    const [player, setPlayer] = useState();
    const [snackOpen, setSnackOpen] = useState(false);

    const {
        progress,
        count,
        hasError,
        playerData,
        playerDataIsLoading,
        markerListData
    } = usePlayerData();

    const { t } = useTranslation();

    useEffect(() => {

        let didCancel = false;

        const init = () => {

            if (!didCancel) {
                setPlayer(playerData.player);
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
                loading={ playerDataIsLoading } />
            <Snackbar
                open={ snackOpen }
                autoHideDuration={ 4000 }
                onClose={ handleSnackClose }
                anchorOrigin={ { vertical: 'top', horizontal: 'center' } }>
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
                            player={ player } />
                    }
                    {
                        player && <ManageMarkers />
                    }
                </PageContent>
            </PageContainer>
        </>
    );
};

export default ManagePlayers;
