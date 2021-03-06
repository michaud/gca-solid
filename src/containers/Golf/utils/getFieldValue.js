import ulog from 'ulog';

import golf from "@golfconstants/golf-namespace";

const log = ulog('getFieldValue');

const getFieldValue = (field, args) => {

    const [data, clubTypes] = args;

    switch(field.type) {
        case golf.types.text:
        case golf.types.string: return data.target.value;
        case golf.types.nonNegativeInteger:
        case golf.types.integer: return parseInt(data.target.value);
        case golf.types.dateTime: return data;
        case golf.classes.Club: return clubTypes.find(type => type.iri === data.iri);
        case golf.classes.Marker: return data;
        case golf.classes.Course: return data;
        case golf.classes.GamePlayingHandicap: return data;

        default: {
            
            log.error('do not know this field type', field, data);

            return '';
        }
    }
};

export default getFieldValue;
