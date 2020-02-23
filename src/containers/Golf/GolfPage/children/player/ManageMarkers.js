import React, { useState, useEffect } from 'react';

import getPlayer from '@golfservices/getPlayer';
import golf from '@golfutils/golf-namespace';
import MarkerList from './MarkerList';
import PlayerDetail from './PlayerDetail';
import deleteMarker from '@golfservices/deleteMarker';
import saveResource from '@golfservices/saveResource';
import { usePlayerData } from '@containers/Golf/contexts/dataProvider/AppDataProvider';

const ManageMarkers = () => {

    const [markers, setMarkers] = useState([]);
    const {
        markerListData,
        reloadMarkers
    } = usePlayerData();

    useEffect(() => {

        let didCancel = false;

        const init = () => {

            if(!didCancel) setMarkers(markerListData.list);
        }

        init();

        return () => { didCancel = true; }

    }, [markerListData.list]);

    const onSaveMarker = (marker) => {

        saveResource({
            resource: marker,
            doc: markerListData.doc,
            type: golf.classes.Marker
        });

        reloadMarkers();
    };

    const onDeleteMarker = marker => {

        deleteMarker(marker, markerListData.doc);
        reloadMarkers();
    };

    const marker = getPlayer(undefined, golf.classes.Marker);

    return (
        <>
            <header className="c-header">Markers</header>
            <div className="c-box">
                <PlayerDetail
                    target="marker"
                    player={ marker }
                    onDelete={ onDeleteMarker }
                    onSave={ onSaveMarker }/>
            </div>
            <MarkerList
                markers={ markers }
                onDelete={ onDeleteMarker }
                onSaveMarker={ onSaveMarker }/>
        </>
    );
};

export default ManageMarkers;
