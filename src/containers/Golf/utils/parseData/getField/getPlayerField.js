import playerShape from '@golfcontexts/player-shape.json';
import golf from '@golfconstants/golf-namespace';
import parseFields from '@golfutils/parseData/parseFields';

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
