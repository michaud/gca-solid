import React from 'react';
import GameDetail from './GameDetail';

const GameList = ({
    games,
    onDelete,
    saveGame
}) => {

    const onSaveGame = (game) => {

        saveGame(game)
    };

    const onDeleteGame = (game) => {

        onDelete(game);
    };

    return <div>
        <header className="c-header">Game list</header>
        {
            games.length > 0 && games.map((game, index) => <GameDetail
                onSave={ onSaveGame }
                onDelete={ onDeleteGame }
                key={ index }
                game={ game } />)
        }
    </div>;
}

export default GameList;
