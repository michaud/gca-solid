import React from 'react';
import CourseDetail from './CourseDetail';

const CourseList = ({ courses }) => {

    const onSave = () => {
        
    };

    const onDelete = () => {

    };

    return <div>
        <header className="c-header">Course list</header>
        {
            courses.length > 0 && courses.map((course, index) => <CourseDetail
                onSave={ onSave }
                onDelete={ onDelete }
                key={ index }
                course={ course } />)
        }
    </div>;
}

export default CourseList;
