import { useState, useEffect } from 'react';
import { solid, rdf } from 'rdf-namespaces';
import usePublicTypeIndex from './usePublicTypeIndex';
import golf from '@utils/golf-namespace';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import playerShape from '@contexts/player-shape.json';
import getMarkers from '@services/getMarkers';
import fetchMarkers from '@services/fetchMarkers';

const addField = (field, ref) => {

    const iri = `${ playerShape['@context'][field.prefix] }${ field.predicate }`;

    switch(field.type) {

        case golf.types.text : {

            ref.addLiteral(iri, field.value);

            break;
        }

        case golf.types.integer: {

            ref.addLiteral(iri, field.value);

            break;
        }

        default : {

            break;
        }
    }
};

const setupPlayer = (document) => {

    const player = document.addSubject();
    player.addRef(rdf.type, golf.classes.Player);

    for(const shape in playerShape.shape) {

        addField(playerShape.shape[shape], player);
    }

    return document;
};

const useMarkers = (dirty) => {

    const publicTypeIndex = usePublicTypeIndex();
    const [markers, setMarkers] = useState({ player: undefined, doc: undefined });

    useEffect(() => {

        if (publicTypeIndex) {

            (async () => {

                const markersIndex = publicTypeIndex.findSubject(solid.forClass, golf.classes.Player);

                if (!markersIndex) {

                    // If no player document is listed in the public type index, create one:
                    const doc = await initialiseTypeDocument(
                        golf.classes.Marker,
                        process.env.REACT_APP_GOLF_PATH + 'markers.ttl'//,setupPlayer
                    );

                    if (doc === null) return;
                    
                    setMarkers(state => ({
                        ...state,
                        doc
                    }));

                    return;

                } else {

                    const markersUrl = markersIndex.getRef(solid.instance);

                    if (typeof markersUrl !== 'string') return;

                    const markersDoc = await fetchMarkers(markersUrl);
                    console.log('markersDoc: ', markersDoc);
                    const markersData = await getMarkers(markersDoc);

                    setMarkers({ markers: markersData, doc: markersDoc });
                }
            })();
        }
    }, [publicTypeIndex, dirty]);

    return markers;
};

export default useMarkers;
