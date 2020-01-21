import strokeShape from '@contexts/stroke-shape';
import geocoordinatesShape from '@contexts/geocoordinates-shape';
import setupDataObject from './setupDataObject';
import update from 'immutability-helper';
import moment from 'moment';

const createStroke = (club, coords) => {

    const stroke = setupDataObject(strokeShape);
    const location = update(setupDataObject(geocoordinatesShape), {
        longitude: { value: { $set: coords.longitude }},
        latitude: { value: { $set: coords.latitude }},
        elevation: { value: { $set: coords.elevation }}
    });


    const newStroke = {
        ...stroke,
        strokeClub: {
            ...stroke.strokeClub,
            value: {
                ...club
            }
        },
        strokeLocation: {
            ...stroke.strokeLocation,
            value: {
                ...location
            }
        },
        strokeDate: {
            ...stroke.strokeDate,
            value: moment(Date.now()).format('DD-mm-YY hh:mm:ss')
        }
    };

    return newStroke;
};

export default createStroke;
