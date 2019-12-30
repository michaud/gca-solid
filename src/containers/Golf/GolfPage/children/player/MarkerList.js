import React from 'react';
import PlayerDetail from './PlayerDetail';

const MarkerList = ({ markers, onDelete, onSaveMarker }) => {

    return markers.map((marker, idx) => {

        return <PlayerDetail
            key={ idx }
            player={ marker }
            target="marker"
            onDelete={ onDelete }
            onSave={ onSaveMarker }/>;
    })
};

export default MarkerList;
