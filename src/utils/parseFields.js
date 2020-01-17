import golf from '@utils/golf-namespace';
import holeShape from '@contexts/hole-shape.json';
import courseShape from '@contexts/course-shape.json';
import markerShape from '@contexts/marker-shape.json';
import playerShape from '@contexts/player-shape.json';
import clubShape from '@contexts/club-shape.json';
import bagShape from '@contexts/bag-shape.json';
import gameHoleShape from '@contexts/game-hole-shape.json';
import strokeShape from '@contexts/stroke-shape.json';

const getSimpleLiteral = predicate =>  (data, label, defaultValue) => {
    
    const value = data ? data.getLiteral(predicate) : defaultValue;

    return ({
        label,
        value
    })
};

const getHolesField = doc => (data, label, defaultValue, parentField) => {

    let value = defaultValue;

    if(data) {

        const shape = parentField && parentField === golf.properties.gameCourse ? gameHoleShape : holeShape;
        const holeIds = data.getAllRefs(golf.properties.courseHoles);
        const holeRefs = holeIds.map(id => doc.getSubject(id));
        const holes = holeRefs.map(parseFields(shape, doc))
            .sort((a,b) => a.holeNumber.value - b.holeNumber.value);
        value = holes;
    }

    return ({
        label,
        value
    }) ;
}

const getBagField = doc => (data, label, clubTypes, clubType) => {
    
    const bagId = data.getAllRefs(golf.properties.gameBag)[0];
    const bagRef = doc.getSubject(bagId);

    const value = parseFields(bagShape, doc, clubTypes, clubType)(bagRef);

    return ({
        label,
        value
    });
};

const getClubsField = doc => (data, label, clubTypes, clubType) => {

    const clubIds = data.getAllRefs(golf.properties.clubs);
    const clubRefs = clubIds.map(id => doc.getSubject(id));
    const parse = parseFields(clubShape, doc, clubTypes, clubType);

    const value = clubRefs.map(club => parse(club));

    return ({
        label,
        value
    });
};

const getClubField = predicate => (data, fieldPredicate, clubTypes, clubType) => {

    const label = clubType[fieldPredicate].label;
    const clubQuads = data.getTriples();
    const displayField = clubQuads.find(quad => quad.predicate.value === predicate);

    const value = clubTypes.find(item => item.iri === displayField.object.value);
    
    return ({
        label,
        value
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

const getGameCourseField = doc => (data, label, defaultValue) => {

    let value = defaultValue;

    const courseIds = data.getAllRefs(golf.properties.gameCourse);
    const courseRef = doc.getSubject(courseIds[0]);

    value = parseFields(courseShape, doc, golf.properties.gameCourse)(courseRef);

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

const getStrokesField = doc => (data, label, defaultValue) => {

    const ids = data.getAllRefs(golf.classes.Stroke);
    const strokeRefs = ids.map(id => doc.getSubject(id));
    const parse = parseFields(strokeShape, doc);

    const value = strokeRefs.map(stroke => parse(stroke));

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
    [golf.classes.Marker]: getMarkerField,
    [golf.classes.Course]: getCourseField,
    [golf.classes.Stroke]: getStrokesField,
    [golf.classes.GamePlayingHandicap]: getGamePlayingHandicapField,
    [golf.properties.clubs]: getClubsField,
    [golf.properties.gameCourse]: getGameCourseField,
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

        case golf.classes.Stroke: {


            fieldData = getFieldTypeData[fieldType](predicate)(data, label, fieldValue);

            break;
        }

        case golf.classes.Club: {

            const [clubTypes, clubType] = rest;

            if(predicate === golf.properties.clubs) {

                fieldData = getFieldTypeData[predicate](doc)(data, label, clubTypes, clubType);

            } else {

                fieldData = getFieldTypeData[fieldType](predicate)(data, fieldPredicate, clubTypes, clubType);
            }

            break;
        }

        case golf.classes.Bag: {

            const [clubTypes, clubType] = rest;

            if(predicate === golf.properties.gameBag) {

                fieldData = getFieldTypeData[fieldType](doc)(data, label, clubTypes, clubType);

            } else {
                
                fieldData = getFieldTypeData[fieldType](predicate)(data, label, clubTypes, clubType);
            }

            break;
        }
        case golf.classes.Course: {

            if(predicate === golf.properties.gameCourse) {

                fieldData = getFieldTypeData[golf.properties.gameCourse](doc)(data, label, fieldValue);

            } else {

                fieldData = getFieldTypeData[fieldType](doc)(data, label, fieldValue);
            }

            break;
        }

        case golf.classes.Hole: {

            const [parentFieldType] = rest;

            if(predicate === golf.properties.courseHoles && parentFieldType === golf.properties.gameCourse) {

                fieldData = getFieldTypeData[fieldType](doc)(data, label, fieldValue, parentFieldType);

            } else {

                fieldData = getFieldTypeData[fieldType](doc)(data, label, fieldValue);
            }

            break;
        }

        case golf.classes.Marker:
        case golf.classes.Player:
        case golf.classes.GamePlayingHandicap: {

            fieldData = getFieldTypeData[fieldType](doc)(data, label, fieldValue);

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
        ...fieldData
    };
};

const parseFields = (dataShape, doc, ...rest) => item => {
            
    const fieldData = dataShape.shape.reduce((acc, field) => {
        
        const data = getFieldData(dataShape, doc, item, ...rest)(field);
        const newAcc = {
            ...acc,
            [field.predicate]: data
        }
        
        return newAcc;
        
    }, {});

    const newItem = {
        ...fieldData,
        iri: item ? item.asNodeRef() : ''
    };

    return newItem;
}

export default parseFields;
