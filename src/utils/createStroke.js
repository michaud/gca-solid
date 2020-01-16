import strokeShape from '@contexts/stroke-shape';
import setupDataObject from './setupDataObject';
import moment from 'moment';

const createStroke = (club, coords) => {

    const stroke = setupDataObject(strokeShape);

    const newStroke = {
        fields: {
            ...stroke.fields,
            strokeClub: {
                ...stroke.fields.strokeClub,
                field: {
                    ...stroke.fields.strokeClub.field,
                    value: {
                        ...club
                    }
                }
            },
            strokeLocation: {
                ...stroke.fields.strokeLocation,
                field: {
                    ...stroke.fields.strokeLocation.field,
                    value: {
                        ...coords
                    }
                }
            },
            strokeDate: {
                ...stroke.fields.strokeDate,
                field:{
                    ...stroke.fields.strokeDate.field,
                    value: moment(Date.now()).format('DD-mm-YY hh:mm')
                }
            }
        }
    };

    return newStroke;
};

export default createStroke;
