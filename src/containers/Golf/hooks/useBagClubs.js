import { useState, useEffect } from 'react';

import { solid, rdf } from 'rdf-namespaces';

import usePublicTypeIndex from '@golfhooks/usePublicTypeIndex';
import golf from '@golfutils/golf-namespace';
import getBagClubs from '@golfservices/getBagClubs';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import fetchResource from '@golfservices/fetchResource';
import paths from '@golfconstants/paths';

const setupBag = (document) => {

    const bag = document.addSubject();
    bag.addRef(rdf.type, golf.classes.Bag);

    return document;
};

const useBagClubs = (clubTypes, clubType, clubListData, initialReload) => {

    const [reload, setReload] = useState(initialReload);
    const [{ publicTypeIndex }] = usePublicTypeIndex(reload);
    const [bagListData, setBagListData] = useState({ list: [], doc: undefined });
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        let didCancel = false;

        if (publicTypeIndex && clubTypes.length > 0 && clubType) {

            const loadData = async () => {

                try {
                    
                    const bagClubListIndex = publicTypeIndex.findSubject(solid.forClass, golf.classes.Bag);

                    if (!bagClubListIndex) {

                        if(!didCancel) setIsLoading(true);
                        // If no clubList document is listed in the public type index, create one:
                        const doc = await initialiseTypeDocument(
                            golf.classes.Bag,
                            paths.REACT_APP_GOLF_DATA_PATH + 'bag.ttl',
                            setupBag
                        );

                        if (doc === null) {

                            if(!didCancel) setIsLoading(false);

                            return;
                        }
                        
                        if(!didCancel) {
                            setBagListData(state => ({
                                ...state,
                                doc
                            }));

                            setIsLoading(false);
                        }

                        return;

                    } else {

                        // If the public type index does list a clubList document, fetch it:
                        const url = bagClubListIndex.getRef(solid.instance);

                        if (typeof url !== 'string') return;
                        
                        if(!didCancel) setIsLoading(true);                        
                        
                        const doc = await fetchResource(url);

                        if(!clubType && clubTypes.length === 0) {

                            if(!didCancel) {

                                setBagListData(state => ({
                                    ...state,
                                    doc
                                }));

                                setIsLoading(false);
                            }

                            return;
                        }

                        // console.log('clubListData.doc: ', clubListData.doc);
                        // console.log('clubType: ', clubType);
                        // console.log('clubTypes: ', clubTypes);
                        // console.log('clubTypes.length === 0: ', clubTypes.length === 0);
                        if(clubListData.doc && clubType && clubTypes.length > 0) {

                            const list = getBagClubs(
                                doc,
                                clubTypes,
                                clubType,
                                clubListData,
                                golf.classes.Bag
                            );

                            if(!didCancel) setIsLoading(false);

                            setBagListData({
                                list,
                                doc
                            });
                        }
                    }
                } catch (error) {

                    if(!didCancel) {

                        console.log('error: ', error);
                        setIsError(true)
                        setReload(false);
                    }
                }
            };

            loadData();
        }

        return () => { didCancel = true; }

    }, [publicTypeIndex, clubListData, reload]);

    return [{ bagListData, isLoading, isError }, setReload];
};

export default useBagClubs;
