import golf from '@utils/golf-namespace';
import holeShape from '@contexts/hole-shape.json';

const getSimpleLiteral = predicate =>  (data, label, defaultValue) => {
    
    const value = data ? data.getLiteral(predicate) : defaultValue;

    return ({
        label,
        value
    })
};

const getHolesField = doc => (data, label, defaultValue) => {

    let value = defaultValue;

    if(data) {

        const holeIds = data.getAllRefs(golf.properties.courseHoles);
        const holeRefs = holeIds.map(id => doc.getSubject(id));
        const holes = holeRefs.map(parseFields(holeShape, doc));
        value = holes;
    }

    return({
        label,
        value
    }) ;
}

const getClubField = predicate => (data, fieldPredicate, clubTypes, clubType) => {

    const label = clubType.fields[fieldPredicate].field.label;
    const clubQuads = data.getTriples();
    const displayField = clubQuads.find(quad => quad.predicate.value === predicate);

    const value = clubTypes.find(item => item.iri === displayField.object.value);
    
    return ({
        label,
        value
    });
};

const getFieldTypeData = {
    [golf.types.string]: getSimpleLiteral,
    [golf.types.nonNegativeInteger]: getSimpleLiteral,
    [golf.types.text]: getSimpleLiteral,
    [golf.types.integer]: getSimpleLiteral,
    [golf.classes.Hole]: getHolesField,
    [golf.classes.Club]: getClubField
}

const getFieldData = (shape, doc, data, ...rest) => field => {

    const {
        label,
        prefix: fieldPrefix,
        predicate: fieldPredicate,
        type: fieldType,
        value: fieldValue
    } = field;

    const prefix = shape['@context'][fieldPrefix];
    const predicate = `${prefix}${fieldPredicate}`;

    let fieldData;

    switch(fieldType) {

        case golf.types.string:
        case golf.types.nonNegativeInteger:
        case golf.types.integer:
        case golf.types.text: {

            fieldData = getFieldTypeData[fieldType](predicate)(data, label, fieldValue);

            break;
        }

        case golf.classes.Club: {

            const [clubTypes, clubType] = rest;

            fieldData = getFieldTypeData[fieldType](predicate)(data, fieldPredicate, clubTypes, clubType);

            break;
        }

        case golf.classes.Hole: {

            fieldData = getFieldTypeData[fieldType](doc)(data,fieldValue);

            break;
        }

        case golf.classes.Player: {
            
            fieldData = {
                label:'me',
                value: 'me'
            }

            break;
        }

        default: {
            fieldData = 'error';
            console.error('no field type', field)
        }
    }
    
    return {
        fieldType,
        fieldName: field.predicate,
        iri: predicate,
        field: {
            ...fieldData
        }
    };
};

const parseFields = (dataShape, doc, ...rest) => item => {
            
    const fields = dataShape.shape.reduce((acc, field) => {
        
        const data = getFieldData(dataShape, doc, item, ...rest)(field);
        const newAcc = {
            ...acc,
            [field.predicate]: data
        }
        
        return newAcc;
        
    }, {});

    const newItem = {
        fields,
        iri: item ? item.asNodeRef() : ''
    };

    return newItem;
}

export default parseFields;
