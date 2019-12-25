import React, { useState, useEffect } from 'react';

import getPlayer from '@services/getPlayer';
import golf from '@utils/golf-namespace';
import MarkerList from './MarkerList';
import PlayerDetail from './PlayerDetail';

const ManageMarkers = ({ markers }) => {

    if(markers.length > 0) return <MarkerList/>

    const marker = getPlayer(undefined, golf.classes.Marker);

    return marker ? <PlayerDetail title="Add marker" player={ marker }/> : null;
};

export default ManageMarkers;
