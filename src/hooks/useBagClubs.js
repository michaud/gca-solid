import { useState, useEffect } from 'react';
import { solid } from 'rdf-namespaces';
import usePublicTypeIndex from './usePublicTypeIndex';
import golf from '@utils/golf-namespace';
import getBagClubs from '@services/getBagClubs';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import { rdf } from 'rdf-namespaces';
import fetchResource from '@services/fetchResource';
import paths from '@constants/paths';

const setupBag = (document) => {
    const bag = document.addSubject();
    bag.addRef(rdf.type, golf.classes.Bag);
    return document;
};

const useBagClubs = (clubTypes, clubType, initialReload) => {

    const [reload, setReload] = useState(initialReload);
    const [{ publicTypeIndex, publicTypeIndexIsLoading, publicTypeIndexIsError }, reLoadPublicTypeIndex] = usePublicTypeIndex(reload);
    const [bagListData, setBagListData] = useState({ list: [], doc: undefined });
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {

        let didCancel = false;

        if (publicTypeIndex && clubTypes.length > 0 && clubType) {

            const loadData = async () => {

                const clubListIndex = publicTypeIndex.findSubject(solid.forClass, golf.classes.Bag);

                if (!clubListIndex) {

                    // If no clubList document is listed in the public type index, create one:
                    const doc = await initialiseTypeDocument(
                        golf.classes.Bag,
                        paths.REACT_APP_GOLF_DATA_PATH + 'bag.ttl',
                        setupBag
                    );

                    if (doc === null) return;
                    
                    if(!didCancel) setBagListData(state => ({
                        ...state,
                        doc
                    }));

                    return;

                } else {

                    // If the public type index does list a clubList document, fetch it:
                    const url = clubListIndex.getRef(solid.instance);

                    if (typeof url !== 'string') return;
                    
                    const doc = await fetchResource(url);

                    if(!clubType && clubTypes.length === 0) {

                        if(!didCancel) setBagListData(state => ({
                            ...state,
                            doc
                        }));

                        return;
                    }

                    const list = await getBagClubs(
                        doc,
                        clubType,
                        clubTypes
                    );

                    if(!didCancel) setBagListData({
                        list,
                        doc
                    });
                }
            };

            loadData();
        }

        return () => { didCancel = true; }

    }, [publicTypeIndex, reload]);

    return [{ bagListData, isLoading, isError }, setReload];
};

export default useBagClubs;
