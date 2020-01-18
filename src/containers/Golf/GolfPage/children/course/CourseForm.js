import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import formStyles from '@styles/form.style';
import courseShape from '@contexts/course-shape.json';
import setupDataObject from '@utils/setupDataObject';
import getFieldValue from '@utils/getFieldValue';
import checkCanSave from '@utils/checkCanSave';
import getFieldControl from '@utils/getFieldControl';

import {
    FlexContainer,
    FlexItem,
    FlexItemRight,
} from '@styles/layout.style';

const CourseForm = ({
    course,
    onSave,
    onCancel,
    title ='Add course',
    actionLabel = 'add course'
}) => {

    const [courseState, setCourseState] = useState(course);

    const classes = formStyles();

    const saveHandler = () => {

        onSave(courseState);
        const newCourse = setupDataObject(courseShape);
        setCourseState(newCourse);
    };

    const onAddHole = (hole) => {
        
        const newCourse = {
            ...courseState,
            courseHoles: {
                ...courseState.courseHoles,
                value: [
                    ...courseState.courseHoles.value,
                    hole
                ]
            }
        };

        setCourseState(newCourse);
    };

    const onSaveHole = (hole) => {
        
        setCourseState(state => {

            const holes = state.courseHoles.value;

            const editHoleIndex = holes.findIndex(testHole => {
                
                return testHole.holeNumber.value === hole.holeNumber.value;
            });
            const startHoles = holes.slice(0, editHoleIndex);
            const endHoles = holes.slice(editHoleIndex + 1, holes.length);

            const newHoles = [...startHoles, hole, ...endHoles];
            
            const newCourse = {
                ...state,
                courseHoles: {
                    ...state.courseHoles,
                    value: newHoles
                }
            };

            return newCourse;
        });
    };

    useEffect(() => {

        if(course) {
            
            setCourseState(course);
            
        } else {
            
            const newCourse = setupDataObject(courseShape);

            setCourseState(newCourse);
        }

    }, [course]);

    const onChangeCourseField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, args);

        const data = {
            ...courseState,
            [fieldDef.fieldName]: {
                ...courseState[fieldDef.fieldName],
                value
            }
        };

        setCourseState(data);
    };

    const courseFields = [];
    
    let index = 0;

    if(courseState) {
        
        courseShape.shape.forEach(field => {

            const fieldControl = getFieldControl({
                data: courseState[field.predicate],
                styles: classes,
                onChange: onChangeCourseField,
                onSave: onAddHole,
                onSaveEdit: onSaveHole,
                idx: index++
            });

            courseFields.push(fieldControl);
        })
    }

    const canSave = checkCanSave(courseState, courseShape);

    return (
        <form noValidate autoComplete="off">
            <header className="c-header">{ title }</header>
            { courseFields }
            <FlexContainer>
                <FlexItem>
                    <Button
                        variant="contained"
                        disabled={ !canSave }
                        onClick={ saveHandler }
                        className={ classes.button }
                        color="primary">{ actionLabel }</Button>
                </FlexItem>
                <FlexItemRight>
                { onCancel && <Button
                    variant="contained"
                    disabled={ !canSave }
                    onClick={ onCancel }
                    className={ classes.button }
                    color="primary">Cancel</Button>
                }
                </FlexItemRight>
            </FlexContainer>
        </form>
    );
};

export default CourseForm;
