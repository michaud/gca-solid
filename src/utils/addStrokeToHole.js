import createStroke from '@utils/createStroke';
import update from 'immutability-helper';
import saveHoleToGame from './saveHoleToGame';
import catchGeoConnectErrors from './catchGeoConnectErrors';

const persistData = (club, game, gameDoc, holeIri, setState) => ({ coords: { latitude, longitude, altitude }}) => {

    const stroke = createStroke(club, { latitude, longitude, altitude });

    const holeIndex = game.gameCourse.value.courseHoles.value.findIndex(hole => hole.iri === holeIri);
    const holeData = game.gameCourse.value.courseHoles.value[holeIndex];

    const hole = update(holeData, {
        gameStrokes: {
            value: {
                $push: [stroke]
            }
        }
    });

    setState(state => {

        const newState = update(state, {
            gameCourse: {
                value: {
                    courseHoles: {
                        value: { [holeIndex]: { $set: hole } }
                    }
                }
            }
        });

        return newState;
    });

    return {
        stroke,
        hole,
        game,
        gameDoc
    };
};

const getPosition = async (options) => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
});

const addStrokeToHole = async (club, holeIri, game, gameDoc, setState) => {

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    await getPosition(options)
        .then(persistData(club,  game, gameDoc, holeIri, setState))
        .then(saveHoleToGame)
        .catch(catchGeoConnectErrors);
};

export default addStrokeToHole;
