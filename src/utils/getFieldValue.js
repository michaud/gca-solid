import golf from "./golf-namespace";

const getFieldValue = (fieldDef, args) => {

    const [data, clubTypes] = args;
    
    switch(fieldDef.fieldType) {

        case golf.types.nonNegativeInteger:
        case golf.types.text:
        case golf.types.string:
        case golf.types.integer : return data.target.value;
        case golf.classes.Club: {

            const clubType = clubTypes.find(type => {
                return type.iri === data.iri;
            });

            return clubType;
        }

        default: return '';
    }
};

export default getFieldValue;
