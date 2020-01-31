import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { useNotification } from '@inrupt/solid-react-components';
import useGames from '@hooks/useGames';
import ModuleHeader from '../ModuleHeader';
import { errorToaster } from '@utils/';
import { PageContainer } from '@styles/page.style';
import GameForm from '@containers/Golf/GolfPage/children/game/GameForm';
import GameList from '@containers/Golf/GolfPage/children/game/GameList';
import { withClubTypeContext } from '@utils/clubTypeContext';
import formStyles from '@styles/form.style';
import golf from '@utils/golf-namespace';
import saveResource from '@services/saveResource';

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
    const [showGameForm, setShowGameForm] = useState(false);
    const [playGame, setPlayGame] = useState();

    const { t } = useTranslation();

    const toggleShowGameForm = () => setShowGameForm(state => !state);

    const onSaveGameHandler = (game) => {

        saveResource({
            resource: game,
            doc: gameData.doc,
            type: golf.classes.Game
        });

        setReload(true);
    };

    const onCancelHandler = () => {

        setShowGameForm(false);
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
                    setCurrentGame();
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

    const loading = reload || gameData.doc === undefined;

    return (
        <>
            <ModuleHeader label="Games" screenheader={ true } loading={ loading }/>
            <PageContainer>
                {
                    showGameForm && <div className="c-box c-box--hold-height">
                        <GameForm
                            game={ currentGame }
                            onSave={ onSaveGameHandler }
                            onCancel={ onCancelHandler }/>
                    </div>
                }
                {
                    !showGameForm && <div className="c-box">
                        <Button
                            variant="contained"
                            onClick={ toggleShowGameForm }
                            className={ classes.button }
                            fullWidth={ true }
                            color="primary">New game</Button>
                    </div>
                }
                <GameList
                    games={ games }
                    onDelete={ onDeleteGameHandler }
                    onSave={ onSaveGameHandler }
                    onPlay={ onPlayGameHandler }/>
            </PageContainer>
        </>
    );
};

export default withClubTypeContext(ManageGames);
