import createStroke from '@utils/createStroke';
import update from 'immutability-helper';
import saveHoleToGame from './saveHoleToGame';

const handleConnectErrors = (error) => {
    console.error(error.message);
    var msg = null;
    switch(error.code) {
      case error.PERMISSION_DENIED:
          msg = "User denied the request for Geolocation.";
          break;
      case error.POSITION_UNAVAILABLE:
          msg = "Location information is unavailable.";
          break;
      case error.TIMEOUT:
          msg = "The request to get user location timed out.";
          break;
      case error.UNKNOWN_ERROR:
          msg = "An unknown error occurred.";
          break;
    default: 
    }
    alert(msg);
};

const persistData = (club, game, holeIri, setState) => ({ coords: { latitude, longitude, altitude }}) => {

    const stroke = createStroke(club, { latitude, longitude, altitude });

    const holeIndex = game.gameCourse.value.courseHoles.value.findIndex(hole => hole.iri === holeIri);
                 
    const hole = game.gameCourse.value.courseHoles.value[holeIndex];
    const newHole = update(hole, {
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
                        value: {[holeIndex]: {$set: newHole}}
                    }
                }
            }
        });

        return newState;
    });

    return newHole;
};

const addStrokeToHole = (club, holeIri, game, setState) => {

    var getPosition = (options) => {

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    };

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    getPosition(options)
        .then(persistData(club,  game, holeIri, setState))
        .then(saveHoleToGame)
        .catch(handleConnectErrors);
};

export default addStrokeToHole;
