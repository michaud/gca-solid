import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import formStyles from './form.style';

import courseShape from '@contexts/course-shape.json';
import golf from '@utils/golf-namespace';
import TextField from '@material-ui/core/TextField';
import ManageHoles from './ManageHoles';
import setupDataObject from '@utils/setupDataObject';

const FlexContainer = styled.div`display: flex;`;
const FlexItem = styled.div`flex: 1;`;
const FlexItemRight = styled.div`
    flex: 1;
    text-align: right;
`;

const checkCanSave = state => {
    
    return state && Object.entries(state.fields).every(entry => {
        
        return entry[1].field.value !== '';
    });
}

const CourseForm = ({ onSave, course, title ='Add course', actionLabel = 'add course', onCancel }) => {

    const [courseState, setCourseState] = useState(course);

    const classes = formStyles();

    const saveHandler = () => {

        onSave(courseState);
        //setCourseState(clubType);
    };

    const onAddHole = (hole) => {
        
        const newCourse = {
            ...courseState,
            fields: {
                ...courseState.fields,
                courseHoles: {
                    ...courseState.fields.courseHoles,
                    field: {
                        ...courseState.fields.courseHoles.field,
                        value: [
                            hole,
                            ...courseState.fields.courseHoles.field.value
                        ]
                    }
                }
            }
        };

        setCourseState(newCourse)
    };

    useEffect(() => {

        if(course) {
            
            setCourseState(course);
            
        } else {
            
            const newCourse = setupDataObject(courseShape);

            setCourseState(newCourse);
        }

    }, [course]);

    const getFieldValue = (fieldDef, args) => {

        const [data] = args;

        switch(fieldDef.fieldType) {

            case golf.types.string: {
                
                return data.target.value;
            }

            case golf.types.nonNegativeInteger : {

                return data.target.value;
            }

            default: {
                return '';
            }
        }
    };

    const onChangeCourseField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, args);

        const fields = {
            ...courseState.fields,
            [fieldDef.fieldName]: {
                ...courseState.fields[fieldDef.fieldName],
                field: {
                    ...courseState.fields[fieldDef.fieldName].field,
                    value
                }
            }
        };
        
        const data = {
            ...courseState,
            fields
        };

        setCourseState(data);
    };

    const getFieldControl = (field, index) => {
        
        switch(field.fieldType) {
    
            case golf.types.string : {

                return <TextField key={ index }
                    required
                    label={ field.field.label }
                    className={ classes.textField }
                    size="normal"
                    value={ field.field.value }
                    onChange={ onChangeCourseField(field) }
                    variant="outlined"/>
            }

            case golf.types.nonNegativeInteger : {
                
                return <TextField key={ index }
                    required
                    type="number"
                    label={ field.field.label }
                    className={ classes.textField }
                    size="normal"
                    value={ field.field.value }
                    onChange={ onChangeCourseField(field) }
                    variant="outlined"/>
            }

            case golf.classes.Hole : {

                return <ManageHoles
                    onSave={ onAddHole }
                    key={ index }
                    holes={ field.field.value }/>
            }

            default: {
            
                return <div key={ index }>no field component defined</div>;
            }
        }
    };

    const courseFields = [];
    
    let index = 0;

    if(courseState) {
        
        for (const field in courseState.fields) {

            const fieldControl = getFieldControl(courseState.fields[field], index++);
            courseFields.push(fieldControl);
        }
    }

    const canSave = checkCanSave(courseState);

    return <form noValidate autoComplete="off">
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
    </form>;
};

export default CourseForm;
