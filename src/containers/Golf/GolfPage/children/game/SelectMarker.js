import React, { useState } from 'react';
import MarkerSelector from './MarkerSelector';
import PlayerUpdate from './PlayerUpdate';

const SelectMarker = ({ markers = [], onSave }) => {

    const [selectedMarker, setSelectedMarker] = useState();

    const selectMarkerHandler = marker => {

        setSelectedMarker(marker);
    };

    const onSaveMarkerHandler = marker => {

        onSave(marker);
    };

    return (
        <>
        <MarkerSelector
            markers={ markers }
            onSelect={ selectMarkerHandler }/>
        { selectedMarker && <PlayerUpdate
            player={ selectedMarker }
            onSave={ onSaveMarkerHandler }
            actionLabel={'Update marker'}
            title={ 'Marker update'}/> }
        </>
    );
};

export default SelectMarker;
