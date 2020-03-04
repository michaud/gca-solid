import golf from '@golfutils/golf-namespace';
import getFieldTypeData from '@golfutils/parseData/getFieldTypeData';

const getFieldData = (shape, doc, data, ...rest) => field => {

    const {
        label,
        prefix: fieldPrefix,
        predicate: fieldPredicate,
        type,
        required,
        value: fieldValue
    } = field;

    const prefix = shape['@context'][fieldPrefix];
    const predicate = `${prefix}${fieldPredicate}`;

    let fieldData;

    switch(type) {

        case golf.types.string:
        case golf.types.nonNegativeInteger:
        case golf.types.integer:
        case golf.types.dateTime:
        case golf.types.double:
        case golf.types.text: {

            fieldData = getFieldTypeData[type](predicate)(data, label, fieldValue);

            break;
        }

        case golf.classes.Stroke: {
            
            const [clubTypes, clubType] = rest;

            fieldData = getFieldTypeData[type](doc)(data, label, fieldValue, clubTypes, clubType);

            break;
        }

        case golf.classes.Club: {

            const [clubTypes, clubType, clubListData] = rest;

            if(predicate === golf.properties.strokeClub) {

                fieldData = getFieldTypeData[predicate](doc)(data, label, clubTypes, clubType);

            } else if(predicate === golf.properties.clubs) {

                fieldData = getFieldTypeData[predicate](doc)(data, label, clubListData);

            } else {

                fieldData = getFieldTypeData[type](predicate)(data, fieldPredicate, clubTypes, clubType);
            }

            break;
        }

        case golf.classes.Bag: {

            const [clubTypes, clubType, clubListData] = rest;

            if(predicate === golf.properties.gameBag) {

                fieldData = getFieldTypeData[type](doc)(data, label, clubTypes, clubType, clubListData);

            } else {
                
                fieldData = getFieldTypeData[type](predicate)(data, label, clubTypes, clubType, clubListData);
            }

            break;
        }
        case golf.classes.Course: {


            if(predicate === golf.properties.gameCourse) {

                const [clubTypes, clubType] = rest;

                fieldData = getFieldTypeData[golf.properties.gameCourse](doc)(data, label, fieldValue, clubTypes, clubType);

            } else {

                fieldData = getFieldTypeData[type](doc)(data, label, fieldValue);
            }

            break;
        }

        case golf.classes.Hole: {

            const [parentFieldType, clubTypes = [], clubType] = rest;

            //holes of a game course
            if(predicate === golf.properties.courseHoles && parentFieldType === golf.properties.gameCourse) {

                fieldData = getFieldTypeData[type](doc)(data, label, fieldValue, parentFieldType, clubTypes, clubType);

            } else {

                fieldData = getFieldTypeData[type](doc)(data, label, fieldValue);
            }

            break;
        }

        case golf.classes.Marker:
        case golf.classes.Player:
        case golf.classes.GamePlayingHandicap: {

            fieldData = getFieldTypeData[type](doc)(data, label, fieldValue);

            break;
        }

        case golf.types.GeoCoordinates : {

            fieldData = getFieldTypeData[type](doc)(data, label, fieldValue);

            break;
        }

        default: {

            fieldData = 'error';
            console.error('no field type', field)
        }
    }

    return required === undefined ? ({
        type,
        predicate: field.predicate,
        iri: predicate,
        ...fieldData
    }) : ({
        type,
        predicate: field.predicate,
        iri: predicate,
        required,
        ...fieldData
    });
};

export default getFieldData;
