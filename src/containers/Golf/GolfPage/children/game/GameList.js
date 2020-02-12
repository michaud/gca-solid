import React, { useState } from 'react';

import GameDetail from '@golf/GolfPage/children/game/GameDetail';
import GameSummary from '@golf/GolfPage/children/game/GameSummary';

const GameList = ({
    games,
    onDelete,
    onSave,
    onPlay
}) => {

    const [showDetail, setShowDetail] = useState(false);

    const onSaveGameHandler = (game) => {

        onSave(game)
    };

    const onDeleteGameHandler = (game) => {

        onDelete(game);
    };

    const onPlayGameHandler = iri => onPlay(iri);
    
    const onShowDetailHandler = iri => {
        
        setShowDetail(state => iri === state ? undefined : iri);
    };

    return (
        <div>
            {
                games && games.length > 0 && games.map((gameData, index) => <div className="c-detail__container" key={ index }>
                    <GameSummary
                        game={ gameData.game }
                        onPlay={ onPlayGameHandler }
                        onShowDetail={ onShowDetailHandler }/>
                    { showDetail && showDetail === gameData.game.iri && <GameDetail
                        onSave={ onSaveGameHandler }
                        onDelete={ onDeleteGameHandler }
                        gameData={ gameData } />
                    }
                </div>)
            }
        </div>
    );
};

export default GameList;
