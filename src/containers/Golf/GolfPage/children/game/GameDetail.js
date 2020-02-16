import React, { useState } from 'react';

import { format } from 'date-fns'
import golf from '@golfutils/golf-namespace';
import gameShape from '@golfcontexts/game-shape.json';
import displayStates from '@golfutils/displayStates';
import EditActions from '@golf/components/EditActions';
import GameForm from '@golf/GolfPage/children/game/GameForm';
import HoleTable from '@golf/GolfPage/children/hole/HoleTable';
import BagDetail from '@golf/GolfPage/children/game/BagDetail';
import PlayerDetail from '@golf/GolfPage/children/player/PlayerDetail';
import PlayingHandicapDetail from '@golf/GolfPage/children/game/PlayingHandicapDetail';
import CourseSummary from '@golf/GolfPage/children/course/CourseSummary';

import {
    FlexContainer,
    FlexItemLabel,
    FlexItemValue,
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

    const onEdit = () => setDisplayState(displayStates.edit);
    const cancelEdit = () => setDisplayState(displayStates.detail);
    const onDeleteHandler = () => onDelete(gameData.game);

    const onSaveHandler = () => {

        onSave(gameData.game);
        setDisplayState(displayStates.detail);
    };


    const editHoleHandler = index => {

    };

    if(displayState === displayStates.edit) return <GameForm
        title={ `Edit game` }
        actionLabel={ `Save game` }
        onSave={ onSaveHandler }
        onCancel={ cancelEdit }
        game={ gameData.game }/>;

    const displayFields = [];

    let count = 0;

    gameShape.shape.forEach(field => {
        
        displayFields.push(getDisplayField(gameData.game[field.predicate], {
            editHoleHandler
        }, count++));
    });

    return (
        <div>

            { displayFields }
            <EditActions onEdit={ onEdit } onDelete={ onDeleteHandler }/>
        </div>
    );
};

export default GameDetail;
