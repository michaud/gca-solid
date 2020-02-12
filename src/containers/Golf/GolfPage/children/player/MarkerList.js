import React from 'react';

import MarkerDetail from '@golf/GolfPage/children/player/MarkerDetail';

const MarkerList = ({
    markers = [],
    onDelete,
    onSaveMarker
}) => {

    return markers.map((marker, idx) => {

        return <MarkerDetail
            key={ idx }
            player={ marker }
            target="marker"
            onDelete={ onDelete }
            showEdit={ true }
            onSave={ onSaveMarker }/>;
    });
};

export default MarkerList;
