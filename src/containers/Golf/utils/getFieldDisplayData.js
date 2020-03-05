import ulog from 'ulog';

import golf from "@golfconstants/golf-namespace";

const log = ulog('getFieldDisplayData');

const getValue = (type, data, predicate) => {

    switch(type) {

        case golf.types.text:
        case golf.types.string:
        case golf.types.integer:
        case golf.types.nonNegativeInteger: return data[predicate].value;
        default: log.error('can not find type for this field', data[predicate])
    }
};

const getFieldDisplayData = (field, data) => {

    const {
        label,
        type,
        predicate
    } = field;

    const value = getValue(type, data, predicate);

    return { value, label };
};

export default getFieldDisplayData;
