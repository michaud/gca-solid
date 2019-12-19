import React from 'react';

import styled from 'styled-components';

import holeShape from '@contexts/hole-shape.json';
import golf from '@utils/golf-namespace';

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

const getFieldData = (field, hole) => {

    const label = field.label;

    let value = '';

    switch(field.type) {

        case golf.types.string: {

            value = hole.fields[field.predicate].field.value;

            break;
        }
        
        case golf.types.nonNegativeInteger: {

            value = hole.fields[field.predicate].field.value;

            break;
        }
        
        default: {
            value = 'error';
            console.error('no field type', field)
        }
    }
    
    return { value, label };
};

const HoleDetail = ({ hole }) => {

    const fields = [];

    holeShape.shape.forEach(field => {
                    
        const data = getFieldData(field, hole);
        fields.push(data);
    });

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
                {/* <IconButton
                    aria-label="delete"
                    onClick={onEdit}>
                    <EditIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    onClick={onDeleteHandler}>
                    <DeleteIcon />
                </IconButton> */}
            </FlexItemTools>
        </FlexContainer>
    </FieldContainer>
};

export default HoleDetail;
