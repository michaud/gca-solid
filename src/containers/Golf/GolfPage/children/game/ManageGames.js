import React, { useEffect, useState } from 'react';

import { useNotification } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import useGames from '@hooks/useGames';
import ModuleHeader from '../ModuleHeader';
import { errorToaster } from '@utils/';
import { PageContainer } from '@styles/page.style';
import GameForm from '@containers/Golf/GolfPage/children/game/GameForm';
import GameList from '@containers/Golf/GolfPage/children/game/GameList';
import saveGame from '@services/saveGame';
import useClubDefinitions from '@hooks/useClubDefinitions';
import Button from '@material-ui/core/Button';
import formStyles from '@styles/form.style';
import {
    FlexContainer,
    FlexItem,
} from '@styles/layout.style';

const ManageGames = ({
    match,
    webId,
    history
}) => {

    const { notification } = useNotification(webId);
    const classes = formStyles();
    const [reload, setReload] = useState(false);
    const clubTypeDefinitions = useClubDefinitions();
    const gameData = useGames(clubTypeDefinitions, reload);
    const [currentGame, setCurrentGame] = useState();
    const [games, setGames] = useState([]);
    const [showNewGame, setShowNewGame] = useState(false);
    const { t } = useTranslation();

    const toggleShowNewGame = () => setShowNewGame(state => !state);

    const onSaveGame = (game) => {

        saveGame(game, gameData.doc);
        setReload(true);
    };

    const onCancelHandler = () => {

        setShowNewGame(false);
    };

    const onDeleteGameHandler = (game) => {

//        deleteGame(game, gameData.doc);
        setReload(true);
    };

    const init = async () => {

        try {

            if (gameData) {

                const gameList = gameData.list;
                setGames(gameList);

                if(reload) {
                    setCurrentGame(gameList[gameList.length - 1]);
                }

                setReload(false);
            }


        } catch (e) {
            /**
             * Check if something fails when we try to create a inbox
             * and show user a possible solution
             */
            if (e.name === 'Inbox Error') {
                return errorToaster(e.message, 'Error', {
                    label: t('errorCreateInbox.link.label'),
                    href: t('errorCreateInbox.link.href')
                });
            }

            errorToaster(e.message, 'Error');
        }
    };

    useEffect(() => {

        if (webId && notification.notify) {
            init();
        }

    }, [webId, gameData, notification.notify]);

    return (
        <>
            <ModuleHeader label="Games" screenheader={ true }/>
            <PageContainer>
                { showNewGame && <GameForm
                    game={ currentGame }
                    onSave={ onSaveGame }
                    onCancel={ onCancelHandler }/>
                }
                { !showNewGame && <FlexContainer>
                        <FlexItem>
                            <Button
                                variant="contained"
                                onClick={ toggleShowNewGame }
                                className={ classes.button }
                                color="primary">New game</Button>
                        </FlexItem>
                    </FlexContainer>
                }
                {
                    games.length > 0 && <GameList
                        games={ games }
                        onDelete={ onDeleteGameHandler }/>
                }
            </PageContainer>
        </>
    );
};

export default ManageGames;
