import React, { useState, useEffect } from 'react';

import getPlayer from '@golfservices/getPlayer';
import golf from '@golfutils/golf-namespace';
import MarkerList from './MarkerList';
import PlayerDetail from './PlayerDetail';
import deleteMarker from '@golfservices/deleteMarker';
import saveResource from '@golfservices/saveResource';
import { usePlayerData } from '@containers/Golf/contexts/dataProvider/AppDataProvider';

const ManageMarkers = () => {

    const [reload, setReload] = useState(false);
    const {
        progress,
        count,
        hasError,
        markerListData,
        markerDataIsLoading
    } = usePlayerData();

    const [markers, setMarkers] = useState([]);

    useEffect(() => {

        let didCancel = false;

        const init = () => {

            if(!didCancel) {

                setMarkers(markerListData.list);
                setReload(false);
            }
        }

        init();

    }, [markerListData.list, reload]);

    const onSaveMarker = (marker) => {

        saveResource({
            resource: marker,
            doc: markerListData.doc,
            type: golf.classes.Marker
        });

        setReload(true);
    };

    const onDeleteMarker = marker => {

        deleteMarker(marker, markerListData.doc);
        setReload(true);
    };

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
