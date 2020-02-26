import { useState, useEffect } from 'react';

import { solid } from 'rdf-namespaces';

import ulog from 'ulog';

import clubShape from '@golfcontexts/club-shape.json';
import golf from '@golfutils/golf-namespace';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import getListFromDoc from '@golfservices/getListFromDoc';
import fetchResource from '@golfservices/fetchResource';
import paths from '@golfconstants/paths';

const log = ulog('useClubs');

const useClubs = (publicTypeIndex, clubTypes = [], clubType) => {

    const [reload, setReload] = useState(false);
    const [clubListData, setClubListData] = useState({ list: [], doc: undefined });
    const [isError, setIsError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {

        let didCancel = false;

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
                            
                        if(!didCancel) setClubListData({ list, doc });
                    }

                } catch (error) { 

                    if(!didCancel) {

                        log.error('error: ', error);
                        setIsError(error)
                    }
                } finally {

                    if(!didCancel) {
                        setIsLoading(false);
                        setReload(false);
                    }
                }
            };

            if(!didCancel) setIsLoading(true);

            loadData();
        }

        return () => { didCancel = true; }

    }, [publicTypeIndex.doc, reload]);

    return [{ clubListData, isLoading, isError }, () => { setReload(true) }];
};

export default useClubs;
