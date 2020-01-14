import React, { useState } from 'react';

import golf from '@utils/golf-namespace';

import {
    FieldContainer,
    FlexContainer,
    FlexItemData,
    FlexItemLabel,
    FlexItemValue,
    FlexItemTools
} from '@styles/layout.style';

import displayStates from '@utils/displayStates';
import GameForm from './GameForm';
import HoleTable from '../hole/HoleTable';
import CourseDetail from '../course/CourseDetail';
import moment from 'moment';
import BagDetail from './BagDetail';
import EditActions from '@containers/Golf/components/EditActions';
import PlayerDetail from '../player/PlayerDetail';

const getDisplayField = (data, handlers, index) => {

    switch (data.fieldType) {

        case golf.types.dateTime : {

            const value = data.field.value instanceof Date ? moment(data.field.value).format('DD-mm-YY hh:mm') : ''

            return (
                <FlexContainer key={ index }>
                    <FlexItemLabel>{ data.field.label }</FlexItemLabel>
                    <FlexItemValue>{ value }</FlexItemValue>
                </FlexContainer>
            );
        }

        case golf.classes.Hole : {

            const { editHoleHandler } = handlers;

            return (
                <HoleTable onEdit={ editHoleHandler }  key={ index } holes={ data.field.value }/>
            );
        }

        case golf.classes.Course : {

            return (
                <CourseDetail key={ index }
                    course={ data.field.value }/>
            );
        }

        case golf.classes.Bag : {

            return (
                <BagDetail key={ index }
                    bag={ data.field.value }/>
            );
        }

        case golf.classes.Player : {

            return (
                <PlayerDetail key={ index }
                    player={ data.field.value }/>
            );
        }

        case golf.classes.Marker : {

            return (
                <PlayerDetail key={ index }
                    player={ data.field.value }/>
            );
        }

        default: {

            return (
                <FlexContainer key={ index }>
                    <FlexItemLabel>{ data.field.label }</FlexItemLabel>
                    <FlexItemValue>{ data.field.value }</FlexItemValue>
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
    for(const field in game.fields) {
        
        displayFields.push(getDisplayField(game.fields[field], {
            editHoleHandler
        }, count++));
    }

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
