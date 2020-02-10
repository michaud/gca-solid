import React, { useState } from 'react';

import GameDetail from '@containers/Golf/GolfPage/children/game/GameDetail';
import GameSummary from '@containers/Golf/GolfPage/children/game/GameSummary';

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
                games && games.length > 0 && games.map((game, index) => <div className="c-detail__container" key={ index }>
                    <GameSummary
                        game={ game }
                        onPlay={ onPlayGameHandler }
                        onShowDetail={ onShowDetailHandler }/>
                    { showDetail && showDetail === game.iri && <GameDetail
                        onSave={ onSaveGameHandler }
                        onDelete={ onDeleteGameHandler }
                        game={ game } />
                    }
                </div>)
            }
        </div>
    );
};

export default GameList;
