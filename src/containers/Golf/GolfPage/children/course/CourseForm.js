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

const sortByHolesByNumber = (a ,b) => parseInt(a.holeNumber.value) - parseInt(b.holeNumber.value);

const CourseForm = ({
    course,
    onSave,
    onCancel,
    onDelete,
    onDeleteHole,
    title ='Add course',
    actionLabel = 'add course'
}) => {

    const [courseState, setCourseState] = useState(course);
    const [canSaveCourse, setCanSaveCourse] = useState({
        can: false,
        reasons: []
    });

    const classes = formStyles();

    useEffect(() => {

        let didCancel = false;

        const init = () => {
            
            if(course) {
            
                if(!didCancel) {
                    setCourseState(course);
                    setCanSaveCourse(checkCanSave(courseState, courseShape));
                }

            } else {
                
                const newCourse = setupDataObject(courseShape);

                if(!didCancel) {
                    setCourseState(newCourse);
                    setCanSaveCourse(checkCanSave(courseState, courseShape));
                }
            }
        }

        init();

        return () => { didCancel = true; }

    }, [course]);

    const saveHandler = () => {

        onSave({ ...courseState });
        const newCourse = setupDataObject(courseShape);
        setCourseState(newCourse);
    };

    const onDeleteHandler = course => () => onDelete(course);

    const onAddHole = (hole) => {
        
        setCourseState(state => {
            
            const holes = state.courseHoles.value;
            holes.push(hole);
            const sortedHoles = holes.sort(sortByHolesByNumber);

            return update(state, {
                courseHoles: { value: { $set: sortedHoles } }
            });
        });
        setCanSaveCourse(checkCanSave(courseState, courseShape));
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

            const sortedHoles = newHoles.sort(sortByHolesByNumber);

            const newCourse = update(state, {
                courseHoles: { value: { $set: sortedHoles } }
            });

            return newCourse;
        });

        setCanSaveCourse(checkCanSave(courseState, courseShape));
    };

    const onChangeCourseField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, args);

        setCourseState(state => update(state, {
            [fieldDef.predicate]: { value: { $set: value } }
        }));

        setCanSaveCourse(checkCanSave(courseState, courseShape));
    };

    const onDeleteHoleHandler = hole => {

        if(hole.iri === '') {

            const index = courseState.courseHoles.value.indexOf(hole);

            setCourseState(state => {
                
                return update(state, {
                    courseHoles: { value: { $splice: [[index, 1]] }  }
                });
            });

        } else {

            onDeleteHole(hole);
        }

        setCanSaveCourse(checkCanSave(courseState, courseShape));
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
                onDeleteHole: onDeleteHoleHandler,
                idx: `${ field.predicate }${ index++ }`
            });

            courseFields.push(fieldControl);
        })
    }

    const handleDelete = typeof(onDelete) === 'function' ? onDeleteHandler : undefined;

    return (
        <form noValidate autoComplete="off">
            <header className="c-header">{ title }</header>
            { courseFields }
            { !canSaveCourse.can && <div className="c-box">{ canSaveCourse.reasons.map(item => item) }</div> }
            <FlexContainer>
                <FlexItem>
                    <Button
                        variant="contained"
                        disabled={ !canSaveCourse.can }
                        onClick={ saveHandler }
                        className={ classes.button }
                        color="primary">{ actionLabel }</Button>
                </FlexItem>
                {
                    handleDelete ? (
                        <FlexItem>
                            <Button
                                variant="contained"
                                disabled={ !canSaveCourse.can }
                                onClick={ handleDelete(course) }
                                className={ classes.button }
                                color="primary">Delete</Button>
                        </FlexItem>
                    ) : null
                }
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
