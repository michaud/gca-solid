import { useState, useEffect } from 'react';
import { solid } from 'rdf-namespaces';
import usePublicTypeIndex from './usePublicTypeIndex';
import golf from '@utils/golf-namespace';
import { fetchDocument } from 'tripledoc';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import getListFromDoc from '@services/getListFromDoc';
import clubShape from '@contexts/club-shape.json';

const useClubData = (clubTypeDefinitions, reload) => {

    const publicTypeIndex = usePublicTypeIndex(reload);
    const [clubList, setClubList] = useState({ list: [], doc: undefined });

    useEffect(() => {

        if (publicTypeIndex || reload) {

            (async () => {

                const clubListIndex = publicTypeIndex.findSubject(solid.forClass, golf.classes.Club);

                if (!clubListIndex) {

                    // If no clubList document is listed in the public type index, create one:
                    const doc = await initialiseTypeDocument(
                        golf.classes.Club,
                        process.env.REACT_APP_GOLF_PATH + 'clubs.ttl'
                    );

                    if (doc === null) return;
                    
                    setClubList(state => ({
                        ...state,
                        doc
                    }));

                    return;

                } else {

                    if(clubTypeDefinitions) {

                        const { clubTypes, clubType } = clubTypeDefinitions;
                        // If the public type index does list a clubList document, fetch it:
                        const url = clubListIndex.getRef(solid.instance);

                        if (typeof url !== 'string') return;

                        const doc = await fetchDocument(url);
                        const list = await getListFromDoc(
                            doc,
                            golf.classes.Club,
                            clubShape,
                            clubTypes,
                            clubType);
                            
                        setClubList({ list, doc });
                    }
                }
            })();
        }
    }, [publicTypeIndex, clubTypeDefinitions, reload]);

    return clubList;
};

export default useClubData;
