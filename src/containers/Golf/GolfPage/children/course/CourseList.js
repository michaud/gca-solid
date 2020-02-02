import React from 'react';
import CourseDetail from './CourseDetail';

const CourseList = ({
    courses,
    onDelete,
    onSaveCourse
}) => {

    const onSaveCourseHandler = (course) => {

        onSaveCourse(course)
    };

    const onDeleteCourse = (course) => {

        onDelete(course);
    };

    return (
        <>
            <header className="c-header">Course list</header>
            {
                courses.length > 0 && courses.map((course, index) => <CourseDetail
                    onSave={ onSaveCourseHandler }
                    onDelete={ onDeleteCourse }
                    key={ index }
                    course={ course } />)
            }
        </>
    );
};

export default CourseList;
