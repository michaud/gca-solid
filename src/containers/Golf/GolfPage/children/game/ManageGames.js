import React, { useEffect, useState } from 'react';

import { useNotification } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import useGames from '@hooks/useGames';
import ModuleHeader from '../ModuleHeader';
import { errorToaster } from '@utils/';
import { PageContainer } from '@styles/page.style';
import GameForm from '@containers/Golf/GolfPage/children/game/GameForm';
import GameList from '@containers/Golf/GolfPage/children/game/GameList';
import Button from '@material-ui/core/Button';
import formStyles from '@styles/form.style';
import { Redirect } from 'react-router-dom';
import golf from '@utils/golf-namespace';
import saveResource from '@services/saveResource';

import {
    FlexContainer,
    FlexItem,
} from '@styles/layout.style';
import { withClubTypeContext } from '@utils/clubTypeContext';

const ManageGames = ({
    match,
    webId,
    history,
    clubTypes, clubType
}) => {

    const { notification } = useNotification(webId);
    const classes = formStyles();
    const [reload, setReload] = useState(false);
    const gameData = useGames(clubTypes, clubType, reload);
    const [currentGame, setCurrentGame] = useState();
    const [games, setGames] = useState([]);
    const [showNewGame, setShowNewGame] = useState(false);
    const [playGame, setPlayGame] = useState();

    const { t } = useTranslation();

    const toggleShowNewGame = () => setShowNewGame(state => !state);

    const onSaveGameHandler = (game) => {

        saveResource(game, gameData.doc, golf.classes.Game);
        setReload(true);
    };

    const onCancelHandler = () => {

        setShowNewGame(false);
    };

    const onDeleteGameHandler = (game) => {

//        deleteGame(game, gameData.doc);
        setReload(true);
    };

    const onPlayGameHandler = (game) => {

        setPlayGame(game.split('#')[1]);
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

    if (playGame) {

        return <Redirect to={ `/golf/game/${ playGame }` } />
    }

    return (
        <>
            <ModuleHeader label="Games" screenheader={ true }/>
            <PageContainer>
                { showNewGame && <GameForm
                    game={ currentGame }
                    onSave={ onSaveGameHandler }
                    onCancel={ onCancelHandler }/>
                }
                { !showNewGame && <FlexContainer>
                        <FlexItem>
                            <Button
                                variant="contained"
                                onClick={ toggleShowNewGame }
                                className={ classes.button }
                                fullWidth={ true }
                                color="primary">New game</Button>
                        </FlexItem>
                    </FlexContainer>
                }
                {
                    games.length > 0 && <GameList
                        games={ games }
                        onDelete={ onDeleteGameHandler }
                        onSave={ onSaveGameHandler }
                        onPlay={ onPlayGameHandler }/>
                }
            </PageContainer>
        </>
    );
};

export default withClubTypeContext(ManageGames);
