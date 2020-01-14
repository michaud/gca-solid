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
import deleteMarker from '@services/deleteMarker';

const ManageMarkers = ({
    webId
}) => {

    const [reload, setReload] = useState(false);
    const { notification } = useNotification(webId);
    const markerData = useMarkers(reload);
    const [markers, setMarkers] = useState([]);
    const { t } = useTranslation();

    const onSaveMarker = (marker) => {

        saveMarker(marker, markerData.doc);
        setReload(true);
    };

    const onDeleteMarker = marker => {

        deleteMarker(marker, markerData.doc);
        setReload(true);
    };

    const init = async () => {

        try {   

            if (markerData.list) {

                const markerList = markerData.list;
                setMarkers(markerList);
                setReload(false);
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

    }, [webId, markerData, notification.notify, reload]);

    const marker = getPlayer(undefined, golf.classes.Marker);

    return (
        <>
            <header className="c-header">Markers</header>
            <PlayerDetail
                target="marker"
                player={ marker }
                onDelete={ onDeleteMarker }
                onSave={ onSaveMarker }/>
            <MarkerList
                markers={ markers }
                onDelete={ onDeleteMarker }
                onSaveMarker={ onSaveMarker }/>
        </>
    );
};

export default ManageMarkers;
