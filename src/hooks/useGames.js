import { useState, useEffect } from 'react';

import { solid } from 'rdf-namespaces';

import usePublicTypeIndex from './usePublicTypeIndex';
import golf from '@utils/golf-namespace';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import getListFromDoc from '@services/getListFromDoc';
import gameShape from '@contexts/game-shape.json';
import fetchResource from '@services/fetchResource';

const useGames = (clubTypes, clubType, reload, gameId) => {

    const publicTypeIndex = usePublicTypeIndex(reload);
    const [data, setData] = useState({ list: [], doc: undefined });

    useEffect(() => {

        if (publicTypeIndex || reload) {

            (async () => {

                const listIndex = publicTypeIndex.findSubject(solid.forClass, golf.classes.Game);

                if (!listIndex) {

                    // If no clubList document is listed in the public type index, create one:
                    const doc = await initialiseTypeDocument(
                        golf.classes.Game,
                        process.env.REACT_APP_GOLF_DATA_PATH + 'games.ttl'
                    );

                    if (doc === null) return;
                    
                    setData(state => ({
                        ...state,
                        doc
                    }));

                    return;

                } else {

                    // If the public type index does list a clubList document, fetch it:
                    const url = listIndex.getRef(solid.instance);

                    if (typeof url !== 'string') return;

                    const doc = await fetchResource(url);

                    const list = getListFromDoc(
                        doc,
                        golf.classes.Game,
                        gameShape,
                        clubTypes,
                        clubType
                    )(gameId);

                    setData({ list, doc });
                }
            })();
        }
    }, [publicTypeIndex, clubTypes, clubType, reload]);

    return data;
};

export default useGames;
