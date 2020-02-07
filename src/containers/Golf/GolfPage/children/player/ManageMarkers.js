import React, { useState, useEffect } from 'react';

import useMarkers from '@hooks/useMarkers';

import getPlayer from '@services/getPlayer';
import golf from '@utils/golf-namespace';
import MarkerList from './MarkerList';
import PlayerDetail from './PlayerDetail';
import deleteMarker from '@services/deleteMarker';
import saveResource from '@services/saveResource';

const ManageMarkers = () => {

    const [reload, setReload] = useState(false);
    const [{ markerListData }] = useMarkers(reload);

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
