import React, { useState } from 'react';

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
import EditActions from '@containers/Golf/components/EditActions';

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

        const displayFields = [];

        holeShape.shape.forEach(field => {
                        
            const data = getFieldDisplayData(field, hole);
            displayFields.push(data);
        });

        return (
            <FieldContainer>
                <FlexContainer>
                    <FlexItemData>
                        {
                            displayFields.map((field, index) => <FlexContainer key={ index }>
                                <FlexItemLabel>{ field.label }</FlexItemLabel>
                                <FlexItemValue>{ field.value }</FlexItemValue>
                            </FlexContainer>)
                        }
                    </FlexItemData>
                    <FlexItemTools>
                        <EditActions onEdit={ onEdit } onDelete={ onDeleteHandler }/>
                    </FlexItemTools>
                </FlexContainer>
            </FieldContainer>
        );
    }
};

export default HoleDetail;
