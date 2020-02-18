import React, { useState } from 'react';

import { format } from 'date-fns'
import golf from '@golfutils/golf-namespace';
import gameShape from '@golfcontexts/game-shape.json';
import displayStates from '@golfutils/displayStates';

import Button from '@material-ui/core/Button';

import EditActions from '@golf/components/EditActions';
import GameForm from '@golf/GolfPage/children/game/GameForm';
import HoleTable from '@golf/GolfPage/children/hole/HoleTable';
import BagDetail from '@golf/GolfPage/children/game/BagDetail';
import PlayerDetail from '@golf/GolfPage/children/player/PlayerDetail';
import PlayingHandicapDetail from '@golf/GolfPage/children/game/PlayingHandicapDetail';
import CourseSummary from '@golf/GolfPage/children/course/CourseSummary';

import formStyles from '@golfstyles/form.style';
import {
    FlexContainer,
    FlexItemLabel,
    FlexItemValue,
    FlexItem,
    FlexItemRight,
} from '@golfstyles/layout.style';

const getDisplayField = (data, handlers, idx) => {
    
    switch (data.type) {
        
        case golf.types.dateTime : {

            const value = data.value instanceof Date ? format(new Date(data.value), 'dd-MM-yy HH:mm') : ''

            return (
                <FlexContainer key={ idx }>
                    <FlexItemLabel>{ data.label }</FlexItemLabel>
                    <FlexItemValue>{ value }</FlexItemValue>
                </FlexContainer>
            );
        }

        case golf.classes.Hole : {

            const { editHoleHandler } = handlers;

            return (
                <HoleTable onEdit={ editHoleHandler }  key={ idx } holes={ data.value }/>
            );
        }

        case golf.classes.Course : {

            return (
                <div className="u-pad--coppertop"  key={ idx }>
                    <CourseSummary course={ data.value }/>
                </div>
            );
        }

        case golf.classes.Bag : {

            return (
                <BagDetail key={ idx }
                    bag={ data.value }/>
            );
        }

        case golf.classes.Player : {

            return (
                <PlayerDetail key={ idx }
                    player={ data.value }/>
            );
        }

        case golf.classes.Marker : {

            return (
                <PlayerDetail key={ idx }
                    target="Marker"
                    player={ data.value }/>
            );
        }

        case golf.classes.GamePlayingHandicap: {

            return (
                <PlayingHandicapDetail handicap={ data.value } key={ idx }/>
            )
        }

        default: {

            return (
                <FlexContainer key={ idx }>
                    <FlexItemLabel>{ data.label }</FlexItemLabel>
                    <FlexItemValue>{ data.value }</FlexItemValue>
                </FlexContainer>
            );
        }
    }
};

const GameDetail = ({
    gameData,
    onSave,
    onDelete
}) => {

    const [displayState, setDisplayState] = useState(displayStates.detail);

    const classes = formStyles();

    const onEditHandler = () => setDisplayState(displayStates.edit);

    const onDeleteHandler = () => onDelete(gameData.game);

    const onSaveHandler = game => {

        onSave(game);
        setDisplayState(displayStates.detail);
    };


    const onCancelHandler = () => {

        setDisplayState(displayStates.detail);
    };

    const editHoleHandler = index => {

    };

    if(displayState === displayStates.edit) return <div className="c-block">
        <GameForm
            title={ `Edit game` }
            actionLabel={ `Save game` }
            onSave={ onSaveHandler }
            onCancel={ onCancelHandler }
            game={ gameData.game }/>
    </div>;

    const displayFields = [];

    let count = 0;

    gameShape.shape.forEach(field => {
        
        displayFields.push(getDisplayField(gameData.game[field.predicate], {
            editHoleHandler
        }, count++));
    });

    return (
        <div className="c-block">
            <div className="c-box">
            { displayFields }
            </div>
            <FlexContainer>
                <FlexItem>
                    <Button
                        variant="contained"
                        onClick={ onEditHandler }
                        className={ classes.button }
                        color="primary">Delete</Button>
                </FlexItem>
                <FlexItemRight>
                    <Button
                        variant="contained"
                        onClick={ onEditHandler }
                        className={ classes.button }
                        color="primary">Edit</Button>
                </FlexItemRight>
            </FlexContainer>
{/* <EditActions onEdit={ onEditHandler } onDelete={ onDeleteHandler } onCancel={ onCancelHandler }/> */}
        </div>
    );
};

export default GameDetail;
