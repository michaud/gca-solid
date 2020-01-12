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

            ref.addLiteral(predicate, data.field.value);

            break;
        }

        case golf.types.integer : {

            ref.addLiteral(predicate, parseInt(data.field.value));

            break;
        }

        case golf.types.string : {

            ref.addLiteral(predicate, data.field.value);

            break;
        }

        case golf.types.dateTime : {

            ref.addLiteral(predicate, data.field.value);

            break;
        }

        case golf.types.nonNegativeInteger : {

            ref.addLiteral(predicate, parseInt(data.field.value));

            break;
        }

        case golf.classes.Club: {

            if(predicate === golf.properties.clubType) {

                ref.addRef(golf.properties.clubType, data.field.value.iri);
            }
            
            break;
        }

        case golf.classes.Owner: {

            if(predicate === golf.properties.ownedBy) {
            debugger
//            ref.addRef(golf.properties.ownedBy, data.field.value);
            ref.addRef(golf.properties.ownedBy, 'me');
            }

            break;
        }

        // case golf.classes.Owner : {

        //     const newOwner = doc.addSubject();
        //     newOwner.addRef(rdf.type, golf.classes.Owner);

        //     const owner = field.field.value;

        //     for(const field in owner.fields) {
        
        //         addField(owner.fields[field], newOwner, doc);
        //     }

        //     ref.addRef(golf.properties.ownedBy, newOwner.asRef());

        //     break;
        // }

        case golf.classes.Bag : {

            const bagRef = doc.addSubject();
            bagRef.addRef(rdf.type, golf.classes.Bag);
        
            data.field.value.clubs.forEach(club => {
                
                const clubRef = doc.addSubject({
                    identifier: club.iri.split('#')[1]
                });

                clubRef.addRef(rdf.type, golf.classes.Club);

                clubShape.shape.forEach(field => {

                    addField(field, clubShape, club.fields[field.predicate], clubRef, doc);
                });
            
                bagRef.addRef(golf.properties.clubs, clubRef.asRef());
            });

            ref.addRef(golf.properties.gameBag, bagRef.asRef());

            break;
        }

        case golf.classes.Course : {

            const courseRef = doc.addSubject();
            courseRef.addRef(rdf.type, golf.classes.Course);
        
            const course = data.field.value;

            courseShape.shape.forEach(field => {

                if(field.predicate === 'courseHoles') {

                    course.fields.courseHoles.field.value.forEach(hole => {

                        const holeRef = doc.addSubject();
                        holeRef.addRef(rdf.type, golf.classes.Hole);

                        holeShape.shape.forEach(field => {

                            addField(field, holeShape, hole.fields[field.predicate], holeRef, doc);
                        })
            
                        courseRef.addRef(golf.properties.courseHoles, holeRef.asRef());

                    });

                } else {

                    addField(field, courseShape, course.fields[field.predicate], courseRef, doc);
                }
            });

            ref.addRef(golf.properties.gameCourse, courseRef.asRef());

            break;
        }

        case golf.classes.Marker : {

            const markerRef = doc.addSubject();
            markerRef.addRef(rdf.type, golf.classes.Marker);

            const marker = data.field.value;

            markerShape.shape.forEach(field => {
        
                addField(field, markerShape, marker.fields[field.predicate], markerRef, doc);
            });

            ref.addRef(golf.properties.gameMarker, markerRef.asRef());

            break;
        }

        case golf.classes.Player : {

            const playerRef = doc.addSubject();
            playerRef.addRef(rdf.type, golf.classes.Player);

            const player = data.field.value;

            playerShape.shape.forEach(field => {

                addField(field, playerShape, player.fields[field.predicate], playerRef, doc);
            });

            ref.addRef(golf.properties.gamePlayer, playerRef.asRef());

            break;
        }

        case golf.classes.Hole : {

            const holeRef = doc.addSubject();
            holeRef.addRef(rdf.type, golf.classes.Hole);

            const hole = data.field.value;

            holeShape.shape.forEach(field => {

                addField(field, holeShape, hole.fields[field.predicate], holeRef, doc);
            });

            ref.addRef(golf.properties.courseHoles, holeRef.asRef());

            break;
        }

        case golf.classes.GamePlayingHandicap : {

            const playingHandicapRef = doc.addSubject();
            playingHandicapRef.addRef(rdf.type, golf.classes.GamePlayingHandicap);

            const playingHandicap = data.field.value;

            playingHandicapShape.shape.forEach(field => {

                addField(field, playingHandicapShape, playingHandicap.fields[field.predicate], playingHandicapRef, doc);
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
