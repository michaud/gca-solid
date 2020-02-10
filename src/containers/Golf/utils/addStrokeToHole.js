import update from 'immutability-helper';

import createStroke from '@golfutils/createStroke';
import saveHoleToGame from '@golfutils/saveHoleToGame';
import catchGeoConnectErrors from '@golfutils/catchGeoConnectErrors';

const persistData = (
    club,
    game,
    doc,
    holeIri,
    setState
) => ({
    coords: {
        latitude,
        longitude,
        altitude
    }
}) => {

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
            game: {
                gameCourse: {
                    value: {
                        courseHoles: {
                            value: { [holeIndex]: { $set: hole } }
                        }
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
        doc
    };
};

const addStrokeToHole = async (club, holeIri, game, doc, setState) => {

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(result => {

        const geo = {
            coords: {
                latitude: result.coords.latitude,
                longitude: result.coords.longitude,
                altitude: result.coords.altitude
            }
        };

        const persist = persistData(club,  game, doc, holeIri, setState);
        saveHoleToGame(persist(geo));

    }, catchGeoConnectErrors, options)
};

export default addStrokeToHole;
