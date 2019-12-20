import React, { useState } from 'react';

import styled from 'styled-components';
import golf from '@utils/golf-namespace';
import courseShape from '@contexts/course-shape.json';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const FlexContainer = styled.div`
    display: flex;
    align-items: flex-start;
    margin: .5rem 0;
`;

const FieldContainer = styled.div`
    margin-bottom: 1rem;
    padding: 1rem 0 0 0;
`;

const FlexItemLabel = styled.div`min-width: 10rem;`;
const FlexItemValue = styled.div`flex: 1;`;
const FlexItemData = styled.div`flex: 1;`;
const FlexItemTools = styled.div`flex: 0;`;


const getFieldData = (field, course) => {

    const label = field.label;

    let value = '';

    switch (field.type) {

        case golf.types.string: {

            value = course.fields[field.predicate].field.value;

            break;
        }

        case golf.classes.Hole: {

            value = course.fields[field.predicate].field.value;

            break;
        }

        case golf.types.nonNegativeInteger : {

            value = course.fields[field.predicate].field.value;

            break;
        }

        default: {
            value = 'error';
            console.error('no field type', field)
        }
    }

    return { value, label };
};

const display = {
    detail: 'detail',
    edit: 'edit'
}

const CourseDetail = ({ course, onSave, onDelete }) => {

    const [displayState, setDisplayState] = useState(display.detail);

    const onEdit = () => {

        setDisplayState(display.edit);
    }

    const cancelEdit = () => {

        setDisplayState(display.detail);
    };

    const onSaveHandler = club => {

        onSave(club);

        setDisplayState(display.detail);
    };

    const onDeleteHandler = () => {

        onDelete(/** */);
    };
    const fields = [];

    courseShape.shape.forEach(field => {
        const data = getFieldData(field, course);
        fields.push(data);
    })

    return <FieldContainer>
        <FlexContainer>
            <FlexItemData>
                {
                    fields.map((field, index) => <FlexContainer key={index}>
                        <FlexItemLabel>{field.label}</FlexItemLabel>
                        <FlexItemValue>{field.value}</FlexItemValue>
                    </FlexContainer>)
                }
            </FlexItemData>
            <FlexItemTools>
                <IconButton
                    aria-label="delete"
                    onClick={onEdit}>
                    <EditIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    onClick={onDeleteHandler}>
                    <DeleteIcon />
                </IconButton>
            </FlexItemTools>
        </FlexContainer>
    </FieldContainer>;

}

export default CourseDetail;
