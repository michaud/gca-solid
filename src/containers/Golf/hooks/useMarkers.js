import { useState, useEffect } from 'react';

import { solid } from 'rdf-namespaces';
import ulog from 'ulog';

import markerShape from '@golfcontexts/marker-shape.json';
import golf from '@golfconstants/golf-namespace';
import initialiseTypeDocument from '@golfservices/initialiseTypeDocument';
import getListFromDoc from '@golfservices/getListFromDoc';
import fetchResource from '@golfservices/fetchResource';
import paths from '@golfconstants/paths';

const log = ulog('useMarkers');

const useMarkers = (publicTypeIndex) => {

    const [reload, setReload] = useState(false);
    const [markerListData, setMarkerListData] = useState({ list: [], doc: undefined });
    const [isError, setIsError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        let didCancel = false;

        if (publicTypeIndex.doc) {

            const fetchData = async () => {

                try {
                    const markersIndex = publicTypeIndex.doc.findSubject(solid.forClass, golf.classes.Marker);

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
                        );

                        if(!didCancel) setMarkerListData({ list, doc });
                    }

                } catch (error) {

                    if(!didCancel) {

                        log.error('error: ', error);
                        setIsError(error)
                    }

                } finally {

                    if(!didCancel) {

                        setReload(false);                        
                        setIsLoading(false);
                    }
                }
            };

            fetchData();
        }

        return () => { didCancel = true; }

    }, [publicTypeIndex.doc, reload]);

    return [{ markerListData, isLoading, isError }, () => { setReload(true) }];
};

export default useMarkers;
