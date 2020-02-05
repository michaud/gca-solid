import React, { useState } from 'react';

import { format } from 'date-fns'
import golf from '@utils/golf-namespace';
import gameShape from '@contexts/game-shape.json';
import displayStates from '@utils/displayStates';
import GameForm from '@containers/Golf/GolfPage/children/game/GameForm';
import HoleTable from '@containers/Golf/GolfPage/children/hole/HoleTable';
import BagDetail from '@containers/Golf/GolfPage/children/game/BagDetail';
import EditActions from '@containers/Golf/components/EditActions';
import PlayerDetail from '@containers/Golf/GolfPage/children/player/PlayerDetail';
import PlayingHandicapDetail from '@containers/Golf/GolfPage/children/game/PlayingHandicapDetail';
import CourseSummary from '@containers/Golf/GolfPage/children/course/CourseSummary';

import {
    FlexContainer,
    FlexItemLabel,
    FlexItemValue,
} from '@styles/layout.style';

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
    game,
    onSave,
    onDelete
}) => {

    const [displayState, setDisplayState] = useState(displayStates.detail);

    const onEdit = () => setDisplayState(displayStates.edit);
    const cancelEdit = () => setDisplayState(displayStates.detail);
    const onDeleteHandler = () => onDelete(game);

    const onSaveHandler = () => {

        onSave(game);
        setDisplayState(displayStates.detail);
    };


    const editHoleHandler = index => {

    };
    
    if(!game.iri) return <GameForm
        title={ `Create game` }
        actionLabel={ `Save game` }
        onSave={ onSaveHandler }
        onCancel={ cancelEdit }
        game={ game }/>;

    if(displayState === displayStates.edit) return <GameForm
        title={ `Edit game` }
        actionLabel={ `Save game` }
        onSave={ onSaveHandler }
        onCancel={ cancelEdit }
        game={ game }/>;

    const displayFields = [];

    let count = 0;

    gameShape.shape.forEach(field => {
        
        displayFields.push(getDisplayField(game[field.predicate], {
            editHoleHandler
        }, count++));
    });

    return (
        <div>
            {/* <header className="c-header">{ game.gameName.value }</header> */}
            { displayFields }
            <EditActions onEdit={ onEdit } onDelete={ onDeleteHandler }/>
        </div>
    );
};

export default GameDetail;
