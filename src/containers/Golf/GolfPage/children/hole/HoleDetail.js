import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import holeShape from '@contexts/hole-shape.json';
import getFieldDisplayData from '@utils/getFieldDisplayData';

import {
    FieldContainer,
    FlexContainer,
    FlexItemData,
    FlexItemLabel,
    FlexItemValue,
    FlexItemTools
} from '@styles/layout.style';
import displayStates from '@utils/displayStates';
import HoleForm from './HoleForm';

const HoleDetail = ({
    hole,
    onSave,
    onDelete,
    target = 'hole'
}) => {

    const [displayState, setDisplayState] = useState(displayStates.detail);    

    const onSaveHandler = (hole) => {

        onSave(hole);
    }

    const onEdit = () => {

        setDisplayState(displayStates.edit);
    };

    const cancelEdit = () => {

        setDisplayState(displayStates.detail);
    };

    const onDeleteHandler = () => {

        onDelete(hole);
    };

    if(displayState === displayStates.edit) return <HoleForm
        title={ `Edit ${ target }` }
        actionLabel={ `Save ${ target }` }
        onSave={ onSaveHandler }
        onCancel={ cancelEdit }
        hole={ hole }/>;

    if(displayState === displayStates.detail) {

        const fields = [];

        holeShape.shape.forEach(field => {
                        
            const data = getFieldDisplayData(field, hole);
            fields.push(data);
        });

        return <FieldContainer>
            <FlexContainer>
                <FlexItemData>
                    {
                        fields.map((field, index) => <FlexContainer key={index}>
                            <FlexItemLabel>{ field.label }</FlexItemLabel>
                            <FlexItemValue>{ field.value }</FlexItemValue>
                        </FlexContainer>)
                    }
                </FlexItemData>
                <FlexItemTools>
                    <IconButton
                        aria-label="delete"
                        onClick={ onEdit }>
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        onClick={ onDeleteHandler }>
                        <DeleteIcon />
                    </IconButton>
                </FlexItemTools>
            </FlexContainer>
        </FieldContainer>;
    }
};

export default HoleDetail;
