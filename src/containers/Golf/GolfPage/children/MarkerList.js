import React from 'react';
import PlayerDetail from './PlayerDetail';

const MarkerList = ({ markers }) => {


    return markers.map((marker, idx) => {

        return <PlayerDetail key={ idx } player={ marker }/>;
    })
}

export default MarkerList;
