import { useState, useEffect } from 'react';

import { solid } from 'rdf-namespaces';
import ulog from 'ulog';

import golf from '@golfconstants/golf-namespace';
import initialiseTypeDocument from '@golfservices/initialiseTypeDocument';
import getPlayer from '@golfservices/getPlayer';
import fetchResource from '@golfservices/fetchResource';
import paths from '@golfconstants/paths';

const log = ulog('usePlayer');

const usePlayer = (publicTypeIndex) => {

    const [reload, setReload] = useState(false);
    const [playerData, setPlayerData] = useState({ player: undefined, doc: undefined });
    const [isError, setIsError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        let didCancel = false;

        if(!didCancel) setIsLoading(true);

        if (publicTypeIndex.doc) {

            const loadData = async () => {

                try {

                    const playerIndex = publicTypeIndex.doc.findSubject(solid.forClass, golf.classes.Player);

                    if (!playerIndex) {

                        // If no player document is listed in the public type index, create one:
                        const doc = await initialiseTypeDocument(
                            golf.classes.Player,
                            paths.REACT_APP_GOLF_DATA_PATH + 'player.ttl'//,setupPlayer
                        );

                        if (doc === null) return;
                        
                        if(!didCancel) setPlayerData(state => ({
                            player: getPlayer(undefined, golf.classes.Player),
                            doc
                        }));

                        return;

                    } else {

                        const url = playerIndex.getRef(solid.instance);

                        if (typeof url !== 'string') return;

                        const doc = await fetchResource(url);
                        const playerData = await getPlayer(
                            doc,
                            golf.classes.Player
                        );

                        if(!didCancel) setPlayerData({ player: playerData, doc });
                    }
                } catch (error) { 

                    if(!didCancel) {

                        log.error('error: ', error);
                        setIsError(error);
                    }

                } finally {

                    if(!didCancel) {

                        setIsLoading(false);
                        setReload(false);
                    }
                }
            };

            loadData();
        }

        return () => { didCancel = true; }

    }, [publicTypeIndex.doc, reload]);

    return [{ playerData, isLoading, isError }, () => { setReload(true) }];
};

export default usePlayer;
