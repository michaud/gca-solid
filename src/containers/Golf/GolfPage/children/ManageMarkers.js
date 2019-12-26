import React, { useState, useEffect } from 'react';

import useMarkers from '@hooks/useMarkers';
import { useTranslation } from 'react-i18next';

import getPlayer from '@services/getPlayer';
import golf from '@utils/golf-namespace';
import MarkerList from './MarkerList';
import PlayerDetail from './PlayerDetail';
import saveMarker from '@services/saveMarker';
import { useNotification } from '@inrupt/solid-react-components';
import { errorToaster } from '@utils/';

const ManageMarkers = ({ webId }) => {

    const [dirty, setDirty] = useState(true);
    const { notification } = useNotification(webId);
    const markerData = useMarkers();
    const [markers, setMarkers] = useState([]);
    const { t } = useTranslation();

    const onSaveMarker = (marker) => {

        saveMarker(marker, markerData.doc);
    };

    const init = async () => {

        try {

            if (markerData.list) {

                const markerList = markerData.list;

                setMarkers(markerList);
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

    }, [webId, markerData, notification.notify, dirty]);

    const marker = getPlayer(undefined, golf.classes.Marker);

    return <>
        <header className="c-header">Markers</header>
        <PlayerDetail
            title="Add marker"
            player={ marker }
            onSave={ onSaveMarker }/>
        <MarkerList markers={ markers }/>
        </>;
};

export default ManageMarkers;
