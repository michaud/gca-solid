import React, { useState, useEffect } from 'react';
import ManageMarkers from './ManageMarkers';
import ModuleHeader from '@containers/Golf/GolfPage/children/ModuleHeader';
import { useTranslation } from 'react-i18next';
import { useNotification } from '@inrupt/solid-react-components';
import PlayerDetail from '@containers/Golf/GolfPage/children/player/PlayerDetail';
import usePlayer from '@hooks/usePlayer';
import { errorToaster } from '@utils/';
import { PageContainer } from '@styles/page.style';
import golf from '@utils/golf-namespace';
import saveResource from '@services/saveResource';

const ManagePlayers = ({ webId }) => {

    const { notification } = useNotification(webId);

    const [player, setPlayer] = useState();
    const [reload, setReload] = useState(false);
    const playerDetails = usePlayer(reload);
    const { t } = useTranslation();

    const onSavePlayer = (playerData) => {

        saveResource({
            resource: playerData,
            doc: playerDetails.doc,
            type: golf.classes.Player
        });
        
        setReload(true);
    };

    const init = async () => {

        try {

            if (playerDetails) {

                setPlayer(playerDetails.player);
                setReload(false)
            }

        } catch (e) {
            /**
             * Check if something fails when we try to create a inbox
             * and show user a possible solution
             */
            if (e.name === 'Inbox Error') {
                return errorToaster(e.message, 'Error', {
                    label: t('errorCreateInbox.link.label'),
                    href: t('errorCreateInbox.link.href')
                });
            }

            errorToaster(e.message, 'Error');
        }
    };

    useEffect(() => {

        if (webId && notification.notify) {
            init();
        }

    }, [webId, playerDetails, reload, notification.notify]);

    return (
        <>
            <ModuleHeader
                label={ t('golf.players') }
                screenheader={ true }
                loading={ !player || reload === true }/>
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
