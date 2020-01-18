import React, { useState } from 'react';

import golf from '@utils/golf-namespace';
import courseShape from '@contexts/course-shape.json';
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
import HoleTable from '../hole/HoleTable';
import EditActions from '@containers/Golf/components/EditActions';

const CourseDetail = ({
    course,
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

        onSave(course);
        setDisplayState(displayStates.detail);
    };

    const onDeleteHandler = course => () => {

        onDelete(course);
    };

    const editHoleHandler = index => {

    };
    
    const getDisplayField = (field, index) => {

        switch (field.fieldType) {

            case golf.classes.Hole : {

                return <HoleTable onEdit={ editHoleHandler }  key={ index } holes={ field.value }/>;
            }

            default: {

                return <FlexContainer key={ index }>
                    <FlexItemLabel>{ field.label }</FlexItemLabel>
                    <FlexItemValue>{ field.value }</FlexItemValue>
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

    courseShape.shape.forEach(field => {

        displayFields.push(getDisplayField(course[field.predicate], count++));
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

export default CourseDetail;
