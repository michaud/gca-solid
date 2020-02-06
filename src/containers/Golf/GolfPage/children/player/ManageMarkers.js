import React, { useState, useEffect } from 'react';

import useMarkers from '@hooks/useMarkers';

import getPlayer from '@services/getPlayer';
import golf from '@utils/golf-namespace';
import MarkerList from './MarkerList';
import PlayerDetail from './PlayerDetail';
import deleteMarker from '@services/deleteMarker';
import saveResource from '@services/saveResource';

const ManageMarkers = ({
    webId
}) => {

    const [reload, setReload] = useState(false);
    const markerData = useMarkers(reload);
    const [markers, setMarkers] = useState([]);

    const onSaveMarker = (marker) => {

        saveResource({
            resource: marker,
            doc: markerData.doc,
            type: golf.classes.Marker
        });
        setReload(true);
    };

    const onDeleteMarker = marker => {

        deleteMarker(marker, markerData.doc);
        setReload(true);
    };

    useEffect(() => {

        if (markerData.list) {

            const markerList = markerData.list;
            setMarkers(markerList);
            setReload(false);
        }

    }, [markerData, reload]);

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
