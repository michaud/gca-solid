import update from 'immutability-helper';
import Cookies from 'js-cookie'

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

const addStrokeToHole = (club, holeIri, game, doc, setState) => {

    const persist = persistData(club,  game, doc, holeIri, setState);
    const geo = {
        coords: {
            latitude: 0,
            longitude: 0,
            altitude: 0
        }
    };

    if(Cookies.get('canUseLocation') === 'true') {

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
    
        navigator.geolocation.getCurrentPosition(result => {

            geo.coords.latitude = result.coords.latitude;
            geo.coords.longitude = result.coords.longitude;
            geo.coords.altitude = result.coords.altitude;

            return saveHoleToGame(persist(geo));

        }, catchGeoConnectErrors, options);
    
    } else { return saveHoleToGame(persist(geo)); }
};

export default addStrokeToHole;
