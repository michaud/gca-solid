import React from 'react';

const PlayGame = ({
    match,
    webId,
    history
}) => {
    const { params: { gameid } } = match;
    console.log('gameid: ', gameid);
    return (
        
        <div>
            PlayGame
        </div>
    );
};

export default PlayGame;
