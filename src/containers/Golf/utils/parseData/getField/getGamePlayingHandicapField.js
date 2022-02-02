import golf from "@golfconstants/golf-namespace";
import parseFields from "@golfutils/parseData/parseFields";
import playingHandicapShape from '@golfcontexts/playing-handicap-shape.json';

const getGamePlayingHandicapField = doc => (data, label, defaultValue) => {

let value = defaultValue;

const playingHandicapIds = data.getAllRefs(golf.properties.gamePlayingHandicap);
const playingHandicapRef = doc.getSubject(playingHandicapIds[0]);

value = parseFields(playingHandicapShape, doc)(playingHandicapRef);


    return ({
        label,
        value
    });
};

export default getGamePlayingHandicapField;
