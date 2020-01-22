import strokeShape from '@contexts/stroke-shape';
import geocoordinatesShape from '@contexts/geocoordinates-shape';
import setupDataObject from './setupDataObject';
import update from 'immutability-helper';
import moment from 'moment';

const createStroke = (club, coords) => {

    const newStroke = setupDataObject(strokeShape);
    const location = update(setupDataObject(geocoordinatesShape), {
        longitude: { value: { $set: coords.longitude }},
        latitude: { value: { $set: coords.latitude }},
        elevation: { value: { $set: coords.elevation }}
    });
    
    const stroke = update(newStroke, {
        strokeClub: { value: { $set : club } },
        strokeLocation: { value: { $set : location } },
        strokeDate: { value: { $set : moment(Date.now()).format('DD-mm-YY hh:mm:ss') } }
    });

    return stroke;
};

export default createStroke;
