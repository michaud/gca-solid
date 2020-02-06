import { useState, useEffect } from 'react';

import { namedNode } from '@rdfjs/data-model';//, literal, quad
import { solid } from 'rdf-namespaces';
import * as ns from 'rdf-namespaces';

import usePublicTypeIndex from './usePublicTypeIndex';
import golf from '@utils/golf-namespace';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import gameShape from '@contexts/game-shape.json';
import fetchResource from '@services/fetchResource';
import paths from '@constants/paths';
import parseFields from '@utils/parseData/parseFields';

const getGameListFromDoc = async (
    doc,  type, shape, ...rest
) => {

    const gameRefs = doc.getTriples();
    const promises = gameRefs.map(item => fetchResource(item.object.id))
    const games = await Promise.all(promises);

    const data = games.map(doc => {

        const game = doc.findSubject(ns.rdf.type, namedNode(type))
        return parseFields(shape, doc, ...rest)(game);
    });

    return data;
}

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
                        paths.REACT_APP_GOLF_DATA_PATH + 'games.ttl'
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

                    if(clubType === undefined && clubTypes.length === 0) {

                        setData(state => ({
                            ...state,
                            doc
                        }));

                        return;
                    }

                    const list = await getGameListFromDoc(
                        doc,
                        golf.classes.Game,
                        gameShape,
                        clubTypes,
                        clubType
                    );

                    // const list = getListFromDoc(
                    //     doc,
                    //     golf.classes.Game,
                    //     gameShape,
                    //     clubTypes,
                    //     clubType
                    // )(gameId, url);

                    setData({ list, doc });
                }
            })();
        }
    }, [publicTypeIndex, clubTypes, clubType, reload]);

    return data;
};

export default useGames;

