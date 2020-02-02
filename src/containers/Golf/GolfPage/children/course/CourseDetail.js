import React, { useState } from 'react';

import {
    FlexContainer,
    FlexItemData,
    FlexItemTools
} from '@styles/layout.style';

import displayStates from '@utils/displayStates';
import CourseForm from './CourseForm';
import EditActions from '@containers/Golf/components/EditActions';

const CourseDetail = ({
    course,
    onSave,
    onDelete,
    showEdit = false
}) => {

    const [displayState, setDisplayState] = useState(displayStates.detail);

    const onEdit = () => {

        setDisplayState(displayStates.edit);
    }

    const cancelEdit = () => {

        setDisplayState(displayStates.detail);
    };

    const onSaveHandler = (course) => {

        onSave(course);
        setDisplayState(displayStates.detail);
    };

    const onDeleteHandler = course => () => {

        onDelete(course);
    };

    const courseDescription = `${
        course.courseName.value
    }, ${
        course.courseHoles.value.length
    } ${
        course.courseHoles.value.length > 1 ? 'holes' : 'hole'
    }`;

    return (
        <div className="c-detail__container">
            <FlexContainer alignitems="center">
                <FlexItemData vertical alignitems="center">
                    <div>{ courseDescription }</div>
                </FlexItemData>
                <FlexItemTools>
                    <EditActions onEdit={ onEdit }/>
                </FlexItemTools>
            </FlexContainer>
            { displayState === displayStates.edit && (

                <CourseForm
                    title={ `Edit Course` }
                    actionLabel={ `Save Course` }
                    onSave={ onSaveHandler }
                    onCancel={ cancelEdit }
                    onDelete={ onDeleteHandler(course) }
                    course={ course }/>
                )
            }
        </div>
    );
};

export default CourseDetail;
