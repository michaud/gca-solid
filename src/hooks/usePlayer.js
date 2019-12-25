import { useState, useEffect } from 'react';
import { solid, rdf } from 'rdf-namespaces';
import usePublicTypeIndex from './usePublicTypeIndex';
import golf from '@utils/golf-namespace';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import fetchPlayer from '@services/fetchPlayer';
import getPlayer from '@services/getPlayer';
import playerShape from '@contexts/player-shape.json';

const addField = (field, ref) => {

    const iri = `${ playerShape['@context'][field.prefix] }${ field.predicate }`;

    switch(field.type) {

        case golf.types.string : {

            ref.addLiteral(iri, field.value);

            break;
        }

        case golf.types.text : {

            ref.addLiteral(iri, field.value);

            break;
        }

        case golf.types.integer: {

            ref.addLiteral(iri, field.value);

            break;
        }

        default : {

            break;
        }
    }
};

const setupPlayer = (document) => {

    const player = document.addSubject();
    player.addRef(rdf.type, golf.classes.Player);

    for(const shape in playerShape.shape) {

        addField(playerShape.shape[shape], player);
    }

    return document;
};

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
