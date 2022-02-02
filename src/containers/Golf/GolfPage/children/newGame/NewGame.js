import React, {
    useState,
    useEffect
} from 'react';

import { Redirect } from 'react-router-dom';

import saveGameResourse from '@golfservices/saveGameResourse';
import golf from '@golfconstants/golf-namespace';

import { useGameListData } from '@golfcontexts/dataProvider/AppDataProvider';

import ModuleHeader from '@golf/components/ModuleHeader';
import GameForm from '@golfpagectrl/game/GameForm';

import { PageContainer, PageContent } from '@golfstyles/page.style';

const NewGame = () => {

    const [currentGame, setCurrentGame] = useState();
    const [isNavigateBack, setIsNavigateBack] = useState(false);

    const {
        gameListData,
        gameListDataIsLoading
    } = useGameListData()

    useEffect(() => {

        let didCancel = false;

        const init = () => {

            if (!didCancel) {

                setCurrentGame();
            }
        }

        init();

        return () => { didCancel = true }

    }, [gameListData]);

    const onSaveGameHandler = async (game) => {

        await saveGameResourse({
            resource: game,
            list: gameListData.doc,
            type: golf.classes.Game
        });

        setIsNavigateBack(true);
    };

    const onCancelHandler = () => { setIsNavigateBack(true) };

    if (isNavigateBack) return <Redirect to="/golf/settings/games" />;

    return (
        <>
            <ModuleHeader label="New game" screenheader={ true } loading={ gameListDataIsLoading } />
            <PageContainer>
                <PageContent>
                    <GameForm
                        game={ currentGame }
                        onSave={ onSaveGameHandler }
                        onCancel={ onCancelHandler } />
                </PageContent>
            </PageContainer>
        </>
    );
};

export default NewGame;
