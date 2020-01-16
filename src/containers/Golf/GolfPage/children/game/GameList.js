import React from 'react';
//import GameDetail from './GameDetail';
import GameSummary from './GameSummary';

const GameList = ({
    games,
    // onDelete,
    // onSave,
    onPlay
}) => {

    // const onSaveGameHandler = (game) => {

    //     onSave(game)
    // };

    // const onDeleteGameHandler = (game) => {

    //     onDelete(game);
    // };

    const onPlayGameHandler = (game) => {

        onPlay(game);
    };

    return (
        <div>
            <header className="c-header">Game list</header>
            {
            games.length > 0 && games.map((game, index) => <GameSummary key={ index }
                game={ game }
                onPlay={ onPlayGameHandler }/>
            // <GameDetail
            //         onSave={ onSaveGameHandler }
            //         onDelete={ onDeleteGameHandler }
            //         key={ index }
            //         game={ game } />
                    )
            }
        </div>
    );
};

export default GameList;
