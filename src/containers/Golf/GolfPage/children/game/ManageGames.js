import React, {
    useEffect,
    useState
} from 'react';

import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import SportsGolfIcon from '@material-ui/icons/SportsGolf';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import golf from '@golfutils/golf-namespace';
import saveGameResourse from '@golfservices/saveGameResourse';
import { useGameListData } from '@golfcontexts/dataProvider/AppDataProvider';

import ModuleHeader from '@golf/components/ModuleHeader';
import GameList from '@golf/GolfPage/children/game/GameList';
import IntroPanel from '@golf/components/IntroPanel';

import { PageContainer, PageContent } from '@golfstyles/page.style';
import { FlexContainer, FlexItem } from '@golfstyles/layout.style';

const ManageGames = () => {

    const [games, setGames] = useState([]);
    const [playGame, setPlayGame] = useState(false);

    const {
        gameListData,
        gameListDataIsLoading,
        reloadGames
    } = useGameListData()

    useEffect(() => {

        let didCancel = false;

        const init = () => {

            if (!didCancel) setGames(gameListData.list);
        }

        init();

        return () => { didCancel = true }

    }, [gameListData]);

    const onSaveGameHandler = game => {

        saveGameResourse({
            resource: game,
            list: gameListData.doc,
            type: golf.classes.Game
        });

        reloadGames();
    };

    const onDeleteGameHandler = (game) => {

        //deleteGame(game, gameData.doc);
        reloadGames();
    };

    const onPlayGameHandler = game => setPlayGame(game.split('#')[1]);

    if (playGame) return <Redirect to={`/golf/game/${playGame}`} />

    return (
        <>
            <ModuleHeader label="Games"
                screenheader={ true }
                loading={ gameListDataIsLoading } />
            <PageContainer>
                <PageContent>
                    <div className="c-box">
                        <IntroPanel
                            icon={ <SportsGolfIcon className="c-content-icon plain" /> }>
                            <NavLink className="a-intro-link" to="/golf/settings/games/new">
                                <FlexContainer className="intro-summary" alignitems="center">
                                    <FlexItem>
                                        <h3 className="h-intro">Add a Game</h3>
                                        <p>Do you feel lucky, punk?</p>
                                    </FlexItem>
                                    <FlexItem narrow>
                                        <ArrowForwardIosIcon className="action-intro" />
                                    </FlexItem>
                                </FlexContainer>
                            </NavLink>
                        </IntroPanel>
                    </div>
                    <GameList
                        games={ games }
                        onDelete={ onDeleteGameHandler }
                        onSave={ onSaveGameHandler }
                        onPlay={ onPlayGameHandler }/>
                </PageContent>
            </PageContainer>
        </>
    );
};

export default ManageGames;
