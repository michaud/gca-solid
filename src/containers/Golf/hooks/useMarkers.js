import { useState, useEffect } from 'react';

import { solid } from 'rdf-namespaces';
import usePublicTypeIndex from '@golfhooks/usePublicTypeIndex';
import markerShape from '@golfcontexts/marker-shape.json';
import golf from '@golfutils/golf-namespace';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import getListFromDoc from '@golfservices/getListFromDoc';
import fetchResource from '@golfservices/fetchResource';
import paths from '@golfconstants/paths';

const useMarkers = (initialReload) => {

    const [reload, setReload] = useState(initialReload);
    const [{ publicTypeIndex }] = usePublicTypeIndex(reload);
    const [markerListData, setMarkerListData] = useState({ list: [], doc: undefined });
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        let didCancel = false;

        if (publicTypeIndex) {

            const fetchData = async () => {

                try {
                    const markersIndex = publicTypeIndex.findSubject(solid.forClass, golf.classes.Marker);

                    if (!markersIndex) {

                        if(!didCancel) setIsLoading(true);
                        // If no player document is listed in the public type index, create one:
                        const doc = await initialiseTypeDocument(
                            golf.classes.Marker,
                            paths.REACT_APP_GOLF_DATA_PATH + 'markers.ttl'//,setupPlayer
                        );

                        if (doc === null) return;
                        
                        if(!didCancel) setMarkerListData(state => ({
                            ...state,
                            doc
                        }));

                        if(!didCancel) setIsLoading(false);

                        return;

                    } else {

                        const url = markersIndex.getRef(solid.instance);

                        if (typeof url !== 'string') return;

                        if(!didCancel) setIsLoading(true);

                        const doc = await fetchResource(url);
                        const list = await getListFromDoc(
                            doc,
                            golf.classes.Marker,
                            markerShape
                        )();

                        if(!didCancel) {

                            setMarkerListData({ list, doc });
                            setIsLoading(false);
                        }
                    }
                } catch (error) {

                    if(!didCancel) {

                        setIsError(true);
                        setIsLoading(false);
                    }
                }
            };

            fetchData();
        }

        return () => { didCancel = true; }

    }, [publicTypeIndex, reload]);

    return [{ markerListData, isLoading, isError }, setReload];
};

export default useMarkers;
