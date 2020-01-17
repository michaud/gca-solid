import strokeShape from '@contexts/stroke-shape';
import setupDataObject from './setupDataObject';
import moment from 'moment';

const createStroke = (club, coords) => {

    const stroke = setupDataObject(strokeShape);

    const newStroke = {
        fields: {
            ...stroke.fields,
            strokeClub: {
                ...stroke.strokeClub,
                value: {
                    ...club
                }
            },
            strokeLocation: {
                ...stroke.strokeLocation,
                value: {
                    ...coords
                }
            },
            strokeDate: {
                ...stroke.strokeDate,
                value: moment(Date.now()).format('DD-mm-YY hh:mm')
            }
        }
    };

    return newStroke;
};

export default createStroke;
