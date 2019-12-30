import React, { useState } from 'react';

import golf from '@utils/golf-namespace';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CourseHoleTable from './CourseHoleTable';

import {
    FieldContainer,
    FlexContainer,
    FlexItemData,
    FlexItemLabel,
    FlexItemValue,
    FlexItemTools
} from '@styles/layout.style';

import displayStates from '@utils/displayStates';
import CourseForm from './CourseForm';

const CourseDetail = ({ course, onSave, onDelete }) => {

    const [displayState, setDisplayState] = useState(displayStates.detail);

    const onEdit = () => {

        setDisplayState(displayStates.edit);
    }

    const cancelEdit = () => {

        setDisplayState(displayStates.detail);
    };

    const onSaveHandler = course => {

        onSave(course);
        setDisplayState(displayStates.detail);
    };

    const onDeleteHandler = () => {

        onDelete(/** */);
    };

    const getDisplayField = (field, index) => {

        switch (field.fieldType) {

            case golf.types.string : {

                return <FlexContainer key={ index }>
                    <FlexItemLabel>{ field.field.label }</FlexItemLabel>
                    <FlexItemValue>{ field.field.value }</FlexItemValue>
                </FlexContainer>;
            }

            case golf.types.nonNegativeInteger : {

                return <FlexContainer key={ index }>
                    <FlexItemLabel>{ field.field.label }</FlexItemLabel>
                    <FlexItemValue>{ field.field.value }</FlexItemValue>
                </FlexContainer>;
            }

            case golf.classes.Hole : {

                return <CourseHoleTable  key={ index } holes={ field.field.value }/>;
            }

            default: {

                return <FlexContainer key={ index }>
                    <FlexItemLabel>{ field.field.label }</FlexItemLabel>
                    <FlexItemValue>{ field.field.value }</FlexItemValue>
                </FlexContainer>;
            }
        }
    };

    if(!course.iri) return <CourseForm
        title={ `Create Course` }
        actionLabel={ `Save Course` }
        onSave={ onSaveHandler }
        onCancel={ cancelEdit }
        course={ course }/>;

    if(displayState === displayStates.edit) return <CourseForm
        title={ `Edit Course` }
        actionLabel={ `Save Course` }
        onSave={ onSaveHandler }
        onCancel={ cancelEdit }
        course={ course }/>;

    const displayFields = [];

    let count = 0;
    for(const field in course.fields) {
        
        displayFields.push(getDisplayField(course.fields[field], count++));
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
                    onClick={ onDeleteHandler }>
                    <DeleteIcon />
                </IconButton>
            </FlexItemTools>
        </FlexContainer>
    </FieldContainer>;
}

export default CourseDetail;
