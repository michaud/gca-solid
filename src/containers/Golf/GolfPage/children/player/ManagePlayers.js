import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { usePlayerData } from '@golfcontexts/dataProvider/AppDataProvider';

import golf from '@golfconstants/golf-namespace';
import saveResource from '@golfservices/saveResource';

import ModuleHeader from '@golf/components/ModuleHeader';
import ManageMarkers from '@golfpagectrl/player/ManageMarkers';
import PlayerDetail from '@golfpagectrl/player/PlayerDetail';


import {
    PageContainer,
    PageContent
} from '@golfstyles/page.style';

const ManagePlayers = () => {

    const [player, setPlayer] = useState();

    const {
        playerData,
        playerDataIsLoading,
        reloadPlayer
    } = usePlayerData();

    const { t } = useTranslation();

    useEffect(() => {

        let didCancel = false;

        const init = () => {

            if (!didCancel) setPlayer(playerData.player);
        }

        init();

        return () => { didCancel = true; }

    }, [playerData]);

    const onSavePlayer = (player) => {

        saveResource({
            resource: player,
            doc: playerData.doc,
            type: golf.classes.Player
        });

        reloadPlayer();
    };

    return (
        <>
            <ModuleHeader
                label={ t('golf.players') }
                screenheader={ true }
                loading={ playerDataIsLoading } />
            <PageContainer>
                <PageContent>
                    {
                        player && <div className="c-box">
                            <PlayerDetail
                                onSave={ onSavePlayer }
                                showEdit={ true }
                                player={ player } />
                        </div>
                    }
                    {
                        player && <ManageMarkers />
                    }
                </PageContent>
            </PageContainer>
        </>
    );
};

export default ManagePlayers;
