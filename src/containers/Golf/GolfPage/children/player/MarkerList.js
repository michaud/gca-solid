import React from 'react';

import MarkerDetail from '@golfpagectrl/player/MarkerDetail';

const MarkerList = ({
    markers = [],
    onDelete,
    onSaveMarker
}) => {

    return markers.map((marker, idx) => {

        return <MarkerDetail
            key={ marker.iri }
            player={ marker }
            target="marker"
            onDelete={ onDelete }
            showEdit={ true }
            onSave={ onSaveMarker }/>;
    });
};

export default MarkerList;
