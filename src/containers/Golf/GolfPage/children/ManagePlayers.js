import React, { useState, useEffect } from 'react';
import ManageMarkers from './ManageMarkers';
import ModuleHeader from './ModuleHeader';
import { useTranslation } from 'react-i18next';
import { useNotification } from '@inrupt/solid-react-components';
import PlayerDetail from './PlayerDetail';
import usePlayer from '@hooks/usePlayer';
import { errorToaster } from '@utils/';
import { PageContainer } from '@styles/page.style';
import savePlayer from '@services/savePlayer';
import useMarkers from '@hooks/useMarkers';

const ManagePlayers = ({ match, webId, history }) => {

    const [dirty, setDirty] = useState(true);
    const { notification } = useNotification(webId);
    const [player, setPlayer] = useState();
    const [markers, setMarkers] = useState([]);
    const playerDetails = usePlayer();
    const markerDetails = useMarkers();

    const { t } = useTranslation();

    const onSavePlayer = (player) => {

        savePlayer(player, playerDetails.doc)
    }

    const init = async () => {

        try {

            if (playerDetails) {

                const playerData = playerDetails.player;
                setPlayer(playerData);
                setDirty(false);
            }

            if (markerDetails.markers) {

                const markerData = markerDetails.markers;
                setMarkers(markerData);
                setDirty(false);
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

    }, [webId, playerDetails, markerDetails, dirty, notification.notify]);

    return <>
        <ModuleHeader label={ t('golf.players') } screenheader={ true }/>
        <PageContainer>
            { player && <PlayerDetail onSave={ onSavePlayer } player={ player }/> }
            <ManageMarkers markers={ markers }/>
        </PageContainer>
    </>;
};

export default ManagePlayers;
