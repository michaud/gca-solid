import React from 'react';

import CourseDetail from '@golf/GolfPage/children/course/CourseDetail';

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
                courses.length > 0 && courses.map(course => <CourseDetail
                    onSave={ onSaveCourseHandler }
                    onDelete={ onDeleteCourse }
                    key={ course.iri }
                    course={ course } />)
            }
        </>
    );
};

export default CourseList;
