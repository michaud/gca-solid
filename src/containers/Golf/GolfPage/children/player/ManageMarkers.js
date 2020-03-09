import React, { useState, useEffect } from 'react';

import golf from '@golfconstants/golf-namespace';
import getPlayer from '@golfservices/getPlayer';
import deleteMarker from '@golfservices/deleteMarker';
import saveResource from '@golfservices/saveResource';
import { usePlayerData } from '@golfcontexts/dataProvider/AppDataProvider';
import MarkerList from '@golfpagectrl/player/MarkerList';
import PlayerDetail from '@golfpagectrl/player/PlayerDetail';

const ManageMarkers = () => {

    const [markers, setMarkers] = useState([]);
    const [newMarker, setNewMarker] = useState(getPlayer(undefined, golf.classes.Marker));
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
        }).then(() => reloadMarkers());
    };

    const onDeleteMarker = marker => {

        deleteMarker(marker, markerListData.doc);
        reloadMarkers();
    };
    const handleCancelAdd = () => {

        setNewMarker(getPlayer(undefined, golf.classes.Marker));
    };

    return (
        <>
            <header className="c-header">Markers</header>
            <div className="c-box">
                <PlayerDetail
                    target="marker"
                    player={ newMarker }
                    onDelete={ onDeleteMarker }
                    onSave={ onSaveMarker }
                    onCancel={ handleCancelAdd }/>
            </div>
            <MarkerList
                markers={ markers }
                onDelete={ onDeleteMarker }
                onSaveMarker={ onSaveMarker }/>
        </>
    );
};

export default ManageMarkers;
