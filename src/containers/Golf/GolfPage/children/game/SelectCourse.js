import React from 'react';

import Button from '@material-ui/core/Button';
import CourseSelector from './CourseSelector';

import formStyles from '@styles/form.style';


const SelectCourse = ({ courses, onChange }) => {

    const classes = formStyles();

    const hasCourses = courses.length > 0;

    const saveHandler = () => {

    };

    const fields = [];

    if(hasCourses) {

        fields.push(<CourseSelector
            key={ 0 }
            courses={ courses }
            onChange={ onChange }/>);
    }

    fields.push(<Button key={ fields.length }
        variant="contained"
        onClick={ saveHandler }
        className={ classes.button }
        color="primary">Add Course</Button>)

    return (
        <div className="c-box">{ fields }</div>
    );
};

export default SelectCourse;
