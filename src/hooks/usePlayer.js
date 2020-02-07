import { useState, useEffect } from 'react';
import { solid } from 'rdf-namespaces';
import usePublicTypeIndex from './usePublicTypeIndex';
import golf from '@utils/golf-namespace';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import getPlayer from '@services/getPlayer';
import fetchResource from '@services/fetchResource';
import paths from '@constants/paths';

const usePlayer = (initialReload) => {

    const [reload, setReload] = useState(initialReload);
    const [{ publicTypeIndex }] = usePublicTypeIndex(reload);
    const [playerData, setPlayerData] = useState({ player: undefined, doc: undefined });
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        let didCancel = false;

        if (publicTypeIndex) {

            const loadData = async () => {

                try {
                    const playerIndex = publicTypeIndex.findSubject(solid.forClass, golf.classes.Player);

                    if (!playerIndex) {

                        if(!didCancel) setIsLoading(true);
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

                        if(!didCancel) setIsLoading(false);

                        return;

                    } else {

                        const url = playerIndex.getRef(solid.instance);

                        if (typeof url !== 'string') return;

                        if(!didCancel) setIsLoading(true);

                        const doc = await fetchResource(url);
                        const playerData = await getPlayer(
                            doc,
                            golf.classes.Player
                        );

                        if(!didCancel) {
                            setPlayerData({ player: playerData, doc });
                            setIsLoading(false);
                        }
                    }
                } catch (error) { 

                    if(!didCancel) {

                        setIsError(true);
                        setIsLoading(false);
                    }

                }
            };

            loadData();
        }

        return () => { didCancel = true; }

    }, [publicTypeIndex, reload]);

    return [{ playerData, isLoading, isError }, setReload];
};

export default usePlayer;
