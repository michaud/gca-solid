import { useState, useEffect } from 'react';
import { solid } from 'rdf-namespaces';
import usePublicTypeIndex from './usePublicTypeIndex';
import golf from '@utils/golf-namespace';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import fetchPlayer from '@services/fetchPlayer';
import getPlayer from '@services/getPlayer';

const usePlayer = (dirty) => {

    const publicTypeIndex = usePublicTypeIndex();
    const [player, setPlayer] = useState({ player: undefined, doc: undefined });

    useEffect(() => {

        if (publicTypeIndex) {

            (async () => {

                const playerIndex = publicTypeIndex.findSubject(solid.forClass, golf.classes.Player);

                if (!playerIndex) {

                    // If no player document is listed in the public type index, create one:
                    const doc = await initialiseTypeDocument(
                        golf.classes.Player,
                        process.env.REACT_APP_GOLF_PATH + 'player.ttl'//,setupPlayer
                    );

                    if (doc === null) return;
                    
                    setPlayer(state => ({
                        ...state,
                        doc
                    }));

                    return;

                } else {

                    const playerUrl = playerIndex.getRef(solid.instance);

                    if (typeof playerUrl !== 'string') return;

                    const playerDoc = await fetchPlayer(playerUrl);
                    const playerData = await getPlayer(playerDoc, golf.classes.Player);

                    setPlayer({player: playerData, doc: playerDoc});
                }
            })();
        }
    }, [publicTypeIndex, dirty]);

    return player;
};

export default usePlayer;
