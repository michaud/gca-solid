import golf from "./golf-namespace";

const getFieldValue = (fieldDef, args) => {

    const [data, clubTypes] = args;

    switch(fieldDef.fieldType) {
        case golf.types.nonNegativeInteger:
        case golf.types.text:
        case golf.types.string: return data.target.value;
        case golf.types.integer: return parseInt(data.target.value);
        case golf.types.dateTime: return data;
        case golf.classes.Club: return clubTypes.find(type => type.iri === data.iri);
        case golf.classes.Marker: return data;
        case golf.classes.Course: return data;
        case golf.classes.GamePlayingHandicap: return data;

        default: {
            
            console.error('no fieldType', fieldDef, data)
            return '';
        }
    }
};

export default getFieldValue;
