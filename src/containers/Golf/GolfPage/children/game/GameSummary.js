import React, { useState } from 'react';

import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLesIcon from '@material-ui/icons/ExpandLess';

import formStyles from '@golfstyles/form.style';
import {
    FlexContainer,
    FlexItem,
    FlexItemTools
} from '@golfstyles/layout.style';

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
        <div className={ showDetail ? 'summary-container u-pad--bum' : 'summary-container' }>
            <FlexContainer>
                <FlexItem>
                    <h2 className="c-detail__header">{ title }</h2>
                    <div className="c-box">{ holeCount }, { marker }</div>
                </FlexItem>
                <FlexItemTools>
                    <Button
                    variant="contained"
                    onClick={ playGameHandler(game.iri) }
                    className={ classes.button }
                    color="primary">Play</Button>

                    { onShowDetail && <IconButton
                        color="primary"
                        aria-label="expand"
                        component="div"
                        className={ classes.expandButton }
                        onClick={ onShowDetailHandler(gameId) }>
                        { !showDetail ? <ExpandMoreIcon fontSize="large"/> : <ExpandLesIcon  fontSize="large"/> }
                    </IconButton>
                    }
                </FlexItemTools>
            </FlexContainer>
        </div>
    );
};

export default GameSummary;
