import golf from "@golfutils/golf-namespace";
import saveResource from "@golfservices/saveResource";
import { rdf } from 'rdf-namespaces';
import courseShape from '@golfcontexts/course-shape.json';
import { addField } from "./addField";
import { namedNode } from "@rdfjs/data-model";

export const setField = ({ field, shape, data, element, ref, doc }) => {
    console.log('field: ', field);
    console.log('shape: ', shape);
    console.log('data: ', data);
    console.log('element: ', element);
    console.log('ref: ', ref);
    console.log('doc: ', doc);


    const prefix = shape['@context'][field.prefix];
    const predicate = `${prefix}${field.predicate}`;

    switch(field.type) {

        case golf.types.text : {

            ref.setLiteral(predicate, data.value);

            break;
        }

        case golf.types.integer : {

            ref.setLiteral(predicate, parseInt(data.value));

            break;
        }

        case golf.types.double : {
            //TODO flesh out the complete shape of the geocoordinate fields in setupobject i think
            ref.setLiteral(predicate, data);

            break;
        }

        case golf.types.string: {

            ref.setLiteral(predicate, data.value);

            break;
        }

        case golf.types.nonNegativeInteger : {

            const value = data === undefined ? field.value : data.value;

            ref.setLiteral(predicate, parseInt(value));

            break;
        }

        case golf.types.dateTime: {

            console.log('setfield implement golf.types.dateTime');

            break;
        }

        case golf.classes.Club: {

            ref.setRef(predicate, data.value.iri);
            
            break;
        }

        case golf.classes.Stroke: {

            if(predicate === golf.properties.gameStrokes && data) {

                data.value.forEach(stroke => {

                    let iri = stroke.iri;

                    if(stroke.iri === '') {

                        const elRef = saveResource({
                            element: stroke,
                            doc,
                            type: field.type
                        })

                        iri = elRef.asRef();
                        //setting the iri prevents the code from seeing the current stroke as a new stroke when 
                        //it has been saved to the server with the iri 
                        stroke.iri = iri;

                        ref.addRef(golf.properties.gameStrokes, iri);
                    }

                });
            }

            break;
        }

        case golf.classes.Hole: {

            if(predicate === golf.properties.courseHoles && data) {

                data.value.forEach(hole => {

                    let iri = hole.iri;

                    if(hole.iri === '') {

                        const elRef = saveResource({
                            element: hole,
                            doc,
                            type: field.type
                        })

                        iri = elRef.asRef();
                        //setting the iri prevents the code from seeing the current hole as a new hole when 
                        //it has been saved to the server with the iri 
                        hole.iri = iri;

                        ref.addRef(golf.properties.courseHoles, iri);

                    } else {

                        saveResource({
                            element: hole,
                            doc,
                            type: field.type
                        })
                    }
                });
            }

            break;
        }

        case golf.classes.Course: {

            const oldCourse = doc.getSubjectsOfType(golf.classes.Course)[0];
            const holes = oldCourse.getAllRefs(golf.properties.courseHoles);

            holes.map(hole => doc.removeSubject(hole));
            doc.removeSubject(oldCourse.asRef());

            const course = data.value;
            const courseRef = doc.addSubject({ identifier: data.value.iri === '' ? undefined : data.value.iri.split('#')[1] });
            courseRef.addRef(rdf.type, golf.classes.Course);
            
            const holeType = field.predicate === "gameCourse" ? golf.classes.GameHole : golf.classes.Hole;

            courseShape.shape.forEach(field => {

                if(field.predicate === 'courseHoles') {

                    const holes = course.courseHoles.value;

                    holes.forEach(hole => {

                        const elRef = saveResource({
                            element: hole,
                            doc,
                            type: holeType
                        })
        
                        courseRef.addRef(golf.properties.courseHoles, elRef.asRef());
                    });

                } else {
                    
                    addField({
                        field,
                        shape: courseShape,
                        data: course[field.predicate],
                        ref: courseRef,
                        doc
                    });
                }
            });

            ref.addRef(golf.properties.gameCourse, courseRef.asRef());

            break;
        }

        case golf.classes.Player: {

            console.log('setfield implement golf.classes.Player');

            break;
        }

        case golf.classes.Marker: {

            const oldMarker = ref.getRef(golf.properties.gameMarker);
            doc.removeSubject(oldMarker);

            const elRef = saveResource({
                element: data.value,
                doc,
                type: field.type
            })

            ref.setRef(golf.properties.gameMarker, elRef.asRef());

            break;
        }

        case golf.classes.Bag: {

            const oldBagRef = ref.getRef(golf.properties.gameBag);
            const oldClubs = doc.getSubject(oldBagRef).getAllRefs(golf.properties.clubs);
            
            oldClubs.map(item => doc.removeSubject(item));
            doc.removeSubject(oldBagRef);

            const bagRef = doc.addSubject();
            bagRef.addRef(rdf.type, golf.classes.Bag);

            const bag = data.value;

            bag.clubs.value.forEach(club => {
                
                const elRef = saveResource({
                    element: club,
                    doc,
                    type: golf.classes.Club
                })
            
                bagRef.addRef(golf.properties.clubs, elRef.asRef());
            });

            const newBagRef = bagRef.asRef();
            ref.setRef(golf.properties.gameBag, namedNode(newBagRef));

            break;
        }

        case golf.classes.GamePlayingHandicap: {

            const oldGamePlayingHandicapRef = ref.getRef(golf.properties.gamePlayingHandicap);
            doc.removeSubject(oldGamePlayingHandicapRef);

            const gamePlayingHandicapRef = saveResource({
                element: data.value,
                doc,
                type: golf.classes.GamePlayingHandicap
            })

            ref.addRef(golf.properties.gameBag, gamePlayingHandicapRef.asRef());

            break;
        }

        default : {

            console.error('setField: no field defined', field);

            break;
        }
    }
};
