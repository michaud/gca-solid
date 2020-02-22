import { useState, useEffect } from 'react';

import { solid } from 'rdf-namespaces';

import clubShape from '@golfcontexts/club-shape.json';
import golf from '@golfutils/golf-namespace';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import getListFromDoc from '@golfservices/getListFromDoc';
import fetchResource from '@golfservices/fetchResource';
import paths from '@golfconstants/paths';

const useClubs = (publicTypeIndex, clubTypes = [], clubType, initialReload) => {

    const [reload, setReload] = useState(initialReload);
    const [clubListData, setClubListData] = useState({ list: [], doc: undefined });
    const [isError, setIsError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {

        let didCancel = false;

        if(!didCancel) setIsLoading(true);

        if (publicTypeIndex.doc && clubTypes.length > 0 && clubType) {

            const loadData = async () => {

                try {
                    const clubListIndex = publicTypeIndex.doc.findSubject(solid.forClass, golf.classes.Club);

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

                        if(!didCancel) setIsLoading(false);

                        return;

                    } else {

                        // If the public type index does list a clubList document, fetch it:
                        const url = clubListIndex.getRef(solid.instance);

                        if (typeof url !== 'string') return;
                        
                        const doc = await fetchResource(url);

                        if(clubType === undefined && clubTypes.length === 0) {

                            if(!didCancel) {

                                setClubListData(state => ({
                                    ...state,
                                    doc
                                }));

                                setIsLoading(false);
                            }

                            return;
                        }

                        const list = await getListFromDoc(
                            doc,
                            golf.classes.Club,
                            clubShape,
                            clubTypes,
                            clubType
                        )();
                            
                        if(!didCancel) {

                            setClubListData({ list, doc });
                            setIsLoading(false);
                        }
                    }
                } catch (error) { 

                    if(!didCancel) {

                        console.log('error: ', error);
                        setIsError(error)
                        setReload(false);
                        setIsLoading(false);
                    }
                }
            };

            loadData();
        }

        return () => { didCancel = true; }

    }, [publicTypeIndex.doc, reload]);

    return [{ clubListData, isLoading, isError }, setReload];
};

export default useClubs;
