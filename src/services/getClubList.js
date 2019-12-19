import { namedNode } from '@rdfjs/data-model';//, literal, quad
import * as ns from 'rdf-namespaces';

import golf from '@utils/golf-namespace';
import clubShape from '@contexts/club-shape.json';

const getFieldData = (field, club, clubTypes, clubType) => {

    const clubQuads = club.getTriples();
    const prefix = clubShape['@context'][field.prefix];
    const predicate = `${prefix}${field.predicate}`;

    const label = clubType.fields[field.predicate].field.label;
    const displayField = clubQuads.find(quad => quad.predicate.value === predicate);

    let value = '';

    switch(field.type) {

        case golf.types.string: {

            value = club.getLiteral(predicate);

            break;
        }
        
        case golf.classes.Player: {
            
            value = 'me';

            break;
        }

        case golf.classes.Club: {

            const type = clubTypes.find(item => item.iri === displayField.object.value);
            value = type;

            break;
        }

        default: {
            value = 'error';
            console.error('no field type', field)
        }
    }
    
    return {
        fieldType: field.type,
        fieldName: field.predicate,
        iri: predicate,
        field: {
            value,
            label
        }
    };
};


const getClubList = async (doc, clubTypes, clubType) => {

    const list = await doc
        .findSubjects(ns.rdf.type, namedNode(golf.classes.Club))
        .map(club => {

            const clubFields = clubShape.shape.reduce((acc, field) => {
                
                const data = getFieldData(field, club, clubTypes, clubType);
                const newAcc = {
                    ...acc,
                    [field.predicate]: data
                }
                
                return newAcc;
                
            }, {});

            const newClub = {
                fields: clubFields,
                iri: club.asNodeRef()
            };

            return newClub;
        });

    return list;
};

export default getClubList;
