import golf from "@golfconstants/golf-namespace";

const getValue = (type, data, predicate) => {

    switch(type) {

        case golf.types.text:
        case golf.types.string:
        case golf.types.integer:
        case golf.types.nonNegativeInteger: return data[predicate].value;
        default: console.error('no field type', data[predicate])
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
