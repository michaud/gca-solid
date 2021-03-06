import React from 'react';

import Button from '@material-ui/core/Button';
import CourseSelector from '@golfpagectrl/game/CourseSelector';

import formStyles from '@golfstyles/form.style';

const SelectCourse = ({
    courses,
    selected,
    onChange,
    onAdd
}) => {

    const classes = formStyles();

    const hasCourses = courses.length > 0;

    const addHandler = () => {
        onAdd();
    };

    const displayFields = [];

    if(hasCourses) {

        displayFields.push(
            <CourseSelector
                key={ 0 }
                courses={ courses }
                onChange={ onChange }
                selected={ selected }/>
        );
    }

    displayFields.push(<Button key={ displayFields.length }
        variant="contained"
        onClick={ addHandler }
        className={ classes.button }
        color="primary">Add Course</Button>)

    return (
        <div className="c-box" style={{ minHeight: '19.687rem' }}>{ displayFields }</div>
    );
};

export default SelectCourse;
