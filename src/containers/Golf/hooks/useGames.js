import { useState, useEffect } from 'react';

import { namedNode } from '@rdfjs/data-model';
import { solid } from 'rdf-namespaces';
import * as ns from 'rdf-namespaces';

import initialiseTypeDocument from '@services/initialiseTypeDocument';
import fetchResource from '@golfservices/fetchResource';
import gameShape from '@golfcontexts/game-shape.json';
import paths from '@golfconstants/paths';
import golf from '@golfutils/golf-namespace';
import parseFields from '@golfutils/parseData/parseFields';

const getGameListFromDoc = async (
    doc,  type, shape, ...rest
    ) => {

    const gameRefs = doc.getTriples();

    const promises = gameRefs.map(item => {
        
        return fetchResource(item.object.id)
    });

    const gameDocs = await Promise.all(promises);

    const games = gameDocs.map(doc => {

        const gameRef = doc.findSubject(ns.rdf.type, namedNode(type))
        return ({
            game: parseFields(shape, doc, ...rest)(gameRef),
            doc
        })
    });

    return games;
}

const useGames = (publicTypeIndex, clubTypes = [], clubType, clubListData, initialReload, gameId) => {

    const [reload, setReload] = useState(initialReload);
    const [gameListData, setGameListData] = useState({ list: [], doc: undefined });
    const [isError, setIsError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        let didCancel = false;

        const loadData = async () => {

            if (publicTypeIndex.doc) {

                try {
                    const listIndex = publicTypeIndex.doc.findSubject(solid.forClass, golf.classes.Game);

                    if (!listIndex) {

                        // If no clubList document is listed in the public type index, create one:
                        const doc = await initialiseTypeDocument(
                            golf.classes.Game,
                            paths.REACT_APP_GOLF_DATA_PATH + 'games.ttl'
                        );

                        if (doc === null) return;
                        
                        if(!didCancel) setGameListData(state => ({
                            ...state,
                            doc
                        }));

                        if(!didCancel) setIsLoading(false);

                        return;

                    } else {

                        // If the public type index does list a clubList document, fetch it:
                        const url = listIndex.getRef(solid.instance);

                        if (typeof url !== 'string') return;

                        if(!didCancel) setIsLoading(true);

                        const doc = await fetchResource(url);

                        if(clubType === undefined && clubTypes.length === 0 && clubListData.doc === undefined ) {
                            
                            if(!didCancel) setGameListData(state => ({
                                ...state,
                                doc
                            }));
                            
                            if(!didCancel) setIsLoading(false);
                            if(!didCancel) setReload(false);
                            
                            return;
                        }
                        
                        if(!didCancel) setIsLoading(true);

                        const list = await getGameListFromDoc(
                            doc,
                            golf.classes.Game,
                            gameShape,
                            clubTypes,
                            clubType,
                            clubListData,
                            gameId
                        );

                        if(!didCancel) {
                            setIsLoading(false);
                            setReload(false);
                            setGameListData({ list, doc });
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
            }
        };

        if(!didCancel) setIsLoading(true);
    
        loadData();

        return () => { didCancel = true; }

    }, [publicTypeIndex.doc, clubTypes, clubType, reload]);

    return [{ gameListData, isLoading, isError }, setReload];
};

export default useGames;

