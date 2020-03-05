import React, { useState } from 'react';

import {
    FlexContainer,
    FlexItemData,
    FlexItemTools
} from '@golfstyles/layout.style';

import displayStates from '@golfutils/displayStates';

import CourseForm from '@golfpagectrl/course/CourseForm';
import EditActions from '@golf/components/EditActions';
import { useCourseData } from '@golfcontexts/dataProvider/AppDataProvider';
import deleteHoleFromCourse from '@golfutils/deleteHoleFromCourse';

const CourseDetail = ({
    course,
    onSave,
    onDelete
}) => {

    const [displayState, setDisplayState] = useState(displayStates.detail);
    const { courseListData, reloadCourses } = useCourseData();

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

    const onDeleteHoleHandler = hole => {

        deleteHoleFromCourse(hole, course, courseListData);
        reloadCourses();
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
                        actionLabel={ `Save` }
                        onSave={ onSaveHandler }
                        onCancel={ cancelEdit }
                        onDelete={ onDeleteHandler(course) }
                        onDeleteHole={ onDeleteHoleHandler }
                        course={ course }/>
                </div>
            )}
        </div>
    );
};

export default CourseDetail;
