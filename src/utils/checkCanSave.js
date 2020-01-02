import golf from "./golf-namespace";

const hasValue = item => {
    switch(item.fieldType) {
        case golf.types.string: return item.field.value !== '';
        case golf.types.nonNegativeInteger: return item.field.value > 0;
        case golf.types.integer: return typeof(item.field.value) === 'number';
        case golf.types.text: return item.field.value !== '';
        case golf.classes.Club: return item.field.value.length > 0;
        case golf.classes.Hole: return item.field.value.length > 0;
        case golf.classes.Player: return typeof(item.field.value) === 'object';
        default: return false;
    }
};

const checkCanSave = state => !state ? false :
    Object
        .entries(state.fields)
        .every(entry => entry[1].required === false ? true : hasValue(entry[1]));

export default checkCanSave;
