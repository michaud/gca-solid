import React, { useState } from 'react';

import {
    FlexContainer,
    FlexItemData,
    FlexItemTools
} from '@golfstyles/layout.style';

import displayStates from '@golfutils/displayStates';

import CourseForm from '@golf/GolfPage/children/course/CourseForm';
import EditActions from '@golf/components/EditActions';

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
                <FlexItemData className="summary__content" vertical alignitems="center">
                    <div>{ courseDescription }</div>
                </FlexItemData>
                <FlexItemTools>
                    <EditActions onEdit={ onEdit }/>
                </FlexItemTools>
            </FlexContainer>
            { displayState === displayStates.edit && (
                <div className="c-block--akimbo c-box">
                    <CourseForm
                        title={ `Edit Course` }
                        actionLabel={ `Save Course` }
                        onSave={ onSaveHandler }
                        onCancel={ cancelEdit }
                        onDelete={ onDeleteHandler(course) }
                        course={ course }/>
                </div>
            )}
        </div>
    );
};

export default CourseDetail;
