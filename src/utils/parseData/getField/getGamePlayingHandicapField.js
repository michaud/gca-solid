import golf from "@utils/golf-namespace";
import parseFields from "../parseFields";
import playingHandicapShape from '@contexts/playing-handicap-shape.json';

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
