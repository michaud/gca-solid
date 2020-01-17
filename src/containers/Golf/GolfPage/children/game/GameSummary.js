import React from 'react';

import Button from '@material-ui/core/Button';
import formStyles from '@styles/form.style';

const GameSummary = ({ game, onPlay }) => {

    const classes = formStyles();

    const { fields } = game;

    const gameId = game.iri;
    const title = fields.gameName.value;
    const holeCount = `${ fields.gameCourse.value.fields.courseHoles.value.length } holes`;
    const marker = `marker: ${ fields.gameMarker.value.fields.givenName.value } ${ fields.gameMarker.value.fields.familyName.value}`

    const playGameHandler = () => {
        onPlay && onPlay(gameId);
    };

    return (
        <div className="c-box">
            <header className="c-header--sec">{ title}</header>
            <div>{ holeCount }, { marker }</div>

            <Button
                variant="contained"
                onClick={ playGameHandler }
                className={ classes.button }
                color="primary">Play game</Button>

        </div>
    );
};

export default GameSummary;
