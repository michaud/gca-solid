import playerShape from '@contexts/player-shape.json';
import golf from '@utils/golf-namespace';
import { rdf } from 'rdf-namespaces';

const saveMarker = async (marker, doc) => {
    
    let markerRef;

    if(marker.iri) {

        markerRef = doc.getSubject(marker.iri);

    } else {

        markerRef = doc.addSubject();
        markerRef.addRef(rdf.type, golf.classes.Marker);
    }

    playerShape.shape.forEach(field => {

        const prefix = playerShape['@context'][field.prefix];
        const predicate = `${prefix}${field.predicate}`;

        switch(field.type) {

            case golf.types.text: {

                markerRef.setLiteral(predicate, marker.fields[field.predicate].field.value);

                break;
            }

            case golf.types.integer: {

                markerRef.setLiteral(predicate, parseInt(marker.fields[field.predicate].field.value));

                break;
            }
    
            default: {
                console.error('wrong field')
            }
        }
    });

    await doc.save();
};

export default saveMarker;
