import { useState, useEffect } from 'react';

import { namedNode } from '@rdfjs/data-model';
import { solid } from 'rdf-namespaces';
import * as ns from 'rdf-namespaces';
import ulog from 'ulog';

import initialiseTypeDocument from '@services/initialiseTypeDocument';
import fetchResource from '@golfservices/fetchResource';
import gameShape from '@golfcontexts/game-shape.json';
import paths from '@golfconstants/paths';
import golf from '@golfutils/golf-namespace';
import parseFields from '@golfutils/parseData/parseFields';

const log = ulog('useGames');

const getGameListFromDoc = async (
    doc,
    type,
    shape,
    ...rest
    ) => {

    const [,,,gameId, url] = rest;

    const gameRefs = doc.findSubjects(golf.classes.Game);

    const promises = [];

    if(!gameId) {

        gameRefs.map(item => promises.push(fetchResource(item.getRef())));

    } else {

        promises.push(fetchResource(doc.getSubject(`${ url }#${ gameId }`).getRef()));
    }

    const gameDocs = await Promise.all(promises);

    const games = gameDocs.map(doc => {

        const gameRef = doc.findSubject(ns.rdf.type, namedNode(type));

        const game = parseFields(shape, doc, ...rest)(gameRef);

        return ({
            game,
            doc
        })
    });

    return games;
};

const updateGameInList = (gameList, gameDataList) => {

    const updatedGameRef = gameList[0].game.iri;

    const oldGameIndex = gameDataList.list.findIndex(gameData => { 
        return gameData.game.iri === updatedGameRef;
    });

    const startGames = gameDataList.list.slice(0, oldGameIndex);
    const endGames = gameDataList.list.slice(oldGameIndex + 1, gameDataList.length);

    
    return [...startGames, gameList[0], ...endGames];
};

const useGames = (publicTypeIndex, clubTypes = [], clubType, clubListData) => {

    const [reload, setReload] = useState(false);
    const [gameListData, setGameListData] = useState({ list: [], doc: undefined });
    const [gameId, setGameId] = useState();
    const [isError, setIsError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        let didCancel = false;

        const loadData = async () => {

            if (publicTypeIndex.doc) {

                try {

                    const listIndex = publicTypeIndex.doc.findSubject(
                        solid.forClass,
                        golf.classes.Game
                    );

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

                        return;

                    } else {

                        // If the public type index does list a clubList document, fetch it:
                        const url = listIndex.getRef(solid.instance);

                        if (typeof url !== 'string') return;

                        const doc = await fetchResource(url);

                        if(publicTypeIndex.doc && clubTypes.length > 0 && clubType && clubListData.doc) {

                            let list = await getGameListFromDoc(
                                doc,
                                golf.classes.Game,
                                gameShape,
                                clubTypes,
                                clubType,
                                clubListData,
                                gameId,
                                url
                            );

                            if(gameId) list = updateGameInList(list, gameListData);

                            if(!didCancel) setGameListData({ list, doc });

                        } else {
                            
                            if(!didCancel) setGameListData(state => ({
                                ...state,
                                doc
                            }));
                            
                            return;
                        }
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
            }
        };

        if(!didCancel) setIsLoading(true);
    
        loadData();

        return () => { didCancel = true; }

    }, [publicTypeIndex.doc, clubTypes, clubType, clubListData.doc, reload]);

    return [{ gameListData, isLoading, isError }, (gameid) => {
        setGameId(gameid);
        setReload(true);
    }];
};

export default useGames;
