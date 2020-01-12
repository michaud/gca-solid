import golf from '@utils/golf-namespace';
import holeShape from '@contexts/hole-shape.json';
import courseShape from '@contexts/course-shape.json';
import markerShape from '@contexts/marker-shape.json';
import playerShape from '@contexts/player-shape.json';
import clubShape from '@contexts/club-shape.json';

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
        const holes = holeRefs.map(parseFields(holeShape, doc))
            .sort((a,b) => a.fields.holeNumber.field.value - b.fields.holeNumber.field.value);
        value = holes;
    }

    return({
        label,
        value
    }) ;
}

const getBagField = doc => (data, label, clubTypes, clubType) => {

    const bagId = data.getAllRefs(golf.properties.gameBag)[0];
    const bagRef = doc.getSubject(bagId);
    const clubIds = bagRef.getAllRefs(golf.properties.clubs);
    const clubRefs = clubIds.map(id => doc.getSubject(id));
    const parse = parseFields(clubShape, doc, clubTypes, clubType);
    const clubs = clubRefs.map(club => parse(club));

    return ({
        label,
        value: clubs
    });
};

const getPlayerField = doc => (data, label, defaultValue) => {

    let value = defaultValue;

    const playerIds = data.getAllRefs(golf.properties.gamePlayer);
    const playerRef = doc.getSubject(playerIds[0]);

    value = parseFields(playerShape, doc)(playerRef);

    return ({
        label,
        value
    });
};

const getMarkerField = doc => (data, label, defaultValue) => {

    let value = defaultValue;

    const markerIds = data.getAllRefs(golf.properties.gameMarker);
    const markerRef = doc.getSubject(markerIds[0]);

    value = parseFields(markerShape, doc)(markerRef);

    return ({
        label,
        value
    });
};

const getCourseField = doc => (data, label, defaultValue) => {

    let value = defaultValue;

    const courseIds = data.getAllRefs(golf.properties.gameCourse);
    const courseRef = doc.getSubject(courseIds[0]);

    value = parseFields(courseShape, doc)(courseRef);

    return ({
        label,
        value
    });
};

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

const getOwnerField = doc => (data, label, defaultValue) => {

    let value = defaultValue;

    const ownerIds = data.getAllRefs(golf.properties.gameOwner);
    const ownerRef = doc.getSubject(ownerIds[0]);

    value = parseFields(playerShape, doc)(ownerRef);

    return ({
        label,
        value
    });
};

const getGamePlayingHandicapField = doc => (data, label, defaultValue) => {

    const value = '';

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
    [golf.types.dateTime]: getSimpleLiteral,
    [golf.classes.Hole]: getHolesField,
    [golf.classes.Club]: getClubField,
    [golf.classes.Bag]: getBagField,
    [golf.classes.Player]: getPlayerField,
    [golf.classes.Owner]: getOwnerField,
    [golf.classes.Marker]: getMarkerField,
    [golf.classes.Course]: getCourseField,
    [golf.classes.GamePlayingHandicap]: getGamePlayingHandicapField,
};

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
        case golf.types.dateTime:
        case golf.types.text: {

            fieldData = getFieldTypeData[fieldType](predicate)(data, label, fieldValue);

            break;
        }

        case golf.classes.Club: {

            const [clubTypes, clubType] = rest;

            fieldData = getFieldTypeData[fieldType](predicate)(data, fieldPredicate, clubTypes, clubType);

            break;
        }

        case golf.classes.Bag: {

            const [clubTypes, clubType] = rest;

            if(predicate === golf.properties.gameBag) {

                fieldData = getFieldTypeData[fieldType](doc)(data, fieldPredicate, clubTypes, clubType);

            } else {
                
                fieldData = getFieldTypeData[fieldType](predicate)(data, fieldPredicate, clubTypes, clubType);
            }

            break;
        }

        case golf.classes.Hole:
        case golf.classes.Marker:
        case golf.classes.Course: {

            fieldData = getFieldTypeData[fieldType](doc)(data, fieldValue);

            break;
        }

        case golf.classes.Game: {

            fieldData = getFieldTypeData[fieldType](doc)(data, fieldValue);

            break;
        }

        case golf.classes.Owner: {

            fieldData = getFieldTypeData[fieldType](doc)(data, fieldValue);
            break;
        }

        case golf.classes.GamePlayingHandicap: {

            fieldData = getFieldTypeData[fieldType](doc)(data, fieldValue);

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
