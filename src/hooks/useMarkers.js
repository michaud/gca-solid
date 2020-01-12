import { useState, useEffect } from 'react';
import { solid } from 'rdf-namespaces';
import usePublicTypeIndex from './usePublicTypeIndex';
import golf from '@utils/golf-namespace';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import { fetchDocument } from 'tripledoc';
import markerShape from '@contexts/marker-shape.json';
import getListFromDoc from '@services/getListFromDoc';

const useMarkers = (reload) => {

    const publicTypeIndex = usePublicTypeIndex();
    const [markers, setMarkers] = useState({ markers: [], doc: undefined });

    useEffect(() => {

        if (publicTypeIndex || reload) {

            (async () => {

                const markersIndex = publicTypeIndex.findSubject(solid.forClass, golf.classes.Marker);

                if (!markersIndex) {

                    // If no player document is listed in the public type index, create one:
                    const doc = await initialiseTypeDocument(
                        golf.classes.Marker,
                        process.env.REACT_APP_GOLF_DATA_PATH + 'markers.ttl'//,setupPlayer
                    );

                    if (doc === null) return;
                    
                    setMarkers(state => ({
                        ...state,
                        doc
                    }));

                    return;

                } else {

                    const url = markersIndex.getRef(solid.instance);

                    if (typeof url !== 'string') return;

                    const doc = await fetchDocument(url);
                    const list = await getListFromDoc(
                        doc,
                        golf.classes.Marker,
                        markerShape
                    );

                    setMarkers({ list, doc });
                }
            })();
        }
    }, [publicTypeIndex, reload]);

    return markers;
};

export default useMarkers;
