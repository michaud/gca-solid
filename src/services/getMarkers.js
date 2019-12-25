import { namedNode } from '@rdfjs/data-model';//, literal, quad
import * as ns from 'rdf-namespaces';

import golf from '@utils/golf-namespace';
import markerShape from '@contexts/marker-shape.json';

const getFieldData = (field, marker) => {

    const prefix = markerShape['@context'][field.prefix];
    const predicate = `${prefix}${field.predicate}`;
    
    let value = '';

    switch(field.type) {

        case golf.types.string: {

            value = marker ? marker.getLiteral(predicate) : field.value;

            break;
        }

        case golf.types.text: {

            value = marker ? marker.getLiteral(predicate) : field.value;

            break;
        }

        case golf.types.integer: {

            value = marker ? marker.getLiteral(predicate) : field.value;

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

const getMarkers = async (doc) => {

    const markers = await doc
    .findSubjects(ns.rdf.type, namedNode(golf.classes.Marker)).map(marker => {

        const markerFields = markerShape.shape.reduce((acc, field) => {
            
            const data = getFieldData(field, marker);
            const newAcc = {
                ...acc,
                [field.predicate]: data
            }
            
            return newAcc;
            
        }, {});

        const newMarker = {
            fields: markerFields,
            iri: marker ? marker.asNodeRef() : ''
        };

        return newMarker;
    });

    console.log('markers: ', markers);
    return markers;
};

export default getMarkers;
