import React, { useEffect, useState, useContext } from 'react';

import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import useGames from '@hooks/useGames';
import ModuleHeader from '@containers/Golf/GolfPage/children/ModuleHeader';
import { PageContainer } from '@styles/page.style';
import GameForm from '@containers/Golf/GolfPage/children/game/GameForm';
import GameList from '@containers/Golf/GolfPage/children/game/GameList';
import ClubTypeContext from '@utils/clubTypeContext';
import formStyles from '@styles/form.style';
import golf from '@utils/golf-namespace';
import saveGameResourse from '@services/saveGameResourse';

const ManageGames = () => {

    const classes = formStyles();
    const [reload, setReload] = useState(false);
    const [currentGame, setCurrentGame] = useState();
    const [games, setGames] = useState([]);
    const [showGameForm, setShowGameForm] = useState(false);
    const [playGame, setPlayGame] = useState();
    const clubTypeData = useContext(ClubTypeContext);
    const gameData = useGames(clubTypeData.clubTypes, clubTypeData.clubType, reload);

    const toggleShowGameForm = () => setShowGameForm(state => !state);

    const onSaveGameHandler = game => {

        saveGameResourse({
            resource: game,
            doc: gameData.doc,
            type: golf.classes.Game
        });

        setReload(true);
    };

    const onCancelHandler = () => setShowGameForm(false);

    const onDeleteGameHandler = (game) => {

//        deleteGame(game, gameData.doc);
        setReload(true);
    };

    const onPlayGameHandler = game => setPlayGame(game.split('#')[1]);
        
    useEffect(() => {

        if (gameData) {

            setGames(gameData.list);

            if(reload) {

                setCurrentGame();
            }

            setReload(false);
        }

    }, [gameData]);

    if (playGame) return <Redirect to={ `/golf/game/${ playGame }` } />

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
                    !showGameForm && !loading && <div className="c-box">
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

export default ManageGames;
