import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import formStyles from '@styles/form.style';
import {
    FlexContainer,
    FlexItem,
    FlexItemRight
} from '@styles/layout.style';

const GameSummary = ({
    game,
    onPlay,
    onShowDetail
}) => {

    const [showDetail, setShowDetail] = useState(false);

    const classes = formStyles();

    const {
        gameName,
        gameCourse,
        gameMarker
    } = game;

    const gameId = game.iri;
    const title = gameName.value;
    const holeCount = `${ gameCourse.value.courseHoles.value.length } holes`;
    const marker = `marker: ${ gameMarker.value.givenName.value } ${ gameMarker.value.familyName.value}`

    const playGameHandler = iri => () => onPlay && onPlay(iri);
    const onShowDetailHandler = iri => () => {

        setShowDetail(state => !state);
        onShowDetail && onShowDetail(iri);
    };

    return (
        <div className="c-box">
            <h2 className="h-plain">{ title }</h2>
            <div className="c-box">{ holeCount }, { marker }</div>
            <FlexContainer>
                <FlexItem>
                <Button
                variant="contained"
                onClick={ playGameHandler(game.iri) }
                className={ classes.button }
                color="primary">Play game</Button>
                </FlexItem>
                <FlexItemRight>
                { onShowDetail && <Button
                    variant="contained"
                    onClick={ onShowDetailHandler(gameId) }
                    className={ classes.button }
                    color="primary">{ !showDetail ? 'Show detail' : 'cancel' }</Button>
                }
                </FlexItemRight>
            </FlexContainer>
        </div>
    );
};

export default GameSummary;
