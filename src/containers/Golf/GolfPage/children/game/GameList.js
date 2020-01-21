import React, { Fragment, useState } from 'react';

import GameDetail from './GameDetail';
import GameSummary from './GameSummary';

const GameList = ({
    games,
    onDelete,
    onSave,
    onPlay
}) => {

    const [showDetail, setShowDetail] = useState();

    const onSaveGameHandler = (game) => {

        onSave(game)
    };

    const onDeleteGameHandler = (game) => {

        onDelete(game);
    };

    const onPlayGameHandler = iri => onPlay(iri);
    const onShowDetailHandler = iri => setShowDetail(state => iri === state ? undefined : !state);

    return (
        <div>
            <header className="c-header">Game list</header>
            {
                games && games.length > 0 && games.map((game, index) => <Fragment key={ index }>
                    <GameSummary
                        game={ game }
                        onPlay={ onPlayGameHandler }
                        onShowDetail={ onShowDetailHandler }/>
                    { showDetail && <GameDetail
                        onSave={ onSaveGameHandler }
                        onDelete={ onDeleteGameHandler }
                        game={ game } />
                    }
                </Fragment>)
            }
        </div>
    );
};

export default GameList;
