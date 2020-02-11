import React from 'react';

import Button from '@material-ui/core/Button';
import CourseSelector from '@containers/Golf/GolfPage/children/game/CourseSelector';

import formStyles from '@golfstyles/form.style';

const SelectCourse = ({
    courses,
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

        displayFields.push(<CourseSelector
            key={ 0 }
            courses={ courses }
            onChange={ onChange }/>);
    }

    displayFields.push(<Button key={ displayFields.length }
        variant="contained"
        onClick={ addHandler }
        className={ classes.button }
        color="primary">Add Course</Button>)

    return (
        <div className="c-box">{ displayFields }</div>
    );
};

export default SelectCourse;
