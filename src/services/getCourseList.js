import { namedNode } from '@rdfjs/data-model';//, literal, quad
import * as ns from 'rdf-namespaces';

import golf from '@utils/golf-namespace';
import courseShape from '@contexts/course-shape.json';
import holeShape from '@contexts/hole-shape.json';

const getFieldData = (field, course, doc) => {

    const prefix = courseShape['@context'][field.prefix];
    const predicate = `${prefix}${field.predicate}`;

    const label = field.label;

    let value = '';

    switch(field.type) {

        case golf.types.string: {

            value = course.getLiteral(predicate);

            break;
        }
        
        case golf.types.nonNegativeInteger: {

            value = course.getLiteral(predicate);

            break;
        }

        case golf.classes.Hole: {

            const holeIds = course.getAllRefs('https://michaud.inrupt.net/public/golf/courseHoles');

            const holeRefs = holeIds.map(id => doc.getSubject(id));

            const holes = holeRefs.map(holeRef => {

                const fields = {};

                holeShape.shape.forEach(field => {

                    const prefix = holeShape['@context'][field.prefix];
                    const predicate = `${prefix}${field.predicate}`;
                
                    switch(field.type) {

                        case golf.types.string: {
                
                            value = holeRef.getLiteral(predicate);
                
                            break;
                        }

                        case golf.types.nonNegativeInteger : {
                
                            value = holeRef.getLiteral(predicate);
                
                            break;
                        }

                        default: {
                            value = 'error';
                            console.error('no field type', field)
                        }
                    }

                    fields[field.predicate] = {
                        field: {
                            label: field.label,
                            value
                        }
                    };
                });

                const hole = {
                    fields
                }

                return hole;
            });

            value = holes.length;

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


const getCourseList = (doc) => {

    const list = doc
        .findSubjects(ns.rdf.type, namedNode(golf.classes.Course))
        .map(course => {
            
            const courseFields = courseShape.shape.reduce((acc, field) => {
                
                const data = getFieldData(field, course, doc);
                const newAcc = {
                    ...acc,
                    [field.predicate]: data
                }
                
                return newAcc;
                
            }, {});

            const newCourse = {
                fields: courseFields,
                iri: course.asNodeRef()
            };

            return newCourse;
        });

    return list;
};

export default getCourseList;
