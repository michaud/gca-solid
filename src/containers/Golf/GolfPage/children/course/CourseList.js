import React from 'react';
import CourseDetail from './CourseDetail';

const CourseList = ({
    courses,
    onDelete,
    saveCourse
}) => {

    const onSaveCourse = (course) => {

        saveCourse(course)
    };

    const onDeleteCourse = (course) => {

        onDelete(course);
    };

    return (
        <>
            <header className="c-header">Course list</header>
            {
                courses.length > 0 && courses.map((course, index) => <CourseDetail
                    onSave={ onSaveCourse }
                    onDelete={ onDeleteCourse }
                    key={ index }
                    course={ course } />)
            }
        </>
    );
};

export default CourseList;
