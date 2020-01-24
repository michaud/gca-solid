import strokeShape from '@contexts/stroke-shape';
import geocoordinatesShape from '@contexts/geocoordinates-shape';
import setupDataObject from './setupDataObject';
import update from 'immutability-helper';
import { format } from 'date-fns'

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
        strokeDate: { value: { $set : format(new Date(Date.now()), 'dd-MM-yy HH:mm:ss') } }
    });

    return stroke;
};

export default createStroke;
