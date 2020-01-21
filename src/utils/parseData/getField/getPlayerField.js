import golf from '@utils/golf-namespace';

import playerShape from '@contexts/player-shape.json';
import parseFields from '@utils/parseData/parseFields';

const getPlayerField = doc => (data, label, defaultValue) => {

    let value = defaultValue;

    const playerIds = data.getAllRefs(golf.properties.gamePlayer);
    const playerRef = doc.getSubject(playerIds[0]);

    value = parseFields(playerShape, doc)(playerRef);

    return ({
        label,
        value
    });
};

export default getPlayerField;
