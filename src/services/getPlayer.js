import { namedNode } from '@rdfjs/data-model';//, literal, quad
import * as ns from 'rdf-namespaces';

import golf from '@utils/golf-namespace';
import playerShape from '@contexts/player-shape.json';

const getFieldData = (field, player) => {

    const prefix = playerShape['@context'][field.prefix];
    const predicate = `${prefix}${field.predicate}`;
    
    let value = '';

    switch(field.type) {

        case golf.types.string: {

            value = player ? player.getLiteral(predicate) : field.value;

            break;
        }

        case golf.types.text: {

            value = player ? player.getLiteral(predicate) : field.value;

            break;
        }

        case golf.types.integer: {

            value = player ? player.getLiteral(predicate) : field.value;

            break;
        }

        default: {
            value = 'error';
            console.error('no field type', field)
        }
    }
    
    const newField = {
        fieldType: field.type,
        fieldName: field.predicate,
        iri: predicate,
        field: {
            value,
            label: field.label
        }
    };

    return newField;
};

const getPlayer = (doc, type) => {

    const player = doc ? doc
    .findSubject(ns.rdf.type, namedNode(type))
    : undefined;

    const playerFields = playerShape.shape.reduce((acc, field) => {
        
        const data = getFieldData(field, player);
        const newAcc = {
            ...acc,
            [field.predicate]: data
        };
        
        return newAcc;
        
    }, {});

    const newPlayer = {
        fields: playerFields,
        iri: player ? player.asNodeRef() : ''
    };

    return newPlayer;
};

export default getPlayer;
