import React, {
    useState,
    useEffect
} from 'react';

import Button from '@material-ui/core/Button';
import update from 'immutability-helper';

import courseShape from '@golfcontexts/course-shape.json';
import setupDataObject from '@golfutils/setupDataObject';
import getFieldValue from '@golfutils/getFieldValue';
import checkCanSave from '@golfutils/checkCanSave';
import getFieldControl from '@golfutils/getFieldControl';

import formStyles from '@golfstyles/form.style';

import {
    FlexContainer,
    FlexItem,
    FlexItemRight,
} from '@golfstyles/layout.style';

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

        onSave({ ...courseState });
        const newCourse = setupDataObject(courseShape);
        setCourseState(newCourse);
    };

    const onAddHole = (hole) => {
        
        setCourseState(state => update(state, {
            courseHoles: { value: { $push: [hole] } }
        }));
    };

    const onSaveHole = (hole) => {

        setCourseState(state => {

            let holes = state.courseHoles.value;

            const editHoleIndex = holes.findIndex(testHole => {

                return parseInt(testHole.holeNumber.value) === parseInt(hole.holeNumber.value);
            });

            const holeWithSameStrokeIndexIndex = holes.findIndex(testHole => {
                return parseInt(testHole.holeStrokeIndex.value) === parseInt(hole.holeStrokeIndex.value);
            });

            if(holeWithSameStrokeIndexIndex > -1 ) {

                const startHoles = holes.slice(0, holeWithSameStrokeIndexIndex);
                const endHoles = holes.slice(holeWithSameStrokeIndexIndex + 1, holes.length);
    
                const updatedHole = update(holes[holeWithSameStrokeIndexIndex], {
                    
                    holeStrokeIndex: { value: { $set: 0 }}
                });

                holes = [...startHoles, updatedHole, ...endHoles];
            }


            const startHoles = holes.slice(0, editHoleIndex);
            const endHoles = holes.slice(editHoleIndex + 1, holes.length);

            const newHoles = [...startHoles, hole, ...endHoles];

            const newCourse = update(state, {
                courseHoles: { value: { $set: newHoles } }
            });

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

        setCourseState(state => update(state, {
            [fieldDef.predicate]: { value: { $set: value } }
        }));
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
            { !canSave.can && <div className="c-box">{ canSave.reasons.map(item => item) }</div> }
            <FlexContainer>
                <FlexItem>
                    <Button
                        variant="contained"
                        disabled={ !canSave.can }
                        onClick={ saveHandler }
                        className={ classes.button }
                        color="primary">{ actionLabel }</Button>
                </FlexItem>
                <FlexItemRight>
                { onCancel && <Button
                    variant="contained"
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
