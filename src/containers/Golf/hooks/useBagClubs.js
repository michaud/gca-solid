import { useState, useEffect } from 'react';

import { solid, rdf } from 'rdf-namespaces';

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

const useBagClubs = (publicTypeIndex, clubTypes = [], clubType, clubListData) => {

    const [reload, setReload] = useState(false);
    const [bagData, setbagData] = useState({ bag: undefined, doc: undefined });
    const [isError, setIsError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        let didCancel = false;

        if (publicTypeIndex.doc && clubTypes.length > 0 && clubType) {

            const loadData = async () => {

                try {
                    
                    const bagClubListIndex = publicTypeIndex.doc.findSubject(solid.forClass, golf.classes.Bag);

                    if (!bagClubListIndex) {

                        // If no clubList document is listed in the public type index, create one:
                        const doc = await initialiseTypeDocument(
                            golf.classes.Bag,
                            paths.REACT_APP_GOLF_DATA_PATH + 'bag.ttl',
                            setupBag
                        );

                        if (doc === null) return;
                        
                        if(!didCancel) {

                            setbagData(state => ({
                                ...state,
                                doc
                            }));
                        }

                        return;

                    } else {

                        // If the public type index does list a clubList document, fetch it:
                        const url = bagClubListIndex.getRef(solid.instance);

                        if (typeof url !== 'string') return;
                        
                        const doc = await fetchResource(url);

                        if(!clubType && clubTypes.length === 0) {

                            if(!didCancel) {

                                setbagData(state => ({
                                    ...state,
                                    doc
                                }));
                            }

                            return;
                        }

                        if(clubListData.doc && clubType && clubTypes.length > 0) {

                            const bag = getBagClubs(
                                doc,
                                clubTypes,
                                clubType,
                                golf.classes.Bag,
                                clubListData
                            );

                            if(!didCancel) setbagData({
                                doc,
                                bag
                            });
                        }
                    }

                } catch (error) {

                    if(!didCancel) {

                        console.log('error: ', error);
                        setIsError(error)
                    }

                } finally {

                    if(!didCancel) {
                        setReload(false);
                        setIsLoading(false);
                    }
                }
            };

            if(!didCancel) setIsLoading(true);

            loadData();
        }

        return () => { didCancel = true; }

    }, [publicTypeIndex.doc, clubListData, reload]);

    return [{ bagData, isLoading, isError }, () => { setReload(true) }];
};

export default useBagClubs;
