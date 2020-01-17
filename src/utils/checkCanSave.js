import golf from "./golf-namespace";

const hasValue = item => {

    switch(item.fieldType) {
        case golf.types.string: return item.value !== '';
        case golf.types.nonNegativeInteger: return item.value > 0;
        case golf.types.integer: return typeof(item.value) === 'number';
        case golf.types.text: return item.value !== '';
        case golf.types.dateTime: return item.value instanceof Date;
        case golf.classes.Club: {

            return item.fieldName === 'clubType' ? typeof(item.value) === 'object' : item.value.length > 0;
        }
        case golf.classes.Hole: return item.value.length > 0;
        case golf.classes.Player: return typeof(item.value) === 'object';
        case golf.classes.Course: return typeof(item.value) === 'object';
        case golf.classes.Marker: return typeof(item.value) === 'object';
        case golf.classes.Bag: return typeof(item.value) === 'object';
        case golf.classes.GamePlayingHandicap: return true;

        default: return false;
    }
};

const test = entry => {
    const entryNeedsValue = entry.hasOwnProperty('required') ? entry.required : true;
    return entryNeedsValue ? hasValue(entry) : true;
};

const checkCanSave = state => !state ? false : Object.values(state.fields).every(test);

export default checkCanSave;
