import React, { useState, useEffect } from 'react';
import ManageMarkers from './ManageMarkers';
import ModuleHeader from '@containers/Golf/GolfPage/children/ModuleHeader';
import { useTranslation } from 'react-i18next';
import PlayerDetail from '@containers/Golf/GolfPage/children/player/PlayerDetail';
import usePlayer from '@hooks/usePlayer';
import { PageContainer } from '@styles/page.style';
import golf from '@utils/golf-namespace';
import saveResource from '@services/saveResource';

const ManagePlayers = ({ webId }) => {

    const [reload, setReload] = useState(false);
    const [player, setPlayer] = useState();
    const [{
        playerData,
        isLoading: playerDataIsLoading,
        isError: playerDataIsError
    }, reloadPlayerData] = usePlayer(reload);
    
    const { t } = useTranslation();

    useEffect(() => {

        let didCancel = false;

        const init = () => {

            if (!didCancel) {

                setPlayer(playerData.player);
                setReload(false)
            }
        }

        init();

        return () => {
            didCancel = true;
        }
       
    }, [playerData, reload]);

    const onSavePlayer = (playerData) => {

        saveResource({
            resource: playerData,
            doc: playerData.doc,
            type: golf.classes.Player
        });
        
        setReload(true);
    };

    return (
        <>
            <ModuleHeader
                label={ t('golf.players') }
                screenheader={ true }
                loading={ !player || reload === true }/>
            <PageContainer>
            { 
                player && <PlayerDetail
                    onSave={ onSavePlayer }
                    showEdit={ true }
                    player={ player }/> 
            }
            {
                player && <ManageMarkers webId={ webId }/>
            }
            </PageContainer>
        </>
    );
};

export default ManagePlayers;
