import { useState, useEffect } from 'react';
import { solid } from 'rdf-namespaces';
import usePublicTypeIndex from './usePublicTypeIndex';
import golf from '@utils/golf-namespace';
import getBagClubs from '@services/getBagClubs';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import { rdf } from 'rdf-namespaces';
import fetchResource from '@services/fetchResource';

const setupBag = (document) => {
    const bag = document.addSubject();
    bag.addRef(rdf.type, golf.classes.Bag);
    return document;
};

const useBagClubs = (clubTypes, clubType, reload) => {

    const publicTypeIndex = usePublicTypeIndex();
    const [clubList, setClubList] = useState({ list: [], doc: undefined });

    useEffect(() => {

        if (publicTypeIndex || reload) {

            (async () => {

                const clubListIndex = publicTypeIndex.findSubject(solid.forClass, golf.classes.Bag);

                if (!clubListIndex) {

                    // If no clubList document is listed in the public type index, create one:
                    const doc = await initialiseTypeDocument(
                        golf.classes.Bag,
                        process.env.REACT_APP_GOLF_DATA_PATH + 'bag.ttl',
                        setupBag
                    );

                    if (doc === null) return;
                    
                    setClubList(state => ({
                        ...state,
                        doc
                    }));

                    return;

                } else {

                    // If the public type index does list a clubList document, fetch it:
                    const url = clubListIndex.getRef(solid.instance);

                    if (typeof url !== 'string') return;
                    const doc = await fetchResource(url);
                    const list = await getBagClubs(
                        doc,
                        clubType,
                        clubTypes
                    );

                    setClubList({
                        list,
                        doc
                    });
                }
            })();
        }
    }, [publicTypeIndex, reload]);

    return clubList;
};

export default useBagClubs;
