import React, { useState } from 'react';

import moment from 'moment';

import golf from '@utils/golf-namespace';
import gameShape from '@contexts/game-shape.json';
import displayStates from '@utils/displayStates';
import GameForm from './GameForm';
import HoleTable from '../hole/HoleTable';
import CourseDetail from '../course/CourseDetail';
import BagDetail from './BagDetail';
import EditActions from '@containers/Golf/components/EditActions';
import PlayerDetail from '../player/PlayerDetail';
import {
    FieldContainer,
    FlexContainer,
    FlexItemData,
    FlexItemLabel,
    FlexItemValue,
    FlexItemTools
} from '@styles/layout.style';
import EditPlayingHandicap from './EditPlayingHandicap';

const getDisplayField = (data, handlers, idx) => {
    
    switch (data.fieldType) {
        
        case golf.types.dateTime : {
            
            const value = data.value instanceof Date ? moment(data.value).format('DD-mm-YY hh:mm') : ''

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
                <CourseDetail key={ idx }
                    course={ data.value }/>
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
                <EditPlayingHandicap handicap={ data.value } key={ idx }/>
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

    const onEdit = () => {

        setDisplayState(displayStates.edit);
    }

    const cancelEdit = () => {

        setDisplayState(displayStates.detail);
    };

    const onSaveHandler = () => {

        onSave(game);
        setDisplayState(displayStates.detail);
    };

    const onDeleteHandler = () => {

        onDelete(game);
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
        <FieldContainer>
            <FlexContainer>
                <FlexItemData>
                    { displayFields }
                </FlexItemData>
                <FlexItemTools>
                    <EditActions onEdit={ onEdit } onDelete={ onDeleteHandler }/>
                </FlexItemTools>
            </FlexContainer>
        </FieldContainer>
    );
};

export default GameDetail;
