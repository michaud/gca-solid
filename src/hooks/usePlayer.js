import { useState, useEffect } from 'react';
import { solid } from 'rdf-namespaces';
import usePublicTypeIndex from './usePublicTypeIndex';
import golf from '@utils/golf-namespace';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import getPlayer from '@services/getPlayer';
import fetchResource from '@services/fetchResource';

const usePlayer = (reload) => {

    const publicTypeIndex = usePublicTypeIndex(reload);
    const [playerData, setPlayerData] = useState({ player: undefined, doc: undefined });

    useEffect(() => {

        if (publicTypeIndex || reload) {

            (async () => {

                const playerIndex = publicTypeIndex.findSubject(solid.forClass, golf.classes.Player);

                if (!playerIndex) {

                    // If no player document is listed in the public type index, create one:
                    const doc = await initialiseTypeDocument(
                        golf.classes.Player,
                        process.env.REACT_APP_GOLF_DATA_PATH + 'player.ttl'//,setupPlayer
                    );

                    if (doc === null) return;
                    
                    setPlayerData(state => ({
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

                    setPlayerData({ player: playerData, doc });
                }
            })();
        }
    }, [publicTypeIndex]);

    return playerData;
};

export default usePlayer;
