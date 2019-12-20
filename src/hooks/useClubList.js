import { useState, useEffect } from 'react';
import { solid } from 'rdf-namespaces';
import usePublicTypeIndex from './usePublicTypeIndex';
import golf from '@utils/golf-namespace';
import fetchClubList from '@services/fetchClubList';
import getClubList from '@services/getClubList';
import initialiseTypeDocument from '@services/initialiseTypeDocument';

const useClubList = (clubTypeDefinitions, dirty) => {

    const publicTypeIndex = usePublicTypeIndex();
    const [clubList, setClubList] = useState({ list: [], doc: undefined });

    useEffect(() => {

        if (publicTypeIndex) {

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
                        const clubListUrl = clubListIndex.getRef(solid.instance);

                        if (typeof clubListUrl !== 'string') return;

                        const listDoc = await fetchClubList(clubListUrl);
                        const listData = await getClubList(listDoc, clubTypes, clubType);

                        setClubList({list: listData, doc: listDoc});
                    }
                }
            })();
        }
    }, [publicTypeIndex, clubTypeDefinitions, dirty]);

    return clubList;
};

export default useClubList;
