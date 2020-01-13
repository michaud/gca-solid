import React, { useState } from 'react';

import golf from '@utils/golf-namespace';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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

    const onSaveHandler = game => {

        onSave(game);
        setDisplayState(displayStates.detail);
    };

    const onDeleteHandler = game => () => {

        onDelete(game);
    };

    const editHoleHandler = index => {

    };
    
    const getDisplayField = (field, index) => {

        switch (field.fieldType) {

            case golf.types.string : {

                return <FlexContainer key={ index }>
                    <FlexItemLabel>{ field.field.label }</FlexItemLabel>
                    <FlexItemValue>{ field.field.value }</FlexItemValue>
                </FlexContainer>;
            }

            case golf.types.dateTime : {

                const value = field.field.value instanceof Date ? moment(field.field.value).format('DD-mm-YY hh:mm') : ''
                return <FlexContainer key={ index }>
                    <FlexItemLabel>{ field.field.label }</FlexItemLabel>
                    <FlexItemValue>{ value }</FlexItemValue>
                </FlexContainer>;
            }

            case golf.types.nonNegativeInteger : {

                return <FlexContainer key={ index }>
                    <FlexItemLabel>{ field.field.label }</FlexItemLabel>
                    <FlexItemValue>{ field.field.value }</FlexItemValue>
                </FlexContainer>;
            }

            case golf.classes.Hole : {

                return <HoleTable onEdit={ editHoleHandler }  key={ index } holes={ field.field.value }/>;
            }

            case golf.classes.Course : {

                return <CourseDetail key={ index }
                    course={ field.field.value }/>
            }

            case golf.classes.Bag : {

                return <BagDetail key={ index }
                    bag={ field.field.value }/>
            }

            case golf.classes.Player : {
                return <div key={ index }>Player</div>
            }

            case golf.classes.Marker : {
                return <div key={ index }>Marker</div>
            }

            default: {

                return <FlexContainer key={ index }>
                    <FlexItemLabel>{ field.field.label }</FlexItemLabel>
                    <FlexItemValue>{ field.field.value }</FlexItemValue>
                </FlexContainer>;
            }
        }
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
        
        displayFields.push(getDisplayField(game.fields[field], count++));
    }

    return <FieldContainer>
        <FlexContainer>
            <FlexItemData>
                { displayFields }
            </FlexItemData>
            <FlexItemTools>
                <IconButton
                    aria-label="edit"
                    onClick={ onEdit }>
                    <EditIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    onClick={ onDeleteHandler(game) }>
                    <DeleteIcon />
                </IconButton>
            </FlexItemTools>
        </FlexContainer>
    </FieldContainer>;
}

export default GameDetail;
