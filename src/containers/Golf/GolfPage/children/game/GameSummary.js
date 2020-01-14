import React from 'react';

import Button from '@material-ui/core/Button';
import formStyles from '@styles/form.style';

const GameSummary = ({ game, onPlay }) => {

    const classes = formStyles();

    const { fields } = game;

    const gameId = game.iri;
    const title = fields.gameName.field.value;
    const holeCount = `${ fields.gameCourse.field.value.fields.courseHoles.field.value.length } holes`;
    const marker = `marker: ${ fields.gameMarker.field.value.fields.givenName.field.value } ${ fields.gameMarker.field.value.fields.familyName.field.value}`

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
