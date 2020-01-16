import createStroke from '@utils/createStroke';
import update from 'immutability-helper';

const saveData = (club, coords, game, holeIri, setState) => {

    const stroke = createStroke(club, coords);

    const holeIndex = game.fields.gameCourse.field.value.fields.courseHoles.field.value.findIndex(hole => hole.iri === holeIri);
                 
    const hole = game.fields.gameCourse.field.value.fields.courseHoles.field.value[holeIndex];
    const newHole = update(hole, {
        fields: {
            gameStrokes: {
                field: {
                    value: {
                        $push: [stroke]
                    }
                }
            }
        }
    });

    setState(state => {

        const newState = update(state, {
            fields: {
                gameCourse: {
                    field: {
                        value: {
                            fields: {
                                courseHoles: {
                                    field: {
                                        value: {[holeIndex]: {$set: newHole}}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        return newState;
    });
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
        .then(({ coords: {latitude, longitude, altitude }}) => {
            saveData(club, {latitude, longitude, altitude}, game, holeIri, setState);
        })
        .catch((err) => {
            console.error(err.message);
        });
};

export default addStrokeToHole;
