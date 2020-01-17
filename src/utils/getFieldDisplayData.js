import golf from "./golf-namespace";

const getValue = (type, fields, predicate) => {

    switch(type) {

        case golf.types.text:
        case golf.types.string:
        case golf.types.integer:
        case golf.types.nonNegativeInteger: return fields[predicate].value;
        default: console.error('no field type', fields[predicate])
    }
};

const getFieldDisplayData = (field, data) => {

    const {
        label,
        type,
        predicate
    } = field;

    const { fields } = data;
    const value = getValue(type, fields, predicate);

    return { value, label };
};

export default getFieldDisplayData;
