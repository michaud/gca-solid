import { rdf } from 'rdf-namespaces';

import golf from "@utils/golf-namespace";

import clubShape from '@contexts/club-shape.json';
import courseShape from '@contexts/course-shape.json';
import markerShape from '@contexts/marker-shape.json';
import playerShape from '@contexts/player-shape.json';
import holeShape from '@contexts/hole-shape.json';
import playingHandicapShape from '@contexts/playing-handicap-shape.json';

export const addField = (field, shape, data, ref, doc) => {

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
            
            break;
        }

        case golf.classes.Bag : {

            const bagRef = doc.addSubject();
            bagRef.addRef(rdf.type, golf.classes.Bag);

            const bag = data.value;

            bag.clubs.value.forEach(club => {
                
                const clubRef = doc.addSubject({
                    identifier: club.iri.split('#')[1]
                });

                clubRef.addRef(rdf.type, golf.classes.Club);

                clubShape.shape.forEach(field => {

                    addField(field, clubShape, club[field.predicate], clubRef, doc);
                });
            
                bagRef.addRef(golf.properties.clubs, clubRef.asRef());
            });

            ref.addRef(golf.properties.gameBag, bagRef.asRef());

            break;
        }

        case golf.classes.Course : {

            const courseRef = doc.addSubject();
            courseRef.addRef(rdf.type, golf.classes.Course);

            const course = data.value;

            courseShape.shape.forEach(field => {

                if(field.predicate === 'courseHoles') {

                    const holes = course.courseHoles.value;

                    holes.forEach(hole => {

                        const holeRef = doc.addSubject();
                        holeRef.addRef(rdf.type, golf.classes.Hole);

                        holeShape.shape.forEach(field => {

                            addField(field, holeShape, hole[field.predicate], holeRef, doc);
                        })
            
                        courseRef.addRef(golf.properties.courseHoles, holeRef.asRef());

                    });

                } else {

                    addField(field, courseShape, course[field.predicate], courseRef, doc);
                }
            });

            ref.addRef(golf.properties.gameCourse, courseRef.asRef());

            break;
        }

        case golf.classes.Marker : {

            const markerRef = doc.addSubject();
            markerRef.addRef(rdf.type, golf.classes.Marker);

            const marker = data.value;

            markerShape.shape.forEach(field => {
        
                addField(field, markerShape, marker[field.predicate], markerRef, doc);
            });

            ref.addRef(golf.properties.gameMarker, markerRef.asRef());

            break;
        }

        case golf.classes.Player : {

            const playerRef = doc.addSubject();
            playerRef.addRef(rdf.type, golf.classes.Player);

            const player = data.value;

            playerShape.shape.forEach(field => {

                addField(field, playerShape, player[field.predicate], playerRef, doc);
            });

            ref.addRef(golf.properties.gamePlayer, playerRef.asRef());

            break;
        }

        case golf.classes.Hole : {

            if(field.predicate === 'courseHoles') {

                const holes = data.value;
                    
                holes.forEach(hole => {

                    const holeRef = doc.addSubject();
                    holeRef.addRef(rdf.type, golf.classes.Hole);

                    holeShape.shape.forEach(field => {

                        addField(field, holeShape, hole[field.predicate], holeRef, doc);
                    })
        
                    ref.addRef(golf.properties.courseHoles, holeRef.asRef());
                });
            }

            break;
        }

        case golf.classes.GamePlayingHandicap : {

            const playingHandicapRef = doc.addSubject();
            playingHandicapRef.addRef(rdf.type, golf.classes.GamePlayingHandicap);

            const playingHandicap = data.value;

            playingHandicapShape.shape.forEach(field => {

                addField(field, playingHandicapShape, playingHandicap[field.predicate], playingHandicapRef, doc);
            })

            ref.addRef(golf.properties.gamePlayingHandicap, playingHandicapRef.asRef());

            break;
        }

        default : {

            console.error('no field defined', field);

            break;
        }
    }
};
