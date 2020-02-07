import { useState, useEffect } from 'react';
import { solid } from 'rdf-namespaces';
import usePublicTypeIndex from './usePublicTypeIndex';
import golf from '@utils/golf-namespace';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import markerShape from '@contexts/marker-shape.json';
import getListFromDoc from '@services/getListFromDoc';
import fetchResource from '@services/fetchResource';
import paths from '@constants/paths';

const useMarkers = (initialReload) => {

    const [reload, setReload] = useState(initialReload);
    const [{ publicTypeIndex, isLoading: publicTypeIndexIsLoading, isError: publicTypeIndexIsError }, reLoadPublicTypeIndex] = usePublicTypeIndex(reload);
    const [markerListData, setMarkerListData] = useState({ list: [], doc: undefined });
   const [isError, setIsError] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        let didCancel = false;

        if (publicTypeIndex) {

            const fetchData = async () => {

                const markersIndex = publicTypeIndex.findSubject(solid.forClass, golf.classes.Marker);

                if (!markersIndex) {

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

                    const doc = await fetchResource(url);
                    const list = await getListFromDoc(
                        doc,
                        golf.classes.Marker,
                        markerShape
                    )();

                    if(!didCancel) setMarkerListData({ list, doc });
                }
            };

            fetchData();
        }

        return () => { didCancel = true; }

    }, [publicTypeIndex, reload]);

    return [{ markerListData, isLoading, isError }, setReload];
};

export default useMarkers;
