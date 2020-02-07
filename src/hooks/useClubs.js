import { useState, useEffect } from 'react';
import { solid } from 'rdf-namespaces';
import usePublicTypeIndex from './usePublicTypeIndex';
import golf from '@utils/golf-namespace';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import getListFromDoc from '@services/getListFromDoc';
import clubShape from '@contexts/club-shape.json';
import fetchResource from '@services/fetchResource';
import paths from '@constants/paths';

const useClubs = (clubTypes, clubType, initialReload) => {

    const [reload, setReload] = useState(initialReload);
    const [{ publicTypeIndex, publicTypeIndexIsLoading, publicTypeIndexIsError }, reLoadPublicTypeIndex] = usePublicTypeIndex(reload);
    const [clubListData, setClubListData] = useState({ list: [], doc: undefined });
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        let didCancel = false;

        if (publicTypeIndex && clubTypes.length > 0 && clubType) {

            const loadData = async () => {

                const clubListIndex = publicTypeIndex.findSubject(solid.forClass, golf.classes.Club);

                if (!clubListIndex) {

                    // If no clubList document is listed in the public type index, create one:
                    const doc = await initialiseTypeDocument(
                        golf.classes.Club,
                        paths.REACT_APP_GOLF_DATA_PATH + 'clubs.ttl'
                    );

                    if (doc === null) return;
                    
                    if(!didCancel) setClubListData(state => ({
                        ...state,
                        doc
                    }));

                    return;

                } else {

                    // If the public type index does list a clubList document, fetch it:
                    const url = clubListIndex.getRef(solid.instance);

                    if (typeof url !== 'string') return;

                    const doc = await fetchResource(url);

                    if(clubType === undefined && clubTypes.length === 0) {

                        if(!didCancel) setClubListData(state => ({
                            ...state,
                            doc
                        }));

                        return;
                    }

                    const list = await getListFromDoc(
                        doc,
                        golf.classes.Club,
                        clubShape,
                        clubTypes,
                        clubType
                    )();
                        
                    if(!didCancel) setClubListData({ list, doc });
                }
            };

            loadData();
        }

        return () => { didCancel = true; }

    }, [publicTypeIndex, reload]);

    return [{ clubListData, isLoading, isError }, setReload];
};

export default useClubs;
