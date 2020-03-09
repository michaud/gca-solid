import { rdf } from 'rdf-namespaces';
import ulog from 'ulog';

import courseShape from '@golfcontexts/course-shape.json';
import golf from "@golfconstants/golf-namespace";
import saveElement from '@golfservices/saveElement';

const log = ulog('addField');

export const addField = ({
    field,
    shape,
    data,
    element,
    ref,
    doc
}) => {

    const prefix = shape['@context'][field.prefix];
    const predicate = `${prefix}${field.predicate}`;

    switch(field.type) {

        case golf.types.text : {

            ref.addLiteral(predicate, data.value);

            break;
        }

        case golf.types.integer : {

            ref.addLiteral(predicate, parseInt(data.value));

            break;
        }

        case golf.types.string : {

            ref.addLiteral(predicate, data.value);

            break;
        }

        case golf.types.double : {

            ref.addLiteral(predicate, data.value || 0);

            break;
        }

        case golf.types.dateTime : {

            ref.addLiteral(predicate, data.value);

            break;
        }

        case golf.types.nonNegativeInteger : {

            ref.addLiteral(predicate, parseInt(data.value));

            break;
        }

        case golf.classes.Club: {

            if(predicate === golf.properties.clubType) {

                ref.addRef(golf.properties.clubType, data.value.iri);
            }
            if(predicate === golf.properties.strokeClub) {

                ref.addRef(golf.properties.strokeClub, data.value.iri);
            }
            
            break;
        }

        case golf.classes.Bag : {

            const bagRef = doc.addSubject();
            bagRef.addRef(rdf.type, golf.classes.Bag);

            const bag = data.value;

            bag.clubs.value.forEach(club => {
                
                const elRef = saveElement({
                    element: club,
                    doc,
                    type: golf.classes.Club
                })
            
                bagRef.addRef(golf.properties.clubs, elRef.asRef());
            });

            ref.addRef(golf.properties.gameBag, bagRef.asRef());

            break;
        }

        case golf.classes.Course : {

            const course = data.value;
            const courseRef = doc.addSubject({ identifier: data.value.iri === '' ? undefined : data.value.iri.split('#')[1] });
            courseRef.addRef(rdf.type, golf.classes.Course);
            
            const holeType = field.predicate === "gameCourse" ? golf.classes.GameHole : golf.classes.Hole;

            courseShape.shape.forEach(field => {

                if(field.predicate === 'courseHoles') {

                    const holes = course.courseHoles.value;

                    holes.forEach(hole => {

                        const elRef = saveElement({
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

        case golf.classes.Marker : {

            const elRef = saveElement({
                element: data.value,
                doc,
                type: field.type
            })

            ref.addRef(golf.properties.gameMarker, elRef.asRef());

            break;
        }

        case golf.classes.Player : {

            const elRef = saveElement({
                element: data.value,
                doc,
                type: golf.classes.Player
            });

            ref.addRef(golf.properties.gamePlayer, elRef.asRef());

            break;
        }

        case golf.classes.Hole : {

            if(field.predicate === 'courseHoles') {

                const holes = data.value;
                    
                holes.forEach(hole => {

                    const elRef = saveElement({
                        element: hole,
                        doc,
                        type: field.type
                    })
        
                    ref.addRef(golf.properties.courseHoles, elRef.asRef());
                });
            }

            break;
        }

        case golf.classes.GamePlayingHandicap : {

            const elRef = saveElement({
                element: data.value,
                doc,
                type: field.type
            })

            ref.addRef(golf.properties.gamePlayingHandicap, elRef.asRef());

            break;
        }

        case golf.types.GeoCoordinates: {

            const elRef = saveElement({
                element: data.value,
                doc,
                type: field.type
            })

            ref.addRef(golf.properties.strokeLocation, elRef.asRef());

            break;
        }

        case golf.classes.Stroke : {

            break;
        }

        default : {

            log.error('do not know this field', field);

            break;
        }
    }
};
